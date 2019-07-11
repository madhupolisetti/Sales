var accountId = $("#hdnAccountId").val();
var productId = $("#hdnProductId").val();
var AccountProductId = $("#AccountProductId").val();
var quotationData;
var ordersClient = new OrdersClient();
$(document).ready(function () {

    var quotationId = $("#hdnQuotationId").val();
    var billMode = $("#hdnIsPostPaid").val();
    var mobile = $("#hdnMobileNo").val();
    var countryId = $("#hdnCountryId").val();
    var stateId = $("#hdnStateId").val();
    var accessRole = $("#hdnAccessRole").val();
    if (accessRole == "SUPER_USER")
        $("#btnUpdate").show();
    var isPostPaid = 0;
    ordersClient.GetCountries(function (res) {
        if (res.Success == true) {
            var countries = "";
            if (res.Countries.length > 0) {
                countries = "<option value=0>Select</option>";
                for (var i = 0; i < res.Countries.length; i++) {
                    countries += "<option value='" + res.Countries[i].Id + "' name='" + res.Countries[i].Name + "' >" + res.Countries[i].Name + "</option>";
                }
            }
            $("#ddlCountry").html(countries);
            if ($.isNumeric($("#hdnCountryId").val()) == true) {
                $("#ddlCountry option[value='" + $("#hdnCountryId").val() + "']").prop('selected', true);
            }
            else
            {
                $("#ddlCountry option[name='" + $("#hdnCountryId").val() + "']").prop('selected', true);
            }
            
        }
    });

    ordersClient.GetStates(true, function (res) {
        if (res.Success == true) {
            var states = "";
            if (res.States.length > 0) {
                states = "<option value=0>Select</option>";
                for (var i = 0; i < res.States.length; i++) {
                    states += "<option value='" + res.States[i].Id + "' >" + res.States[i].State + "</option>";
                }
                $("#state").html(states);
                $("#state option[value='" + $("#hdnStateId").val() + "']").prop('selected', true);
            }
        }
    })

    $("#btnUpdate").click(function (res) {
        var userDetails = {};
        
        $(".updateValues").each(function () {
            console.log($(this));
            if ($(this)[0].nodeName == "SELECT" || $(this)[0].nodeName == "TEXTAREA") {
              
                userDetails[$(this).attr("name")] = $(this)[0].value;
            }
            else
            {
                userDetails[$(this).attr("name")] = $(this).val();

            }
              
        });
        userDetails["AccountID"] = accountId;
        userDetails["ProductId"] = productId;
        userDetails["AccountProductId"] = AccountProductId;
        ordersClient.UpdateAccountOnwerDetails(userDetails, function (res) {
            if (res.Success == true) {
                alert("Updated Successfully. Logout and Login to reflect changes.");
            }
        });
    });
    $("#state [value='" + stateId + "']").attr("selected", true);
    $("#ddlCountry [value='" + countryId + "']").attr("selected", true);

    if (billMode == "2") {
        isPostPaid = 1;
    }
    if (quotationId != 0) {
        $("#btnEdit").show();

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



    ordersClient.GetAccountOwnersAndPlans(productId, function (res) {
        if (res.Success == true) {
            var plans = "", employees = "";
            plans = "<option value=0>Select Plan</option>";
            if (res.Plans.length > 0) {

                for (var i = 0; i < res.Plans.length; i++) {
                    plans += "<option value='" + res.Plans[i].Id + "'>" + res.Plans[i].PlanName + "</option>";
                }
            }

            if (res.Employees.length > 0) {
                for (var i = 0; i < res.Employees.length; i++) {
                    employees += "<option value='" + res.Employees[i].Id + "' email='" + res.Employees[i].Email + "' >" + res.Employees[i].Name + "</option>";
                }

            }

            $("#ddlRechargeType").html(plans);
            $("#ddlAccountOwner").html(employees);
            $("#ddlAccountOwner option[email='" + $("#hdnAccountOwnerEmail").val() + "']").prop('selected',true);
        }

    })

})
$("#btnSave").click(function () {
    var jobjStr = "{";
    var serviceId = '';
    var SenderName = '';
    var compnay = $("#txtCompanyName").val();
    var registeredDate = $("#txtRegisteredDate").val();
    var contactName = $("#txtContactName").val();
    var mailId = $("#txtBusinessMailID").val();
    var mobile = $("#txtMobile").val();
    var countryId = $("#ddlCountry :selected").val();
    var address = $(".txtContactAddress").val();
    var statedId = $("#state :selected").val();
    var isRequired;
    var mandateField;
    var mandateFieldValue;
    if (registeredDate.length == 0) {
        ErrorNotifier("Please select registered date");
        return false;
    }
    if (compnay.length == 0) {
        ErrorNotifier("Please enter company name");
        return false;
    }
    if (contactName.length == 0) {
        ErrorNotifier("Please enter contact name");
        return false;
    }
    if (mailId.length == 0) {
        ErrorNotifier("Please enter mail id");
        return false;
    }
    if (mobile.length == 0) {
        ErrorNotifier("Please enter mobile no");
        return false;
    }
    if (countryId == 0) {
        ErrorNotifier("Please select customer country");
        return false;
    }
    if (address.length == 0) {
        ErrorNotifier("Please enter address");
        return false;
    }
    if (statedId == 0) {
        ErrorNotifier("Please select customer state");
        return false;
    }
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
    $(".textboxValue, .datetimevalue").each(function (e) {
        isRequired = $(this).attr("isrequired");
        if (isRequired) {
            mandateFieldValue = $(this).val();
            if (mandateFieldValue == "") {
                ErrorNotifier("Please enter " + mandateField);
                return false;
            }
        }
    })
    $("input[type=checkbox]").each(function () {
        if ($(this).prop("checked")) {
            occurance = 0;
            serviceId = $(this).attr("id");
            SenderName = $(this).attr("toolname");


            jobjStr += "'" + SenderName + "':"
            if ($('.properties_' + serviceId).length > 1) {
                jobjStr += "[";
            }
            //need to check for drop  down service name or meta data code.
            //$(".dropdown_" + SenderName).each(function (e) {
            //    isRequired = $(this).attr("isrequired");
            //    if (isRequired) {
            //        mandateFieldValue = $(this)[0].value;;
            //        if (mandateFieldValue == "" || mandateFieldValue == "0") {
            //            ErrorNotifier("Please enter " + $(this).attr("servicepropertycode"));
            //            return false;
            //        }
            //    }
            //});

            $('.properties_' + serviceId).each(function () {
                occurance++;
                if (occurance > 1) {
                    jobjStr += ',';
                }
                jobjStr += "{'Id':" + "'" + occurance + "',";
                jobjStr += "'Occurance':'" + occurance + "',";
                $(this).find(".check_tool").each(function () {


                    var value = "";
                    if ($(this).attr('type') == "textbox" || $(this).attr('type') == "textarea"){
                        value = $(this).val();
                    }
                    if ($(this).attr('Inputdatatype') == 'Money') {
                        value = (parseFloat($(this).val())).toFixed(2);
                    }
                    if ($(this).attr('name') == 'label') {
                        value = $(this).text();
                    }
                    if ($(this).attr('type') == 'radio') {
                        value=($(this).data("waschecked") == true)?true:false;
                    }
                    if ($(this).attr('type') == "text") {
                        var objDate = new Date($(this).val());
                        var day = objDate.toLocaleString("en", { day: "numeric" });
                        if (day < 10)
                            day = '0' + day;
                         value =
                            day + '-' +
                            objDate.toLocaleString("en", { month: "short" }) + '-' +
                            objDate.toLocaleString("en", { year: "numeric" });
                    }
                    if ($(this).attr('name') == 'dropdown') {
                        value = $(this).children("option:selected").text();
                    }
                    //else if ($(this)[0].nodeName == "SELECT") {
                    //    value = $(this)[0].value;
                    //}

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
            //else
            //{ jobjStr += "}"; }



            //if ($('.properties_' + serviceId).length > 1) {
            //    jobjStr += "]";
            //}
            jobjStr += ',';
        }


    });
    if (jobjStr.substring(jobjStr.length - 1) == ',') {
        jobjStr = jobjStr.substring(0, jobjStr.length - 1);
    }
    //{'Balance':{'Id':'1','Occurance':'1','Amt':'10','IBPrice':'1.2','OBPrice':'1.3','ValidityInDays':'150','Plan':'1'}}
    
    jobjStr += "}";
    var QuotationType = $("#hdnQuotationType").val();
    var ordersClient = new OrdersClient();
    ordersClient.CreateQuotation(productId, accountId, 1, 1, jobjStr, statedId, QuotationType, function (res) {
        console.log(res);
        if (res.Success == true) {
            var quotationId = res.QuotationId;
            var $form = $("<form/>").attr("id", "data_form")
                                    .attr("action", "Quotation.aspx")
                                    .attr("method", "post");
            $("body").append($form);
            AddParameter($form, "QuotationId", quotationId);
            $form[0].submit();
        }
        else {
            ErrorNotifier(res.Message);
        }
    });

})

function AddParameter(form, name, value) {
    var $input = $("<input />").attr("type", "hidden")
                            .attr("name", name)
                            .attr("value", value);
    form.append($input);
}
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

    extraCharges = extraCharges != "" ? JSON.parse(extraCharges) : extraCharges;
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

                        serviceProperties += '<input type="textbox" style="font-size:11px"  placeholder="' + res.Services.Properties[i].DisplayName + '" servicepropertycode="' + res.Services.Properties[i].MetaDataCode + '" class="check_tool form-control" id="' + res.Services.Properties[i].MetaDataCode + '_' + res.Services.Properties[i].Id + '" toolpro="1"';

                        if (propertyFields.length > 0) {
                            if ((res.Services.Properties[i].InputTypeId.toLowerCase() == "textbox" || $(res.Services.Properties[i].InputTypeId).toLowerCase() == "textarea") && res.Services.Properties[i].InputDataTypeId.toLowerCase() == "string") {
                                serviceProperties += 'maxlength="' + propertyFields[0].MaxLength + '"';
                            }
                        }
                        if ((res.Services.Properties[i].InputTypeId.toLowerCase() == "textbox" || $(res.Services.Properties[i].InputTypeId).toLowerCase() == "textarea") && res.Services.Properties[i].InputDataTypeId.toLowerCase() == "int") {
                            serviceProperties += 'onkeypress="return isNumberKey(event)"';
                        }
                        if ((res.Services.Properties[i].InputTypeId.toLowerCase() == "textbox" || $(res.Services.Properties[i].InputTypeId).toLowerCase() == "textarea") && (res.Services.Properties[i].InputDataTypeId.toLowerCase() == "float" || res.Services.Properties[i].InputDataTypeId.toLowerCase() == "money")) {
                            serviceProperties += 'onkeypress="return isNumberPointKey(event)"';
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
            //else
            //{ jobjStr += "}"; }



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
        if (res.Success == true) {
            var $form = $("<form/>").attr("id", "data_form")
                                    .attr("action", "Quotation.aspx")
                                    .attr("method", "post");
            $("body").append($form);
            AddParameter($form, "QuotationId", quotationId);
            $form[0].submit();
        }
        else {
            ErrorNotifier(res.Message);
        }
    });
})
function isNumberKey(evt) {
    if (evt.which != 43 && evt.which != 8 && evt.which != 0 && (evt.which < 48 || evt.which > 57)) {
        return false;
    }
    return true;
}


function isDecimalKey(event) {
    if (event.which == 8 || event.which == 0) {
        return true;
    }
    if (event.which == 45 && $(this).val() == '') {//only allow leading minus
        return true;
    }
    if (event.which == 46 && $(this).val().indexOf('.') == -1) { //only allow one dot
        return true;
    }
    if ((event.which < 48 || event.which > 71)) {
        return false;
    }
}

function blockSpecialChar(e) {
    var k;
    document.all ? k = e.keyCode : k = e.which;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57) || k == 190 || k == 188);
}


