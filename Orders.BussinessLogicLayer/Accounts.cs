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
namespace Orders.BussinessLogicLayer
{
    public class Accounts
    {

        public static JObject responseObj = new JObject();
        DataSet _ds = null;

        public Accounts()
        {
            responseObj = new JObject();
        }
        public JObject CreateAccountProducts(string sConnString, byte productId, string mobileNumber)
        {
            bool success = false;
            decimal accountId = 0;
            Orders.DataAccessLayer.Accounts accountsObj = new DataAccessLayer.Accounts(sConnString);
            _ds = accountsObj.GetProductInformation(productId, out success);

            if (success)
            {
                if (_ds.Tables.Count > 0 && _ds.Tables[0].Rows.Count > 0)
                {
                    responseObj = GetAccountDetailApi(_ds.Tables[0].Rows[0]["AccountInformationUrl"].ToString(), mobileNumber);
                }
                else
                {
                    responseObj = new JObject(new JProperty("Success", false),
                        new JProperty("Message", "No Product details Found"));
                    return responseObj;
                }
            }

            if (Convert.ToBoolean(responseObj.SelectToken("Success")) == true)
            {
                AccountProducts accountProductProperties = new AccountProducts();
                accountProductProperties.ProductAccountName = responseObj.SelectToken("NickName").ToString();
                accountProductProperties.MobileNo = responseObj.SelectToken("MobileNumber").ToString();
                accountProductProperties.Email = responseObj.SelectToken("EmailID").ToString();
                accountProductProperties.Address = responseObj.SelectToken("Address").ToString();
                accountProductProperties.Gstin = responseObj.SelectToken("GSTIN").ToString();
                accountProductProperties.Company = responseObj.SelectToken("Company").ToString();
                accountProductProperties.StateId = Convert.ToInt32(responseObj.SelectToken("StateCode").ToString());
                accountProductProperties.CountryId = Convert.ToByte(responseObj.SelectToken("CountryId").ToString());
                accountProductProperties.ProductAccountId = Convert.ToInt32(responseObj.SelectToken("UserId").ToString());
                accountProductProperties.ProductId = productId;
                accountProductProperties.RegisteredDate = responseObj.SelectToken("RegisteredDate").ToString();
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
            string PostingData = "";
            string HttpAPIResponseString = "";
            string _ApiKey = "S2m8HRmwf5";
            string _ApiSecret = "alR8pQok8ll2zCYmZL4R";
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
