var searchData = {};
$(document).ready(function () {
    var ordersClient = new OrdersClient();
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
                        ordersData += "<td><select id='" + res.Orders[i].Id + "' class='AccountStatus form-control input-inline' paymentGatewayId='" + res.Orders[i].PaymentGatewayId + "' >";
                        if (res.Orders[i].PayementStatus == "2") {
                            ordersData += "<option value='1'>Verified</option><option value='2' selected>Not Verified</option>";

                        }
                        else {
                            ordersData += "<option value='1' selected>Verified</option><option value='2'>Not Verified</option>"

                        }

                        ordersData += "</select></td>";
                        ordersData += "<td>" + res.Orders[i].ActivationStatus + "</td>";
                        ordersData += "<td>Activation</td>";
                        ordersData += "<td></td>";

                        ordersData += "<td><input type='button' class='btnChargeBack btn btn-warning btn-sm margin-bottom-5' style='width:100px;' id='" + res.Orders[i].InvoiceId + "' value='Charge Back'";
                        if (res.Orders[i].PayementStatus == "2") {
                            ordersData += "disabled";
                        }

                        ordersData += "><input type='button' style='width:100px;' class='btnRefund btn btn-success btn-sm' id='" + res.Orders[i].InvoiceId + "' value='Refund'";
                        if (res.Orders[i].PayementStatus == "2") {
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
        $("#hiddenOrderId").val(hdnorderid);
        DisplayPaymentDetails(hdnorderid);
        //
        //$("#ccAdressModal").modal('show');
    });
});


