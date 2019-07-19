﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Orders;
using System.Web.Script.Serialization;
using Newtonsoft.Json.Linq;
using OrdersManagement.Model;
using System.Web.SessionState;


namespace Orders.AjaxHandlers
{
    /// <summary>
    /// Summary description for Quotations
    /// </summary>
    public class Quotations : IHttpHandler, IRequiresSessionState
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
                    case "GetQuotationStatuses":
                        GetQuotationStatuses(context);
                        break;
                    case "GetQuotationChannels":
                        GetQuotationChannels(context);
                        break;
                    case "Search":
                        Search(context);
                        break;
                    case "GetQuotationDetails":
                        GetQuotationDetails(context);
                        break;
                    case "Create":
                        Create(context);
                        break;
                    case "Update":
                        Update(context);
                        break;
                    case "Delete":
                        Delete(context);
                        break;
                    case "View":
                        View(context);
                        break;
                    case "Download":
                        Download(context);
                        break;
                    case "GetQuotationServices":
                        GetQuotationServices(context);
                        break;
                    case "GetQuotationServiceProperties":
                        GetQuotationServiceProperties(context);
                        break;
                    case "downloadQuotations":
                        downloadQuotations(context);
                        break;
                    default:
                        GenerateErrorResponse(400, string.Format("Invalid Action ({0})", context.Request["Action"].ToString()));
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

