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
    var _imageURL = "", _productName = "", _redirectURL = "", _insertedId;
    var ordersClient = new OrdersClient();
    $(document).ready(function ()
    {        
        ordersClient.InitiateRazorpayTransaction(<%=_productId%>, <%=_userId%>, "<%=_userName%>", "<%=_mobile%>", "<%=_emailId%>", <%=_rawAmount%>, <%=_tax%>,  <%=_fee%>, "<%=orderId%>", function (res)
        {            
            _imageURL = res.Table.ProductImageURL;
            _productName = res.Table.ProductName;
            _redirectURL = res.Table.RedirectionURL;
            _insertedId = res.Table1.Id;

            if (res.Success == true) {
                InitiateCheckout();
            }
            else {
                alert("Unable to Initiate transaction in Telebu Orders");
                return false;
            }
        });
    });

    function InitiateCheckout() {
        var options = {
            "key": "<%=keyId%>",
            "name": "Telebu",
            "order_id": "<%=orderId%>",
            "description": _productName,
            "amount": "<%=_totalAmount%>",
            "currency": "<%=_currency%>",
            "image": _imageURL,
            "handler": function (response) {
                VerifySignature(_insertedId, response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature);
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
                "ondismiss": function () {
                    window.location.replace(_redirectURL);
                }
            }
        };
        var rzp1 = new Razorpay(options);
        document.getElementById('btnRazorPay').onclick = function (e) {
            rzp1.open();
            e.preventDefault();
        }
        document.getElementById("btnRazorPay").click();
    }


    function VerifySignature(insertedId, rOrderId, rPaymentId, rSignature) {
        //_redirectURL = "http://localhost:3779/Recharges.aspx";
        if (rOrderId != "<%=orderId%>") {
            var $form = $("<form/>").attr("id", "data_form")
                .attr("action", _redirectURL)
                .attr("method", "post");
            $("body").append($form);
            AddParameter($form, "PaymentStatusId", 3);
            $form[0].submit();
        }

        ordersClient.VerifySignature(insertedId, rOrderId, rPaymentId, rSignature, function (res) {
            if (res.Success == true) {
                var _totalAmount =<% =_totalAmount%>;
                _totalAmount /= 100;
                ordersClient.GenerateOrderForOnlinePayments(<%=_productId %>,<%=_userId %>,<%=_rawAmount %>,<%=_tax %>, _totalAmount, rOrderId, rPaymentId, function (orderRes) {
                    console.log(orderRes);
                    if (orderRes.Success == true) {
                        //alert(orderRes.InvoiceDetails.QuotationId);
                        //alert(orderRes.InvoiceDetails.ActivationUrl);
                        ordersClient.ActivateOrder(orderRes.InvoiceDetails.ActivationUrl, orderRes.InvoiceDetails.QuotationId, false, <%=_rawAmount %>, "Activated through RazorPay", function (activationRes) {
                            if (activationRes.success == "true" || activationRes.success == true) {
                                var $form = $("<form/>").attr("id", "data_form")
                                    .attr("action", _redirectURL)
                                    .attr("method", "post");
                                $("body").append($form);
                                AddParameter($form, "PaymentStatusId", 1);
                                AddParameter($form, "rOrderId", rOrderId);
                                AddParameter($form, "rPaymentId", rPaymentId);
                                AddParameter($form, "InvoiceNumber", orderRes.InvoiceDetails.InvoiceNumber);
                                AddParameter($form, "OrderAmount", <%=_rawAmount %>, );
                                AddParameter($form, "Tax", <%=_tax %>, );
                                AddParameter($form, "TotalAmount", _totalAmount);
                                $form[0].submit();
                            }
                            else {
                                var $form = $("<form/>").attr("id", "data_form")
                                    .attr("action", _redirectURL)
                                    .attr("method", "post");
                                //transactioId to be passed later
                                $("body").append($form);
                                AddParameter($form, "PaymentStatusId", 2);
                                $form[0].submit();
                            }
                        });

                    }
                });
            }
        });
    }
    function AddParameter(form, number, value)
    {
        var $input = $("<input />").attr("type", "hidden")
            .attr("name", number)
            .attr("value", value);
        form.append($input);
    }

</script>

</html>
