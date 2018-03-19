var paymentSearchData = {};
var dateRange;
var paymentsResponse = [];
var paymentStatusesLength = 0;
$(document).ready(function () {
    var ordersClient = new OrdersClient();
    dateRange = $("#daterangetext").val();
    bindProducts();
    $("#daterangetext").daterangepicker();
    $("#btnview,#btnpayment,#btncreate").attr("class", "enable-icn");
    $("#btnedit,#btninvoice,#btndelete,#btndownload").attr("class", "disable-icn");

    ordersClient.GetOrderStatuses(true, function (res) {
        if (res.Success == true) {
            var orderStatus = "";
            orderStatus = "<option value=0>Select</option>";
            for (var i = 0; i < res.OrderStatuses.length; i++) {
                orderStatus += "<option value=" + res.OrderStatuses[i].Id + " bank>" + res.OrderStatuses[i].Status + "</option>"
            }
            $("#ddlOrderStatus").html(orderStatus);
        }
    });
    
    

    getPayments();

    $("#btnSearch").click(function () {
        paymentSearchData.ProductId = $("#ddlProduct").val();
        paymentSearchData.Number = $("#txtNumber").val();
        paymentSearchData.AccountId = 0;
        paymentSearchData.Mobile = $("#txtMobile").val();
        paymentSearchData.Email = $("#txtEmail").val();
        paymentSearchData.PaymentStatus = $("#ddlOrderStatus :selected").val();
        paymentSearchData.BillingMode = $("#ddlBillMode :selected").val();
        paymentSearchData.AccountName = $("#txtAccountName").val();
        getPayments();
    });

    $(document).delegate('#FilterByMore', 'click', function () {
        var anchorText = $(this).text();
        if (anchorText == "Search by more") {
            $("#secondRow").show();
            $("#FilterByMore").text("Search by less");
            $("#filterIcn").removeClass("fa fa-caret-down").addClass("fa fa-caret-up");
        }
        else {
            $("#secondRow").hide();
            $("#FilterByMore").text("Search by more");
            $("#filterIcn").removeClass("fa fa-caret-up").addClass("fa fa-caret-down");
        }
    });
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
            var date = new Date();
            paymentSearchData.FromDateTime = new Date(date.getFullYear(), date.getMonth(), 1);
            paymentSearchData.ToDateTime = new Date(date.getFullYear(), date.getMonth() + 1, 0);
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
                        payments += "<tr><td><input type='checkbox' statusid='" + res.Payments[i].StatusId + "' id='" + res.Payments[i].OrderId + "' countryid=''tannumber='' class='check_tool' status='" + res.Payments[i].PaymentStatus + "' invoiceid='10401' invoicenumber='" + res.Payments[i].InvoiceNumber + "' totalamount='" + res.Payments[i].TotalAmount + "' dueamount='" + res.Payments[i].DueAmount + "' value='10379' ><label class='css-label' for='" + res.Payments[i].OrderId + "'></label></td>";
                        payments += "<td style='border-color:#C0C0C0;'>" + res.Payments[i].ProductName + "</td>";
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
                    payments = "<tr><td colspan='16' align='center'>No payments available</tr></td>";

                }
                $("#tblDiv").html(payments);
            }
            else {
                ErrorNotifier(res.Message);
            }
        });

    }

    $(document).on("click", ".check_tool", function () {
        $('.check_tool').prop('checked', false);
        $('.check_tool').removeClass("Checked");
        $(this).prop('checked', true);
        $(this).addClass("Checked");
        if ($(this).attr("type") == "checkbox") {
            if ($(this).prop("checked")) {
                $("#hdnOrderId").val($(this).attr("id"));
                $("#hdnInvoiceNumber").val($(this).attr("invoicenumber"));
                $("#hdnTotalAmount").val($(this).attr("totalamount"));
                $("#hdnDueAmount").val($(this).attr("dueamount"));
                if($(this).attr("statusid") == "2"){
                    $("#btnpayment").attr("class", "disable-icn");
                }
                else {
                    $("#btnpayment").attr("class", "enable-icn");
                }
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

    function sortPaymentDetailsArray(paymentGateWayId, paymentDetails) {
        return $.grep(paymentDetails, function (element, index) {
            return element.PaymentGatewayID == paymentGateWayId;
        });
    }
});