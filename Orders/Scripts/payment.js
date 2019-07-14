var ordersClient = new OrdersClient();
$(document).ready(function () {
    var taxSummary = "";
    $('#txtCashDepositeDate,#txtOnlineTransferDepositDate,#txtChequeDepositDate,#txtPendingDueDate,#txtPODate').datepicker({ autoclose: !0, format: "yyyy-mm-dd" });
    $("#txtCashDepositeDate,#txtOnlineTransferDepositDate,#txtChequeDepositDate,#txtPendingDueDate,#txtPODate").datepicker().datepicker("setDate", new Date());
    ordersClient.GetOrderSummary($("#hdnQuotationId").val(), function (res) {
        if (res.Success == true) {
            var dueAmount = 0;
            var taxDeatils = JSON.parse(res.OrderSummary.TaxDetails);
            if (parseFloat(res.OrderSummary.DueAmount) > 0) {
                dueAmount = parseFloat(res.OrderSummary.DueAmount);
            }
            $("#lblTotalAmount").text(res.OrderSummary.TotalAmount);
            $("#lblPendingAmount").text(dueAmount);
            $("#txtInvoiceOrder").val(res.OrderSummary.InvoiceNumber);
            $("#txtInvoiceRaisedDate").val(res.OrderSummary.RaisedDate);
            $("#OrderSummaryHtml").html(res.OrderSummary.OrderHtml);
            $("#NoteText").show()

            taxSummary = "<table><tbody><tr><td>Sub - Total amount : </td><td>" + res.OrderSummary.OrderAmount + "</td></tr>";
            if ("IGST" in taxDeatils) {
                taxSummary += "<tr><td> IGST : </td><td>" + taxDeatils.IGST + "</td></tr>";
            }
            if ("SGST" in taxDeatils) {
                taxSummary += "<tr><td> IGST : </td><td>" + taxDeatils.SGST + "</td></tr>";
            }
            if ("CGST" in taxDeatils) {
                taxSummary += "<tr><td> IGST : </td><td>" + taxDeatils.CGST + "</td></tr>";
            }
            taxSummary += "<tr><td> Grand Total : </td><td>" + res.OrderSummary.TotalAmount + "</td></tr></tbody></table>"
            $("#TaxSummaryHtml").html(taxSummary);

        }
    });
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
    var activationAmount;
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
    var dueDate;
    if (paymentGateWayId == 1) {
        bankAccountId = $("#ddlOnlineTransferBank :selected").val();
        depositDate = $("#txtOnlineTransferDepositDate").val().trim();
        PaymentAmount = $("#txtOnlineTransferTransferAmount").val().trim();
        //activatePercentage = $("#txtOnlineTransferPercentageOfAmt :selected").val();
        //activationAmount = $("#txtOnlineTransferAmt").val();
        transactionNumber = $("#txtOnlineTransferTransactionNumber").val().trim();
        clientAccountNumber = $("#txtOnlineTransferClientAccount").val().trim();
        clientAccountName = $("#txtOnlineTransferClientAccountName").val().trim();
        Comments = $("#OnlineTransfrComments").val().trim();
        isTdsApplicable = $("#chkOnline").is(":checked");
        tdsPercentage = $("#ddlOnlineTANAmount :selected").val().trim();
        if (transactionNumber == "") {
            ErrorNotifier("Please enter transaction number");
            return false;
        }
        if (clientAccountNumber == "") {
            ErrorNotifier("Please enter client account number");
            return false;
        }
    }
    else if (paymentGateWayId == 2) {
        bankAccountId = $("#ddlChequeDepositingBankAccount :selected").val();
        depositDate = $("#txtOnlineTransferDepositDate").val().trim();
        PaymentAmount = $("#txtChequeAmount").val().trim();
        //activatePercentage = $("#txtChequePercentageOfAmt :selected").val();
        //activationAmount = $("#txtChequeOfAmt").val();
        chequeNumber = $("#txtCheque").val().trim();
        Comments = $("#ChequeComments").val().trim();
        tdsPercentage = $("#ddlChequeTANAmount :selected").val();
        clientAccountName = $("#txtChequeHolderName").val().trim();
        isTdsApplicable = $("#chkCheque").is(':checked');
        if (chequeNumber == "") {
            ErrorNotifier("Please enter cheque number");
            return false;
        }

    }
    else if (paymentGateWayId == 3) {
        depositDate = $("#txtCashDepositeDate").val().trim();
        PaymentAmount = $("#txtPOAmount").val().trim();
        bankAccountId = $("#ddlpurchaseOrderDepositingBank :selected").val().trim();
        Comments = $("#txtPOComments").val().trim();
    }
    else if (paymentGateWayId == 4) {
        dueDate = $("#txtPendingDueDate").val();
        Comments=$("#txtPendingComments").val().trim();

    }
    else if (paymentGateWayId == 5) {
        depositDate = $("#txtCashDepositeDate").val().trim();
        PaymentAmount = $("#txtCashDepositeAmount").val().trim();
        bankAccountId = $("#ddlCashDepositingBankAccount :selected").val().trim();
        //activatePercentage = $("#txtCashPercentageOfAmt :selected").val();
        //activationAmount = $("#txtCashOfAmt").val();
        isTdsApplicable = $("#chkCash").is(':checked');
        tdsPercentage = $("#ddlCashTANAmount :selected").val();
        Comments = $("#CashComments").val().trim();



    }
    //else if (paymentGateWayId == 6) {
    //    onlinePaymentGatewayId = $("#txtOnlineTransferThroughCCAvenueOnlinePaymentGateway :selected").val();
    //    paymentGatewayRefernceId = $("#txtOnlineTransferPaymentReferenceId").val();
    //    PaymentAmount = $("#txtOnlineTransferCCAvenueEnterAmount").val();
    //    transactionNumber = $("#txtOnlineTransferCCAvenueTransactionNumber").val();
    //    tdsPercentage = $("#txtOnlineTransferThroughCCAvenuePercentageOfAmt :selected").val();
    //    Comments = $("#txtOnlineTransferThroughCCAvenueComments").val();

    //}
    PaymentAmount = isNaN(PaymentAmount ) ? 0 : PaymentAmount;
    bankAccountId = isNaN(bankAccountId) ? 0 : bankAccountId;
    activationAmount = isNaN(activationAmount) ? 0 : activationAmount;
    isTdsApplicable = typeof isTdsApplicable == "undefined" ? false : isTdsApplicable;
    tdsPercentage = typeof tdsPercentage == "undefined" ? 0 : tdsPercentage;
    Comments = typeof Comments == "undefined" ? '' : Comments;
    depositDate = typeof depositDate == "undefined" ? '1/1/1900' : depositDate;
    dueDate = typeof dueDate == "undefined" ? '1/1/1900' : dueDate;
    clientAccountNumber = typeof clientAccountNumber == "undefined" ? '' : clientAccountNumber;
    transactionNumber = typeof transactionNumber == "undefined" ? '' : transactionNumber;
    clientAccountName = typeof clientAccountName == "undefined" ? '' : clientAccountName;
    chequeNumber = typeof chequeNumber == "undefined" ? '' : chequeNumber;
    paymentGatewayRefernceId = typeof paymentGatewayRefernceId == "undefined" ? '' : paymentGatewayRefernceId;
    
    if (paymentGateWayId != 4) {
        if (PaymentAmount == 0) {
            ErrorNotifier("Please enter deposit amount");
            return false;

        }
        if (bankAccountId == "") {
            ErrorNotifier("Please select bank account");
            return false;
        }
        if (depositDate.length == 0) {
            ErrorNotifier("Please Select Deposit Date");
            return false;
        }
    }
    else {
        if (dueDate.length == 0) {
            ErrorNotifier("Please Select Due Date");
            return false;
        }
    }
    if (paymentGateWayId != 3) {
        if (isTdsApplicable == true) {
            if (tdsPercentage == "Select") {
                ErrorNotifier("Please select tds percent");
                return false;

            }
        }
    }
   
   
    var searchData = '{"ProductId":"' + productId + '","InvoiceId":"' + invoiceId + '","AccountId":"' + accountId + '","DueDate":"' + dueDate + '","BillingModeId":"' + billingModeId + '","PaymentGatewayId":"' + paymentGateWayId + '","PaymentAmount":"' + PaymentAmount + '","BankAccountId":"' + bankAccountId + '","ChequeNumber":"' + chequeNumber + '","DepositeDate":"' + depositDate + '","IsTDSApplicable":"' + isTdsApplicable + '","TDSPercentage":"' + tdsPercentage + '","Comments":"' + Comments + '","TransactionNumber":"' + transactionNumber + '","ClientAccountNumber":"' + clientAccountNumber + '","ClientAccountName":"' + clientAccountName + '"}'
    ordersClient.GeneratePayment(searchData, function (res) {
        console.log(res);
        if (res.Success == true) {
            SuccessNotifier(res.Message);
            window.location.href = "/Payments.aspx";
        } else {
            ErrorNotifier(res.Message);
        }

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

$("#btnOrderSummary").click(function () {

    $("#btnOrderSummary").addClass("tab-style-blue").removeClass("tab-style-default");
    $("#btnPaymentMethod").removeClass("tab-style-blue").addClass("tab-style-default");

    var Id = $("#hdnInvoiceNumber").val();
    if (Id == 0) {
        $('#txtInvoiceOrder').attr('disabled', false);
        $('#txtInvoiceRaisedDate').attr('disabled', false);
        $('#txtInvoiceRaisedDate').datepicker({ autoclose: !0, format: "yyyy-mm-dd" });

    }
    $("#divIVORDate").show();
    $("#divIVORDate1").hide();

    return false;
});

$("#btnContinue").click(function () {
    $("#btnOrderSummary").removeClass("tab-style-blue").addClass("tab-style-default");
    $("#btnPaymentMethod").addClass("tab-style-blue").removeClass("tab-style-default");
    $("#divIVORDate").hide();
    $("#divIVORDate1").show();
    return false;
});