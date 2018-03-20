var srvPropJsonObject = new Array();
$(document).ready(function () {
    var productId = $("#hdnProductId").val();
    var srvServiceJsonObject = "";
    var servicePropertiesJsonobject = "";
    var servPropertiesId = "";
    var srvCallerIdJsonObject = "";
    getServices(productId, 0, true, false, false);
})


$(document).on("change", ".check_tool", function () {
    if ($(this).attr("type") == "checkbox") {

        toolId = "";
        toolId += $(this).val().trim();
        if ($(this).prop("checked")) {
            getServiceProperties(toolId);
            //$(".make-switch").bootstrapSwitch('state', false);
            if ($(this).parent().parent().parent().parent().attr("isMultipleAllowed") == "true") {
                $(".div_" + toolId).find(".service-label img").show();
            }
        }
        else {
            $("div").remove(".properties_" + toolId + "");
            $(".div_" + toolId).find(".service-label img.add").hide();
        }
        return false;
    }
});

$(document).on("click", ".delete-properties", function () {
    var selToolId = $(this).attr("toolid");

    if ($(this).parent().parent().parent().find(".properties_" + selToolId).length == 1) {
        $(".div_" + selToolId).find("input:checkbox").prop("checked", false);
        $(".div_" + selToolId).find(".service-label img").hide();
    }
    $(this).parent().parent().remove();
});

$(document).on("click", "#addExtraCharge", function () {
    var toolIdS = $(this).attr("toolId");

    var temp = "";
    var i = 0;
    i = $(this).parent().parent().parent().find(".extracharges_" + toolIdS).length;

    if (i < 5) {
        temp += "<div class='extracharges_" + toolIdS + "'><h5 class='mb-0'><span class='pull-left'></span><label class='pull-right'><a id='deleteExtraCharge'>";
        temp += "<img src='images/cancel-red.png' height='16'  alt='delete' onclick='' style=''>";
        temp += "</a></label></h5>";
        temp += "<label class='block'><input type='textbox' style='font-size:11px' placeholder='Description' class='form-control extracharges' id='extDescription'></label>";
        temp += "<label class='block'><input type='textbox' style='font-size:11px' placeholder='Amount' class='form-control extracharges' id='extAmount' onkeypress='return isNumberKey(event)'></label></div>";
        $(this).parent().parent().parent().append(temp);
        //   $("#extracharge_" + toolIdS).append(temp);
    } else {
        ErrorNotifier("Accept upto 5 ExtraCharges");
    }

});

$(document).on("click", "#deleteExtraCharge", function () {
    $(this).parent().parent().parent().remove();
});

function getServices(productId, serviceId, onlyActive, includeProperties, renderAutomatically) {
    var str = "";
    var ordersClient = new OrdersClient();
    ordersClient.GetServices(productId, serviceId, onlyActive, includeProperties, false, function (res) {
        srvServiceJsonObject = JSON.stringify(res.Services);

        if (res.Success == true) {
            for (var i = 0; i < res.Services.length; i++) {
                chk = "";
                chk += "<div  class='div_" + res.Services[i]["Id"] + " col-sm-3 service margin-bottom-10' id='" + res.Services[i]["Id"] + "' isMultipleAllowed='" + res.Services[i]["AreMultipleEntriesAllowed"] + "'>";
                chk += "<div class='service-label' serviceName='" + res.Services[i]["MetaDataCode"] + "' serviceId='" + res.Services[i]["Id"] + "'>";
                chk += "<div>";
                chk += "<label class='pull-left'>";
                chk += "<input type='checkbox' class='check_tool' value='" + res.Services[i]["Id"] + "' ToolName='" + res.Services[i]["MetaDataCode"] + "' id='" + res.Services[i]["Id"] + "' IsMultipleAllowed='" + res.Services[i]["AreMultipleEntriesAllowed"] + "'/>";
                chk += "<span class='margin-left-5'>" + res.Services[i]["DisplayName"] + "</span>";
                chk += "</label>";
                if (res.Services[i]["AreMultipleEntriesAllowed"] == true) {
                    chk += "<label class='pull-right'>";
                    chk += "<img src='images/plus.png' alt='add' onclick='getServiceProperties(" + res.Services[i]["Id"] + ")' class='add' style='display:none'/>";
                    chk += "</label>";
                }
                chk += "<div class='clearfix'></div>";
                chk += "</div>";
                chk += "</div>";
                chk += "</div>";

                str += chk;

                //hdnIdsValues += res.Services[i]["Id"] + ",";



                //$(".hdnIds").val(hdnIdsValues);
            }
        }
        //$("input[id=hdnIds]").val(hdnIdsValues);
        $(".ServicesDiv").html(str);

    })

}


