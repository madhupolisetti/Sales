using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Razorpay.Api;
using Razorpay.Api.Errors;

namespace Orders
{
    public partial class OnlineOrder : System.Web.UI.Page
    {
        public string orderId;
        protected void Page_Load(object sender, EventArgs e)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            Dictionary<string, object> input = new Dictionary<string, object>();
            input.Add("amount", 100); // this amount should be same as transaction amount
            input.Add("currency", "INR");
            input.Add("receipt", "12121");
            input.Add("payment_capture", 1);

            string key = "rzp_test_NM2snZJrPHBYS4";
            string secret = "pVIY3RofRBiPHe9lSSL5RafE";

            RazorpayClient client = new RazorpayClient(key, secret);

            Razorpay.Api.Order order = client.Order.Create(input);
            orderId = order["id"].ToString();
        }
    }
}