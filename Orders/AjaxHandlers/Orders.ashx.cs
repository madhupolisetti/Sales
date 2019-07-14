using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using OrdersManagement;
using OrdersManagement.Core;
using OrdersManagement.Model;
using Newtonsoft.Json.Linq;
using Orders.BussinessLogicLayer;
using System.Web.SessionState;

namespace Orders.AjaxHandlers
{
    /// <summary>
    /// Summary description for Orders
    /// </summary>
    public class Order : IHttpHandler, IRequiresSessionState
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
                    case "GetOrderStatuses":
                        GetOrderStatuses(context);
                        break;
                    case "Search":
                        Search(context);
                        break;
                    case "GetOrderSummary":
                        GetOrderSummary(context);
                        break;
                    case "Activate":
                        Activate(context);
                        break;
                    case "VerifyOrderStatuses":
                        VerifyOrderStatuses(context);
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

        private void GetOrderStatuses(HttpContext context)
        {
            bool onlyActive = true;
            if (context.Request["OnlyActive"] != null && !bool.TryParse(context.Request["OnlyActive"].ToString(), out onlyActive))
                GenerateErrorResponse(400, string.Format("OnlyActive value ({0}) is not a valid boolean value", context.Request["OnlyActive"].ToString()));
            OrdersManagement.Core.Client client = new OrdersManagement.Core.Client(responseFormat: OrdersManagement.ResponseFormat.JSON);
            context.Response.Write(client.GetOrderStatuses(onlyActive));
        }
        private void Search(HttpContext context)
        {
            byte productId = 0;
            int accountId = 0;
            string accountName = string.Empty;
            string mobile = string.Empty;
            string email = string.Empty;
            string number = string.Empty;
            byte orderStatus = 0;
            byte billingMode = 1;
            DateTime fromDateTime = DateTime.Now.Date;
            DateTime toDateTime = DateTime.Now.AddDays(1).AddTicks(-1);
            int pageNumber = 1;
            byte limit = 20;


            JObject searchData = new JObject();
            searchData = JObject.Parse(context.Request["SearchData"]);
            if (searchData.SelectToken("ProductId") != null && !byte.TryParse(searchData.SelectToken("ProductId").ToString(), out productId))
                GenerateErrorResponse(400, string.Format("ProductId must be a number"));
            if (searchData.SelectToken("Number") != null)
                number = searchData.SelectToken("Number").ToString();
            if (searchData.SelectToken("AccountId") != null && !int.TryParse(searchData.SelectToken("AccountId").ToString(), out accountId))
                GenerateErrorResponse(400, string.Format("AccountId must be a number"));
            if (searchData.SelectToken("Mobile") != null)
                mobile = searchData.SelectToken("Mobile").ToString();
            if (searchData.SelectToken("AccountName") != null)
                accountName = searchData.SelectToken("AccountName").ToString();
            if (searchData.SelectToken("Email") != null)
                email = searchData.SelectToken("Email").ToString();
            if (searchData.SelectToken("OrderStatus") != null && !byte.TryParse(searchData.SelectToken("OrderStatus").ToString(), out orderStatus))
                GenerateErrorResponse(400, string.Format("OrderStatus must be a number"));
            if (searchData.SelectToken("BillingMode") != null && !byte.TryParse(searchData.SelectToken("BillingMode").ToString(), out billingMode))
                GenerateErrorResponse(400, string.Format("BillingMode must be a number"));
            if (searchData.SelectToken("FromDateTime") != null && !DateTime.TryParse(searchData.SelectToken("FromDateTime").ToString(), out fromDateTime))
                GenerateErrorResponse(400, string.Format("FromDateTime is not a valid datetime"));
            if (searchData.SelectToken("ToDateTime") != null && !DateTime.TryParse(searchData.SelectToken("ToDateTime").ToString(), out toDateTime))
                GenerateErrorResponse(400, string.Format("ToDateTime is not a valid datetime"));
            if (searchData.SelectToken("PageNumber") != null && !int.TryParse(searchData.SelectToken("PageNumber").ToString(), out pageNumber))
                GenerateErrorResponse(400, string.Format("PageNumber must be a number"));
            if (searchData.SelectToken("Limit") != null && !byte.TryParse(searchData.SelectToken("Limit").ToString(), out limit))
                GenerateErrorResponse(400, string.Format("Limit must be a number"));
            TablePreferences ordersTablePreferences = new TablePreferences("", "", true, false);
            Dictionary<string, TablePreferences> ordersDictionary = new Dictionary<string, TablePreferences>();
            ordersDictionary.Add("Orders", ordersTablePreferences);

            OrdersManagement.Core.Client client = new OrdersManagement.Core.Client(responseFormat: OrdersManagement.ResponseFormat.JSON);
            context.Response.Write(client.GetOrders(productId: productId, accountId: accountId, mobile: mobile, email: email, orderStatus: orderStatus,
                number: number, billingMode: billingMode, fromDateTime: fromDateTime, toDateTime: toDateTime,
                accountName: accountName, pageNumber: pageNumber, limit: limit, tablePreferences: ordersDictionary));
        }
        private void GetOrderSummary(HttpContext context)
        {
            int quotationId = 0;
            if (context.Request["QuotationId"] != null && !int.TryParse(context.Request["QuotationId"].ToString(), out quotationId))
                GenerateErrorResponse(400, string.Format("OnlyActive value ({0}) is not a valid boolean value", context.Request["OnlyActive"].ToString()));
            Client client = new Client(responseFormat: ResponseFormat.JSON);
            context.Response.Write(client.GetOrderSummary(quotationId));
        }

