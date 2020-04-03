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
    var _imageURL = "", _productName = "", _redirectURL = "";
    var ordersClient = new OrdersClient();
    $(document).ready(function ()
    {        
        ordersClient.InitiateRazorpayTransaction(<%=_productId%>, <%=_userId%>, "<%=_userName%>", "<%=_mobile%>", "<%=_emailId%>", <%=_rawAmount%>, <%=_tax%>, "<%=orderId%>", function (res)
        {
            console.log(res);
            _imageURL = res.Table.ProductImageURL;
            _productName = res.Table.ProductName;
            _redirectURL = res.Table.RedirectionURL;
            
            if (res.Success == true)
            {                
                alert(res.Table.ProductName);
                InitiateCheckout();
            }
            else
            {
                alert("Unable to Initiate transaction in Orders at script level");
                return false;
            }
        });
    });

    function InitiateCheckout()
    {
        var options = {
            "key": "<%=keyId%>",
            "name": "Telebu",
            "order_id": "<%=orderId%>",
            "description": _productName,
            "amount": "<%=_totalAmount%>",
            "currency": "<%=_currency%>",
            "image": _imageURL,
            "handler": function (response)
            {
                VerifySignature(response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature);
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
                    window.location.replace(_redirectURL);
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
    }    
    

    function VerifySignature(rOrderId, rPaymentId, rSignature)
    {
        if (rOrderId != "<%=orderId%>" )
        {
            alert("Razorpay incorrect orderId received");
            return false;
            // might need to escalate further with Razorpay
        }

        ordersClient.VerifySignature(rOrderId, rPaymentId, rSignature, function (res)
        {
            if (res.Success == true)
            {
                alert("Success payment, will now redirect to source");
                window.location.replace(_redirectURL);
                // show option to download invoice                
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
