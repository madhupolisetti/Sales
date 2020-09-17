using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace Orders.AjaxHandlers
{
    /// <summary>
    /// Summary description for ApiServices
    /// </summary>
    public class ApiServices : IHttpHandler
    {
        private JObject errorJSon = new JObject(new JProperty("Success", false), new JProperty("Message", ""));
        public void ProcessRequest(HttpContext context)
        {
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
                    case "GetOrderDetails":
                        GetOrderDetails(context);
                        break;
                }

            }
            catch (System.Threading.ThreadAbortException e)
            { }
            catch (OrdersManagement.Exceptions.QuotationException e)
            {
                GenerateErrorResponse(500, e.Message);
            }
            catch (Exception e)
            {
                GenerateErrorResponse(500, e.Message);
            }
        }
        private void GetOrderDetails(HttpContext context)
        {
            int userId = 0;
            int productId = 0;
            DateTime fromDateTime = DateTime.Now.Date;
            DateTime toDateTime = DateTime.Now.Date;
            if (context.Request["UserId"] != null && !int.TryParse(context.Request["UserId"].ToString(), out userId))
            {
                GenerateErrorResponse(400, string.Format("UserId must be a number"));
            }
            if (context.Request["ProductId"] != null && !int.TryParse(context.Request["ProductId"].ToString(), out productId))
            {
                GenerateErrorResponse(400, string.Format("ProductId must be a number"));
            }
            if (context.Request["FromDateTime"] != null && !DateTime.TryParse(context.Request["FromDateTime"].ToString(), out fromDateTime))
            {
                GenerateErrorResponse(400, string.Format("FromDateTime must contain value"));
            }
            if (context.Request["ToDateTime"] != null && !DateTime.TryParse(context.Request["ToDateTime"].ToString(), out toDateTime))
            {
                GenerateErrorResponse(400, string.Format("ToDateTime must contain value"));
            }


            OrdersManagement.Core.Client client = new OrdersManagement.Core.Client(responseFormat: OrdersManagement.ResponseFormat.JSON);
            context.Response.Write(client.GetOrderDetails(userid: userId, productid: productId, fromDateTime: fromDateTime, toDateTime: toDateTime, tablePreferences: null));
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