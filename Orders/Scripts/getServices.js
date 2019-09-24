var srvPropJsonObject = new Array();
var adminId = $("#hdnAdminId").val();
var quotationId = $('#hdnQuotationId').val();
$(document).ready(function () {
    var productId = $("#hdnProductId").val();
    var srvServiceJsonObject = "";
    var servicePropertiesJsonobject = "";
    var servPropertiesId = "";
    var srvCallerIdJsonObject = "";
    if (adminId == "2209")
        getServices(productId, 8, true, false, false);
    else
    getServices(productId, 0, true, false, false);
})


$(document).on("change", ".check_tool", function () {
    if(quotationId==0){
        if ($(this).attr("type") == "checkbox") {                    
            $('.check_tool').removeAttr('checked');
            $(this).prop("checked", true);
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
    }
    else {
        if ($(this).attr("type") == "checkbox") {
            if ($(this).parent().parent().parent().children().eq(1).length == 0) {
                ErrorNotifier('Cannot edit other service');
                $(this).prop("checked", false);
            }
            else
                $(this).prop("checked", true);
        }
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

$(document).on("focus", 'input[id^="plandate"]', function () {
    $(this).datepicker();
});


function getServiceProperties(serviceId) {
    var serviceProperties = '';
    var str = '';


    var ordersClient = new OrdersClient();
    ordersClient.GetServiceProperties(serviceId, true, function (res) {
        if (res.Success == true && res.Services.length != 0) {
            if (res.Services.Properties.length > 0) {
                serviceProperties += "<table class='table no-border'><tbody>";
                for (var i = 0; i < res.Services.Properties.length; i++) {
                    if (res.Services.Properties[i].InputTypeId.toLowerCase() == "label") {
                        serviceProperties+="<tr><td style='font-weight:bold;text-align:center;'"
                    }
                    else
                        serviceProperties += "<tr><td>"

                    if (res.Services.Properties[i].InputTypeId.toLowerCase() == "textbox") {
                        var propertyFields = new Array();
                        propertyFields = res.Services.Properties[i].PropertyFields;

                        serviceProperties += '<input type="textbox" style="font-size:11px" value="" placeholder="' + res.Services.Properties[i].DisplayName + '" servicepropertycode="' + res.Services.Properties[i].MetaDataCode + '" Inputdatatype="' + res.Services.Properties[i].InputDataTypeId + '" class="check_tool form-control textboxValue" id="Amount_1" toolpro="1"';
                        if (res.Services.Properties[i].PropertyFields.length > 0) {
                            if (res.Services.Properties[i].InputTypeId.toLowerCase() == "textbox" || $(res.Services.Properties[i].InputTypeId).toLowerCase() == "textarea" || $(res.Services.Properties[i].InputDataTypeId).toLowerCase() == "string" && (res.Services.Properties[i].PropertyFields.MaxLength != 0 && res.Services.Properties[i].PropertyFields.MaxLength != "")) {
                                serviceProperties += 'maxlength="' + propertyFields[0].MaxLength + '"';
                            }
                        }

                    }
                    else if (res.Services.Properties[i].InputTypeId.toLowerCase() == "datetime") {
                        var propertyFields = new Array();
                        propertyFields = res.Services.Properties[i].PropertyFields;
                        serviceProperties += '  <input type="text" style="font-size:11px" value="" placeholder="' + res.Services.Properties[i].DisplayName + '" servicepropertycode="' + res.Services.Properties[i].MetaDataCode + '" Inputdatatype="'+res.Services.Properties[i].InputDataTypeId+'" class="check_tool form-control plandatepicker datetimevalue" id="plandate' + res.Services.Properties[i].Id + '" toolpro="1"';
                        if (res.Services.Properties[i].PropertyFields.length > 0) {
                            if (res.Services.Properties[i].InputTypeId.toLowerCase() == "textbox" || $(res.Services.Properties[i].InputTypeId).toLowerCase() == "textarea" || $(res.Services.Properties[i].InputDataTypeId).toLowerCase() == "string" && (res.Services.Properties[i].PropertyFields.MaxLength != 0 && res.Services.Properties[i].PropertyFields.MaxLength != "")) {
                                serviceProperties += 'maxlength="' + propertyFields[0].MaxLength + '"';
                            }
                        }

                    }
                    else if (res.Services.Properties[i].InputTypeId.toLowerCase() == "label") {
                        var propertyFields = new Array();
                        propertyFields = res.Services.Properties[i].PropertyFields;
                        serviceProperties += '<label name="label" style="font-size:11px" value=""  servicepropertycode="' + res.Services.Properties[i].MetaDataCode + '" Inputdatatype="' + res.Services.Properties[i].InputDataTypeId + '" class="labelClass check_tool" id="label_' + res.Services.Properties[i].Id + '" toolpro="1"';
                        if (res.Services.Properties[i].PropertyFields.length > 0) {
                            if (res.Services.Properties[i].InputTypeId.toLowerCase() == "textbox" || $(res.Services.Properties[i].InputTypeId).toLowerCase() == "textarea" || $(res.Services.Properties[i].InputDataTypeId).toLowerCase() == "string" && (res.Services.Properties[i].PropertyFields.MaxLength != 0 && res.Services.Properties[i].PropertyFields.MaxLength != "")) {
                                serviceProperties += 'maxlength="' + propertyFields[0].MaxLength + '"';
                            }
                        }

                    }
                    else if (res.Services.Properties[i].InputTypeId.toLowerCase() == "radiobutton") {
                        var propertyFields = new Array();
                        propertyFields = res.Services.Properties[i].PropertyFields;
                        serviceProperties += ' <input type="radio"  style="vertical-align: middle;" value="IncludeVAS" servicepropertycode="' + res.Services.Properties[i].MetaDataCode + '" Inputdatatype="' + res.Services.Properties[i].InputDataTypeId + '" class="check_tool VAS" id="radio_' + res.Services.Properties[i].Id + '" toolpro="1"';
                        if (res.Services.Properties[i].PropertyFields.length > 0) {
                            if (res.Services.Properties[i].InputTypeId.toLowerCase() == "textbox" || $(res.Services.Properties[i].InputTypeId).toLowerCase() == "textarea" || $(res.Services.Properties[i].InputDataTypeId).toLowerCase() == "string" && (res.Services.Properties[i].PropertyFields.MaxLength != 0 && res.Services.Properties[i].PropertyFields.MaxLength != "")) {
                                serviceProperties += 'maxlength="' + propertyFields[0].MaxLength + '"';
                            }
                        }

                    }
                    else if (res.Services.Properties[i].InputTypeId.toLowerCase() == "dropdown") {
                        var propertyFields = new Array();
                        propertyFields = res.Services.Properties[i].PropertyFields;
                        serviceProperties += '<label>' + res.Services.Properties[i].DisplayName + ' </label> :  <select servicepropertycode="' + res.Services.Properties[i].MetaDataCode + '" Inputdatatype="' + res.Services.Properties[i].InputDataTypeId + '" name="dropdown" class="check_tool DropdwnProp" id="dropdown_' + res.Services.Properties[i].Id + '" toolpro="1"';
                        if (res.Services.Properties[i].PropertyFields.length > 0) {
                            if (res.Services.Properties[i].InputTypeId.toLowerCase() == "textbox" || $(res.Services.Properties[i].InputTypeId).toLowerCase() == "textarea" || $(res.Services.Properties[i].InputDataTypeId).toLowerCase() == "string" && (res.Services.Properties[i].PropertyFields.MaxLength != 0 && res.Services.Properties[i].PropertyFields.MaxLength != "")) {
                                serviceProperties += 'maxlength="' + propertyFields[0].MaxLength + '"';
                            }
                        }
                    }
                    //else if (res.Services.Properties[i].InputTypeId.toLowerCase() == "dropdown")
                    //{
                    //    serviceProperties += "<select style='font-size:11px' placeholder='" + res.Services.Properties[i].DisplayName + "' servicePropertyCode='" + res.Services.Properties[i].MetaDataCode + "'  class='dropdown_" + res.Services.DisplayName + " check_tool form-control' id='" + res.Services.Properties[i].MetaDataCode + "'";
                    //}
                    if ((res.Services.Properties[i].InputTypeId.toLowerCase() == "textbox" || res.Services.Properties[i].InputTypeId.toLowerCase() == "textarea") && res.Services.Properties[i].InputDataTypeId.toLowerCase() == "int") {
                        serviceProperties += 'onkeypress="return isNumberKey(event)"';
                    }
                    if ((res.Services.Properties[i].InputTypeId.toLowerCase() == "textbox" || res.Services.Properties[i].InputTypeId.toLowerCase() == "textarea") && (res.Services.Properties[i].InputDataTypeId.toLowerCase() == "float" || res.Services.Properties[i].InputDataTypeId.toLowerCase() == "money")) {
                        serviceProperties += 'onkeypress="return isNumberPointKey(event)"';
                    }
                    if (res.Services.Properties[i].IsRequired == true) {

                        serviceProperties += 'isRequired=true mandateText="' + res.Services.Properties[i].DisplayName + '"';
                    }

                    //if (res.Services.Properties[i].InputTypeId.toLowerCase() == "dropdown") {
                        
                    //    serviceProperties += "><option value=''>" + res.Services.Properties[i].DisplayName + "</option>";
                    //    var servicedropdownObj;
                    //    servicedropdownObj = res.Services.Properties[i].PropertyFields
                    //    $.each(servicedropdownObj, function (key, value) {
                    //        serviceProperties += "<option value='" + value.Id + "' class='selected' >" + value.Options + "</option>";
                    //    });
                    //    serviceProperties += "</select>";
                    //}
                    //else
                    //{ 
                    if (res.Services.Properties[i].InputTypeId.toLowerCase() == "label") {
                        serviceProperties += '>' +res.Services.Properties[i].DisplayName + '</label>';
                    }
                    else if (res.Services.Properties[i].InputTypeId.toLowerCase() == "radiobutton") {
                        serviceProperties += '/> <span style="vertical-align: middle;" class="">' + res.Services.Properties[i].DisplayName + '</span>';
                    }
                    else if (res.Services.Properties[i].InputTypeId.toLowerCase() == "dropdown") {
                        serviceProperties += '>';
                        var jobj = jQuery.parseJSON(res.Services.Properties[i].InputProperty)
                        $.each(jobj, function (key, val) {
                            serviceProperties += '<option value="'+key+'">'+val+'</option>';
                        })
                        serviceProperties += '</select>';
                    }
                    else
                        serviceProperties += '/>';
                    //}

                    serviceProperties += "</tr></td>"
                }
                serviceProperties += "</tbody></table>"

                str += "<div class='properties_" + serviceId + " cont-box alert-default margin-top-10 hideserviceprop' ><table class='table no-border'>" + serviceProperties + "</table>";
                str += "<div class='pad-10'><hr class='margin-top-10 margin-bottom-5'></div>";
                str += "<h5 class='mb-0'><span class='pull-left'>Extra Charges</span><label class='pull-right'><a id='addExtraCharge' toolId='" + serviceId + "'><img src='images/plus.png' height='16' alt='add' onclick='' style=''></a></label></h5>";
                str += "<div class='clearfix'></div><div id='extracharge_" + serviceId + "'>";
                str += "<div class='extracharges_" + serviceId + "'>";
                str += "<label class='block'><input type='textbox' style='font-size:11px' placeholder='Description' class='form-control extracharges' id='extDescription'></label>";
                str += "<label class='block'><input type='textbox' style='font-size:11px' placeholder='Amount' class='form-control extracharges' id='extAmount' onkeypress='return isNumberKey(event)'></label>";
                str += "</div></div></div>";
                
                $("[class^=div_]").find("[class^=properties_]").remove();
                $(".div_" + serviceId).find(".service-label").append(str);
                $(".make-switch[id='IsBalanceValidity_" + serviceId + "']").bootstrapSwitch();
                $(".VAS").prop('checked', true);
                $(".VAS").data('waschecked', true);
            }
            else {
                ErrorNotifier("No Properties are found");
            }


        }
    })


}

$(document).on('click', '.VAS', function () {
    var radio = $(this);
    if (radio.data("waschecked") == true) {
        radio.prop("checked", false);
        radio.data("waschecked", false);
    } else {
        radio.data("waschecked", true);
    }
})

function isNumberPointKey(evt) {
    if (evt.which != 46 && evt.which != 8 && evt.which != 0 && (evt.which < 48 || evt.which > 57)) {
        return false;
    }
    return true;
}