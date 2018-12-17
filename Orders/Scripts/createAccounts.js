var ordersClient = new OrdersClient();
$(document).read(function () {
    ordersClient.GetCountries(function (res) {
        if (res.Success == true) {
            var countries = "";
            if (res.Countries.length > 0) {
                countries = "<option value=0>Select</option>";
                for (var i = 0; i < res.Countries.length; i++) {
                    countries += "<option value='" + res.Countries[i].Id + "'>" + res.Countries[i].Name + "(" + res.Countries[i] + ")" + "</option>";
                }
            }
            $("#ddlCountry").html(countries);
        }
    });

});