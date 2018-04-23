var ordersClient = new OrdersClient();
$(document).ready(function () {
    bindProducts();
})
$("#btnAddNewQuotation,#btncreate").click(function () {
    $("#createQuotation").modal("show");
});

$("#btnSubmit").click(function () {
    var productId = $("#ddlProducts option:selected").val();
    var accountUrl = $("#ddlProducts option:selected").attr("accountUrl");
    getProductRelatedUserInformation(productId, accountUrl, $("#txtUserMobile").val(), 0, 0);

});

function getProductRelatedUserInformation(productId, accountUrl, mobileNo, quotationId, billMode) {

    ordersClient.GetProductWiseAccountRelatedInformation(productId, accountUrl, mobileNo, function (res) {
        if (res.Success == true) {

            var accountId = res.UserDetails.AccountId;

            var QotationReqType = 1;

            var $form = $("<form/>").attr("id", "data_form")
                            .attr("action", "CreateQuotation.aspx")
                            .attr("method", "post");
            $("body").append($form);
            //Append the values to be send
            //AddParameter($form, "QotationReqType", QotationReqType);
            AddParameter($form, "ID", accountId);
            AddParameter($form, "productId", productId);
            AddParameter($form, "address", res.UserDetails.Address);
            AddParameter($form, "state", res.UserDetails.StateId);
            AddParameter($form, "contactName", res.UserDetails.NickName);
            AddParameter($form, "country", res.UserDetails.CountryId);
            AddParameter($form, "registeredDate", res.UserDetails.RegisteredDate);
            AddParameter($form, "email", res.UserDetails.EmailID);
            AddParameter($form, "mobile", res.UserDetails.MobileNumber);
            AddParameter($form, "company", res.UserDetails.Company);
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
                    productsData += "<option value='" + res.Products[i].Id + "' accountUrl='" + res.Products[i].AccountInformationUrl + "'>" + res.Products[i].Name + "</option>"
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