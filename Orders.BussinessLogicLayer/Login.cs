using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using OU = Orders.UserDefinedClasses;
using System.Data;
using OD = Orders.DataAccessLayer;


namespace Orders.BussinessLogicLayer
{
   public class Login
    {
        public static JObject responseObj = new JObject();
        DataSet _ds = null;

        public Login()
        {
            responseObj = new JObject();
            
        }
       
       public dynamic AdminLoginCheck(string accessToken,string sConString )
       {
           string emailAddress = "";
           JObject Jobj = null;
           String URI = "";
           WebClient webClient = null;
           Stream stream = null;
           StreamReader sReader = null;
           //googleID = JObj.SelectToken("id").ToString();
           //fullName = JObj.SelectToken("name").ToString();
           //firstName = JObj.SelectToken("given_name").ToString();
           //lastName = JObj.SelectToken("family_name").ToString();
           OU.Helper helper = new OU.Helper(OU.ResponseFormat.JSON);
           try
           {
               URI = "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + accessToken;
               webClient = new WebClient();
               //webClient.Proxy = null;                
               stream = webClient.OpenRead(URI);
               sReader = new StreamReader(stream);
               Jobj = JObject.Parse(sReader.ReadToEnd());
               emailAddress = Jobj.SelectToken("email").ToString();
               Boolean Success;
               string Message;
               if (!emailAddress.EndsWith("smscountry.com") && !emailAddress.EndsWith("telebu.com"))
               {
                   responseObj.Add(new JProperty("Success", "false"));
                   responseObj.Add(new JProperty("Message", "unAuthorized"));
                   return responseObj;
               }
               OD.Login loginObj = new OD.Login(sConString);
               
               System.Data.DataSet ds = loginObj.AdminLoginCheck(emailAddress,out Success,out Message);
               if (ds == null)
               {
                   responseObj.Add(new JProperty("Success", "false"));
                   responseObj.Add(new JProperty("Message", "No Data Found"));
               }
               else 
               {
                  helper.ParseDataSet(ds);
                  responseObj = helper.GetDataSetJobj;
                  responseObj.Add(new JProperty("Success", "True"));
               }
             
               return responseObj;
           }
           catch (Exception ex)
           {
               responseObj = new JObject();
               responseObj.Add(new JProperty("Success", "false"));
               responseObj.Add(new JProperty("Message", "Error in BAL"));
              
               return responseObj;

           }
       }
    }
}
