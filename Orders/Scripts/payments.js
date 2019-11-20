var paymentSearchData = {};

var dateRange;
var paymentsResponse = [];
var paymentStatusesLength = 0;
$(document).ready(function () {
    var ordersClient = new OrdersClient();
    dateRange = $("#daterangetext").val().trim();
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
    
    paymentSearchData.PageNumber = globalPageNumber;
    paymentSearchData.Limit = 0;
    paymentSearchData.isdownload = false;
    getPayments();
    globalFunction = function () {
        paymentSearchData.isdownload = false;
        AddSearchData();
        getPayments();
    };
    
    $("#btn_downlaod").click(function () {
        paymentSearchData.AccountId = 0;
        paymentSearchData.isdownload = true;
        AddSearchData();
        getPayments();
    });
    $("#btnSearch").click(function () {
        //paymentSearchData.ProductId = $("#ddlProduct").val();
        //paymentSearchData.Number = $("#txtNumber").val();
        globalPageNumber = 1;
        paymentSearchData.AccountId = 0;
        paymentSearchData.isdownload = false;
        //paymentSearchData.Mobile = $("#txtMobile").val();
        //paymentSearchData.Email = $("#txtEmail").val();
        //paymentSearchData.PaymentStatus = $("#ddlOrderStatus :selected").val();
        //paymentSearchData.BillingMode = $("#ddlBillMode :selected").val();
        //paymentSearchData.AccountName = $("#txtAccountName").val();

        AddSearchData();
        getPayments();
    });
    function AddSearchData() {
        paymentSearchData.ProductId = $("#ddlProduct").val();
        paymentSearchData.Number = $("#txtNumber").val().trim();
        paymentSearchData.Mobile = $("#txtMobile").val().trim();
        paymentSearchData.Email = $("#txtEmail").val().trim();
        paymentSearchData.PaymentStatus = $("#ddlOrderStatus :selected").val();
        paymentSearchData.BillingMode = $("#ddlBillMode :selected").val();
        paymentSearchData.AccountName = $("#txtAccountName").val().trim();
        paymentSearchData.PageNumber = globalPageNumber;
        paymentSearchData.Limit = 0;
    }

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
        

        dateRange = $("#daterangetext").val().trim();
        var ordersClient = new OrdersClient();
        if (dateRange == "This Month") {
            var date = new Date();

            var from = new Date(date.getFullYear(), date.getMonth(), 1);
            from.setMinutes(from.getMinutes() - from.getTimezoneOffset());

            var to = new Date(date.getFullYear(), date.getMonth() + 1, 1);
            to.setMinutes(to.getMinutes() + to.getTimezoneOffset());

            paymentSearchData.FromDateTime = from;
            paymentSearchData.ToDateTime = to;
        }
        else {
            var fromDateT0date = dateRange.split("-");
            paymentSearchData.FromDateTime = fromDateT0date[0];
            paymentSearchData.ToDateTime = fromDateT0date[1];
        }
        ordersClient.GetPayments(paymentSearchData, function (res) {
            if (res.Success == true) {

                var payments = "";
                if (res.Payments.length > 0)
                {
                    pagination(res.Count, globalPageSize);
                    for (var i = 0; i < res.Payments.length; i++) {
                        payments += "<tr InvoiceId = " + res.Payments[i].invoiceId + " StatusId = " + res.Payments[i].StatusId + " ><td><input type='checkbox' statusid='" + res.Payments[i].StatusId + "' id='" + res.Payments[i].OrderId + "' countryid=''tannumber='' class='check_tool' status='" + res.Payments[i].PaymentStatus + "' invoicenumber='" + res.Payments[i].InvoiceNumber + "' totalamount='" + res.Payments[i].TotalAmount + "' dueamount='" + res.Payments[i].DueAmount + "' value='10379' ><label class='css-label' for='" + res.Payments[i].OrderId + "'></label></td>";
                        payments += "<td style='border-color:#C0C0C0;'>" + res.Payments[i].ProductName + "</td>";
                        payments += "<td style='border-color:#C0C0C0;'>" + res.Payments[i].AccountName + "</td>";
                        payments += "<td style='border-color:#C0C0C0;'>" + res.Payments[i].CompanyName + "</td>";
                        payments += "<td style='border-color:#C0C0C0;'>" + res.Payments[i].OwnershipName + "</td>";
                        payments += "<td style='border-color:#C0C0C0;' >" + res.Payments[i].Mobile + "</td>";
                        payments += "<td style='border-color:#C0C0C0;'>" + res.Payments[i].Email + "</td>";
                        payments += "<td style='border-color:#C0C0C0;'>" + res.Payments[i].InvoiceRaisedTime + "</td>";
                        payments += "<td style='border-color:#C0C0C0;'>" + res.Payments[i].InvoiceNumber + "</td>";
                        payments += "<td style='border-color:#C0C0C0;'>" + res.Payments[i].ProformaInvoiceNumber + "</td>";
                        payments += "<td style='border-color:#C0C0C0;'>" + res.Payments[i].TotalAmount + "</td>";
                        payments += "<td style='border-color:#C0C0C0;'>" + res.Payments[i].ReceivedAmount + "</td>";
                        payments += "<td style='border-color:#C0C0C0;'>" + res.Payments[i].DueAmount + "</td>";
                        payments += "<td style='border-color:#C0C0C0;'><a data-toggle='modal' data-target='#UpdatePaymentStatus' class='status'>" + res.Payments[i].PaymentStatus + "</a></td>";
                        payments += "<td style='border-color:#C0C0C0;'>" + res.Payments[i].PaymentMode + "</td>";
                        payments += "<td style='border-color:#C0C0C0;'>" + res.Payments[i].Comments + "</td>";
                        payments += "<td style='border-color:#C0C0C0;'>" + res.Payments[i].LastPaidDate + "</td>";
                        
                        //payments += "<td style='border-color:#C0C0C0;'>&nbsp;</td>";
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

        if ($(this).attr("type") == "checkbox") {
            if ($(this).prop("checked")) {

                $('.check_tool').prop('checked', false);
                $('.check_tool').removeClass("Checked");

                $(this).prop('checked', true);
                $(this).addClass("Checked");

                $("#hdnOrderId").val($(this).attr("id"));
                $("#hdnInvoiceNumber").val($(this).attr("invoicenumber"));
                $("#hdnTotalAmount").val($(this).attr("totalamount"));
                $("#hdnDueAmount").val($(this).attr("dueamount"));

                if ($(this).attr("statusid") == "2")
                    $("#btnpayment").attr("class", "disable-icn");
                else
                    $("#btnpayment").attr("class", "enable-icn");
            }
            else {
                $('.check_tool').prop('checked', false);
                $('.check_tool').removeClass("Checked");
                $("#btnpayment").attr("class", "disable-icn");
            }
        }
    })

    $("#btnview").click(function () {
        var orderId = $("#hdnOrderId").val();
        ViewPaymentDetails(orderId);
    })

    //set updateStatus Model values on model show
    $('#tblDiv').delegate('.status', 'click', function () {
        var accessRole = parseInt($('#AccessRole').val())
        if (accessRole == 2 || accessRole == 5 || accessRole == 6) {
            ordersClient.PaymentStatuses(function (res) {
                if (res.Success == true) {
                    var paymentStatus = "";
                    for (var i = 0; i < res.PaymentStatuses.length; i++) {
                        paymentStatus += "<option value=" + res.PaymentStatuses[i].Id + " bank>" + res.PaymentStatuses[i].Status + "</option>"
                    }
                    $("#paymentstatuses").html(paymentStatus);
                }
            });
            $('#paymentstatuses').val($(this).parent().parent().attr('statusid'))
            $('#updateStatus').attr('invoiceid', $(this).parent().parent().attr('invoiceid'))
        } else return false;
    })

    //update status
    $("#updateStatus").click(function () {
        var accessRole = parseInt($('#AccessRole').val())
        if ($("#comment").val() != '') {
            ordersClient.UpdatePaymentStatus($(this).attr('invoiceid'), $('#paymentstatuses').val(), $('#comment').val(), function (res) {
                if (res.Success == true) {
                    $('#UpdatePaymentStatus').modal('hide');
                    SuccessNotifier(res.Message);
                    getPayments()
                }
                else {
                    ErrorNotifier(res.Message);
                }
            })
        } else {
            alert("Enter Comment");
        }
    })

    //clear model data on model close
    $('#UpdatePaymentStatus').on('hidden.bs.modal', function () {
        $('#paymentstatuses').val('0');
        $('#comment').val('');
        $('#updateStatus').attr('invoiceid','');
    })

    function ViewPaymentDetails(orderId) {
        var ordersClient = new OrdersClient();
        var paymentsWiseArray;
        var paymentDetailsTable = "";
        var paymentGateway = 0;
        $("#divMultiplePaymentDetails").html('');
        ordersClient.ViewPayment(1, orderId, function (res) {
            if (res.Success == true) {
                $("#divMultiplePayments").modal('show');
                if (res.PaymentDetails.length > 0) {
                    $("#totalAmount").html($("#hdnTotalAmount").val());
                    $("#pendingAmount").html($("#hdnDueAmount").val());
                    paymentStatusesLength = Object.keys( res.DistinctGateways).length;
                    
                    for (var i = 1; i <= paymentStatusesLength; i++) {
                        paymentsWiseArray = new Array();
                        if (paymentStatusesLength == 1)
                            paymentGateway = res.DistinctGateways.PaymentGatewayID;
                        else
                            paymentGateway = res.DistinctGateways[i - 1].PaymentGatewayID;
                        paymentsWiseArray = sortPaymentDetailsArray(paymentGateway, res.PaymentDetails);
                        if (paymentsWiseArray.length > 0 && paymentsWiseArray[0].PaymentGatewayID == 1) {
                            paymentDetailsTable += "<table class='table table-bordered margin-top-20'><thead style='background-color:#2977AA;color:white;'><tr><th>Invoice Number</th><th >Payment Type</th><th >Bank Account</th><th class='th'>Deposit Date</th><th>Amount Paid</th>";
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
                            paymentDetailsTable += "<table class='table table-bordered margin-top-20'><thead style='background-color:#2977AA;color:white;'><tr><th>Invoice Number</th><th >Payment Type</th><th >Bank Account</th><th class='th'>Deposit Date</th><th>Amount Paid</th>";
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
                            paymentDetailsTable += "<table class='table table-bordered margin-top-20'><thead style='background-color:#2977AA;color:white;'><tr><th>Invoice Number</th><th >Payment Type</th><th >Bank Account</th><th class='th'>Deposit Date</th><th>Client Company</th>";
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
                            paymentDetailsTable += "<table class='table table-bordered margin-top-20'><thead style='background-color:#2977AA;color:white;'><tr><th>Invoice Number</th><th >Payment Type</th><th >Bank Account</th><th class='th'>Deposit Date</th>";
                            paymentDetailsTable += "<th>Amount Paid</th><th >Comments</th></tr></thead>"
                            for (var p = 0; p < paymentsWiseArray.length; p++) {
                                paymentDetailsTable += "<tr><td>" + $("#hdnInvoiceNumber").val() + "</td>";
                                paymentDetailsTable += "<td>" + paymentsWiseArray[p].Name + "</td>";
                                paymentDetailsTable += "<td>" + paymentsWiseArray[p].BankName + "</td>";
                                paymentDetailsTable += "<td>" + paymentsWiseArray[p].DepositDate + "</td>";
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