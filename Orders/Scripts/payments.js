var paymentSearchData = {};
var dateRange;
var paymentsResponse = [];
$(document).ready(function () {
    var ordersClient = new OrdersClient();
    dateRange = $("#daterangetext").val();
    bindProducts();
    $("#daterangetext").daterangepicker();
    
    ordersClient.GetPaymentStatuses(true, function (res) {
        if (res.Success == true) {
            var paymentStatus = "";
            paymentStatus = "<option value=0>Select</option>";
            for (var i = 0; i < res.PaymentStatuses.length; i++) {
                paymentStatus += "<option value=" + res.PaymentStatuses[i].Id + " bank>" + res.PaymentStatuses[i].Status + "</option>"
            }
            $("#ddlPaymentStatus").html(paymentStatus);
        }
    })
    paymentSearchData.ProductId = 1;
    paymentSearchData.Number = $("#txtInvoice").val();
    paymentSearchData.AccountId = 0;
    paymentSearchData.Mobile = $("#txtMobile").val();
    paymentSearchData.Email = $("#txtEmail").val();
    paymentSearchData.PaymentStatus = $("#ddlPaymentStatus :selected").val();
    paymentSearchData.BillingMode = $("#ddlBillMode :selected").val();

    getPayments();


    function bindProducts() {
        var productsData = "<option value='0'>--- All ---</option>";
        ordersClient.GetProducts(true, function (res) {

            if (res.Success == true) {
                if (res.Products.length > 0) {

                    for (var i = 0; i < res.Products.length; i++) {
                        productsData += "<option value='" + res.Products[i].Id + "'>" + res.Products[i].Name + "</option>"
                    }
                }

            }
            else {
                ErrorNotifier(res.Message);
            }
            $("#ddlProduct").html(productsData);
        });

    }

    function getPayments() {
        var ordersClient = new OrdersClient();
        if (dateRange == "This Month") {
            paymentSearchData.FromDateTime = "2018-02-01";
            paymentSearchData.ToDateTime = "2018-02-28";
        }
        else {
            var fromDateT0date = dateRange.split("-");
            paymentSearchData.FromDateTime = fromDateT0date[0];
            paymentSearchData.ToDateTime = fromDateT0date[1];
        }
        ordersClient.GetPayments(paymentSearchData, function (res) {
            if (res.Success == true) {
                var payments = "";
                if (!$.isArray(res.Payments)) {
                    paymentsResponse.push(res.Payments);
                }
                else {
                    paymentsResponse = res.Payments;
                }
                for (var i = 0; i < paymentsResponse.length; i++) {
                    payments += "<tr><td><input type='checkbox' id='" + paymentsResponse[i].OrderId + "' countryid=''tannumber='' class='check_tool' status='" + paymentsResponse[i].PaymentStatus + "' invoiceid='10401' dueamount='0' value='10379' ><label class='css-label' for='" + paymentsResponse[i].OrderId + "'></label></td>";
                    payments += "<td style='border-color:#C0C0C0;'>" + paymentsResponse[i].AccountName + "</td>";
                    payments += "<td style='border-color:#C0C0C0;'>" + paymentsResponse[i].AccountName + "</td>";
                    payments += "<td style='border-color:#C0C0C0;'>" + paymentsResponse[i].OwnershipName + "</td>";
                    payments += "<td style='border-color:#C0C0C0;' >" + paymentsResponse[i].Mobile + "</td>";
                    payments += "<td style='border-color:#C0C0C0;'>" + paymentsResponse[i].Email + "</td>";
                    payments += "<td style='border-color:#C0C0C0;'>" + paymentsResponse[i].InvoiceRaisedTime + "</td>";
                    payments += "<td style='border-color:#C0C0C0;'>" + paymentsResponse[i].InvoiceNumber + "</td>";
                    payments += "<td style='border-color:#C0C0C0;'>" + paymentsResponse[i].OrderAmount + "</td>";
                    payments += "<td style='border-color:#C0C0C0;'>" + paymentsResponse[i].DueAmount + "</td>";
                    payments += "<td style='border-color:#C0C0C0;'>" + paymentsResponse[i].PaymentStatus + "</td>";
                    payments += "<td style='border-color:#C0C0C0;'>" + paymentsResponse[i].LastPaidDate + "</td>";
                    payments += "<td style='border-color:#C0C0C0;'>" + paymentsResponse[i].ReceivedAmount + "</td>";
                    payments += "<td style='border-color:#C0C0C0;'>&nbsp;</td>";
                    payments += "<td>" + paymentsResponse[i].ActivationStatus + "</td></tr>";
                }
                $("#tblDiv").html(payments);
            }
            else {
                ErrorNotifier(res.Message);
            }
        });

    }
    $("#check_tool").click(function () {


    })
});

