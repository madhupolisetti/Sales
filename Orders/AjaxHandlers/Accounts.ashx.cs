using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json.Linq;
using Orders.CommonClasses;
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
                }

            }
            catch (Exception ex) { }
        }

        public void GetAccountDetails(HttpContext context)
        {
            
            Orders.BussinessLogicLayer.Accounts accountsObj = new BussinessLogicLayer.Accounts();
            context.Response.Write(accountsObj.CreateAccountProducts(MyConf.MyConnectionString, Convert.ToByte(context.Request["productId"]), Convert.ToString(context.Request["mobileNumber"])));

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