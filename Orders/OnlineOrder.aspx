<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="OnlineOrder.aspx.cs" Inherits="Orders.OnlineOrder" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <button id="btnRazorPay" style="display:none">Pay</button>
        </div>
    </form>
</body>
<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
<script src="Scripts/OrdersClient.js?type=v4" type="text/javascript"></script>
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<script>
    $(document).ready(function ()
    {
        var ordersClient = new OrdersClient();
        InitiateInOrders();
    });

    var options = {
        "key": "rzp_test_NM2snZJrPHBYS4",
        "name": "Telebu",
        "order_id": "<%=orderId%>",
        "description": "Grptalk payment",
        "amount": "<%=_totalAmount%>",
        "currency": "<%=_currency%>",
        "image": "https://www.grptalk.com/images/logo-grp.png",  // need to change image
        "handler": function (response)
        {
            VerifySignature(response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature);
            //var _razorOrderId = response.razorpay_order_id;
            //var _razorPaymentId = response.razorpay_payment_id;
            //var _razorSignature = response.razorpay_signature
            //VerifySignature(_razorOrderId, _razorPaymentId, _razorSignature);
        },
        "prefill": {
            "name": "<%=_userName%>",
            "email": "<%=_emailId%>",
            "contact": "<%=_mobile%>"
        },        
        "theme": {
            "color": "#007bff"
        },
        "modal": {
            "ondismiss": function ()
            {
                alert("Redirect user back to the source URL");
                // need to be implemented
            }
        }
    };
    var rzp1 = new Razorpay(options);
    document.getElementById('btnRazorPay').onclick = function (e)
    {
        rzp1.open();
        e.preventDefault();
    }
    document.getElementById("btnRazorPay").click();

    function InitiateInOrders()
    {
        ordersClient.InitiateRazorpayTransaction(<%=_productId%>, <%=_userId%>, <%=_userName%>, <%=_mobile%>, <%=_emailId%>, <%=_rawAmount%>, <%=_tax%>, <%=_totalAmount%>, <%=orderId%>, function (res)
        {
            if (res.Success == true)
            {
                // carry forward
            }
            else
            {
                alert("Unable to Initiate transaction in Orders");
                return false;
            }
        });       
    }

    function VerifySignature(rOrderId, rPaymentId, rSignature)
    {
        if (rOrderId != <%=orderId%> )
        {
            alert("Razorpay incorrect orderId received");
            return false;
            // might need to escalate further with Razorpay
        }

        ordersClient.VerifySignature(rOrderId, rPaymentId, rSignature, function (res)
        {
            if (res.Success == true)
            {
                // redirect to Invoice download page
            }
            else
            {
                alert("Unable to process transaction");
                return false;
            }
        });      
    }

</script>

</html>
