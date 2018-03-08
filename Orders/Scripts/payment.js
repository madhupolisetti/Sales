﻿$(document).ready(function () {
    $('#txtCashDepositeDate,#txtOnlineTransferDepositDate,#txtChequeDepositDate,#txtPODate').datepicker({ autoclose: !0, format: "yyyy-mm-dd" });
    $("#txtCashDepositeDate,#txtOnlineTransferDepositDate,#txtChequeDepositDate,#txtPODate").datepicker().datepicker("setDate", new Date());
    var ordersClient = new OrdersClient()
    ordersClient.GetPaymentGateways(true, function (res) {
        if (res.Success == true) {
            var paymentMethods = "";
            if (res.PaymentGateways.length > 0) {
                for (var i = 0; i < res.PaymentGateways.length; i++) {
                    if (i == 0) {
                        paymentMethods = "<li class='active' paymentId='" + res.PaymentGateways[i].Id + "'>";
                    }
                    else {
                        paymentMethods += "<li paymentId='" + res.PaymentGateways[i].Id + "'>";
                    }
                    paymentMethods += "<a href='#" + res.PaymentGateways[i].Name + "' data-toggle='tab'>" + res.PaymentGateways[i].Name + "<span></span></a></li>"
                }
            }
            $("#UlListitemsPaymentMethods").html(paymentMethods);
        }
    });

    ordersClient.GetBankAccounts(true, function (res) {
        console.log(res);
        if (res.Success == true) {
            var bankAccounts = "";
            if (res.BankAccounts.length > 0) {
                for (var bank = 0; bank < res.BankAccounts.length; bank++) {
                    bankAccounts += "<option value=" + res.BankAccounts[bank].Id + " bank>" + res.BankAccounts[bank].BankName + "</option>";
                }

            }
            $("#ddlCashDepositingBankAccount,#ddlChequeDepositingBankAccount,#ddlpurchaseOrderDepositingBank,#ddlOnlineTransferBank").append(bankAccounts);

        }
    });

    ordersClient.GetOnlinePaymentGateways(true, function (res) {
        console.log(res);
        if (res.Success == true) {
            var onlinePaymentGateways = "";
            if (res.PaymentGateways.length > 0) {
                for (var bank = 0; bank < res.PaymentGateways.length; bank++) {
                    onlinePaymentGateways += "<option value=" + res.PaymentGateways[bank].Id + ">" + res.PaymentGateways[bank].Name + "</option>";
                }

            }
            $("#txtOnlineTransferThroughCCAvenueOnlinePaymentGateway").append(onlinePaymentGateways);

        }
    });
});
$("#btnConfirm").click(function () {
    var ordersClient = new OrdersClient();
    var paymentGateWayId = $("#UlListitemsPaymentMethods li.active").attr("paymentid");
    var depositDate;
    var productId = $("#hdnProductId").val();
    var accountId = $("#hdnAccountId").val();
    var invoiceId = $("#hdnInvoiceId").val();
    var PaymentAmount;
    var bankAccountId;
    var activatePercentage;
    var isTdsApplicable;
    var tdsPercentage;
    var Comments;
    var clientAccountNumber;
    var billingModeId = 1;
    var transactionNumber;
    var clientAccountName;
    var chequeNumber;
    var paymentGatewayRefernceId;
    var onlinePaymentGatewayId;
    if (paymentGateWayId == 1) {
        bankAccountId = $("#ddlOnlineTransferBank :selected").val();
        depositDate = $("#txtOnlineTransferDepositDate").val();
        PaymentAmount = $("#txtOnlineTransferTransferAmount").val();
        activatePercentage = $("#txtOnlineTransferPercentageOfAmt :selected").val();
        transactionNumber = $("#txtOnlineTransferTransactionNumber").val();
        clientAccountNumber = $("#txtOnlineTransferClientAccount").val();
        clientAccountName = $("#txtOnlineTransferClientAccountName").val();
        Comments = $("#OnlineTransfrComments").val();
        if (transactionNumber == "") {
            ErrorNotifier("Please enter transaction number");
            return false;
        }




    }
    else if (paymentGateWayId == 2) {
        bankAccountId = $("#txtChequeDepositDate :selected").val();
        depositDate = $("#txtOnlineTransferDepositDate").val();
        PaymentAmount = $("#txtChequeAmount").val();
        activatePercentage = $("#txtChequePercentageOfAmt :selected").val();
        chequeNumber = $("#txtCheque").val();
        Comments = $("#ChequeComments").val();
        tdsPercentage = ("#ddlChequeTANAmount :selected").val();
        clientAccountName = $("#txtChequeHolderName").val();
        isTdsApplicable = $("#chkCheque").is(':checked');

    }
    else if (paymentGateWayId == 3) {
        depositDate = $("#txtCashDepositeDate").val();
        PaymentAmount = $("#txtPOAmount").val();
        bankAccountId = $("#ddlpurchaseOrderDepositingBank :selected").val();
        Comments = $("#txtPOComments").val();
    }
    else if (paymentGateWayId == 4) {

    }
    else if (paymentGateWayId == 5) {
        depositDate = $("#txtCashDepositeDate").val();
        PaymentAmount = $("#txtCashDepositeAmount").val();
        bankAccountId = $("#ddlCashDepositingBankAccount :selected").val();
        activatePercentage = $("#txtCashPercentageOfAmt :selected").val();
        isTdsApplicable = $("#chkCash").is(':checked');
        tdsPercentage = $("#ddlCashTANAmount :selected").val();
        Comments = $("#CashComments").val();



    }
    if (paymentGateWayId == 1 || paymentGateWayId == 2) {
        if (clientAccountNumber == "") {
            ErrorNotifier("Please enter client account number");
            return false;
        }
    }
    if (depositDate.length == 0) {
        ErrorNotifier("Please Select DueDate");
        return false;
    }
    if (PaymentAmount == 0) {
        ErrorNotifier("Please enter deposit amount");
        return false;

    }
    if (paymentGateWayId != 3) {
        if (isTdsApplicable == true) {
            if (tdsPercentage == "Select") {
                ErrorNotifier("Please select tds percent");
                return false;

            }
        }
    }
    if (bankAccountId == "") {
        ErrorNotifier("Please select bank account");
        return false;
    }
    else if (paymentGateWayId == 6) {
        onlinePaymentGatewayId = $("#txtOnlineTransferThroughCCAvenueOnlinePaymentGateway :selected").val();
        paymentGatewayRefernceId = $("#txtOnlineTransferPaymentReferenceId").val();
        PaymentAmount = $("#txtOnlineTransferCCAvenueEnterAmount").val();
        transactionNumber = $("#txtOnlineTransferCCAvenueTransactionNumber").val();
        tdsPercentage = $("#txtOnlineTransferThroughCCAvenuePercentageOfAmt :selected").val();
        Comments = $("#txtOnlineTransferThroughCCAvenueComments").val();

    }
    var searchData = '{"ProductId":"' + productId + '","InvoiceId":"' + invoiceId + '","AccountId":"' + accountId + '","BillingModeId":"' + billingModeId + '","PaymentGatewayId":"' + paymentGateWayId + '","PaymentAmount":"' + PaymentAmount + '","BankAccountId":"' + bankAccountId + '","DepositeDate":"' + depositDate + '","ActivatePercentage":"' + activatePercentage + '","IsTDSApplicable":"' + isTdsApplicable + '","TDSPercentage":"' + tdsPercentage + '","Comments":"' + Comment + '","TransactionNumber":"' + transactionNumber + '","ClientAccountNumber":"' + clientAccountNumber + '","ClientAccountName":"' + clientAccountName + '"}'
    ordersClient.GeneratePayment(searchData, function (res) {

    })

});

