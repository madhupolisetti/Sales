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
        public int _productId, _userId;
        public float _rawAmount, _tax, _totalAmount;
        protected void Page_Load(object sender, EventArgs e)
        {
            // use try block to catch when someone accesses the page by manually entering URL or if !IsPostBack 
            _productId = Convert.ToInt32(Request.Form["productId"]);
            _userId = Convert.ToInt32(Request.Form["userId"]);
            _userName = Request.Form["userName"];
            _mobile = Request.Form["userMobile"];
            _emailId = Request.Form["userEmail"];
            _currency = Request.Form["currencyCode"];
            _rawAmount = float.Parse(Request.Form["rawAmount"]);
            _tax = float.Parse(Request.Form["tax"]);
            _totalAmount = float.Parse(Request.Form["amountToPay"]);

            keyId = System.Configuration.ConfigurationManager.AppSettings["RazorpayKeyId"];
            keySecret = System.Configuration.ConfigurationManager.AppSettings["ProductId"];
            
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