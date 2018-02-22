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
            JObject productObj = GetProductDetails(sConnString, productId);

            if (Convert.ToBoolean(productObj.SelectToken("Success")) == true) { }
            {
                responseObj = GetAccountDetailApi(productObj.SelectToken("Success").ToString(), mobileNumber);
            }

            return responseObj;
        }

        public JObject GetProductDetails(string SConnString, byte productId)
        {
            Orders.DataAccessLayer.Accounts accountsObj = new DataAccessLayer.Accounts(SConnString);
            _ds = accountsObj.GetProductInformation(productId);
            responseObj = ExportMultipleDtToJson(_ds);
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
            string _ApiKey = "tWncaEz7GPJtwIcR8QAi";
            string _ApiSecret = "L74NKAAw5eHpXVFsrSb6LRAtZ8ZDTYjCTzb3CX";
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
                SWriter.Write(PostingData.ToString());
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

        public static JObject ExportMultipleDtToJson(DataSet ds)
        {
            JObject jobj = new JObject();
            JArray TableArray = new JArray();
            JObject TableObject;

            if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {

                int i = 0;
                foreach (DataTable dt in ds.Tables)
                {
                    i++;
                    JArray TempJarr = new JArray();
                    TableObject = new JObject();
                    foreach (DataRow dr in dt.Rows)
                    {

                        JObject TempJobj = new JObject();
                        foreach (DataColumn dc in dt.Columns)
                        {
                            TempJobj.Add(new JProperty(dc.ColumnName, dr[dc.ColumnName]));

                        }
                        TempJarr.Add(TempJobj);
                    }

                    TableObject.Add(new JProperty("Table", TempJarr));
                    TableArray.Add(TableObject);
                }
                responseObj.Add(new JProperty("TablesArray", TableArray));


            }
            else
            {



            }

            return responseObj;

        }




    }
}
