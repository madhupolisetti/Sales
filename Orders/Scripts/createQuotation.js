var accountId = $("#hdnAccountId").val();
var productId = $("#hdnProductId").val();
var quotationData;
$(document).ready(function () {
    var quotationId = $("#hdnQuotationId").val();
    var billMode = $("#hdnIsPostPaid").val();
    var mobile = $("#hdnMobileNo").val();
    var isPostPaid = 0;
    if (billMode == "2") {
        isPostPaid = 1;
    }
    if (quotationId != 0) {
        $("#btnEdit").show();
        var ordersClient = new OrdersClient();
        ordersClient.GetQuotationDetails(quotationId, isPostPaid, function (res) {
            if (res.Success == true) {
                quotationData = res.Quotation;
                formQuotationServicesData(quotationData);
            }
        });
    }
    else {
        $("#btnSave").show();
    }


})
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
            occurance = 0;
            serviceId = $(this).attr("id");
            SenderName = $(this).attr("toolname");
            jobjStr += "'" + SenderName + "':"
            if ($('.properties_' + serviceId).length > 1) {
                jobjStr += "[";
            }


            $('.properties_' + serviceId).each(function () {
                occurance++;
                if (occurance > 1) {
                    jobjStr += ',';
                }
                jobjStr += "{'Id':" + "'" + occurance + "',";
                jobjStr += "'Occurance':'" + occurance + "',";
                $(this).find(".check_tool").each(function () {


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

                });

                if ($(this).find('.extracharges_' + serviceId).find("#extDescription").val() != "") {
                    jobjStr += ",'ExtraCharges':[";
                    $(this).find('.extracharges_' + serviceId).each(function () {

                        jobjStr += "{";
                        jobjStr += "'Description':'" + $(this).find("#extDescription").val() + "',";
                        jobjStr += "'Amount':'" + $(this).find("#extAmount").val() + "'";
                        jobjStr += "},";
                    })
                    if (jobjStr.substring(jobjStr.length - 1) == ',') {
                        jobjStr = jobjStr.substring(0, jobjStr.length - 1);
                    }
                    jobjStr += "]}"
                }
                else {
                    jobjStr += "}";
                }
            });
            if (occurance > 1)
            { jobjStr += "]" }
            else
            { jobjStr += "}"; }



            //if ($('.properties_' + serviceId).length > 1) {
            //    jobjStr += "]";
            //}
            jobjStr += ',';
        }


    });
    if (jobjStr.substring(jobjStr.length - 1) == ',') {
        jobjStr = jobjStr.substring(0, jobjStr.length - 1);
    }
    jobjStr += "}";

    var ordersClient = new OrdersClient();
    ordersClient.CreateQuotation(productId, accountId, 1, jobjStr, 1, function (res) {
        if (res.Success == true) { }
    });

})


function formQuotationServicesData(quotationData) {

    selectQuotationServices(quotationData.QuotationServices);


}

function selectQuotationServices(quotationServices) {
    $(".check_tool").each(function () {
        var id = $(this).attr("id");
        for (var i = 0; i < quotationServices.length; i++) {
            if (id == quotationServices[i].ServiceId) {
                $(this).prop("checked", true);
                getServicePropertiesForEdit(id, quotationServices[i].QuotationServiceProperties, quotationServices[i].Id, quotationServices[i].ExtraCharges);



            }
        }
    })

}

