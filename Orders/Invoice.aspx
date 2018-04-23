<%@ Page Title="" Language="C#" MasterPageFile="~/PostLogin.Master" AutoEventWireup="true" CodeBehind="Invoice.aspx.cs" Inherits="Orders.Invoice" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CSS" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <div class="page-content-wrapper">
        <div class="page-content">
            <input type="hidden" id="hdnQuotationId" value="<%= quotationId %>" />
            <input type="hidden" id="hdnInvoiceId" value="<%= invoiceId %>" />
            <input type="hidden" id="hdnWebUrl" value="<%= ConfigurationManager.AppSettings["WebUrl"].ToString() %>" />
            <div class="row" id="invoiceData">
            </div>

            <div class="row text-center margin-bottom-20">
                <input type="button" value="Back" id="btnBack" class="btn btn-primary" style="margin-left: 10px; margin-top: 30px; border-radius: 0px !important; border-bottom: 5px solid #3a6a77 !important; background-color: #447583; border: 1px solid transparent;" />
                <input type="button" value="DownLoad" id="btnDownload" class="btn btn-primary" style="margin-left: 10px; margin-top: 30px; border-radius: 0px !important; border-bottom: 5px solid #79af2d !important; background-color: #8dc73f; border: 1px solid transparent;" />

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
            var ordersClient = new OrdersClient();
            var webUrl = $("#hdnWebUrl").val();
            ordersClient.ViewInvoice(quotationId, false, function (res) {
                $("#invoiceData").html(res);
            });

            $("#btnBack").click(function () {
                window.location.href = "/Invoices.aspx";
            });

            $("#btnDownload").click(function () {
                ordersClient.DownloadInvoice(quotationId, false, function (res) {
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

            function AddParameter(form, name, value) {
                var $input = $("<input />").attr("type", "hidden")
                                        .attr("name", name)
                                        .attr("value", value);
                form.append($input);
            }

        });

    </script>
</asp:Content>
