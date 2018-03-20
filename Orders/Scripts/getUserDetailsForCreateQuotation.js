var ordersClient = new OrdersClient();
$(document).ready(function () {
    bindProducts();
})
$("#btnAddNewQuotation,#btncreate").click(function () {
    $("#createQuotation").modal("show");
});

$("#btnSubmit").click(function () {
    var productId = $("#ddlProducts option:selected").val();
    getProductRelatedUserInformation(productId, $("#txtUserMobile").val(), 0, 0);

});

function getProductRelatedUserInformation(productId, mobileNo, quotationId, billMode) {

    ordersClient.GetProductWiseAccountRelatedInformation(productId, mobileNo, function (res) {
        if (res.Success == 1) {

            var accountId = res.AccountId;

            var QotationReqType = 1;

            var $form = $("<form/>").attr("id", "data_form")
                            .attr("action", "CreateQuotation.aspx")
                            .attr("method", "post");
            $("body").append($form);
            //Append the values to be send
            //AddParameter($form, "QotationReqType", QotationReqType);
            AddParameter($form, "ID", accountId);
            AddParameter($form, "productId", productId);
            AddParameter($form, "address", res.Address);
            AddParameter($form, "state", res.State);
            AddParameter($form, "contactName", res.NickName);
            AddParameter($form, "country", res.Country);
            AddParameter($form, "registeredDate", res.RegisteredDate);
            AddParameter($form, "email", res.EmailID);
            AddParameter($form, "mobile", res.MobileNumber);
            AddParameter($form, "company", res.Company);
            AddParameter($form, "BillMode", billMode);
            AddParameter($form, "QuotationId", quotationId)
            $form[0].submit();

        }
    });
}

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


function AddParameter(form, name, value) {
    var $input = $("<input />").attr("type", "hidden")
                            .attr("name", name)
                                .attr("value", value);
    form.append($input);
}