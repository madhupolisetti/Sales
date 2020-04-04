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
    /// Summary description for OnlinePayment
    /// </summary>
    public class OnlinePayment : IHttpHandler
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
                    case "OrdersInitiation":
                        InitiateInOrders(context);
                        break;
                    case "RazorpayVerification":
                        VerifySignature(context);
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

        private void InitiateInOrders(HttpContext context)
        {
            OrdersManagement.Core.Client OMClient = new OrdersManagement.Core.Client(responseFormat: OrdersManagement.ResponseFormat.JSON);
            context.Response.Write(OMClient.InitiateRazorpayInOrders(Convert.ToInt32(context.Request["ProductId"]), Convert.ToInt32(context.Request["UserId"]), context.Request["Name"], context.Request["Mobile"], context.Request["EmailId"], float.Parse(context.Request["RawAmount"]), float.Parse(context.Request["Tax"]), context.Request["OrderId"]));
        }

        private void VerifySignature(HttpContext context)
        {            
            string message = context.Request["OrderId"] + "|" + context.Request["PaymentId"];
            string keyId = System.Configuration.ConfigurationManager.AppSettings["RazorpayKeyId"];
            string keySecret = System.Configuration.ConfigurationManager.AppSettings["RazorpayKeySecret"];
            int status = 1; // 1 is initiated, 2 is verified, 3 is failure

            byte[] MsgInBytes = Encoding.ASCII.GetBytes(message);
            byte[] secretInBytes = Encoding.ASCII.GetBytes(keySecret);

            var HMAC = new HMACSHA256(secretInBytes);
            byte[] msgByteArray = HMAC.ComputeHash(MsgInBytes);

            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < msgByteArray.Length; i++)
            {
                builder.Append(msgByteArray[i].ToString("x2"));
            }
            if (context.Request["Signature"] == builder.ToString())
                status = 2;
            else
                status = 3;
            OrdersManagement.Core.Client OMClient = new OrdersManagement.Core.Client(responseFormat: OrdersManagement.ResponseFormat.JSON);
            context.Response.Write(OMClient.UpdateRazorpayResponse(Convert.ToInt32(context.Request["Id"]), context.Request["OrderId"], context.Request["PaymentId"], context.Request["Signature"], status));
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