$("#btnPaymentMethod").click(function () {
    $("#btnOrderSummary").removeClass("tab-style-blue").addClass("tab-style-default");
    $("#btnPaymentMethod").addClass("tab-style-blue").removeClass("tab-style-default");
    $("#divIVORDate").hide();
    $("#divIVORDate1").show();
    return false;
});

$(document).on('click', '#chkCash', function () {
    var checkedValues = $("#chkCash").is(":checked");
    if (checkedValues == true) {

        $("#trCashTanAmount").show();
        $("#trCashDueDate").hide();
        $("#txtCashDueDate").val('');
    }
    else {

        $("#trCashTanAmount").hide();
        $("#txtCashTANNumber").val('');
        $("#ddlCashTANAmount").val('Select');
        $("#trCashDueDate").show();

    }

});

$(document).on('click', '#chkOnline', function () {
    var checkedValues = $("#chkOnline").is(":checked");
    if (checkedValues == true) {
        $("#trOnlineTanNumber").show();
        $("#trOnlineTanAmount").show();
        $("#trOnlineTransferDueDate").show();
        $("#txtOnlineTransferDueDate").val('');
    }
    else {
        $("#trOnlineTanNumber").hide();
        $("#trOnlineTanAmount").hide();
        $("#txtOnlineTANNumber").val('');
        $("#ddlChequeTANAmount").val('Select');
        $("#trOnlineTransferDueDate").show();
    }

});

$(document).on('click', '#chkCheque', function () {
    var checkedValues = $("#chkCheque").is(":checked");
    if (checkedValues == true) {
        $("#trChequeTanAmount").show();
        $("#trChequeDueDate").hide();
        $("#txtChequeDueDate").val('');

    }
    else {

        $("#trChequeTanAmount").hide();
        $("#txtChequeTANNumber").val('');
        $("#ddlChequeTANAmount").val('Select');
        $("#trChequeDueDate").show();
    }

});