<%@ Page Title="" Language="C#" MasterPageFile="~/PostLogin.Master" AutoEventWireup="true" CodeBehind="Services.aspx.cs" Inherits="Orders.Services" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CSS" runat="server">
    <link href="/CssFiles/bootstrap-switch.min.css" rel="stylesheet" />
    <style type="text/css">
        .btn grey {
            background-color: #BDBDBD;
            border-color: #BDBDBD;
            color: #fff;
            padding: 5px 12px;
            border-radius: 4px;
            border: 2px solid #BDBDBD;
        }

        .form-control {
            background-color: #fff;
            background-image: none;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;
            color: #555;
            display: block;
            font-size: 14px;
            height: 34px;
            line-height: 1.42857;
            padding: 2px 2px;
            transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
            width: 100%;
        }

        #property .modal-dialog {
            width: 950px;
        }

        .page-sidebar .page-sidebar-menu > li > a, .page-sidebar-closed.page-sidebar-fixed .page-sidebar:hover .page-sidebar-menu > li > a {
            padding: 17px 22px 15px !important;
        }

        .form-control:focus {
            border-color: #66afe9;
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(102, 175, 233, 0.6);
            outline: 0 none;
        }

        .table-head th {
            background: #f9f9f9;
        }

        .no-border td {
            border: none !important;
        }

        input.form-control {
            width: 70% !important;
        }

        #errorbox {
            color: #F00;
        }

        #errorbox_prop {
            color: #F00;
        }

        .bootstrap-switch-handle-off {
            width: 45px !important;
        }
        /*.bootstrap-switch-container {
            height: 32px;
            overflow: hidden;
        }*/
    </style>

    <title>Services and Properties</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="page-content-wrapper">
        <div class="page-content">

            <form id="form1" runat="server">
                <div class="text-center">
                    <input type="button" class='btn btn-success' id="service_add" value="Add New Service" />
                </div>
                <br />
                <div id="service">
                </div>

                <div id="test">
                </div>

                <%-- <div class="modal fade" id="add" style="display: none">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" data-dismiss="modal" type="button">x</button>
                        <h4 class="modal-title">Add Property</h4>
                    </div>
                    <div class="modal-body">
                        <div id="errorbox_prop"></div>--%>

                <%-- </div>
                </div>
            </div>
        </div>--%>
                <div class="modal fade" id="addserv">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal"></button>
                                <h4 class="modal-title">Add Service</h4>
                            </div>
                            <div class="modal-body">
                                <div id="errorbox">
                                </div>
                                <table class="table no-border">
                                    <tr>
                                        <td>Name</td>
                                        <td>
                                            <input type="text" id="ser_name" /><br />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>MetaData Code</td>
                                        <td>
                                            <input type="text" id="meta_code" /><br />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Active</td>
                                        <td>
                                            <input type="checkbox" id="ser_active" /><br />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Multiple</td>
                                        <td>
                                            <input type="checkbox" id="ser_multiple" /><br />
                                        </td>
                                    </tr>
                                </table>

                                <input type="button" id="addser" class="btn green" value="Add" />

                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="property" style="display: none">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal"></button>
                            </div>
                            <div class="modal-body" id="propertydata">
                                <%--<div id="newprop" >--%>
                                <label id='service_id' style="display: none"></label>
                                <label id="service_name" style="display: none"></label>
                                <table class="table no-border">
                                    <tr>
                                        <td style="width: 100px">Name<span style="color: red">*</span></td>
                                        <td>
                                            <input type="text" id="txtName" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 100px">PropertCode<span style="color: red">*</span></td>
                                        <td>
                                            <input type="text" id="txtMeta" />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>IsRequired</td>
                                        <td>
                                            <input type="checkbox" id="chkRequired" value="1" /><br />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>InputType</td>
                                        <td>
                                            <select id="inputTypeDDl">
                                            </select><br />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>DataType</td>
                                        <td>
                                            <select id="dataTypeDDl">
                                            </select><br />
                                        </td>
                                    </tr>
                                    <tr id="trMinLength" style="display: none">
                                        <td>Min Length<span style="color: red">*</span></td>
                                        <td>
                                            <input type="text" id="minLength" />
                                        </td>

                                    </tr>
                                    <tr id="trMaxLength" style="display: none">
                                        <td>Max Length<span style="color: red">*</span></td>
                                        <td>
                                            <input type="text" id="maxLength" />
                                        </td>

                                    </tr>
                                    <tr id="trAllowSpecialChars" style="display: none">
                                        <td>Allow Special Characters<span style="color: red">*</span></td>
                                        <td>
                                            <input type="checkbox" id="allowSpecialChars" value="1" />
                                        </td>

                                    </tr>
                                    <tr>
                                        <td>Include In OrderAmount</td>
                                        <td>
                                            <input type="checkbox" id="chkIncludeInOrderAmount" value="1" /><br />
                                        </td>
                                    </tr>
                                </table>
                                <input type="button" class="btn green" id="addsubmit" value="Add" />
                                <%--</div>  --%>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    </div>
    <input type="hidden" id="hdnDisplayName" />
    <input type="hidden" id="hdnMetaDataCode" />
    <input type="hidden" id="hdnServiceId" />
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
    <script src="JsFiles/jquery-1.11.0.min.js"></script>
    <%--<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" type="text/javascript"></script>--%>
    <script src="JsFiles/bootstrap.min.js"></script>
    <script src="JsFiles/bootstrap-switch.min.js"></script>
    <script type="text/javascript" src="Scripts/OrdersClient.js"></script>
    <script type="text/javascript">
        var ordersClient = new OrdersClient();
        var cancelServiceId = 0;
        var option_inputtype = "";
        var option_inputdatatype = "";
        $(document).ready(function () {
            getServices();
            ordersClient.GetInputTypes(true, function (res) {
                if (res.Success == true) {

                    for (var i = 0; i < res.InputTypes.length; i++) {
                        option_inputtype += "<option value='" + res.InputTypes[i].Id + "' >" + res.InputTypes[i].Type + "</option>";
                    }
                    $("#inputTypeDDl").html(option_inputtype);
                }
            })

            ordersClient.GetInputDataTypes(true, function (res) {
                if (res.Success == true) {
                    for (var i = 0; i < res.InputDataTypes.length; i++) {
                        option_inputdatatype += "<option value='" + res.InputDataTypes[i].Id + "' >" + res.InputDataTypes[i].DataType + "</option>";
                    }
                    $("#dataTypeDDl").html(option_inputdatatype);
                }
            })
            $(document).on('click', 'a[name="service_edit"]', function () {

                var id1 = this.id;
                var n = id1.indexOf("_");
                var id = id1.substring(n + 1);
                if (id != 0) {
                    cancelServices(id);
                }
                cancelServiceId = id;
                //var id = this.alt;

                $("#actv_" + id).bootstrapSwitch('toggleDisabled', false, false);
                $("#displayserv_" + id).removeAttr("disabled");
                $("#displayserv_" + id).removeAttr("style");
                $("#metadataserv_" + id).removeAttr("disabled");
                $("#metadataserv_" + id).removeAttr("style");
                $("#multiple_" + id).bootstrapSwitch('toggleDisabled', false, false);

                // $("#serv_" + id).css("background-color", "lightgoldenrodyellow");

                $("#servicesave_" + id).show();
                $("#servicecancel_" + id).show();
                $("#servicedelete_" + id).hide();
                $("#serviceedit_" + id).hide();
            });
            $(document).on('click', 'input[name="service_view"]', function () {
                var service_name = this.alt;
                var serviceId = $(this).attr("serviceid");
                $("#property_data").remove();
                getServiceProperties(serviceId);
                $("#hdnServiceId").val(serviceId);
                $("#hdnDisplayName").val($(this).attr("displayname"));
                $("#hdnMetaDataCode").val($(this).attr("metadatacode"));
            });

            $("#addsubmit").click(function () {
                var serviceProperty = {};
                var serviceId = $("#hdnServiceId").val();
                var displayName = $("#txtName").val();
                var metaDataCode = $("#txtMeta").val();
                var isRequired = $("#chkRequired").is(":checked");
                var includeInOrderAmount = $("#chkIncludeInOrderAmount").is(":checked");
                var inputTypeId = $("#inputTypeDDl option:selected").val();
                var dataTypeId = $("#dataTypeDDl option:selected").val();
                var isAllowSpecialCharas = $("#allowSpecialChars").is(":checked");
                var minlength = $("#minLength").val();
                var maxlength = $("#maxLength").val();
                serviceProperty.DisplayName = displayName
                serviceProperty.MetaDataCode = metaDataCode;
                serviceProperty.IsRequired = isRequired;
                serviceProperty.IncludeInOrderAmount = includeInOrderAmount;
                serviceProperty.InputTypeId = inputTypeId;
                serviceProperty.DataTypeId = dataTypeId;
                serviceProperty.PropertyFields = [];

                if (inputTypeId == "1" || inputTypeId == "2") {
                    serviceProperty.PropertyFields.push({
                        "MinLength": minlength != '' ? minlength : 0,
                        "MaxLength": maxlength != '' ? maxlength : 0,
                        "IsAllowSpecialChars": isAllowSpecialCharas

                    })
                }
                else { }

                ordersClient.CreateServiceProperties(serviceId, serviceProperty, function (res) {
                    if (res.Success == true) {
                    }
                })



            })

            $(document).on('click', 'a[name="service_save"]', function () {
                // var id = this.alt;
                var id1 = this.id;
                var n = id1.indexOf("_");
                var id = id1.substring(n + 1);

                var value = $("#actv_" + id).is(':checked');
                var multiple = $("#multiple_" + id).is(':checked');
                var displayname = $("#displayserv_" + id).val();
                var metadatacode = $("#metadataserv_" + id).val();
                ordersClient.UpdateService(id, displayname, metadatacode, multiple, value, function (res) {
                    if (res.Success == true) {
                    }
                })
                cancelServices(id);
                $("input[name='active'").attr('disabled', 'True');

                if (value) {
                    value = "true";
                }
                else {
                    value = "false";
                }

                if (multiple) {
                    multiple = "true";
                }
                else {
                    multiple = "false";
                }


            });

            $(document).on('click', 'a[name="service_cancel"]', function () {
                var serviceId = $(this).parents("tr").attr("serviceId");
                cancelServices(serviceId);
            });

            $("#service_add").click(function () {
                $("#errorbox").html("");
                $("#addserv").modal("show");
                //alert("alert");
            });
            $("#addser").click(function () {
                var displayname = $("#ser_name").val();
                var metaDataCode = $("#meta_code").val();
                var isActive = $("#ser_active").is(":checked");
                var areMultipleEntriesAllowed = $("#ser_multiple").is(":checked");
                if (displayname.length == 0) {
                    ErrorNotifier('Please enter display name');
                    return false;
                }
                if (metaDataCode.length == 0) {
                    ErrorNotifier('Please enter metadatacode');
                    return false;
                }
                ordersClient.CreateService(1, displayname, metaDataCode, areMultipleEntriesAllowed, isActive, function (res) {
                    if (res.Success == true) {
                        SuccessNotifier("Successfully added");
                        $("#addserv").modal('hide');
                        getServices();

                    }
                })

            });

            function getServices() {
                ordersClient.GetServices(1, 0, false, false, false, function (res) {
                    if (res.Success == true) {
                        var services = "";
                        services += '<table id="Services_data" border="" class="table table-bordered " style="text-align:centre"><tbody><tr><th>Code</th><th>Services</th><th>Multiple allowed</th><th>Active</th><th>Edit</th><th>Create Property</th></tr>'
                        if (res.Services.length > 0) {
                            for (var i = 0; i < res.Services.length; i++) {
                                services += "<tr serviceId='" + res.Services[i].Id + "'>";
                                services += "<td><input type=text  id=displayserv_" + res.Services[i].Id + " value='" + res.Services[i].DisplayName + "' class='form-control' style='border:none' disabled='true'  /></td>";
                                services += "<td><input type=text  id=metadataserv_" + res.Services[i].Id + " value='" + res.Services[i].MetaDataCode + "' class='form-control' style='border:none' disabled='true'  /></td>";
                                if (res.Services[i].AreMultipleEntriesAllowed == true) {
                                    services += "<td width='150px'><input id='multiple_" + res.Services[i].Id + "' type='checkbox' checked disabled class='make-switch' data-on-text='Yes' data-off-text='No'  /></td>";
                                }
                                else {
                                    services += "<td width='150px'><input id='multiple_" + res.Services[i].Id + "' type='checkbox' disabled class='make-switch' data-on-text='Yes' data-off-text='No' /></td>";
                                }
                                if (res.Services[i].IsActive == true) {
                                    services += "<td width='150px'><input name=active id='actv_" + res.Services[i].Id + "' type='checkbox' checked disabled class='make-switch' data-on-text='Yes' data-off-text='No'  /></td>";
                                }
                                else {
                                    services += "<td width='150px'><input name=active  id='actv_" + res.Services[i].Id + "'type='checkbox' disabled class='make-switch' data-on-text='Yes' data-off-text='No'  /></td>";
                                }
                                services += "<td width='150px' class='text-center'><a class='margin-right-5' name=service_edit Value=Edit id='serviceedit_" + res.Services[i].Id + "' ><i class='fa fa-pencil'> </i> </a>";
                                services += "<a class='margin-right-5' Value=Save name='service_save' id='servicesave_" + res.Services[i].Id + "' style='display:none;'><i class='fa fa-check'></i></a>";
                                services += "<a class='margin-right-5' Value=Cancel name='service_cancel'  id='servicecancel_" + res.Services[i].Id + "' style='display:none;' ><i class='fa fa-remove'></i></a>";
                                services += "<a class='margin-right-5' value=Delete name='service_delete' id='servicedelete_" + res.Services[i].Id + "'><i class='fa fa-trash-o'></i></a></td>";
                                services += "<td><input data-toggle='modal' data-target='#property' class='btn btn-sm btn-default btn green' type=button name=service_view Value=Property alt='" + res.Services[i].DisplayName + "' id='serviceview_" + res.Services[i].Id + "' serviceid='" + res.Services[i].Id + "' displayname='" + res.Services[i].DisplayName + "' metadatacode='" + res.Services[i].MetaDataCode + "' /></td></tr>";
                            }

                        }
                        else {
                            services += "<tr><td colspan='6'>No Services Found</td></tr>"
                        }
                        services += "</table>";
                        $("#service").html(services);
                        $(".make-switch").bootstrapSwitch('state', true);
                    }
                });
            }

            function ConfirmDelete() {
                var x = confirm("Are you sure you want to delete?");
                if (x)
                    return true;
                else
                    return false;
            }

            function cancelServices(id) {

                $("#actv_" + id).bootstrapSwitch('toggleDisabled', true, true);
                $("#displayserv_" + id).attr("disabled", "true");
                $("#metadataserv_" + id).attr("disabled", "true");
                $("#default_" + id).attr("disabled", "true");
                $("#multiple_" + id).bootstrapSwitch('toggleDisabled', true, true);

                $("#serviceedit_" + id).show();
                $("#servicedelete_" + id).show();
                $("#servicesave_" + id).hide();
                $("#servicecancel_" + id).hide();
                $("#displayserv_" + id).css("border", "none");
                $("#metadataserv_" + id).css("border", "none");


            }

            $(document).on('click', 'a[name="service_delete"]', function () {
                var id1 = this.id;
                var n = id1.indexOf("_");
                var id = id1.substring(n + 1);
                //alert(id);
                var result = ConfirmDelete();
                if (result) {
                    ordersClient.DeleteService(id, function (res) {
                        if (res.Success == true) {
                            $(this).parents('tr').remove();
                        }
                    });
                }
            });

            function getServiceProperties(serviceId) {
                ordersClient.GetServiceProperties(serviceId, true, function (res) {
                    if (res.Success == true) {
                        var serviceProperties = "";
                        if (res.Services.Properties.length > 0) {
                            serviceProperties += "<table style='text-align:centre' id='property_data' border='' class='table table-bordered'><tr><th>Code</th><th>Service Property</th><th>Active</th><th>Mandatory</th><th width='15%'>Default Value</th><th>Input Type</th><th>Data Type</th><th>Included In OrderAmount</th><th width='15%'>Edit</th></tr>"
                            for (var i = 0; i < res.Services.Properties.length; i++) {

                                serviceProperties += "<tr><td><label>" + res.Services.Properties[i].MetaDataCode + "</label></td>";
                                //property name
                                serviceProperties += "<td><input type=text disabled style='border:none' class='form-control' value='" + res.Services.Properties[i].DisplayName + "' id=prop_" + res.Services.Properties[i].Id + " /></td>";
                                //active state
                                if (res.Services.Properties[i].IsActive == true) {
                                    serviceProperties += "<td><input name=property id='active_" + res.Services.Properties[i].Id + "'  type='checkbox' checked disabled class='make-switch' data-on-text='Yes' data-off-text='No'  /></td>";
                                }
                                else {
                                    serviceProperties += "<td><input name=property id='active_" + res.Services.Properties[i].Id + "'  type='checkbox'  disabled class='make-switch' data-on-text='Yes' data-off-text='No'  /></td>";
                                }

                                //mandatory feild
                                if (res.Services.Properties[i].IsRequired == true) {
                                    serviceProperties += "<td><input name=required id='chck_" + res.Services.Properties[i].Id + "'  type='checkbox' checked disabled class='make-switch' data-on-text='Yes' data-off-text='No'  /></td>";
                                }
                                else {
                                    serviceProperties += "<td><input name=required id='chck_" + res.Services.Properties[i].Id + "'  type='checkbox' disabled class='make-switch' data-on-text='Yes' data-off-text='No'  /></td>";
                                }

                                //default value
                                serviceProperties += "<td><input type=text disabled style='border:none' class='form-control' value='" + res.Services.Properties[i].DefaultValue + "' id=default_" + res.Services.Properties[i].Id + " /></td>";

                                //input type
                                serviceProperties += "<td><select  class='form-control' id='input_" + res.Services.Properties[i].Id + "' disabled >" + option_inputtype + "</select></td>";

                                //data type
                                serviceProperties += "<td><select  class='form-control' id='data_" + res.Services.Properties[i].Id + "' disabled >" + option_inputdatatype + "</select></td>";

                                //Priority
                                //serviceProperties += "<td><input type=text disabled style='border:none' onkeypress='return isNumberKey(event)' class='form-control' value='" + res.Services.Properties[i].Priority + "' id=priority_" + res.Services.Properties[i].Id + " /></td>";

                                //IncludedInOrderAmount
                                if (res.Services.Properties[i].IncludeInOrderAmount == true) {
                                    serviceProperties += "<td><input name=includeinorderamount id='includein_" + res.Services.Properties[i].Id + "'  type='checkbox' checked disabled class='make-switch' data-on-text='Yes' data-off-text='No'  /></td>";
                                }
                                else {
                                    serviceProperties += "<td><input name=includeinorderamount id='includein_" + res.Services.Properties[i].Id + "'  type='checkbox' disabled class='make-switch' data-on-text='Yes' data-off-text='No'  /></td>";
                                }

                                //edit button
                                serviceProperties += "<td><input class='btn btn-sm btn-default btn grey' type=button name=edit Value=Edit alt=" + res.Services.Properties[i].Id + " id=edit_" + res.Services.Properties[i].Id + " /><input class='btn btn-sm btn-default btn green' type=button name=save Value=Save style='display:none' alt=" + res.Services.Properties[i].Id + " id=save_" + res.Services.Properties[i].Id + " metadatacode='" + res.Services.Properties[i].MetaDataCode + "'/><input class='btn btn-sm btn-default btn grey' type=button name=cancel Value=Cancel style='display:none' id=cancel_" + res.Services.Properties[i].Id + " alt=" + res.Services.Properties[i].Id + " /></td></tr>"
                                //SuccessNotifier(res.Property[i].inputid + "\n" + res.Property[i].Dataid);


                            }

                            serviceProperties += "</table>";
                            $("#propertydata").prepend(serviceProperties);
                            $(".make-switch").bootstrapSwitch('state', true);
                        }

                    }
                })
            }

            $(document).on('click', 'input[name="edit"]', function () {
                var edit_id = this.id;
                var tab_id = this.alt;

                $("#chck_" + tab_id).bootstrapSwitch('toggleDisabled', false, false);
                $("#includein_" + tab_id).bootstrapSwitch('toggleDisabled', false, false);
                $("#active_" + tab_id).bootstrapSwitch('toggleDisabled', false, false);
                $("#save_" + tab_id).removeAttr("style");
                $("#prop_" + tab_id).removeAttr("disabled");
                $("#prop_" + tab_id).removeAttr("style");
                $("#default_" + tab_id).removeAttr("disabled");
                $("#data_" + tab_id).removeAttr("disabled");
                $("#input_" + tab_id).removeAttr("disabled");
                $("#default_" + tab_id).removeAttr("style");
                $("#priority_" + tab_id).removeAttr("disabled");
                $("#priority_" + tab_id).removeAttr("style");
                $("#cancel_" + tab_id).show();
                $("#" + edit_id).hide();
            });

            $(document).on('click', 'input[name="save"]', function () {
                var serviceProperty = {};
                var servicePropertId = $(this).attr("alt");
                var metaDataCode = $(this).attr("metadatacode");
                var displayName = $("#prop_" + servicePropertId).val();
                var isActive = $("#active_" + servicePropertId).is(":checked");
                var isRequired = $("#chck_" + servicePropertId).is(":checked");
                var defaultValue = $("#default_" + servicePropertId).val();
                var inputTypeId = $("#input_" + servicePropertId + " :selected").val();
                var dataTypeId = $("#data_" + servicePropertId + " :selected").val();
                var includeInOrderAmount = $("#includein_" + servicePropertId).is(":checked");
                serviceProperty.DisplayName = displayName
                serviceProperty.MetaDataCode = metaDataCode;
                serviceProperty.IsRequired = isRequired;
                serviceProperty.IncludeInOrderAmount = includeInOrderAmount;
                serviceProperty.InputTypeId = inputTypeId;
                serviceProperty.DataTypeId = dataTypeId;
                serviceProperty.PropertyFields = [];
                if (inputTypeId == "1" || inputTypeId == "2") {
                    serviceProperty.PropertyFields.push({
                        "MinLength": 0,
                        "MaxLength": 0,
                        "IsAllowSpecialChars": false

                    })
                }
                ordersClient.UpdateServiceProperties(servicePropertId, serviceProperty, function (res) {
                    if (res.Success == true) {
                    }
                })


            });

            //$("#inputTypeDDl").change(function () {
            //    if ($(this).val() == "1" || $(this).val() == "2") {
            //        $("#trAllowSpecialChars").show();
            //    }
            //    else {
            //        $("#trAllowSpecialChars").hide();
            //    }
            //})

            $("#dataTypeDDl").change(function () {
                if ($(this).val() == "3" && ($("#inputTypeDDl").val() == "1" || $("#inputTypeDDl").val() == "2")) {
                    $("#trMinLength,#trMaxLength,#trAllowSpecialChars").show();
                }
                else {
                    $("#trMinLength,#trMaxLength,#trAllowSpecialChars").hide();
                }
            })

        })
    </script>
</asp:Content>
