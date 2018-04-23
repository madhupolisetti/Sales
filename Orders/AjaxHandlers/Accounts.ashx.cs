using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json.Linq;
using Orders.CommonClasses;
using OrdersManagement.Model;
using System.Web.SessionState;

namespace Orders.AjaxHandlers
{
    /// <summary>
    /// Summary description for Accounts
    /// </summary>
    public class Accounts : IHttpHandler, IRequiresSessionState
    {
        private JObject errorJSon = new JObject(new JProperty("Success", false), new JProperty("Message", ""));
        public void ProcessRequest(HttpContext context)
        {

            if (HttpContext.Current.Session["AdminId"] == null || HttpContext.Current.Session["AdminId"].ToString() == string.Empty)
            {


                context.Response.StatusCode = 401;
                context.Response.StatusDescription = "Invalid Session";
                context.Response.End();

            }
            if (context.Request["Action"] == null)
            {
                context.Response.StatusCode = 400;
                errorJSon["Message"] = "Action parameter is mandatory";
                context.Response.Write(errorJSon);
                context.Response.End();
            }
            try
            {
                switch (context.Request["Action"].ToString())
                {
                    case "CreateOrUpdateAccountDetails":
                        GetAccountDetails(context);
                        break;
                    case "GetCountries":
                        GetCountries(context);
                        break;
                    case "GetStates":
                        GetStates(context);
                        break;
                }

            }
            catch (Exception ex) { }
        }

        public void GetAccountDetails(HttpContext context)
        {

            Orders.BussinessLogicLayer.Accounts accountsObj = new BussinessLogicLayer.Accounts();
            context.Response.Write(accountsObj.CreateAccountProducts(MyConf.MyConnectionString, Convert.ToByte(context.Request["productId"]), Convert.ToString(context.Request["accountInformationUrl"]), Convert.ToString(context.Request["mobileNumber"])));

        }
        public void GetCountries(HttpContext context)
        {

            OrdersManagement.Core.Client countriesObj = new OrdersManagement.Core.Client(responseFormat: OrdersManagement.ResponseFormat.JSON);
            TablePreferences countriesTablePreferences = new TablePreferences("", "", true, false);
            Dictionary<string, TablePreferences> countriesDictionary = new Dictionary<string, TablePreferences>();
            countriesDictionary.Add(Label.COUNTRIES, countriesTablePreferences);
            context.Response.Write(countriesObj.GetCountries(tablePreferences: countriesDictionary));

        }
        public void GetStates(HttpContext context)
        {
            bool isActive;
            if (context.Request["IsActive"] == null || !bool.TryParse(context.Request["IsActive"].ToString(), out isActive))
                GenerateErrorResponse(400, string.Format("IsActive must be a boolean value"));

            OrdersManagement.Core.Client statesObj = new OrdersManagement.Core.Client(responseFormat: OrdersManagement.ResponseFormat.JSON);
            TablePreferences statesTablePreferences = new TablePreferences("", "", true, false);
            Dictionary<string, TablePreferences> statesDictionary = new Dictionary<string, TablePreferences>();
            statesDictionary.Add(Label.STATES, statesTablePreferences);
            context.Response.Write(statesObj.GetStates(true, tablePreferences: statesDictionary));

        }

        private void GenerateErrorResponse(int statusCode, string message)
        {
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.StatusCode = statusCode;
            errorJSon["Message"] = message;
            HttpContext.Current.Response.Write(errorJSon);
            //HttpContext.Current.ApplicationInstance.CompleteRequest();
            try
            {
                HttpContext.Current.Response.End();
            }
            catch (System.Threading.ThreadAbortException e)
            { }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}