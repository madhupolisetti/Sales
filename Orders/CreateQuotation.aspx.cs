using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Orders
{
    public partial class CreateQuotation : System.Web.UI.Page
    {
        public decimal accountId = 0;
        public byte productId = 0;
        public string registeredDate = string.Empty;
        public string companyName = string.Empty;
        public string contactName = string.Empty;
        public string email = string.Empty;
        public string mobile = string.Empty;
        public string country = string.Empty;
        public string address = string.Empty;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request["ID"] != null && Request["ID"] != string.Empty)
            {
                accountId = Convert.ToDecimal(Request["ID"]);
            }
            if (Request["productId"] != null && Request["productId"] != string.Empty)
            {
                productId = Convert.ToByte(Request["productId"]);
            }
            if (Request["address"] != null && Request["address"] != string.Empty)
            {
                address = Request["address"];
            }
            if (Request["contactName"] != null && Request["contactName"] != string.Empty)
            {
                contactName = Request["contactName"];
            }
            if (Request["country"] != null && Request["country"] != string.Empty)
            {
                country = Request["country"];
            }
            if (Request["registeredDate"] != null && Request["registeredDate"] != string.Empty)
            {
                registeredDate = Request["registeredDate"];
            }
            if (Request["company"] != null && Request["company"] != string.Empty)
            {
                companyName = Request["company"];
            }
            if (Request["email"] != null && Request["email"] != string.Empty)
            {
                email = Request["email"];
            }
            if (Request["mobile"] != null && Request["mobile"] != string.Empty)
            {
                email = Request["mobile"];
            }


        }
    }
}