        private void downloadQuotations(HttpContext context)
        {
            byte productId = 0;
            int quotationId = 0;
            string quotationNumber = string.Empty;
            string accountName = string.Empty;
            string mobile = string.Empty;
            string email = string.Empty;
            int accountId = 0;
            int employeeId = Convert.ToInt32(context.Session["AdminId"]);
            int ownerShipId = 0;
            byte statusId = 0;
            sbyte channelId = 0;
            string ipAddress = string.Empty;
            byte billingModeId = 1;
            DateTime fromDateTime = DateTime.Now.Date;
            DateTime toDateTime = DateTime.Now.AddDays(1).AddTicks(-1);
            int pageNumber = 1;
            byte limit = 20;
            if (context.Request["ProductId"] != null && !byte.TryParse(context.Request["productId"].ToString(), out productId))
                GenerateErrorResponse(400, string.Format("ProductId must be a number"));
            if (context.Request["QuotationNumber"] != null)
                quotationNumber = context.Request["QuotationNumber"].ToString();
            if (context.Request["AccountName"] != null)
                accountName = context.Request["AccountName"].ToString();
            if (context.Request["StatusId"] != null && !byte.TryParse(context.Request["StatusId"].ToString(), out statusId))
                GenerateErrorResponse(400, string.Format("StatusId must be a number"));
            if (context.Request["BillingModeId"] != null && !byte.TryParse(context.Request["BillingModeId"].ToString(), out billingModeId))
                GenerateErrorResponse(400, string.Format("BillingModeId must be a number"));
            if(context.Request["mobile"] != null)
                mobile = Convert.ToString(context.Request["mobile"]);
            if (context.Request["email"] != null)
                email = Convert.ToString(context.Request["email"]);
            if (context.Request["FromDateTime"] != null)                
                fromDateTime = Convert.ToDateTime(context.Request["fromDateTime"]);
            if (context.Request["ToDateTime"] != null)
                toDateTime = Convert.ToDateTime(context.Request["ToDateTime"]);

            TablePreferences quotationTablePreferences = new TablePreferences("", "", true, false);
            Dictionary<string, TablePreferences> quotationsDictionary = new Dictionary<string, TablePreferences>();
            quotationsDictionary.Add("Quotations", quotationTablePreferences);
            OrdersManagement.Core.Client client = new OrdersManagement.Core.Client(responseFormat: OrdersManagement.ResponseFormat.JSON);
            context.Response.Write(client.GetQuotations(productId: productId, quotationId: quotationId, quotationNumber: quotationNumber, accountId: accountId,
                employeeId: employeeId, ownerShipId: ownerShipId, statusId: statusId, channelId: channelId, ipAddress: ipAddress,
                billingModeId: billingModeId, fromDateTime: fromDateTime, toDateTime: toDateTime, pageNumber: pageNumber, limit: limit,
                mobile: mobile, email: email, accountName: accountName, tablePreferences: quotationsDictionary, isdownload: true));
        
        }
        private void GetQuotationStatuses(HttpContext context)
        {
            bool onlyActive = true;
            if (context.Request["OnlyActive"] != null && !bool.TryParse(context.Request["OnlyActive"].ToString(), out onlyActive))
                GenerateErrorResponse(400, string.Format("OnlyActive value ({0}) is not a valid boolean value", context.Request["OnlyActive"].ToString()));
            OrdersManagement.Core.Client client = new OrdersManagement.Core.Client(responseFormat: OrdersManagement.ResponseFormat.JSON);
            context.Response.Write(client.GetQuotationStatuses(onlyActive));
        }
        private void GetQuotationChannels(HttpContext context)
        {
            bool onlyActive = true;
            if (context.Request["OnlyActive"] != null && !bool.TryParse(context.Request["OnlyActive"].ToString(), out onlyActive))
                GenerateErrorResponse(400, string.Format("OnlyActive value ({0}) is not a valid boolean value", context.Request["OnlyActive"].ToString()));
            OrdersManagement.Core.Client client = new OrdersManagement.Core.Client(responseFormat: OrdersManagement.ResponseFormat.JSON);
            context.Response.Write(client.GetQuotationChannels(onlyActive));
        }
        private void Search(HttpContext context)
        {
            byte productId = 0;
            int quotationId = 0;
            string quotationNumber = string.Empty;
            string accountName = string.Empty;
            string mobile = string.Empty;
            string email = string.Empty;
            int accountId = 0;
            int employeeId = Convert.ToInt32(context.Session["AdminId"]);
            int ownerShipId = 0;
            byte statusId = 0;
            sbyte channelId = 0;
            string ipAddress = string.Empty;
            byte billingModeId = 1;
            DateTime fromDateTime = DateTime.Now.Date;
            DateTime toDateTime = DateTime.Now.AddDays(1).AddTicks(-1);
            int pageNumber = 1;
            byte limit = 20;
            JObject searchData = new JObject();
            searchData = JObject.Parse(context.Request["SearchData"]);

            if (searchData.SelectToken("ProductId") != null && !byte.TryParse(searchData.SelectToken("ProductId").ToString(), out productId))
                GenerateErrorResponse(400, string.Format("ProductId must be a number"));
            if (searchData.SelectToken("QuotationId") != null && !int.TryParse(searchData.SelectToken("QuotationId").ToString(), out quotationId))
                GenerateErrorResponse(400, string.Format("QuotationId must be a number"));
            if (searchData.SelectToken("QuotationNumber") != null)
                quotationNumber = searchData.SelectToken("QuotationNumber").ToString();
            if (searchData.SelectToken("AccountName") != null)
                accountName = searchData.SelectToken("AccountName").ToString();
            if (searchData.SelectToken("AccountId") != null && !int.TryParse(searchData.SelectToken("AccountId").ToString(), out accountId))
                GenerateErrorResponse(400, string.Format("AccountId must be a number"));
            if (searchData.SelectToken("EmployeeId") != null && !int.TryParse(searchData.SelectToken("EmployeeId").ToString(), out employeeId))
                GenerateErrorResponse(400, string.Format("EmployeeId must be a number"));
            if (searchData.SelectToken("OwnerShipId") != null && !int.TryParse(searchData.SelectToken("OwnerShipId").ToString(), out ownerShipId))
                GenerateErrorResponse(400, string.Format("OwnerShipId must be a number"));
            if (searchData.SelectToken("StatusId") != null && !byte.TryParse(searchData.SelectToken("StatusId").ToString(), out statusId))
                GenerateErrorResponse(400, string.Format("StatusId must be a number"));
            if (searchData.SelectToken("ChannelId") != null && !sbyte.TryParse(searchData.SelectToken("ChannelId").ToString(), out channelId))
                GenerateErrorResponse(400, string.Format("ChannelId must be a number"));
            if (searchData.SelectToken("BillingModeId") != null && !byte.TryParse(searchData.SelectToken("BillingModeId").ToString(), out billingModeId))
                GenerateErrorResponse(400, string.Format("BillingModeId must be a number"));
            if (searchData.SelectToken("FromDateTime") != null && !DateTime.TryParse(searchData.SelectToken("FromDateTime").ToString(), out fromDateTime))
                GenerateErrorResponse(400, string.Format("FromDateTime is not a valid datetime"));
            if (searchData.SelectToken("ToDateTime") != null && !DateTime.TryParse(searchData.SelectToken("ToDateTime").ToString(), out toDateTime))
                GenerateErrorResponse(400, string.Format("ToDateTime is not a valid datetime"));
            if (searchData.SelectToken("PageNumber") != null && !int.TryParse(searchData.SelectToken("PageNumber").ToString(), out pageNumber))
                GenerateErrorResponse(400, string.Format("PageNumber must be a number"));
            if (searchData.SelectToken("Limit") != null && !byte.TryParse(searchData.SelectToken("Limit").ToString(), out limit))
                GenerateErrorResponse(400, string.Format("Limit must be a number"));
            if (searchData.SelectToken("Mobile") != null)
                mobile = searchData.SelectToken("Mobile").ToString();
            if (searchData.SelectToken("Email") != null)
                email = searchData.SelectToken("Email").ToString();
            TablePreferences quotationTablePreferences = new TablePreferences("", "", true, false);
            Dictionary<string, TablePreferences> quotationsDictionary = new Dictionary<string, TablePreferences>();
            quotationsDictionary.Add("Quotations", quotationTablePreferences);
            OrdersManagement.Core.Client client = new OrdersManagement.Core.Client(responseFormat: OrdersManagement.ResponseFormat.JSON);
            context.Response.Write(client.GetQuotations(productId: productId, quotationId: quotationId, quotationNumber: quotationNumber, accountId: accountId,
                employeeId: employeeId, ownerShipId: ownerShipId, statusId: statusId, channelId: channelId, ipAddress: ipAddress,
                billingModeId: billingModeId, fromDateTime: fromDateTime, toDateTime: toDateTime, pageNumber: pageNumber, limit: limit,
                mobile: mobile, email: email, accountName: accountName, tablePreferences: quotationsDictionary, isdownload: false));
        }
        private void GetQuotationDetails(HttpContext context)
        {
            int quotationId = 0;
            bool isPostPaidQuotation = false;
            if (context.Request["QuotationId"] != null && !int.TryParse(context.Request["QuotationId"].ToString(), out quotationId))
                GenerateErrorResponse(400, string.Format("OnlyActive value ({0}) is not a valid boolean value", context.Request["OnlyActive"].ToString()));
            if (quotationId <= 0)
                GenerateErrorResponse(400, string.Format("QuoationId must be greater than 0"));
            if (context.Request["IsPostPaidQuotation"] != null && !bool.TryParse(context.Request["IsPostPaidQuotation"].ToString(), out isPostPaidQuotation))
                GenerateErrorResponse(400, string.Format("IsPostPaidQuotation must be a boolean value"));
            OrdersManagement.Core.Client client = new OrdersManagement.Core.Client(responseFormat: OrdersManagement.ResponseFormat.JSON);
            context.Response.Write(client.GetQuotationDetails(quotationId, isPostPaidQuotation));
        }
        private void Create(HttpContext context)
        {
            int accountId = 0;
            byte channelId = 0;
            byte stateId = 0;
            int employeeId = Convert.ToInt32(context.Session["AdminId"]);
            byte productId = 0;
            if (context.Request["ProductId"] == null || !byte.TryParse(context.Request["ProductId"].ToString(), out productId))
                GenerateErrorResponse(400, string.Format("ProductId must be a number"));
            if (context.Request["AccountId"] == null || !int.TryParse(context.Request["AccountId"].ToString(), out accountId))
                GenerateErrorResponse(400, string.Format("AccountId must be a number"));
            if (accountId <= 0)
                GenerateErrorResponse(400, string.Format("AccountId must be greater than 0"));
            if (context.Request["ChannelId"] == null || !byte.TryParse(context.Request["ChannelId"].ToString(), out channelId))
                GenerateErrorResponse(400, string.Format("ChannelId must be a number"));
            if (channelId <= 0)
                GenerateErrorResponse(400, string.Format("ChannelId must be greater than 0"));
            if (context.Request["MetaData"] == null || context.Request["MetaData"].ToString().Replace(" ", "").Length == 0)
                GenerateErrorResponse(400, string.Format("MetaData is mandatory"));
            if (context.Request["StateId"] == null || !byte.TryParse(context.Request["StateId"].ToString(), out stateId))
                GenerateErrorResponse(400, string.Format("StateId must ne a number"));
            if (stateId <= 0)
                GenerateErrorResponse(400, "StateId must be greater than 0");
            if (channelId == 1)
            {
                if (context.Request["EmployeeId"] == null && context.Session["EmployeeId"] == null)
                    GenerateErrorResponse(403, string.Format("EmployeeId is mandatory"));
                if (context.Request["EmployeeId"] != null && !int.TryParse(context.Request["EmployeeId"].ToString(), out employeeId))
                    GenerateErrorResponse(400, string.Format("EmployeeId must be a number"));
                //else if (!int.TryParse(context.Session["EmployeeId"].ToString(), out employeeId))
                // GenerateErrorResponse(400, string.Format("EmployeeId must be a number."));
            }
            var metadata = new JavaScriptSerializer().DeserializeObject(context.Request["MetaData"]);
            OrdersManagement.Core.Client client = new OrdersManagement.Core.Client(responseFormat: OrdersManagement.ResponseFormat.JSON);
            context.Response.Write(client.CreateQuotation(productId, accountId: accountId,
                employeeId: employeeId,
                channelId: channelId,
                metaData: metadata.ToString(),
                ipAddress: context.Request["IpAddress"] != null ? context.Request["IpAddress"].ToString() : context.Request.ServerVariables["REMOTE_ADDR"].ToString(), stateId: stateId, quotationType: Convert.ToInt32(context.Request["quotationType"].ToString())));
        }
        private void Update(HttpContext context)
        {
            int quotationId = 0;
            byte stateId = 0;
            byte channelId = 0;
            int employeeId = Convert.ToInt32(context.Session["AdminId"]);

            if (context.Request["QuotationId"] != null && !int.TryParse(context.Request["QuotationId"].ToString(), out quotationId))
                GenerateErrorResponse(400, string.Format("QuotationId must be a number"));
            if (quotationId <= 0)
                GenerateErrorResponse(400, string.Format("QuotationId must be greater than 0"));
            if (context.Request["StateId"] != null && !byte.TryParse(context.Request["StateId"].ToString(), out stateId))
                GenerateErrorResponse(400, string.Format("StateId must ne a number"));
            if (stateId <= 0)
                GenerateErrorResponse(400, "StateId must be greater than 0");
            if (context.Request["ChannelId"] != null && !byte.TryParse(context.Request["ChannelId"].ToString(), out channelId))
                GenerateErrorResponse(400, string.Format("ChannelId must be a number"));
            if (channelId <= 0)
                GenerateErrorResponse(400, string.Format("ChannelId must be greater than 0"));
            if (context.Request["MetaData"] == null || context.Request["MetaData"].ToString().Replace(" ", "").Length == 0)
                GenerateErrorResponse(400, string.Format("MetaData is mandatory"));
            if (channelId == 1)
            {
                if (context.Request["EmployeeId"] == null && context.Session["EmployeeId"] == null)
                    GenerateErrorResponse(403, string.Format("EmployeeId is mandatory"));
                if (context.Request["EmployeeId"] != null && !int.TryParse(context.Request["EmployeeId"].ToString(), out employeeId))
                    GenerateErrorResponse(400, string.Format("EmployeeId must be a number"));
                //else if (!int.TryParse(context.Session["EmployeeId"].ToString(), out employeeId))
                //    GenerateErrorResponse(400, string.Format("EmployeeId must be a number."));
            }
            var metadata = new JavaScriptSerializer().DeserializeObject(context.Request["MetaData"]);
            OrdersManagement.Core.Client client = new OrdersManagement.Core.Client(responseFormat: OrdersManagement.ResponseFormat.JSON);
            context.Response.Write(client.UpdateQuotation(quotationId: quotationId, employeeId: employeeId, metaData: metadata.ToString(), ipAddress: context.Request["IpAddress"] != null ? context.Request["IpAddress"].ToString() : context.Request.ServerVariables["REMOTE_ADDR"].ToString(), stateId: stateId));
        }
        private void Delete(HttpContext context)
        {
            int quotationId = 0;
            bool isPostPaidQuotation = false;
            if (context.Request["QuotationId"] != null && !int.TryParse(context.Request["QuotationId"].ToString(), out quotationId))
                GenerateErrorResponse(400, string.Format("QuotationId Must be a number"));
            if (quotationId <= 0)
                GenerateErrorResponse(400, string.Format("QuoationId must be greater than 0"));
            if (context.Request["IsPostPaidQuotation"] != null && !bool.TryParse(context.Request["IsPostPaidQuotation"].ToString(), out isPostPaidQuotation))
                GenerateErrorResponse(400, string.Format("IsPostPaidQuotation must be a boolean value"));
            OrdersManagement.Core.Client client = new OrdersManagement.Core.Client(responseFormat: OrdersManagement.ResponseFormat.JSON);
            context.Response.Write(client.DeleteQuotation(quotationId: quotationId, isPostPaidQuotation: isPostPaidQuotation));
        }
        private void View(HttpContext context)
        {
            int quotationId = 0;
            bool isPostPaidQuotation = false;
            if (context.Request["QuotationId"] != null && !int.TryParse(context.Request["QuotationId"].ToString(), out quotationId))
                GenerateErrorResponse(400, string.Format("QuotationId ({0}) is not a valid integer value", context.Request["QuotationId"].ToString()));
            if (quotationId <= 0)
                GenerateErrorResponse(400, string.Format("QuoationId must be greater than 0"));
            if (context.Request["IsPostPaidQuotation"] != null && !bool.TryParse(context.Request["IsPostPaidQuotation"].ToString(), out isPostPaidQuotation))
                GenerateErrorResponse(400, string.Format("IsPostPaidQuotation must be a boolean value"));
            OrdersManagement.Core.Client client = new OrdersManagement.Core.Client(responseFormat: OrdersManagement.ResponseFormat.JSON);
            context.Response.Write(client.ViewQuotation(quotationId, isPostPaidQuotation));
        }
        private void Download(HttpContext context)
        {
            int quotationId = 0;
            bool isPostPaidQuotation = false;
            if (context.Request["QuotationId"] != null && !int.TryParse(context.Request["QuotationId"].ToString(), out quotationId))
                GenerateErrorResponse(400, string.Format("OnlyActive value ({0}) is not a valid boolean value", context.Request["OnlyActive"].ToString()));
            if (quotationId <= 0)
                GenerateErrorResponse(400, string.Format("QuoationId must be greater than 0"));
            if (context.Request["IsPostPaidQuotation"] != null && !bool.TryParse(context.Request["IsPostPaidQuotation"].ToString(), out isPostPaidQuotation))
                GenerateErrorResponse(400, string.Format("IsPostPaidQuotation must be a boolean value"));
            OrdersManagement.Core.Client client = new OrdersManagement.Core.Client(responseFormat: OrdersManagement.ResponseFormat.JSON);
            context.Response.Write(client.DownloadQuotation(quotationId, isPostPaidQuotation));
        }

