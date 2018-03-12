using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Orders
{
    public partial class Invoice : System.Web.UI.Page
    {
        public int quotationId = 0;
        public int invoiceId = 0;
        protected void Page_Load(object sender, EventArgs e)
        {
            quotationId = Convert.ToInt32(Context.Request["QuotationId"]);
            invoiceId = Convert.ToInt32(Context.Request["InvoiceId"]);
        }
    }
}