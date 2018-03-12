var searchData = {};
    var ordersClient = new OrdersClient();
var paymentStatusesLength = 7;
$(document).ready(function () {

    bindProducts()
    ordersClient.GetOrderStatuses(true, function (res) {
        if (res.Success == true) {
            var orderStatus = "";
            orderStatus = "<option value=0>Select</option>";
            for (var i = 0; i < res.PaymentStatuses.length; i++) {
                orderStatus += "<option value=" + res.PaymentStatuses[i].Id + " bank>" + res.PaymentStatuses[i].Status + "</option>"
            }
            $("#ddlOrderstatus").html(orderStatus);
        }
    });

    $("#defaultrange").daterangepicker();

    searchData.ProductId = 1;
    searchData.AccountId = 1;
    searchData.BillingMode = 1;
    getOrders(searchData);


    $("#btnsearch").click(function () {

        getOrders(searchData);

    })
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
            $("#ddlProduct,#ddlProducts").html(productsData);
        });

    }

    function getOrders(ordersSearchData) {

        var ordersData = "";
        var dateRange = $("#daterangetext").val();

        if (dateRange == "This Month") {
            searchData.FromDateTime = "2018-02-01";
            searchData.ToDateTime = "2018-02-28";
        }
        else {
            var fromDateT0date = dateRange.split("-");
            searchData.FromDateTime = fromDateT0date[0];
            searchData.ToDateTime = fromDateT0date[1];
        }
        ordersClient.GetOrders(ordersSearchData, function (res) {
            if (res.Success == true) {
                if (res.Orders.length > 0) {

                    for (var i = 0; i < res.Orders.length; i++) {
                        ordersData += "<tr>";
                        ordersData += "<td><a class='nameHypClass'>" + res.Orders[i].AccountName + "</a></td>";
                        ordersData += "<td>" + res.Orders[i].AccountName + "</td>";
                        ordersData += "<td>" + res.Orders[i].Mobile + "</td>";
                        ordersData += "<td><a class='downloadInvoice' billmode='undefined' isbillgenerated='undefined' invoiceid='" + res.Orders[i].InvoiceId + "'>" + res.Orders[i].InvoiceNumber + "</a></td>";
                        ordersData += "<td>" + res.Orders[i].InvoiceRaisedTime + "</td>";
                        ordersData += "<td>" + res.Orders[i].LastPaidDate + "</td>";
                        ordersData += "<td><label class='bold' data-toggle='tooltip'>" + res.Orders[i].TotalAmount + "<br>" + res.Orders[i].CurrencyCode + "</label></td>";
                        ordersData += "<td>" + res.Orders[i].PaymentStatus + "</td>";
                        ordersData += "<td><select id='" + res.Orders[i].Id + "' class='AccountStatus form-control input-inline' paymentGatewayId='" + res.Orders[i].PaymentGatewayId + "' totalamount='" + res.Orders[i].TotalAmount + "' dueamount='" + res.Orders[i].DueAmount + "' invoicenumber='" + res.Orders[i].InvoiceNumber + "'";
                        if (res.Orders[i].PaymentStatusId == "2") {
                            ordersData += "><option value='1'>Verified</option><option value='2' selected>Not Verified</option>";

                        }
                        else {
                            ordersData += "disabled ><option value='1' selected>Verified</option><option value='2'>Not Verified</option>"

                        }

                        ordersData += "</select></td>";
                        ordersData += "<td>" + res.Orders[i].ActivationStatus + "</td>";
                        if (res.Orders[i].PaymentStatusId == "2") {
                            ordersData += "<td class='activation' id='" + res.Orders[i].Id + "'>";
                            ordersData += "<span>Activation</span><input type='button' class='btnActivation btn-link' id='360' value='Activation' metadata='' accountid='' percentageofamount='' style='display:none'>"
                            ordersData += "</td>";
                        }
                        else {
                            ordersData += "<td class='activation'><input type='button' class='btnActivation btn-link' id='360' value='Activation' metadata='' accountid='' percentageofamount=''></td>"
                        }
                        ordersData += "<td></td>";

                        ordersData += "<td><input type='button' class='btnChargeBack btn btn-warning btn-sm margin-bottom-5' style='width:100px;' id='" + res.Orders[i].InvoiceId + "' value='Charge Back'";
                        if (res.Orders[i].PaymentStatusId == "2") {
                            ordersData += "disabled";
                        }

                        ordersData += "><input type='button' style='width:100px;' class='btnRefund btn btn-success btn-sm' id='" + res.Orders[i].InvoiceId + "' value='Refund'";
                        if (res.Orders[i].PaymentStatusId == "2") {
                            ordersData += "disabled";
                        }
                        ordersData += "></td></tr>";
                    }

                }
                else {
                    ordersData = "<tr><td colspan='13'> No Orders Available </td></tr>";
                }
                $("#data").html(ordersData);
            }
            else {
                ErrorNotifier(res.Message);
            }
        });
    }

    $(document).delegate('.AccountStatus', 'change', function () {
        AccountStatusorderid = $(this).attr("id");
        AccountStatusVal = $(this).val();

        //
        var hdnorderid = $(this).attr("id");
        $("#hdnOrderId").val(hdnorderid);
        $("#hdnInvoiceNumber").val($(this).attr("invoicenumber"));
        $("#hdnTotalAmount").val($(this).attr("totalamount"));
        $("#hdnDueAmount").val($(this).attr("dueamount"));
        ViewPaymentDetails(hdnorderid);
        //
        //$("#ccAdressModal").modal('show');
    });


    function ViewPaymentDetails(orderId) {

        var paymentsWiseArray;
        var paymentDetailsTable = "";
        ordersClient.ViewPayment(1, orderId, function (res) {
            if (res.Success == true) {
                $("#divMultiplePayments").modal('show');
                if (res.PaymentDetails.length > 0) {
                    $("#bTotalPayment").html($("#hdnTotalAmount").val());
                    $("#bPendingAmount").html($("#hdnDueAmount").val());
                    for (var i = 1; i <= paymentStatusesLength; i++) {
                        paymentsWiseArray = new Array();
                        paymentsWiseArray = sortPaymentDetailsArray(i, res.PaymentDetails);
                        if (paymentsWiseArray.length > 0 && paymentsWiseArray[0].PaymentGatewayID == 1) {
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
                        else if (paymentsWiseArray.length > 0 && paymentsWiseArray[0].PaymentGatewayID == 2) {
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
                        else if (paymentsWiseArray.length > 0 && paymentsWiseArray[0].PaymentGatewayID == 3) {
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
                        else if (paymentsWiseArray.length > 0 && paymentsWiseArray[0].PaymentGatewayID == 5) {
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
    $(document).on("click", "#ccSubmit", function () {
        var orderId = $("#hdnOrderId").val();
        ordersClient.VerifyPaymentStatuses(orderId, function (res) {
            if (res.Success == true) {
                $('.AccountStatus[id="' + orderId + '"]').prop("disabled", true);
                $('.activation[id="' + orderId + '"] span').hide();
                $('.activation[id="' + orderId + '"] input').show();

            }
        })
    })

    function sortPaymentDetailsArray(paymentGateWayId, paymentDetails) {
        return $.grep(paymentDetails, function (element, index) {
            return element.PaymentGatewayID == paymentGateWayId;
        });
    }
});