function getServicePropertiesForEdit(serviceId, quotationServiceProperties, quotationServiceId, extraCharges) {
    extraCharges = JSON.parse(extraCharges);
    var serviceProperties = '';
    var str = '';
    var extra = 0;

    var ordersClient = new OrdersClient();
    ordersClient.GetServiceProperties(serviceId, true, function (res) {
        if (res.Success == true && res.Services.length != 0) {
            if (res.Services.Properties.length > 0) {
                // serviceProperties += "<table class='table no-border'><tbody>";
                for (var i = 0; i < res.Services.Properties.length; i++) {
                    serviceProperties += "<tr><td>"

                    if (res.Services.Properties[i].InputTypeId.toLowerCase() == "textbox") {
                        var propertyFields = new Array();
                        propertyFields = res.Services.Properties[i].PropertyFields;
                        if (propertyFields.length > 0) {
                            serviceProperties += '<input type="textbox" style="font-size:11px"  placeholder="' + res.Services.Properties[i].DisplayName + '" servicepropertycode="' + res.Services.Properties[i].MetaDataCode + '" class="check_tool form-control" id="Amount_1" toolpro="1"';

                        }
                        if ((res.Services.Properties[i].InputTypeId.toLowerCase() == "textbox" || $(res.Services.Properties[i].InputTypeId).toLowerCase() == "textarea") && res.Services.Properties[i].InputDataTypeId.toLowerCase() == "string") {
                            serviceProperties += 'maxlength="' + propertyFields[0].MaxLength + '"';
                        }


                        else {
                            serviceProperties += '<input type="textbox" style="font-size:11px" placeholder="' + res.Services.Properties[i].DisplayName + '" servicepropertycode="' + res.Services.Properties[i].MetaDataCode + '" class="check_tool form-control" id="Amount_1" toolpro="1"';
                        }

                        for (var j = 0; j < quotationServiceProperties.length; j++) {
                            if (quotationServiceProperties[j].MetaDataCode == res.Services.Properties[i].MetaDataCode) {
                                serviceProperties += 'value="' + quotationServiceProperties[j].Value + '"';
                            }


                        }
                        serviceProperties += '/>'
                    }


                    serviceProperties += "</tr></td>"
                }
                //serviceProperties += "</tbody></table>"
                str += "<div class='properties_" + serviceId + " cont-box alert-default margin-top-10' quotationServiceId=" + quotationServiceId + " ><table class='table no-border'>" + serviceProperties + "</table>";
                str += "<div class='pad-10'><hr class='margin-top-10 margin-bottom-5'></div>";
                str += "<h5 class='mb-0'><span class='pull-left'>Extra Charges</span><label class='pull-right'><a id='addExtraCharge' toolId='" + serviceId + "'><img src='images/plus.png' height='16' alt='add' onclick='' style=''></a></label></h5>";
                str += "<div class='clearfix'></div><div id='extracharge_" + serviceId + "'>";
                if (extraCharges != "") {
                    for (var key in extraCharges) {
                        str += "<div class='extracharges_" + serviceId + "'>";
                        if (extra > 0) {

                            str += "<h5 class='mb-0'><span class='pull-left'></span><label class='pull-right'><a id='deleteExtraCharge'>";
                            str += "<img src='images/cancel-red.png' height='16'  alt='delete' onclick='' style=''>";
                            str += "</a></label></h5>";
                        }
                        str += "<label class='block'><input type='textbox' style='font-size:11px' placeholder='Description' class='form-control extracharges' id='extDescription' value='" + key + "'></label>";
                        str += "<label class='block'><input type='textbox' style='font-size:11px' placeholder='Amount' class='form-control extracharges' id='extAmount' onkeypress='return isNumberKey(event)' value='" + extraCharges[key] + "'></label>";
                        str += "</div>";
                        extra++;
                    }
                }
                else {
                    str += "<div class='extracharges_" + serviceId + "'>";
                    str += "<label class='block'><input type='textbox' style='font-size:11px' placeholder='Description' class='form-control extracharges' id='extDescription'></label>";
                    str += "<label class='block'><input type='textbox' style='font-size:11px' placeholder='Amount' class='form-control extracharges' id='extAmount' onkeypress='return isNumberKey(event)'></label>";
                    str += "</div>";
                }
                str += "</div></div>";
                $(".div_" + serviceId).find(".service-label").append(str);
                $(".make-switch[id='IsBalanceValidity_" + serviceId + "']").bootstrapSwitch();
            }
            else {
                ErrorNotifier("No Properties are found");
            }


        }
    })


}

$("#btnEdit").click(function (e) {
    var jobjStr = "{";
    var serviceId = '';
    var SenderName = '';
    var occurance = 0;
    var id = 0;
    var quotationId = $("#hdnQuotationId").val();
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
            occurance = 0;
            serviceId = $(this).attr("id");
            SenderName = $(this).attr("toolname");
            jobjStr += "'" + SenderName + "':"
            if ($('.properties_' + serviceId).length > 1) {
                jobjStr += "[";
            }


            $('.properties_' + serviceId).each(function () {
                occurance++;
                id = $(this).attr("quotationserviceid");
                if (occurance > 1) {
                    jobjStr += ',';
            }
                jobjStr += "{'Id':" + "'" + id + "',";
                jobjStr += "'Occurance':'" + occurance + "',";
                $(this).find(".check_tool").each(function () {


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

                });

                if ($(this).find('.extracharges_' + serviceId).find("#extDescription").val() != "") {
                jobjStr += ",'ExtraCharges':[";
                    $(this).find('.extracharges_' + serviceId).each(function () {

                    jobjStr += "{";
                    jobjStr += "'Description':'" + $(this).find("#extDescription").val() + "',";
                    jobjStr += "'Amount':'" + $(this).find("#extAmount").val() + "'";
                    jobjStr += "},";
                })
                if (jobjStr.substring(jobjStr.length - 1) == ',') {
                    jobjStr = jobjStr.substring(0, jobjStr.length - 1);
                }
                    jobjStr += "]}"
            }
                else {
            jobjStr += "}";
            }
            });
            if (occurance > 1)
            { jobjStr += "]" }
            else
            { jobjStr += "}"; }



            //if ($('.properties_' + serviceId).length > 1) {
            //    jobjStr += "]";
            //}
            jobjStr += ',';
        }


    });
    if (jobjStr.substring(jobjStr.length - 1) == ',') {
        jobjStr = jobjStr.substring(0, jobjStr.length - 1);
    }
    jobjStr += "}";

    var ordersClient = new OrdersClient();
    ordersClient.UpdateQuotation(quotationId, 1, 1, jobjStr, 1, function (res) {
        if (res.Success == true) { }
    });
})
