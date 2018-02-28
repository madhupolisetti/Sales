var accountId = $("#hdnAccountId").val();
var productId = $("#hdnProductId").val();
$("#btnSave").click(function () {
    var jobjStr = "{";
    var serviceId = '';
    var SenderName = '';
    var serviceIds = new Array();
    var occurance = 0;


    var checkboxes = $("#divMain :checkbox");
    var chkboxesCheckedCount = checkboxes.filter(":checked").length;
    if (chkboxesCheckedCount == 0) {
        ErrorNotifier("Please select at least one Service");
        //  $("#btnSave").show();
        $(this).prop("disabled", false);
        return false;
    }

    $("input[type=checkbox]").each(function () {

        if ($(this).prop("checked")) {
            serviceId = $(this).attr("id");
            SenderName = $(this).attr("toolname");
            jobjStr += "'" + SenderName + "':"
            if ($('.properties_' + serviceId).length > 1) {
                jobjStr += "[";
            }
            else {
                occurance = 1;
            }

            jobjStr += "{'Id':" + "'" + occurance + "',";
            jobjStr += "'Occurance':'" + occurance + "',";
            $('.properties_' + serviceId).find(".check_tool").each(function () {
                var value = "";
                if ($(this).attr('type') == "textbox" || $(this).attr('type') == "textarea") {
                    value = $(this).val();
                }
                else if ($(this).is('type') == "select") {
                    value = $(this).value();
                }

                jobjStr += "'" + $(this).attr("servicepropertycode") + "':'" + value;
                if ($(this).parents("tr").is(':last-child')) {
                    jobjStr += "'";
                }
                else {
                    jobjStr += "',";
                };

            })

            if ($('.properties_' + serviceId).find('.extracharges_' + serviceId).find("#extDescription").val() != "") {
                jobjStr += ",'ExtraCharges':[";
                $('.properties_' + serviceId).find('.extracharges_' + serviceId).each(function () {

                    jobjStr += "{";
                    jobjStr += "'Description':'" + $(this).find("#extDescription").val() + "',";
                    jobjStr += "'Amount':'" + $(this).find("#extAmount").val() + "'";
                    jobjStr += "},";
                })
                if (jobjStr.substring(jobjStr.length - 1) == ',') {
                    jobjStr = jobjStr.substring(0, jobjStr.length - 1);
                }
                jobjStr += "]"
            }
            jobjStr += "}";
            if ($('.properties_' + serviceId).length > 1) {
                jobjStr += "]";
            }
            jobjStr += ',';
        }


    });
    if (jobjStr.substring(jobjStr.length - 1) == ',') {
        jobjStr = jobjStr.substring(0, jobjStr.length - 1);
    }
    jobjStr += "}";

    var ordersClient = new OrdersClient();
    ordersClient.CreateQuotation(productId, accountId, 1, 1, jobjStr, 1, function (res) {
        if (res.Success == true) { }
    });

})
