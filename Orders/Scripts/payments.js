var paymentSearchData = {};
var dateRange;
$(document).ready(function () {
    dateRange = $("#daterangetext").val();

    $("#daterangetext").daterangepicker();
    var ordersClient = new OrdersClient();
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
});



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
           
        }
        else {
            ErrorNotifier(res.Message);
        }
    });

}