        private void Activate(HttpContext context)
        {
            string activationUrl = string.Empty;
            string metaData = string.Empty;
            int quotationId = 0;
            string searchData = string.Empty;
            byte billingModeId = 0;
            bool isPostPaid = false;
            byte activatedPercentage = 0;
            float activationAmount = 0;

            if (string.IsNullOrEmpty(context.Request["ActivationUrl"]))
                GenerateErrorResponse(400, string.Format("ActivationUrl is Mandatory"));
            else
                activationUrl = context.Request["ActivationUrl"].ToString();
            //if (string.IsNullOrEmpty(context.Request["SearchData"]))
            //    GenerateErrorResponse(400, string.Format("SearchData is Mandatory"));
            //else
            //    searchData = context.Request["SearchData"].ToString();
            if (string.IsNullOrEmpty(context.Request["QuotationId"]))
                GenerateErrorResponse(400, string.Format("QuotationId is Mandatory"));
            else
                quotationId = Convert.ToInt32(context.Request["QuotationId"].ToString());

            //if (string.IsNullOrEmpty(context.Request["MetaData"]))
            //    GenerateErrorResponse(400, string.Format("MetaData is Mandatory"));
            //else
            //    metaData = context.Request["MetaData"].ToString();

            //if (string.IsNullOrEmpty(context.Request["BillingMode"]))
            //    GenerateErrorResponse(400, string.Format("BillingMode is Mandatory"));
            //else
            //    billingModeId = Convert.ToByte(context.Request["BillingMode"].ToString());

            if (string.IsNullOrEmpty(context.Request["IsPostPaid"]))
                GenerateErrorResponse(400, string.Format("IsPostPaid is Mandatory"));
            else
                isPostPaid = Convert.ToBoolean(context.Request["IsPostPaid"].ToString());
            //if (string.IsNullOrEmpty(context.Request["ActivatedPercentage"]))
            //    GenerateErrorResponse(400, string.Format("ActivatedPercentage is Mandatory"));
            //else
            //    activatedPercentage = Convert.ToByte(context.Request["ActivatedPercentage"].ToString());

            if (string.IsNullOrEmpty(context.Request["ActivationAmount"]))
                GenerateErrorResponse(400, string.Format("ActivationAmount is Mandatory"));
            else
               activationAmount= float.Parse(context.Request["ActivationAmount"].ToString(),System.Globalization.CultureInfo.InvariantCulture);
                

            OrdersManagement.Core.Client client = new OrdersManagement.Core.Client(responseFormat: OrdersManagement.ResponseFormat.JSON);

            context.Response.Write(client.ActivateOrder(quotationId: quotationId, isPostPaidQuotation: isPostPaid, activationAmount: activationAmount, activationUrl: activationUrl, employeeId: Convert.ToInt32(HttpContext.Current.Session["AdminId"]), tablePreferences: null));
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

        private void VerifyOrderStatuses(HttpContext context)
        {
            long orderId = 0; float activationAmount = 0; bool isActivated=true;

            if (context.Request["OrderId"] != null && !Int64.TryParse(context.Request["OrderId"].ToString(), out orderId))
                GenerateErrorResponse(400, "OrderId value must be a number");
            if (context.Request["IsActivated"] != null && !bool.TryParse(context.Request["IsActivated"].ToString(), out isActivated))
                GenerateErrorResponse(400, "IsActivated value must be a Boolean");
            if (string.IsNullOrEmpty(context.Request["ActivationAmount"]))
                GenerateErrorResponse(400, string.Format("ActivationAmount is Mandatory"));
            else
                activationAmount = float.Parse(context.Request["ActivationAmount"].ToString(), System.Globalization.CultureInfo.InvariantCulture);
            OrdersManagement.Core.Client client = new OrdersManagement.Core.Client(responseFormat: OrdersManagement.ResponseFormat.JSON);
            context.Response.Write(client.VerifyOrderStatuses(orderId,activationAmount,isActivated, null));
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