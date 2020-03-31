using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json.Linq;
using OC = Orders.CommonClasses;
using OrdersManagement.Model;
using System.Web.SessionState;
using System.Reflection;
using OU = Orders.UserDefinedClasses;
using Newtonsoft.Json;
using Orders.CommonClasses;

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
                    case "GetAccountOwnersAndPlans":
                        GetAccountOwnersAndPlans(context);
                        break;
                    case "UpdateAccountOwnerDetails":
                        
                        UpdateAccountOwnerDetails(context);
                        break;
                }

            }
            catch (Exception ex) {
                context.Response.Write(ex.ToString());
            }
        }

        public void GetAccountDetails(HttpContext context)
        {

            Orders.BussinessLogicLayer.Accounts accountsObj = new BussinessLogicLayer.Accounts();
            context.Response.Write(accountsObj.CreateAccountProducts(MyConf.MyConnectionString, Convert.ToByte(context.Request["productId"]), Convert.ToString(context.Request["accountInformationUrl"]), Convert.ToString(context.Request["mobileNumber"]), Convert.ToString(context.Request["userName"])));

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
        public void GetAccountOwnersAndPlans(HttpContext context)
        {
            byte isProductId = 0;
            if (context.Request["ProductId"] == null || !byte.TryParse(context.Request["ProductId"].ToString(), out isProductId))
                GenerateErrorResponse(400, string.Format("ProductId must be a boolean value"));

            Orders.BussinessLogicLayer.Accounts accountsObj = new BussinessLogicLayer.Accounts();
            TablePreferences statesTablePreferences = new TablePreferences("", "", true, false);
            Dictionary<string, TablePreferences> statesDictionary = new Dictionary<string, TablePreferences>();
            statesDictionary.Add(Label.STATES, statesTablePreferences);
            context.Response.Write(accountsObj.GetAccountOwnersAndPlans(MyConf.MyConnectionString, isProductId));

        }

        public void UpdateAccountOwnerDetails(HttpContext context)
        {
            //IDictionary<string, string> AccountDetailsList = new Dictionary<string, string>();
            //IDictionary<string, string> AccountPropertiesList = new Dictionary<string, string>();
            JObject AccountDetails = JObject.Parse(context.Request["payload"]);
            int quotationId = Convert.ToInt32(AccountDetails.SelectToken("QuotationId").ToString());
            //OU.AccountDetails Account = new OU.AccountDetails();

            
            //PropertyInfo[] properties = typeof(AccountDetails).GetProperties();
            //foreach (PropertyInfo property in properties)
            //{

            //    var pNAme = property.Name;
            //    property.SetValue(Account, Convert.ToString(AccountDetails.SelectToken(pNAme)) , null);
            //}
            OU.AccountProducts accountProductProperties = new OU.AccountProducts();
            accountProductProperties.ProductAccountId = Convert.ToInt32( Convert.ToString(AccountDetails.SelectToken("AccountProductId")));

            accountProductProperties.ProductAccountName = AccountDetails.SelectToken("ContactName").ToString();
            accountProductProperties.MobileNo = Convert.ToString(AccountDetails.SelectToken("Mobile"));
            accountProductProperties.Email = Convert.ToString( AccountDetails.SelectToken("BusinessMailID"));
            accountProductProperties.Address = Convert.ToString(AccountDetails.SelectToken("txtContactAddress"));
            accountProductProperties.Gstin = Convert.ToString(AccountDetails.SelectToken("GSTIN"));
            accountProductProperties.Company = Convert.ToString(AccountDetails.SelectToken("CompanyName"));
            accountProductProperties.StateId = Convert.ToInt32(Convert.ToString(AccountDetails.SelectToken("States")));
            accountProductProperties.Country = AccountDetails.SelectToken("Country").ToString();
            
            accountProductProperties.ProductId = Convert.ToByte(Convert.ToString(AccountDetails.SelectToken("ProductId")));
            accountProductProperties.OwnerShipId = Convert.ToInt32(Convert.ToString(AccountDetails.SelectToken("AccountOwner")));
            Orders.BussinessLogicLayer.Accounts accountsObj = new BussinessLogicLayer.Accounts();
            context.Response.Write(accountsObj.UpdateAccountOwnerDetails(MyConf.MyConnectionString, accountProductProperties,quotationId));

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