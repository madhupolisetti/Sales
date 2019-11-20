<%@ Page Title="" Language="C#" MasterPageFile="~/PostLogin.Master" AutoEventWireup="true" CodeBehind="Invoice.aspx.cs" Inherits="Orders.Invoice" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CSS" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <div class="page-content-wrapper">
        <div class="page-content">
            <input type="hidden" id="hdnQuotationId" value="<%= quotationId %>" />
            <input type="hidden" id="hdnInvoiceId" value="<%= invoiceId %>" />
            <input type="hidden" id="hdnBillMode" value="<%= billMode %>" />
            <input type="hidden" id="hdnEmployeeId" value="<%= employeeId %>" />
            <input type="hidden" id="hdnIsProformaInvoice" value="<%= isProformaInvoice %>" />
            <input type="hidden" name="hdnTestCreditsAdminId" id="hdnTestCreditsAdminId" value="<%= TestCreditsAdminId %>" />
            <input type="hidden" id="hdnWebUrl" value="<%= ConfigurationManager.AppSettings["WebUrl"].ToString() %>" />
            <div class="row" id="invoiceData">
            </div>

            <div class="row text-center margin-bottom-20">
                <input type="button" value="Back" id="btnBack" class="btn btn-primary" style="margin-left: 10px; margin-top: 30px; border-radius: 0px !important; border-bottom: 5px solid #3a6a77 !important; background-color: #447583; border: 1px solid transparent;" />
                <input type="button" value="DownLoad" id="btnDownload" class="btn btn-primary" style="margin-left: 10px; margin-top: 30px; border-radius: 0px !important; border-bottom: 5px solid #79af2d !important; background-color: #8dc73f; border: 1px solid transparent;" />
                <input type="button" value="Activate" id="btnActivate" class="btn btn-lg green" style="margin-left: 10px; margin-top: 30px; border-radius: 0px !important; border-bottom: 5px solid #2db5bf !important;display:none;" />
                <input type="button" value="Generate Sale Invoice" id="btnGenerateInvoice" class="btn btn-lg green" style="margin-left: 10px; margin-top: 30px; border-radius: 0px !important; border-bottom: 5px solid #2db5bf !important;display:none;" />
                <input type="button" value="Generate Payment" id="btnPayment" class="btn btn-lg green" style="margin-left: 10px; margin-top: 30px; border-radius: 0px !important; border-bottom: 5px solid #2db5bf !important;" />
                <input type="button" value="Email To Client" id="btnSendAnEmailToClient" isbillgenerated="" class="btn btn-primary" style="margin-left: 10px; margin-top: 30px; border-radius: 0px !important; border-bottom: 5px solid #f15048 !important; background-color: #fe6555; border: 1px solid transparent;" />
            </div>

            <div class="modal fade" id="ccAdressModal" role="dialog">
                <div class="modal-dialog">

                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"></button>
                            <h4 class="modal-title">Other Mailing Options</h4>
                            <h4 class="table-head">Email will be sent to following e-mail </h4>
                            <input type="text" class="form-control" id="clientEmailInVoiceMail" disabled />
                        </div>
                        <div class="modal-body">

                            <label class="table-head">CC Mail Addresses</label>
                            <input type="text" placeholder="Enter mail id" id="txtCcAddress" class="form-control" s />

                            <div class="text-right margin-top-15">
                                <button type="button" class="btn btn-primary" id="ccSubmit" data-dismiss="modal" invoice="" qutnorinvoiceraiseddate="" contactname="" isbillgenerated="">Submit</button>
                                <button type="button" class="btn btn-default" id="ccCancel" data-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div id="metaDatNew" class="metaDatNew">
            </div>

        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
    <script type="text/javascript" src="Scripts/OrdersClient.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            var quotationId = $("#hdnQuotationId").val();
            var invoiceId = $("#hdnInvoiceId").val();
            var isProformaInvoice = $("#hdnIsProformaInvoice").val();
            var isPostPaidInvoice = ($("#hdnBillMode").val() == "2" ? true : false);
            
            var employeeId = $("#hdnEmployeeId").val();
            var TestCreditsAdminId = $('#hdnTestCreditsAdminId').val();
            if (employeeId == TestCreditsAdminId) {
                $("#btnActivate").show(); $("#btnPayment").hide();
            }
            else {
                $("#btnActivate").hide(); $("#btnPayment").show();
            }
            var ordersClient = new OrdersClient();
            var webUrl = $("#hdnWebUrl").val();
            ordersClient.ViewInvoice(quotationId, isPostPaidInvoice, isProformaInvoice, function (res) {
                $("#invoiceData").html(res);
                if (isProformaInvoice == "True")
                    $('#btnGenerateInvoice').show();
            });

            $("#btnBack").click(function () {
                window.location.href = "/Invoices.aspx";
            });

            $('#btnGenerateInvoice').click(function () {
                ordersClient.GenerateSaleInvoice(invoiceId, function (res) {
                    if (res.Success == true) {
                        var quotationId = res.Invoices.QuotationId;
                        var invoiceId = res.Invoices.InvoiceId;
                        var billMode = res.Invoices.BillingModeId;
                        var employeeId = res.Invoices.EmployeeId;
                        var isProformaInvoice = false;
                        if (quotationId) {
                            var $form = $("<form/>").attr("id", "Invoicedata_form")
                                                    .attr("action", "Invoice.aspx")
                                                    .attr("target", "_blank")
                                                    .attr("method", "post");
                            $("body").append($form);
                            AddParameter($form, "QuotationId", quotationId);
                            AddParameter($form, "InvoiceId", invoiceId);
                            AddParameter($form, "BillMode", billMode);
                            AddParameter($form, "EmployeeId", employeeId);
                            AddParameter($form, "IsProformaInvoice", isProformaInvoice);
                            $form[0].submit();
                        }
                        else {
                            alert("Select an Invoice to view!");
                            return;
                        }
                    }
                    else
                    {
                        ErrorNotifier(res.Message);
                    }
                });
            });

            $("#btnDownload").click(function () {
                ordersClient.DownloadInvoice(quotationId, isPostPaidInvoice, function (res) {
                    console.log(res);
                    var a = document.createElement('a');
                    a.href = webUrl + res.FilePath;
                    a.download = webUrl + res.FilePath;
                    document.body.appendChild(a);
                    a.click();
                });
            });


            $("#btnPayment").click(function () {
                var $form = $("<form/>").attr("id", "data_form")
                                       .attr("action", "Payment.aspx")
                                       .attr("method", "post");
                $("body").append($form);
                //Append the values to be send
                //AddParameter($form, "QotationReqType", QotationReqType);

                AddParameter($form, "InvoiceId", invoiceId);
                AddParameter($form, "QuotationId", quotationId);
                $form[0].submit();
            });
            $("#btnActivate").click(function () {
                window.location.href = "/Orders.aspx";
            })
            function AddParameter(form, name, value) {
                var $input = $("<input />").attr("type", "hidden")
                                        .attr("name", name)
                                        .attr("value", value);
                form.append($input);
            }

        });

    </script>
</asp:Content>