        private void GetQuotationServices(HttpContext context)
        {
            bool onlyActive = true;
            int quotationId = 0;
            byte billingModeId = 1;
            if (context.Request["OnlyActive"] != null && !bool.TryParse(context.Request["OnlyActive"].ToString(), out onlyActive))
                GenerateErrorResponse(400, string.Format("OnlyActive value ({0}) is not a valid boolean value", context.Request["OnlyActive"].ToString()));
            if (context.Request["QuotationId"] != null && !int.TryParse(context.Request["QuotationId"].ToString(), out quotationId))
                GenerateErrorResponse(400, string.Format("QuotationId value ({0}) is not a valid integer value", context.Request["QuotationId"].ToString()));
            if (context.Request["BillingModeId"] != null && !byte.TryParse(context.Request["BillingModeId"].ToString(), out billingModeId))
                GenerateErrorResponse(400, string.Format("QuotationId value ({0}) is not a valid integer value", context.Request["BillingModeId"].ToString()));
            TablePreferences quotationServicesTablePreferences = new TablePreferences("", "", true, false);
            Dictionary<string, TablePreferences> quotationServicesDictionary = new Dictionary<string, TablePreferences>();
            quotationServicesDictionary.Add("QuotationServices", quotationServicesTablePreferences);
            OrdersManagement.Core.Client client = new OrdersManagement.Core.Client(responseFormat: OrdersManagement.ResponseFormat.JSON);
            context.Response.Write(client.GetQuotationServices(quotationId: quotationId, billingModeId: billingModeId, onlyActive: onlyActive, tablePreferences: quotationServicesDictionary));
        }
        private void GetQuotationServiceProperties(HttpContext context)
        {
            bool onlyActive = true;
            int quotationId = 0;
            byte billingModeId = 1;
            if (context.Request["OnlyActive"] != null && !bool.TryParse(context.Request["OnlyActive"].ToString(), out onlyActive))
                GenerateErrorResponse(400, string.Format("OnlyActive value ({0}) is not a valid boolean value", context.Request["OnlyActive"].ToString()));
            if (context.Request["QuotationId"] != null && !int.TryParse(context.Request["QuotationId"].ToString(), out quotationId))
                GenerateErrorResponse(400, string.Format("QuotationId value ({0}) is not a valid integer value", context.Request["QuotationId"].ToString()));
            if (context.Request["BillingModeId"] != null && !byte.TryParse(context.Request["BillingModeId"].ToString(), out billingModeId))
                GenerateErrorResponse(400, string.Format("QuotationId value ({0}) is not a valid integer value", context.Request["BillingModeId"].ToString()));
            TablePreferences quotationServicePropertiesTablePreferences = new TablePreferences("", "", true, false);
            Dictionary<string, TablePreferences> quotationServicePropertiesDictionary = new Dictionary<string, TablePreferences>();
            quotationServicePropertiesDictionary.Add("QuotationServiceProperties", quotationServicePropertiesTablePreferences);
            OrdersManagement.Core.Client client = new OrdersManagement.Core.Client(responseFormat: OrdersManagement.ResponseFormat.JSON);
            context.Response.Write(client.GetQuotationServiceProperties(quotationId: quotationId, billingModeId: billingModeId, onlyActive: onlyActive, tablePreferences: quotationServicePropertiesDictionary));
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