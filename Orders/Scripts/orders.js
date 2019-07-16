var searchData = {};
var ordersClient = new OrdersClient();
var paymentStatusesLength = 7;
$(document).ready(function () {

    bindProducts()
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


    $("#defaultrange").daterangepicker();
    searchData.PageNumber = globalPageNumber;
    searchData.Limit = 0;
    getOrders(searchData);
    globalFunction = function () {

        AddSearchData();
        getOrders(searchData);
    };

    $("#btnsearch").click(function () {
        //searchData.BillingMode = $("#ddlBillMode").val();
        //searchData.ProductId = $("#ddlProduct").val();
        //searchData.Mobile = $("#txtMobile").val().trim();
        //searchData.Email = $("#txtEmail").val().trim();
        //searchData.OrderStatus = $("#ddlOrderStatus").val();
        //searchData.Number = $("#txtNumber").val();
        //searchData.AccountName = $("#txtAccountName").val();
        //searchData.PageNumber = globalPageNumber;
        //searchData.Limit = globalPageSize;
        AddSearchData();
        getOrders(searchData);
    });
    function AddSearchData() {
        searchData.BillingMode = $("#ddlBillMode").val();
        searchData.ProductId = $("#ddlProduct").val();
        searchData.Mobile = $("#txtMobile").val().trim();
        searchData.Email = $("#txtEmail").val().trim();
        searchData.OrderStatus = $("#ddlOrderStatus").val();
        searchData.Number = $("#txtNumber").val().trim();
        searchData.AccountName = $("#txtAccountName").val().trim();
        searchData.PageNumber = globalPageNumber;
        searchData.Limit = 0;
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
            $("#ddlProduct,#ddlProducts").html(productsData);
        });

    }

    function getOrders(ordersSearchData) {

        var ordersData = "";
        var dateRange = $("#daterangetext").val().trim();

        if (dateRange == "This Month") {
            var date = new Date();

            var from = new Date(date.getFullYear(), date.getMonth(), 1);
            from.setMinutes(from.getMinutes() - from.getTimezoneOffset());

            var to = new Date(date.getFullYear(), date.getMonth() + 1, 1);
            to.setMinutes(to.getMinutes() + to.getTimezoneOffset());

            ordersSearchData.FromDateTime = from;
            
            ordersSearchData.ToDateTime = to;
        }
        else {
            var fromDateT0date = dateRange.split("-");
            ordersSearchData.FromDateTime = fromDateT0date[0];
            ordersSearchData.ToDateTime = fromDateT0date[1];
        }
        ordersClient.GetOrders(ordersSearchData, function (res) {
            if (res.Success == true) {
                if (res.Orders.length > 0) {
                    pagination(res.Count, globalPageSize);
                    for (var i = 0; i < res.Orders.length; i++) {
                        ordersData += "<tr>";
                        ordersData += "<td>" + res.Orders[i].ProductName + "</td>";
                        ordersData += "<td><a class='nameHypClass'>" + res.Orders[i].AccountName + "</a></td>";
                        ordersData += "<td>" + res.Orders[i].AccountName + "</td>";
                        ordersData += "<td>" + res.Orders[i].Mobile + "</td>";
                        ordersData += "<td><a class='downloadInvoice' billmode='undefined' isbillgenerated='undefined' invoiceid='" + res.Orders[i].InvoiceId + "'>" + res.Orders[i].InvoiceNumber + "</a></td>";
                        ordersData += "<td>" + res.Orders[i].InvoiceRaisedTime + "</td>";
                        ordersData += "<td>" + res.Orders[i].LastPaidDate + "</td>";
                        ordersData += "<td><label class='bold' data-toggle='tooltip'>" + res.Orders[i].TotalAmount + "<br>" + res.Orders[i].CurrencyCode + "</label></td>";
                        ordersData += "<td>" + res.Orders[i].PaymentStatus + "</td>";
                        ordersData += "<td>" + res.Orders[i].DueDate + "</td>";
                        ordersData += "<td>" + res.Orders[i].PaymentMode + "</td>";
                        ordersData += "<td><select id='" + res.Orders[i].OrderId + "' class='AccountStatus form-control input-inline' paymentGatewayId='" + res.Orders[i].PaymentGatewayId + "' totalamount='" + res.Orders[i].TotalAmount + "' dueamount='" + res.Orders[i].DueAmount + "' invoicenumber='" + res.Orders[i].InvoiceNumber + "'";
                        if (res.Orders[i].PaymentStatusId == "1") {
                            ordersData += "><option value='1'>Verified</option><option value='2' selected>Not Verified</option>";

                        }
                        else {
                            ordersData += "disabled ><option value='1' selected>Verified</option><option value='2'>Not Verified</option>"

                        }

                        ordersData += "</select></td>";
                        //ordersData += "<td>" + res.Orders[i].OrderStatus + "</td>";
                        
                        //if (res.Orders[i].ActivationStatus != "3") {
                            ordersData += "<td class='activation' >";
                            ordersData += "<span id='active_" + res.Orders[i].OrderId + "'><input type='button' ProductAccountId='" + res.Orders[i].ProductAccountId + "' TotalAmt='" + res.Orders[i].TotalAmount + "' OrderAmount='" + res.Orders[i].OrderAmount + "' dueamount='" + res.Orders[i].DueAmount + "' AmountPaid='" + res.Orders[i].ReceivedAmount + "' ActivationCallBackUrl='" + res.Orders[i].ActivationCallBackUrl + "' InvoiceNumber='" + res.Orders[i].InvoiceNumber + "' OrderId='" + res.Orders[i].OrderId + "' BillingModeId='" + res.Orders[i].BillingModeId + "' QuotationId='" + res.Orders[i].QuotationId + "' class='btnActivation btn-link' id='360' value='" + res.Orders[i].ActivationStatus + "' metadata='' accountid='" + res.Orders[i].AccountId + "' taxAmount='" + res.Orders[i].TaxAmount + "' activationAmount='" + res.Orders[i].ActivationAmount + "'></span>"
                            ordersData += "</td>";
                        //}
                        //else {
                        //    ordersData += "<td class='activation' id='active_" + res.Orders[i].OrderId + "'>Activated</td>"
                        //}
                        ordersData += "<td></td>";

                        //ordersData += "<td><input type='button' class='btnChargeBack btn btn-warning btn-sm margin-bottom-5' style='width:100px;' id='" + res.Orders[i].InvoiceId + "' value='Charge Back'";
                        //if (res.Orders[i].PaymentStatusId == "2") {
                        //    ordersData += "disabled";
                        //}

                        //ordersData += "><input type='button' style='width:100px;' class='btnRefund btn btn-success btn-sm' id='" + res.Orders[i].InvoiceId + "' value='Refund'";
                        //if (res.Orders[i].PaymentStatusId == "2") {
                        //    ordersData += "disabled";
                        //}
                        //ordersData += "></td>";
                        ordersData += "</tr>";
                    }

                }
                else {
                    ordersData = "<tr><td colspan='14'> No Orders Available </td></tr>";
                }
                $("#data").html(ordersData);
            }
            else {
                ErrorNotifier(res.Message);
            }
        });
    }

    $(document).delegate('.btnActivation', 'click', function () {
        var quotationId = $(this).attr("QuotationId");
        var billingMode = $(this).attr("BillingModeId");
        var orderId = $(this).attr("OrderId");
        var activationUrl = $(this).attr("ActivationCallBackUrl");
        var productAccountId = $(this).attr("ProductAccountId");
        //var activatePercentage = $(this).attr("percentageofamount");
        var activatedAmount = $(this).attr("activationAmount");
        var InvoiceNumber = $(this).attr("InvoiceNumber");
        var totalAmount = $(this).attr("TotalAmt");
        var amountPaid = $(this).attr("AmountPaid");
        var orderAmount = $(this).attr("OrderAmount");
        
        var taxAmount = $(this).attr("taxAmount");
        var pendingAmount = $(this).attr("dueamount");
        var pendingAmountToActivate = orderAmount - activatedAmount;
        
        
        $("#btnActivate").attr("QuotationId", quotationId);
        $("#btnActivate").attr("BillingMode", billingMode);
        $("#btnActivate").attr("OrderId", orderId);
        $("#btnActivate").attr("ActivationCallBackUrl", activationUrl);
        $("#btnActivate").attr("ProductAccountId", productAccountId);
        $("#btnActivate").attr("pendingActivationAmount", pendingAmountToActivate);             
        $("#btnActivate").attr("taxAmount", taxAmount);
        //$("#btnActivate").attr("activationAmount", activationAmount);
        var service = '';
        ordersClient.GetQuotationServices(quotationId, billingMode, true, function (res) {
            console.log(res);
            var quotationServices = "";
            if (res.Success == true) {
                quotationServices += "<label style='padding-left:20px;'><strong>Order Amount : </strong></label></td><td><label  class='label label-info label-sm '><b>" + orderAmount + "</b> </label>"
                quotationServices += "<label style='padding-left:20px;' ><strong>Tax Amount : </strong></label></td><td><label  class='label label-warning label-sm '><b>" + taxAmount + "</b> </label> "
                quotationServices += "<label style='padding-left:20px;' ><strong>Total Amount : </strong></label></td><td><label  class='label label-primary label-sm '><b>" + totalAmount + "</b> </label> "
                quotationServices += "<label style='padding-left:20px;' ><strong>Amount Received : </strong></label > <label  class='label label-success label-sm'>  <b>" + amountPaid + "</b> </label> "
                quotationServices += "<label style='padding-left:20px;' ><strong>Due :</strong></label > <label  class='label label-danger label-sm'>  <b>" + pendingAmount + "</b> </label> "
                quotationServices += "<table class='table table-bordered margin-top-40 margin-bottom-20 '><thead style='background-color:#2977AA;color:white;'><tr><th>Service</th><th>Invoice No</th><th>Order ID</th>";
                quotationServices += "<th >Amount Activated</th> <th >Pending Amount to Activate</th> </tr></thead>"
                for (var i = 0; i < res.QuotationServices.length; i++) {

                    if (res.QuotationServices[i].Service == "PerMinutePlan") {
                        service = "PerMinutePlan";
                        //quotationServices += "<input type='checkbox' IsPerMinutePlan='True' class='chkQuotationServices' ServiceId='" + res.QuotationServices[i].Id + "' Service='" + res.QuotationServices[i].Service + "'/> <span> " + res.QuotationServices[i].Service + " </span>&nbsp;&nbsp;&nbsp;</br>"
                        quotationServices += "<tr><td><label IsPerMinutePlan='True' class='LabelQuotationServices' ServiceId='" + res.QuotationServices[i].Id + "' Service='" + res.QuotationServices[i].Service + "'>" + res.QuotationServices[i].Service + " </label></td>"
                        quotationServices += "<td>" + InvoiceNumber + "</td><td>" + orderId + "</td>"
                        quotationServices += "<td>" + activatedAmount + "</td><td>" + pendingAmountToActivate + "</td>"
                    }
                    else {
                        quotationServices += "<input type='checkbox' IsPerMinutePlan='False' class='chkQuotationServices' ServiceId='" + res.QuotationServices[i].Id + "' Service='" + res.QuotationServices[i].Service + "'/> <span> " + res.QuotationServices[i].Service + " </span></br>"
                    }

                }
                quotationServices += "</tr></table>"
                quotationServices += "<div style='text-align:center;'> <label><strong> Activation Amount :  </strong></label> <input type='text' style='width:30%;display:inline-block;' placeholder='Enter Amount to be Activated' class='form-control' onkeypress='return isNumberKey(event)' id='activationAmount'";
                if (pendingAmountToActivate <= 0)
                    quotationServices+=" disabled title='total Amount Activated'";
                quotationServices += "/> </div>"
                $("#divQuotationservices").html(quotationServices);
                if (service != '')
                    $("#quotationServicesModal").modal('show');
                else
                    alert('Activations are only for grptalk Per-Minute Service');

            }
            else {
                ErrorNotifier(res.Message);
            }
        });

    });

    $("#btnActivate").click(function () {
        var searchData = "";
        var quotationId = $(this).attr("QuotationId");
        var billingMode = $(this).attr("BillingMode");
        var orderId = $(this).attr("OrderId");
        var activationUrl = $(this).attr("ActivationCallBackUrl");
        var quotationServiceProperties = [];
        var productAccountId = parseFloat($(this).attr("ProductAccountId"));
        var pendingActivationAmount = $(this).attr("pendingActivationAmount");
        var taxAmount = $(this).attr("taxAmount");
        //var activatePercentage = $(this).attr("activatePercentage");
        var activationAmount = parseFloat($("#activationAmount").val().trim());
        var isPostPaid = false;
        var success='';
        if (billingMode == 2)
            isPostPaid = true;
        activationAmount = isNaN(activationAmount) ? 0 : activationAmount;
        if (pendingActivationAmount <= 0) {
            ErrorNotifier("There is no pending amount to Activate");
            return false;
        }
        else if (activationAmount <= 0) {
            ErrorNotifier("Activation amount should be greater than zero");
            return false;
        }
        else if (activationAmount == '') {
            ErrorNotifier("Enter Activation Amount");
            return false;
        }
        else if (activationAmount > pendingActivationAmount) {
            ErrorNotifier("Activation amount should not be greater than " + pendingActivationAmount);
            return false;
        }
              
        
            //var activatedPercentage = $("#ddlActivatePercentage").val();

            ordersClient.ActivateOrder(activationUrl, quotationId, isPostPaid, activationAmount, function (res) {
                if (res.success == "true") {
                    success = true;
                    SuccessNotifier("Amount Activated Succesfully");
                    ordersClient.VerifyOrderStatuses(orderId, activationAmount, success, function (res) {
                        setTimeout(function () { window.location.href = "/Orders.aspx" }, 1000);
                        console.log(res);
                    })
                    
                }
                else {
                    success = false;
                    ErrorNotifier(res.Response.Reason);
                    ordersClient.VerifyOrderStatuses(orderId, activationAmount, success, function (res) {
                        setTimeout(function () { window.location.href = "/Orders.aspx" }, 1000);
                        console.log(res);
                    })
                }

            });
            
           
    });


});


$(document).delegate('.AccountStatus', 'change', function () {
    AccountStatusorderid = $(this).attr("id");
    AccountStatusVal = $(this).val().trim();

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