function getServiceProperties(serviceId) {
    var serviceProperties = '';
    var str = '';


    var ordersClient = new OrdersClient();
    ordersClient.GetServiceProperties(serviceId, true, function (res) {
        if (res.Success == true && res.Services.length != 0) {
            if (res.Services.Properties.length > 0) {
                serviceProperties += "<table class='table no-border'><tbody>";
                for (var i = 0; i < res.Services.Properties.length; i++) {
                    serviceProperties += "<tr><td>"

                    if (res.Services.Properties[i].InputTypeId.toLowerCase() == "textbox") {
                        var propertyFields = new Array();
                        propertyFields = res.Services.Properties[i].PropertyFields;

                        serviceProperties += '<input type="textbox" style="font-size:11px" value="" placeholder="' + res.Services.Properties[i].DisplayName + '" servicepropertycode="' + res.Services.Properties[i].MetaDataCode + '" class="check_tool form-control" id="Amount_1" toolpro="1"';
                        if (res.Services.Properties[i].PropertyFields.length > 0) {
                            if (res.Services.Properties[i].InputTypeId.toLowerCase() == "textbox" || $(res.Services.Properties[i].InputTypeId).toLowerCase() == "textarea" || $(res.Services.Properties[i].InputDataTypeId).toLowerCase() == "string" && (res.Services.Properties[i].PropertyFields.MaxLength != 0 && res.Services.Properties[i].PropertyFields.MaxLength != "")) {
                                serviceProperties += 'maxlength="' + propertyFields[0].MaxLength + '"';
                            }
                        }

                    }
                    if ((res.Services.Properties[i].InputTypeId.toLowerCase() == "textbox" || $(res.Services.Properties[i].InputTypeId).toLowerCase() == "textarea") && res.Services.Properties[i].InputDataTypeId.toLowerCase() == "int") {
                        serviceProperties += 'onkeypress="return isNumberKey(event)"';
                    }
                    if ((res.Services.Properties[i].InputTypeId.toLowerCase() == "textbox" || $(res.Services.Properties[i].InputTypeId).toLowerCase() == "textarea") && (res.Services.Properties[i].InputDataTypeId.toLowerCase() == "float" || res.Services.Properties[i].InputDataTypeId.toLowerCase() == "money")) {
                        serviceProperties += 'onkeypress="return isNumberPointKey(event)"';
                    }
                    serviceProperties += '/>'






                    serviceProperties += "</tr></td>"
                }
                serviceProperties += "</tbody></table>"
                str += "<div class='properties_" + serviceId + " cont-box alert-default margin-top-10' ><table class='table no-border'>" + serviceProperties + "</table>";
                str += "<div class='pad-10'><hr class='margin-top-10 margin-bottom-5'></div>";
                str += "<h5 class='mb-0'><span class='pull-left'>Extra Charges</span><label class='pull-right'><a id='addExtraCharge' toolId='" + serviceId + "'><img src='images/plus.png' height='16' alt='add' onclick='' style=''></a></label></h5>";
                str += "<div class='clearfix'></div><div id='extracharge_" + serviceId + "'>";
                str += "<div class='extracharges_" + serviceId + "'>";
                str += "<label class='block'><input type='textbox' style='font-size:11px' placeholder='Description' class='form-control extracharges' id='extDescription'></label>";
                str += "<label class='block'><input type='textbox' style='font-size:11px' placeholder='Amount' class='form-control extracharges' id='extAmount' onkeypress='return isNumberKey(event)'></label>";
                str += "</div></div></div>";
                $(".div_" + serviceId).find(".service-label").append(str);
                $(".make-switch[id='IsBalanceValidity_" + serviceId + "']").bootstrapSwitch();
            }
            else {
                ErrorNotifier("No Properties are found");
            }


        }
    })


}

function isNumberPointKey(evt) {
    if (evt.which != 46 && evt.which != 8 && evt.which != 0 && (evt.which < 48 || evt.which > 57)) {
        return false;
    }
    return true;
}