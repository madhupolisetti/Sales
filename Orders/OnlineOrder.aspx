<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="OnlineOrder.aspx.cs" Inherits="Orders.OnlineOrder" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <button id="rzp-button1">Pay</button>
        </div>
    </form>
</body>
<script
    src="https://checkout.razorpay.com/v1/checkout.js"
    data-key="rzp_test_NM2snZJrPHBYS4"
    data-amount="100"
    data-name="Razorpay"
    data-description="Purchase Description"
    data-order_id="<%=orderId%>"
    data-image="https://www.grptalk.com/images/logo-grp.png"
    data-prefill.name="Gaurav Kumar"
    data-prefill.email="gaurav.kumar@example.com"
    data-prefill.contact="9123456789"
    data-theme.color="#007bff"
></script>

</html>
