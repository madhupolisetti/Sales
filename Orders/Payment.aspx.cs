using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Orders
{
    public partial class Payment : System.Web.UI.Page
    {
        public int invoiceId = 0;
        public int quotationId = 0;
        public int accountId = 0;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request["QuotationId"] != null && Request["QuotationId"] != string.Empty)
            {
                quotationId = Convert.ToInt32(Request["QuotationId"]);
            }
            if (Request["InvoiceId"] != null && Request["InvoiceId"] != string.Empty)
            {
                invoiceId = Convert.ToInt32(Request["InvoiceId"]);
            }
            
        }
    }
}