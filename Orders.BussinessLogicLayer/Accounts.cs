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
using OU = Orders.UserDefinedClasses;

using System.Xml;
using Orders.UserDefinedClasses;

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
        public JObject CreateAccountProducts(string sConnString, byte productId, string accountUrl, string mobileNumber, string userName)
        {
            bool success = false;
            decimal accountId = 0 , accountProductID = 0;
            bool isFirstTime = false;
            JObject userObj;
            Orders.DataAccessLayer.Accounts accountsObj = new DataAccessLayer.Accounts(sConnString);
           

            //if (!success)
            //{
                //if (_ds.Tables.Count > 0 && _ds.Tables[0].Rows.Count > 0)
                //{
                responseObj = GetAccountDetailApi(sConnString,accountUrl, mobileNumber,productId,userName);
                isFirstTime = true;
                
                //}
                //else
                //{
                //    responseObj = new JObject(new JProperty("Success", false),
                //        new JProperty("Message", "No User details Found"));
                //    return responseObj;
                //}
            //}

            if (Convert.ToBoolean(responseObj.SelectToken("Success").ToString()) == true )
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
                    accountProductProperties.OwnerShipEmail = responseObj.SelectToken(Label.USER_DETAILS).SelectToken("OwnerShip").ToString(); ;
                    accountProductProperties.RegisteredDate = responseObj.SelectToken(Label.USER_DETAILS).SelectToken("RegisteredDate").ToString();
                    accountProductProperties.AccessToken = responseObj.SelectToken(Label.USER_DETAILS).SelectToken("AccessToken").ToString();
                    accountProductProperties.BillingDay = Convert.ToInt32(responseObj.SelectToken(Label.USER_DETAILS).SelectToken("BillingDay"));
                    accountProductProperties.BillingMode = Convert.ToInt32(responseObj.SelectToken(Label.USER_DETAILS).SelectToken("BillingModeId"));
                    accountProductProperties.AccountTypeId = Convert.ToInt32(responseObj.SelectToken(Label.USER_DETAILS).SelectToken("AccountTypeId"));
                    Orders.DataAccessLayer.Accounts account = new Orders.DataAccessLayer.Accounts(sConnString);
                    account.CreateAccountProduct(accountProductProperties, out accountId, out accountProductID);
                    responseObj[Label.USER_DETAILS][Label.ACCOUNT_ID] = Convert.ToInt64(accountId);
                    responseObj[Label.USER_DETAILS][Label.ACCOUNT_PRODUCT_ID] = Convert.ToInt64(accountProductID);
                
                if (mobileNumber == "")
                {
                    mobileNumber = accountProductProperties.MobileNo;
                }
            }
            
            responseObj = accountsObj.GetAccountProductDetails(productId, mobileNumber, out success);
                responseObj.Add(new JProperty(Label.ISFIRSTTIME, isFirstTime));
            
            return responseObj;
        }


        public JObject GetAccountDetailApi(string sConnString, string httpUrl, string mobileNumber,byte productId,string userName)
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
            if (productId == 2)
            {
                reqObj = new JObject(new JProperty("AccountName", userName));
            }
            else
            {
                 reqObj = new JObject(new JProperty("MobileNumber", mobileNumber));
            }
            try
            {
                Orders.DataAccessLayer.Accounts accountsObj = new DataAccessLayer.Accounts(sConnString);
                dynamic ds = accountsObj.GetProductDetails(productId);
                _ApiKey = ds.Table.ApiKey;
                _ApiSecret = ds.Table.ApiSecret;
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
                //if(productId==3)
                //HttpAPIResponseString = "{ 'Success': 'True', 'Message': 'Success', 'UserDetails': { 'UserId': '193', 'NickName': 'HR Team', 'MobileNumber': '918897446974', 'EmailID': 'harika.velaga@smscountry.com', 'StateId': '1', 'Country': 'India', 'Address': '', 'GSTIN': '', 'OwnerShip': '', 'RegisteredDate': '6/6/2020 9:48:50 AM', 'Company': '', 'AccessToken': '', 'BillingModeId': '1', 'BillingDay': '1', 'AccountTypeId': '3' } }";
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

        public JObject GetAccountOwnersAndPlans(string sConnString, byte productId)
        {

            bool success;
            Orders.DataAccessLayer.Accounts accountsObj = new DataAccessLayer.Accounts(sConnString);
            responseObj = accountsObj.GetAccountOwnersAndPlans(productId, out success);
            return responseObj;
        }
        public JObject UpdateAccountOwnerDetails(string sConnString, OU.AccountProducts Account,int quotationId)
        {

            decimal AccountID;
            Orders.DataAccessLayer.Accounts accountsObj = new DataAccessLayer.Accounts(sConnString);
            responseObj = accountsObj.UpdateAccountProduct(Account, quotationId);
            return responseObj;
        }




    }



}
