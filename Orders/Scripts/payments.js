var paymentSearchData = {};
var dateRange;
var paymentsResponse = [];
var paymentStatusesLength = 0;
$(document).ready(function () {
    var ordersClient = new OrdersClient();
    dateRange = $("#daterangetext").val();
    bindProducts();
    $("#daterangetext").daterangepicker();
    
    ordersClient.GetPaymentStatuses(true, function (res) {
        if (res.Success == true) {
            var paymentStatus = "";
            paymentStatusesLength = res.PaymentStatuses.length;
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
    dateRange = $("#daterangetext").val();
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
            if (res.Payments.length > 0) {
                for (var i = 0; i < res.Payments.length; i++) {
                    payments += "<tr><td><input type='checkbox' id='" + res.Payments[i].OrderId + "' countryid=''tannumber='' class='check_tool' status='" + res.Payments[i].PaymentStatus + "' invoiceid='10401' invoicenumber='" + res.Payments[i].InvoiceNumber + "' totalamount='" + res.Payments[i].TotalAmount + "' dueamount='" + res.Payments[i].DueAmount + "' value='10379' ><label class='css-label' for='" + res.Payments[i].OrderId + "'></label></td>";
                    payments += "<td style='border-color:#C0C0C0;'>" + res.Payments[i].AccountName + "</td>";
                    payments += "<td style='border-color:#C0C0C0;'>" + res.Payments[i].AccountName + "</td>";
                    payments += "<td style='border-color:#C0C0C0;'>" + res.Payments[i].OwnershipName + "</td>";
                    payments += "<td style='border-color:#C0C0C0;' >" + res.Payments[i].Mobile + "</td>";
                    payments += "<td style='border-color:#C0C0C0;'>" + res.Payments[i].Email + "</td>";
                    payments += "<td style='border-color:#C0C0C0;'>" + res.Payments[i].InvoiceRaisedTime + "</td>";
                    payments += "<td style='border-color:#C0C0C0;'>" + res.Payments[i].InvoiceNumber + "</td>";
                    payments += "<td style='border-color:#C0C0C0;'>" + res.Payments[i].TotalAmount + "</td>";
                    payments += "<td style='border-color:#C0C0C0;'>" + res.Payments[i].DueAmount + "</td>";
                    payments += "<td style='border-color:#C0C0C0;'>" + res.Payments[i].PaymentStatus + "</td>";
                    payments += "<td style='border-color:#C0C0C0;'>" + res.Payments[i].LastPaidDate + "</td>";
                    payments += "<td style='border-color:#C0C0C0;'>" + res.Payments[i].ReceivedAmount + "</td>";
                    payments += "<td style='border-color:#C0C0C0;'>&nbsp;</td>";
                    payments += "<td>" + res.Payments[i].ActivationStatus + "</td></tr>";
            }
            }
            else {
                payments = "<tr><td colspan='15' align='center'>No payments available</tr></td>";

            }
            $("#tblDiv").html(payments);
        }
        else {
            ErrorNotifier(res.Message);
        }
    });

}

$(document).on("click", ".check_tool", function () {
    if ($(this).attr("type") == "checkbox") {
        if ($(this).prop("checked")) {
            $("#hdnOrderId").val($(this).attr("id"));
            $("#hdnInvoiceNumber").val($(this).attr("invoicenumber"));
            $("#hdnTotalAmount").val($(this).attr("totalamount"));
            $("#hdnDueAmount").val($(this).attr("dueamount"));
        }
    }

})

$("#btnview").click(function () {
    var orderId = $("#hdnOrderId").val();
    ViewPaymentDetails(orderId);
})

function ViewPaymentDetails(orderId) {
    var ordersClient = new OrdersClient();
    var paymentsWiseArray;
    var paymentDetailsTable = "";
    ordersClient.ViewPayment(1, orderId, function (res) {
        if (res.Success == true) {
            $("#divMultiplePayments").modal('show');
            if (res.PaymentDetails.length > 0) {
                $("#totalAmount").html($("#hdnTotalAmount").val());
                $("#pendingAmount").html($("#hdnDueAmount").val());
                for (var i = 1; i <= paymentStatusesLength; i++) {
                    paymentsWiseArray = new Array();
                    paymentsWiseArray = sortPaymentDetailsArray(i, res.PaymentDetails);
                    if (i == 1) {
                        paymentDetailsTable += "<table class='table table-bordered margin-top-20 margin-left-20'><thead style='background-color:#2977AA;color:white;'><tr><th>Invoice Number</th><th >Payment Type</th><th >Bank Account</th><th class='th'>Deposit Date</th><th>Amount Paid</th>";
                        paymentDetailsTable += "<th >Client Account Number</th><th >Client Account Name</th><th >Comments</th></tr></thead>"
                        for (var p = 0; p < paymentsWiseArray.length; p++) {
                            paymentDetailsTable += "<tr><td>" + $("#hdnInvoiceNumber").val() + "</td>";
                            paymentDetailsTable += "<td>" + paymentsWiseArray[p].Name + "</td>";
                            paymentDetailsTable += "<td>" + paymentsWiseArray[p].BankName + "</td>";
                            paymentDetailsTable += "<td>" + paymentsWiseArray[p].DepositDate + "</td>";
                            paymentDetailsTable += "<td>" + paymentsWiseArray[p].Amount + "</td>";
                            paymentDetailsTable += "<td>" + paymentsWiseArray[p].ClientAccountNumber + "</td>";
                            paymentDetailsTable += "<td>" + paymentsWiseArray[p].ClientBankName + "</td>";
                            paymentDetailsTable += "<td>" + paymentsWiseArray[p].Comments + "</td></tr>";
                        }
                        paymentDetailsTable += "</table>";
                    }
                    else if (i == 2) {
                        paymentDetailsTable += "<table class='table table-bordered margin-top-20 margin-left-20'><thead style='background-color:#2977AA;color:white;'><tr><th>Invoice Number</th><th >Payment Type</th><th >Bank Account</th><th class='th'>Deposit Date</th><th>Amount Paid</th>";
                        paymentDetailsTable += "<th >ChequeNo</th><th >Cheque Holder Name</th><th >Comments</th></tr></thead>"
                        for (var p = 0; p < paymentsWiseArray.length; p++) {
                            paymentDetailsTable += "<tr><td>" + $("#hdnInvoiceNumber").val() + "</td>";
                            paymentDetailsTable += "<td>" + paymentsWiseArray[p].Name + "</td>";
                            paymentDetailsTable += "<td>" + paymentsWiseArray[p].BankName + "</td>";
                            paymentDetailsTable += "<td>" + paymentsWiseArray[p].DepositDate + "</td>";
                            paymentDetailsTable += "<td>" + paymentsWiseArray[p].Amount + "</td>";
                            paymentDetailsTable += "<td>" + paymentsWiseArray[p].ChequeNumber + "</td>";
                            paymentDetailsTable += "<td>" + paymentsWiseArray[p].ClientBankName + "</td>";
                            paymentDetailsTable += "<td>" + paymentsWiseArray[p].Comments + "</td></tr>";
                        }
                        paymentDetailsTable += "</table>";
                    }
                    else if (i == 3) {
                        paymentDetailsTable += "<table class='table table-bordered margin-top-20 margin-left-20'><thead style='background-color:#2977AA;color:white;'><tr><th>Invoice Number</th><th >Payment Type</th><th >Bank Account</th><th class='th'>Deposit Date</th><th>Client Company</th>";
                        paymentDetailsTable += "<th>Amount Paid</th><th >Comments</th></tr></thead>"
                        for (var p = 0; p < paymentsWiseArray.length; p++) {
                            paymentDetailsTable += "<tr><td>" + $("#hdnInvoiceNumber").val() + "</td>";
                            paymentDetailsTable += "<td>" + paymentsWiseArray[p].Name + "</td>";
                            paymentDetailsTable += "<td>" + paymentsWiseArray[p].BankName + "</td>";
                            paymentDetailsTable += "<td>" + paymentsWiseArray[p].DepositDate + "</td>";
                            paymentDetailsTable += "<td>" + paymentsWiseArray[p].Amount + "</td>";
                            paymentDetailsTable += "<td>" + paymentsWiseArray[p].Amount + "</td>";
                            paymentDetailsTable += "<td>" + paymentsWiseArray[p].Comments + "</td></tr>";
                        }
                        paymentDetailsTable += "</table>";
                    }
                    else if (i == 5) {
                        paymentDetailsTable += "<table class='table table-bordered margin-top-20 margin-left-20'><thead style='background-color:#2977AA;color:white;'><tr><th>Invoice Number</th><th >Payment Type</th><th >Bank Account</th><th class='th'>Deposit Date</th>";
                        paymentDetailsTable += "<th>Amount Paid</th><th >Comments</th></tr></thead>"
                        for (var p = 0; p < paymentsWiseArray.length; p++) {
                            paymentDetailsTable += "<tr><td>" + $("#hdnInvoiceNumber").val() + "</td>";
                            paymentDetailsTable += "<td>" + paymentsWiseArray[p].Name + "</td>";
                            paymentDetailsTable += "<td>" + paymentsWiseArray[p].BankName + "</td>";
                            paymentDetailsTable += "<td>" + paymentsWiseArray[p].DepositDate + "</td>";
                            paymentDetailsTable += "<td>" + paymentsWiseArray[p].Amount + "</td>";
                            paymentDetailsTable += "<td>" + paymentsWiseArray[p].Amount + "</td>";
                            paymentDetailsTable += "<td>" + paymentsWiseArray[p].Comments + "</td></tr>";
                        }
                        paymentDetailsTable += "</table>";
                    }

                }
                $("#divMultiplePaymentDetails").html(paymentDetailsTable);


            }
        }

    });
}

function sortPaymentDetailsArray(paymentGateWayId, paymentDetails) {
    return $.grep(paymentDetails, function (element, index) {
        return element.PaymentGatewayID == paymentGateWayId;
    });
}