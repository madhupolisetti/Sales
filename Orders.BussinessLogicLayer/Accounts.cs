using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using System.Data;
using Orders.DataAccessLayer;
using System.Net;
using System.IO;
using Orders.UserDefinedClasses;
using System.Xml;

namespace Orders.BussinessLogicLayer
{
    public class Accounts
    {


        Helper _helper = new Helper(ResponseFormat.JSON);
        private JObject _jObj = null;
        private JArray _jArr = null;
        private XmlDocument xmlDoc = null;
        private XmlElement rootElement = null;
        private bool _isOutputXmlFormat = false;

        public static JObject responseObj = new JObject();
        DataSet _ds = null;

        public Accounts()
        {
            responseObj = new JObject();
        }
        public JObject CreateAccountProducts(string sConnString, byte productId, string accountUrl, string mobileNumber)
        {
            bool success = false;
            decimal accountId = 0;
            JObject userObj;
            Orders.DataAccessLayer.Accounts accountsObj = new DataAccessLayer.Accounts(sConnString);
            responseObj = accountsObj.GetAccountProductDetails(productId, mobileNumber, out success);

            if (!success)
            {
                //if (_ds.Tables.Count > 0 && _ds.Tables[0].Rows.Count > 0)
                //{
                responseObj = GetAccountDetailApi(accountUrl, mobileNumber);
                //}
                //else
                //{
                //    responseObj = new JObject(new JProperty("Success", false),
                //        new JProperty("Message", "No User details Found"));
                //    return responseObj;
                //}
            }

            if (Convert.ToBoolean(responseObj.SelectToken("Success").ToString()) == true && !success)
            {
                AccountProducts accountProductProperties = new AccountProducts();
                accountProductProperties.ProductAccountName = responseObj.SelectToken(Label.USER_DETAILS).SelectToken("NickName").ToString();
                accountProductProperties.MobileNo = responseObj.SelectToken(Label.USER_DETAILS).SelectToken("MobileNumber").ToString();
                accountProductProperties.Email = responseObj.SelectToken(Label.USER_DETAILS).SelectToken("EmailID").ToString();
                accountProductProperties.Address = responseObj.SelectToken(Label.USER_DETAILS).SelectToken("Address").ToString();
                accountProductProperties.Gstin = responseObj.SelectToken(Label.USER_DETAILS).SelectToken("GSTIN").ToString();
                accountProductProperties.Company = responseObj.SelectToken(Label.USER_DETAILS).SelectToken("Company").ToString();
                accountProductProperties.StateId = Convert.ToInt32(responseObj.SelectToken(Label.USER_DETAILS).SelectToken("StateId").ToString());
                accountProductProperties.Country = responseObj.SelectToken(Label.USER_DETAILS).SelectToken("Country").ToString();
                accountProductProperties.ProductAccountId = Convert.ToInt32(responseObj.SelectToken(Label.USER_DETAILS).SelectToken("UserId").ToString());
                accountProductProperties.ProductId = productId;
                accountProductProperties.RegisteredDate = responseObj.SelectToken(Label.USER_DETAILS).SelectToken("RegisteredDate").ToString();
                Orders.DataAccessLayer.Accounts account = new Orders.DataAccessLayer.Accounts(sConnString);
                account.CreateAccountProduct(accountProductProperties, out accountId);
                responseObj.Add(new JProperty(Label.ACCOUNT_ID, accountId));

            }

            return responseObj;
        }


        public JObject GetAccountDetailApi(string httpUrl, string mobileNumber)
        {
            JObject accountObj = null;
            JObject reqObj = new JObject();
            WebRequest _Req = null;
            HttpWebResponse _Resp = null;
            StreamReader SReader = null;
            StreamWriter SWriter = null;
            string HttpAPIResponseString = "";
            string _ApiKey = "fDZjHHybyM";
            string _ApiSecret = "zu5nKlRQFbPCQrihQn51";
            CredentialCache _credentialCache = new CredentialCache();
            try
            {
                reqObj = new JObject(new JProperty("MobileNumber", mobileNumber));
                _Req = HttpWebRequest.Create(httpUrl);
                _credentialCache.Add(new Uri(httpUrl), "Basic", new NetworkCredential(_ApiKey, _ApiSecret));
                _Req.Credentials = _credentialCache;
                _Req.Method = "POST";
                _Req.ContentType = "application/json";
                SWriter = new StreamWriter(_Req.GetRequestStream());
                SWriter.Write(reqObj.ToString());
                SWriter.Flush();
                SWriter.Close();
                SReader = new StreamReader(_Req.GetResponse().GetResponseStream());
                HttpAPIResponseString = SReader.ReadToEnd();
                SReader.Close();
                accountObj = JObject.Parse(HttpAPIResponseString);

            }
            catch (Exception ex)
            {
                //Logger.ExceptionLog(ex.StackTrace);
                accountObj = new JObject(new JProperty("Success", false),
                    new JProperty("Message", "Something Went Wrong"));
            }
            return accountObj;
        }


    }



}
