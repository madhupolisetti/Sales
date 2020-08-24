using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Razorpay.Api;
using Razorpay.Api.Errors;
using System.IO;
using System.Security.Cryptography;
using System.Text;


namespace Orders
{
    public partial class OnlineOrder : System.Web.UI.Page
    {
        public string orderId, _userName, _mobile, _emailId, _currency, razorOrderId, razorPaymentId, razorSignature, message, keyId, keySecret;
        public int _productId, _productDBpaymentId, _userId;
        public float _rawAmount, _tax, _fee, _totalAmount;
        protected void Page_Load(object sender, EventArgs e)
        {
            // IsPostBack returning false for both redirection & direct URL enter
            //if (Convert.ToInt32(Request.Form["productId"]) < 1)
            //    return;
            _userId = Convert.ToInt32(Request.Form["userId"]);

            if (_userId != 82536)
            {
                _productId = Convert.ToInt32(Request.Form["productId"]);
                _productDBpaymentId = Convert.ToInt32(Request.Form["productDBpaymentId"]);

                _userName = Request.Form["userName"];
                _mobile = Request.Form["userMobile"];
                _emailId = Request.Form["userEmail"];
                _currency = Request.Form["currencyCode"];
                _rawAmount = float.Parse(Request.Form["rawAmount"]);
                _tax = float.Parse(Request.Form["tax"]);
                _fee = float.Parse(Request.Form["fee"]);
                _totalAmount = float.Parse(Request.Form["amountToPay"]);

                
            }
            else
            {
                _productId = 1;
                _productDBpaymentId = 2;
                _userId = 82536;
                _userName = "Anudeep";
                _mobile = "8688985915";
                _emailId = "test@gmail.com";
                _currency = "INR";
                _rawAmount = 100;
                _tax = 18;
                _fee = 3;
                _totalAmount = 121;
            }
            if (_currency == "INR")
                _totalAmount *= 100;

            keyId = System.Configuration.ConfigurationManager.AppSettings["RazorpayKeyId"];
            keySecret = System.Configuration.ConfigurationManager.AppSettings["RazorpayKeySecret"];
            
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            RazorpayClient client = new RazorpayClient(keyId, keySecret);

            Dictionary<string, object> options = new Dictionary<string, object>();
            options.Add("amount", _totalAmount);
            options.Add("currency", _currency);
            Order order = client.Order.Create(options);
            orderId = order["id"].ToString();
        }
    }
}