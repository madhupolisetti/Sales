var name = "", email = "", mobile = "", birthDate = "", joinDate = "", confirmDate = "", Id = 0;
var branch = 0, role = 0, dept = 0, designation = 0, empId = 0, maritalStatus = 2, teamLead = 0, traineeId = 0;
var global_pageIndex = 1, global_pageLength = 10;
var AccountName = '', AccountEmail = ''
var tempaccessrole = '';
$(document).ready(function () {
    $(".date-picker").datepicker({ rtl: App.isRTL(), autoclose: !0, format: "yyyy-mm-dd" });
    var date = new Date();
    var DateWithSlashes = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate());
    $('input[name="txtBirthDate"]').val(DateWithSlashes);
    $('input[name="txtJoinDate"]').val(DateWithSlashes);
    $('input[name="txtConfirmdate"]').val(DateWithSlashes);
    tempaccessrole = $("#hdnAccessRole").val();
    if (tempaccessrole == 'SUPER_USER' || tempaccessrole == 'HR') {
        $("#nonRestrictForHRandSuperUser").show();
    }
    //alert(tempaccessrole);
    BindEmployeeData();
    global_pageIndex = 1;
    $("#EmployeeList").show();
    GetEmployeeDetails(global_pageIndex, AccountName, AccountEmail, global_pageLength);
});

$(document).on("input", ".Numeric", function () {
    this.value = this.value.replace(/[^\d\.\-]/g, '');
});

$("#txtSearchAccountName,#txtSearchEmail").keyup(function () {
    var temp = ""
    temp = $("#txtSearchAccountName").val();
    var tempmail = ""
    tempmail = $("#txtSearchEmail").val();
    if (temp == "" && tempmail == "") {
        GetEmployeeDetails(1, "", "", 10);
    }

});


$("#txtSearchAccountName,#txtSearchEmail").keyup(function (e) {
    if (e.which == 13) {
        searchDetails()
    }
});
$("#btnRegCancel").click(function () {
    $('#txtName').val('');
    $('#txtEmail').val('');
    $('#txtMobile').val('');
    $('#txtTraineeID').val('');
    $('#txtEmpID').val('');
    $('input[name="txtBirthDate"]').val();
    $('input[name="txtJoinDate"]').val();
    $('input[name="txtConfirmdate"]').val();
    //$("#ddlEmp :selected").val(0);
    //$("#ddlBranch :selected").val(0);
    //$("#ddlRole :selected").val(0);
    //$("#ddlDept :selected").val(0);
    //$("#ddlDesignation :selected").val(0);
    //$("#ddlMaritalStatus :selected").val('');
    $("#ddlEmp").val('0');
    $("#ddlBranch").val('0');
    $("#ddlRole").val('0');
    $("#ddlDept").val("0");
    $("#ddlDesignation").val('0');
    $("#ddlMaritalStatus").val('2');
});
$("#btnRegEmp").click(function () {
    name = $('#txtName').val();
    email = $('#txtEmail').val();
    mobile = $('#txtMobile').val();
    traineeId = $('#txtTraineeID').val();
    empId = $('#txtEmpID').val();
    birthDate = $('input[name="txtBirthDate"]').val();
    joinDate = $('input[name="txtJoinDate"]').val();
    confirmDate = $('input[name="txtConfirmdate"]').val();
    teamLead = $("#ddlEmp :selected").val();
    branch = $("#ddlBranch :selected").val();
    role = $("#ddlRole :selected").val();
    dept = $("#ddlDept :selected").val();
    designation = $("#ddlDesignation :selected").val();
    maritalStatus = $("#ddlMaritalStatus :selected").val();
    var len = email.length;
    //if (name =="" || mobile == "" || email == "" || traineeId == "" || empId =="" || birthDate == "" || joinDate =="" || confirmDate == ""| teamLead == 0 || branch == 0 || designation == 0 || dept == 0 || role == 0 || maritalStatus =="") {
    //    ErrorNotifier('Enter Complete Details');
    //}

    if (name == "") {
        ErrorNotifier('Enter Name');
    }
    else if (mobile == "") {
        ErrorNotifier('Enter Mobile');
    }
    else if (email == "") {
        ErrorNotifier('Enter email');
    }
    else if (traineeId == "") {
        ErrorNotifier('Enter traineeId');
    }
    else if (birthDate == "") {
        ErrorNotifier('Enter birthDate');
    }
    else if (joinDate == "") {
        ErrorNotifier('Enter joinDate');
    }
    else if (confirmDate == "") {
        ErrorNotifier('Enter confirmDate');
    }
    else if (teamLead == 0) {
        ErrorNotifier('Enter teamLead');
    }
    else if (branch == 0) {
        ErrorNotifier('Enter branch');
    }
    else if (designation == 0) {
        ErrorNotifier('Enter designation');
    }
    else if (dept == 0) {
        ErrorNotifier('Enter dept');
    }
    else if (role == 0) {
        ErrorNotifier('Enter role');
    }
    else if (maritalStatus == 2) {
        ErrorNotifier('Enter maritalStatus');

    }


    else if (email.substring(len - 15, len).toUpperCase() != '@smscountry.com'.toUpperCase()var name = "", email = "", mobile = "", birthDate = "", joinDate = "", confirmDate = "", Id = 0;
    var branch = 0, role = 0, dept = 0, designation = 0, empId = 0, maritalStatus = 2, teamLead = 0, traineeId = 0;
    var global_pageIndex = 1, global_pageLength = 10;
    var AccountName = '', AccountEmail = ''
    var tempaccessrole = '';
    $(document).ready(function () {
        $(".date-picker").datepicker({ rtl: App.isRTL(), autoclose: !0, format: "yyyy-mm-dd" });
        var date = new Date();
        var DateWithSlashes = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate());
        $('input[name="txtBirthDate"]').val(DateWithSlashes);
        $('input[name="txtJoinDate"]').val(DateWithSlashes);
        $('input[name="txtConfirmdate"]').val(DateWithSlashes);
        tempaccessrole = $("#hdnAccessRole").val();
        if (tempaccessrole == 'SUPER_USER' || tempaccessrole == 'HR') {
            $("#nonRestrictForHRandSuperUser").show();
        }
        //alert(tempaccessrole);
        BindEmployeeData();
        global_pageIndex = 1;
        $("#EmployeeList").show();
        GetEmployeeDetails(global_pageIndex, AccountName, AccountEmail, global_pageLength);
    });

    $(document).on("input", ".Numeric", function () {
        this.value = this.value.replace(/[^\d\.\-]/g, '');
    });

    $("#txtSearchAccountName,#txtSearchEmail").keyup(function () {
        var temp = ""
        temp = $("#txtSearchAccountName").val();
        var tempmail = ""
        tempmail = $("#txtSearchEmail").val();
        if (temp == "" && tempmail == "") {
            GetEmployeeDetails(1, "", "", 10);
        }

    });


    $("#txtSearchAccountName,#txtSearchEmail").keyup(function (e) {
        if (e.which == 13) {
            searchDetails()
        }
    });
    $("#btnRegCancel").click(function () {
        $('#txtName').val('');
        $('#txtEmail').val('');
        $('#txtMobile').val('');
        $('#txtTraineeID').val('');
        $('#txtEmpID').val('');
        $('input[name="txtBirthDate"]').val();
        $('input[name="txtJoinDate"]').val();
        $('input[name="txtConfirmdate"]').val();
        //$("#ddlEmp :selected").val(0);
        //$("#ddlBranch :selected").val(0);
        //$("#ddlRole :selected").val(0);
        //$("#ddlDept :selected").val(0);
        //$("#ddlDesignation :selected").val(0);
        //$("#ddlMaritalStatus :selected").val('');
        $("#ddlEmp").val('0');
        $("#ddlBranch").val('0');
        $("#ddlRole").val('0');
        $("#ddlDept").val("0");
        $("#ddlDesignation").val('0');
        $("#ddlMaritalStatus").val('2');
    });
    $("#btnRegEmp").click(function () {
        name = $('#txtName').val();
        email = $('#txtEmail').val();
        mobile = $('#txtMobile').val();
        traineeId = $('#txtTraineeID').val();
        empId = $('#txtEmpID').val();
        birthDate = $('input[name="txtBirthDate"]').val();
        joinDate = $('input[name="txtJoinDate"]').val();
        confirmDate = $('input[name="txtConfirmdate"]').val();
        teamLead = $("#ddlEmp :selected").val();
        branch = $("#ddlBranch :selected").val();
        role = $("#ddlRole :selected").val();
        dept = $("#ddlDept :selected").val();
        designation = $("#ddlDesignation :selected").val();
        maritalStatus = $("#ddlMaritalStatus :selected").val();
        var len = email.length;
        //if (name =="" || mobile == "" || email == "" || traineeId == "" || empId =="" || birthDate == "" || joinDate =="" || confirmDate == ""| teamLead == 0 || branch == 0 || designation == 0 || dept == 0 || role == 0 || maritalStatus =="") {
        //    ErrorNotifier('Enter Complete Details');
        //}

        if (name == "") {
            ErrorNotifier('Enter Name');
        }
        else if (mobile == "") {
            ErrorNotifier('Enter Mobile');
        }
        else if (email == "") {
            ErrorNotifier('Enter email');
        }
        else if (traineeId == "") {
            ErrorNotifier('Enter traineeId');
        }
        else if (birthDate == "") {
            ErrorNotifier('Enter birthDate');
        }
        else if (joinDate == "") {
            ErrorNotifier('Enter joinDate');
        }
        else if (confirmDate == "") {
            ErrorNotifier('Enter confirmDate');
        }
        else if (teamLead == 0) {
            ErrorNotifier('Enter teamLead');
        }
        else if (branch == 0) {
            ErrorNotifier('Enter branch');
        }
        else if (designation == 0) {
            ErrorNotifier('Enter designation');
        }
        else if (dept == 0) {
            ErrorNotifier('Enter dept');
        }
        else if (role == 0) {
            ErrorNotifier('Enter role');
        }
        else if (maritalStatus == 2) {
            ErrorNotifier('Enter maritalStatus');

        }


        else if (email.substring(len - 15, len).toUpperCase() != '@smscountry.com'.toUpperCase() && email.substring(len - 11, len).toUpperCase() != '@telebu.com'.toUpperCase()) {
            ErrorNotifier("Enter Smscountry Mail or Telebu Mail");
    }
    else {
        mode = 1;
        EmployeeDetails(mode, Id, name, email, mobile, birthDate, joinDate, confirmDate, dept, designation, branch, role, status, teamLead, traineeId, empId, maritalStatus);
    }
});



$("#btnSearch").click(function () {
    searchDetails();

});

function searchDetails() {

    AccountName = $("#txtSearchAccountName").val();
    AccountEmail = $("#txtSearchEmail").val();
    global_pageIndex = 1;
    global_pageLength = 10;
    GetEmployeeDetails(global_pageIndex, AccountName, AccountEmail, global_pageLength);

}
function EmployeeDetails(mode, Id, name, email, mobile, birthDate, joinDate, confirmDate, dept, designation, branch, role, status, teamLead, traineeId, empId, maritalStatus) {
    $.ajax({
        url: "AjaxHandlers/AdminAccess.ashx",
        async: false,
        type: "POST",
        dataType: "json",
        data: {
            type: 2,
            Id: Id,
            mode: mode,
            name: name,
            email: email,
            mobile: mobile,
            birthDate: birthDate,
            joinDate: joinDate,
            confirmDate: confirmDate,
            dept: dept,
            designation: designation,
            branch: branch,
            accessRole: role,
            teamLead: teamLead,
            traineeId: traineeId,
            status: status,
            empId: empId,
            maritalStatus: maritalStatus
        },
        success: function (res) {
            if (res.Success = "True") {
                SuccessNotifier(res.Message);
                date = new Date();
                DateWithSlashes = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate());
                $('#txtName').val("");
                $('#txtEmail').val("");
                $('#txtMobile').val("");
                $('#txtTraineeID').val("");
                $('#txtEmpID').val("");
                $('input[name="txtBirthDate"]').val(DateWithSlashes);
                $('input[name="txtJoinDate"]').val(DateWithSlashes);
                $('input[name="txtConfirmdate"]').val(DateWithSlashes);
                $("#ddlEmp").val('0');
                $("#ddlBranch").val('0');
                $("#ddlRole").val('0');
                $("#ddlDept").val("0");
                $("#ddlDesignation").val('0');
                $("#ddlMaritalStatus").val('2');
                global_pageIndex = 1;
                GetEmployeeDetails(global_pageIndex, AccountName, AccountEmail, global_pageLength);
            }
            else {
                ErrorNotifier(res.Message);
            }
        },
        error: function (error, exception) {
            if (error.status == 401) {
                window.location.href = "LoginWithGoogle.aspx";
            }
            ErrorNotifier("Unknown Error");
        }
    });
}
function GetEmployeeDetails(global_pageIndex, AccountName, AccountEmail, global_pageLength) {
    $.ajax({
        url: "AjaxHandlers/AdminAccess.ashx",
        dataType: "json",
        async: false,
        type: "post",
        data: { type: 3, pageIndex: global_pageIndex, AccountName: AccountName, AccountEmail: AccountEmail, pageLength: global_pageLength },
        success: function (res) {
            var str = "";
            var len = res.Employees.length;
            var rowCount = res.TotalCount;
            pagination(rowCount, global_pageLength)
            if (res.Success == "True" || CompareText(res.Success, "true") || res.Message == "SUCCESS") {
                if (tempaccessrole == 'SUPER_USER' || tempaccessrole == 'HR') {
                    str += "<table class='table table-bordered' id='empRpts' width='100%'><thead><tr><th>Name</th><th>Email</th><th>Mobile</th><th>DateOfBirth</th><th>JoiningDate</th><th>ConfirmationDate</th><th>Designation</th>" +
                      "<th>Department</th><th>AccessRole</th><th>Branch</th><th>TraineeId</th><th>EmploymentId</th><th>MaritalStatus</th><th>TeamLead</th><th>Edit</th><th>Status</th></tr></thead><tbody>";
                }
                else {
                    str += "<table class='table table-bordered' id='empRpts' width='100%'><thead><tr><th>Name</th><th>Email</th><th>Mobile</th><th>DateOfBirth</th><th>JoiningDate</th><th>ConfirmationDate</th><th>Designation</th>" +
                          "<th>Department</th><th>AccessRole</th><th>Branch</th><th>TraineeId</th><th>EmploymentId</th><th>MaritalStatus</th><th>TeamLead</th></tr></thead><tbody>";
                }
                for (var i = 0; i < len; i++) {
                    str += "<tr><td><label id='lblName" + res.Employees[i].Id + "' >" + res.Employees[i].Name + "</label><input type='text' style='display:none' id='editName" + res.Employees[i].Id + "' value='" + res.Employees[i].Name + "'/></td>";
                    str += "<td>" + res.Employees[i].Email + "</td>";
                    str += "<td><label id='lblMobile" + res.Employees[i].Id + "' >" + res.Employees[i].Mobile + "</label><input type='text' style='display:none' id='editMobile" + res.Employees[i].Id + "' value='" + res.Employees[i].Mobile + "'/></td>";
                    str += "<td><label id='lblBirthDate" + res.Employees[i].Id + "' >" + res.Employees[i].DateOfBirth + "</label><input type='text' style='display:none' id='editBirthDate" + res.Employees[i].Id + "' value='" + res.Employees[i].DateOfBirth + "' class='date-picker date-set' data-date-format='yyyy-mm-dd' readonly/></td>"
                    str += "<td><label id='lblJoinDate" + res.Employees[i].Id + "' >" + res.Employees[i].JoiningDate + "</label><input type='text' style='display:none' id='editJoinDate" + res.Employees[i].Id + "' value='" + res.Employees[i].JoiningDate + "' class='date-picker date-set' data-date-format='yyyy-mm-dd' readonly/></td>"
                    str += "<td><label id='lblConfirmDate" + res.Employees[i].Id + "' >" + res.Employees[i].ConfirmationDate + "</label><input type='text' style='display:none' id='editConfirmDate" + res.Employees[i].Id + "' value='" + res.Employees[i].ConfirmationDate + "' class='date-picker date-set' data-date-format='yyyy-mm-dd' readonly/></td>"
                    str += "<td><label id='lblDesignation" + res.Employees[i].Id + "'>" + res.Employees[i].Designation + "</label>"
                    str += "<select style='display:none' name='editDesignation' class='editDesignation' id='editDesignation" + res.Employees[i].Id + "'></select></td>";
                    str += "<td><label id='lblDept" + res.Employees[i].Id + "'>" + res.Employees[i].Department + "</label>"
                    str += "<select style='display:none' name='editDepartment'  class='editDepartment' id='editDept" + res.Employees[i].Id + "'></select></td>";
                    str += "<td><label id='lblRole" + res.Employees[i].Id + "'>" + res.Employees[i].AccessRole + "</label>"
                    str += "<select style='display:none' name='editRole' class='editRole' id='editAccessRole" + res.Employees[i].Id + "'> </select></td>";
                    str += "<td><label id='lblBranch" + res.Employees[i].Id + "'>" + res.Employees[i].Branch + "</label>"
                    str += "<select style='display:none' name='editBranch' class='editBranch' id='editBranch" + res.Employees[i].Id + "'> </select></td>";
                    str += "<td><label id='lblTraineeId" + res.Employees[i].Id + "' >" + res.Employees[i].TraineeId + "</label><input type='text' style='display:none' id='editTraineeId" + res.Employees[i].Id + "' value='" + res.Employees[i].TraineeId + "'/></td>";
                    str += "<td>" + res.Employees[i].EmploymentId + "</td>";
                    str += "<td><label id='lblMaritalStatus" + res.Employees[i].Id + "'>" + res.Employees[i].MaritalStatus + "</label>"
                    str += "<select style='display:none' id='editMaritalStatus" + res.Employees[i].Id + "'><option value=''>SELECT</option><option value='0'>Single</option><option value='1'>Married</option></select></td>";
                    str += "<td><label id='lblTeamLead" + res.Employees[i].Id + "'>" + res.Employees[i].TeamLead + "</label>"
                    if (tempaccessrole == 'SUPER_USER' || tempaccessrole == 'HR') {
                        str += "<select style='display:none' name='editTeamLead' class='editTeamLead' id='editTeamLead" + res.Employees[i].Id + "'></select></td>";
                        str += "<td><button type='button' id='edit" + res.Employees[i].Id + "' onClick='editFunction(" + res.Employees[i].Id + ")'> <i class='fa fa-pencil-square-o'></i></button>";
                        str += "<button type='button' class='btn btn-success' style='display:none' id='update" + res.Employees[i].Id + "' onClick='updateFunction(" + res.Employees[i].Id + ")'> Save</button>";
                        str += "<button type='button' style='display:none' id='cancel" + res.Employees[i].Id + "' onClick='cancelFunction(" + res.Employees[i].Id + ")'>Cancel</button></td>";

                        if (res.Employees[i].Status == "False")
                            empStatus = "<button type='button' class='empStatus btn btn blue' value='1' id='" + res.Employees[i].Id + "'>Enable</button>"
                        else
                            empStatus = "<button type='button' class='empStatus btn btn default'  value='0' id='" + res.Employees[i].Id + "'>Disable</button>"
                        str += "<td>" + empStatus + "</td></tr>";
                    }
                }
            }
            str += "</tbody></table>";
            if (res.Employees.length > 0) {
                $("#pageSizeDiv").removeAttr('style');
                $("#empData").html('');
                $("#empData").html(str);
                $("#page-selection").removeAttr('style');
            }
            else {
                $("#pageSizeDiv").attr('style', 'display:none;');
                $("#page-selection").attr('style', 'display:none;');
                $("#empData").html('');
                $("#empData").html("No Data Found");
            }
        },
        error: function (error, exception) {
            if (error.status == 401) {
                window.location.href = "LoginWithGoogle.aspx";
            }
            ErrorNotifier("Unknown Error");
        }
    });
}
//pagination
$("#ddlPageLength").change(function () {

    global_pageLength = this.value;

    global_pageIndex = 1;


    GetEmployeeDetails(global_pageIndex, AccountName, AccountEmail, global_pageLength);

});
function pagination(rowCount, global_pageLength) {


    $('#page-selection').bootpag({

        total: Math.ceil(rowCount / global_pageLength),
        next: "Next",
        prev: "Prev",
        maxVisible: 8


    }).on("page", function (event, num) {

        if (global_pageIndex != num) {

            global_pageIndex = num;

            GetEmployeeDetails(global_pageIndex, AccountName, AccountEmail, global_pageLength);
        }

    });


}
function BindEmployeeData() {
    $.ajax({
        url: "AjaxHandlers/AdminAccess.ashx",
        dataType: "json",
        async: false,
        type: "post",
        data: {
            type: 1
        },
        success: function (res) {

            var empStr = "", desigStr = "", brchStr = "", roleStr = "", deptStr = "";


            empStr = "<option value='0'>SELECT</option>";
            desigStr = "<option value='0'>SELECT</option>";
            brchStr = "<option value='0'>SELECT</option>";
            roleStr = "<option value='0'>SELECT</option>";
            deptStr = "<option value='0'>SELECT</option>";


            for (var i = 0; i < res.Employees.length; i++) {

                empStr += "<option value=" + res.Employees[i].Id + ">" + res.Employees[i].Name + "</option>";
            }

            $("#ddlEmp").html(empStr);

            for (var i = 0; i < res.Designations.length; i++) {

                desigStr += "<option value=" + res.Designations[i].Id + ">" + res.Designations[i].Designation + "</option>";
            }

            for (var i = 0; i < res.CompanyBranches.length; i++) {

                brchStr += "<option value=" + res.CompanyBranches[i].Id + ">" + res.CompanyBranches[i].Name + "</option>";
            }

            for (var i = 0; i < res.AccessRoles.length; i++) {

                roleStr += "<option value=" + res.AccessRoles[i].Id + ">" + res.AccessRoles[i].AccessRole + "</option>";
            }
            for (var i = 0; i < res.Departments.length; i++) {

                deptStr += "<option value=" + res.Departments[i].Id + ">" + res.Departments[i].Name + "</option>";
            }


            $("#ddlDesignation").html(desigStr);
            $("#ddlBranch").html(brchStr);
            $("#ddlRole").html(roleStr);
            $("#ddlDept").html(deptStr);
            $("#ddlEmp").html(empStr);


            $(".editBranch").html(brchStr);
            $(".editDesignation").html(desigStr);
            $(".editTeamLead").html(empStr);
            $(".editDepartment").html(deptStr);
            $(".editRole").html(roleStr);



        },

        error: function (error, exception) {

            if (error.status == 401) {
                window.location.href("LoginWithGoogle.aspx");
            }

            ErrorNotifier("Unknown Error");
        }

    });

}
function updateFunction(Id) {

    mode = 2;
    Id = Id;
    editName = $("#editName" + Id + "").val();
    editMobile = $("#editMobile" + Id + "").val();
    editTraineeId = $("#editTraineeId" + Id + "").val();
    editBirthDate = $("#editBirthDate" + Id + "").val();
    editJoinDate = $("#editJoinDate" + Id + "").val();
    editConfirmDate = $("#editConfirmDate" + Id + "").val();
    editDesignation = $("#editDesignation" + Id + "").val();
    editDept = $("#editDept" + Id + "").val();
    editBranch = $("#editBranch" + Id + "").val();
    editAccessRole = $("#editAccessRole" + Id + "").val();
    editTeamLead = $("#editTeamLead" + Id + "").val();
    editMaritalStatus = $("#editMaritalStatus" + Id + "").val();

    EmployeeDetails(mode, Id, editName, email, editMobile, editBirthDate, editJoinDate, editConfirmDate, editDept, editDesignation, editBranch, editAccessRole, status, editTeamLead, traineeId, empId, editMaritalStatus);



}
function editFunction(Id) {
    BindEmployeeData();
    $(".date-picker").datepicker({ rtl: App.isRTL(), autoclose: !0, defaultTime: false, format: "yyyy-mm-dd" });
    $("#edit" + Id + "").hide();
    $("#update" + Id + "").show();
    $("#cancel" + Id + "").show();
    $("#lblName" + Id).attr('style', 'display:none;');
    $("#lblMobile" + Id).attr('style', 'display:none;');
    $("#lblBirthDate" + Id).attr('style', 'display:none;');
    $("#lblJoinDate" + Id).attr('style', 'display:none;');
    $("#lblConfirmDate" + Id).attr('style', 'display:none;');
    $("#lblDesignation" + Id).attr('style', 'display:none;');
    $("#lblDept" + Id).attr('style', 'display:none;');
    $("#lblRole" + Id).attr('style', 'display:none;');
    $("#lblBranch" + Id).attr('style', 'display:none;');
    $("#lblTraineeId" + Id).attr('style', 'display:none;');
    $("#lblMaritalStatus" + Id).attr('style', 'display:none;');
    $("#lblTeamLead" + Id).attr('style', 'display:none;');
    $("#editName" + Id + "").show();
    $("#editMobile" + Id + "").show();
    $("#editTraineeId" + Id + "").show();
    $("#editBirthDate" + Id + "").show();
    $("#editJoinDate" + Id + "").show();
    $("#editConfirmDate" + Id + "").show();
    $("#editDesignation" + Id + "").show();
    $("#editDept" + Id + "").show();
    $("#editBranch" + Id + "").show();
    $("#editAccessRole" + Id + "").show();
    $("#editTeamLead" + Id + "").show();
    $("#editMaritalStatus" + Id + "").show();
    var editDesignationText = $("#lblDesignation" + Id).text();
    $("#editDesignation" + Id + " option:contains(" + editDesignationText.trim() + ")").attr('selected', 'selected');
    var editDeptText = $("#lblDept" + Id).text();
    $("#editDept" + Id + " option:contains(" + editDeptText.trim() + ")").attr('selected', 'selected');
    var editBranchText = $("#lblBranch" + Id).text();
    $("#editBranch" + Id + " option:contains(" + editBranchText.trim() + ")").attr('selected', 'selected');
    var editAccessRoleText = $("#lblRole" + Id).text();
    //$("#editAccessRole" + Id + " option:equals(" + editAccessRoleText.trim() + ")").attr('selected', 'selected');
    $("#editAccessRole" + Id + " option").filter(function () {
        return ($(this).text() == editAccessRoleText.trim());
    }).attr('selected', 'selected');
    var editTeamLeadText = $("#lblTeamLead" + Id).text();
    $("#editTeamLead" + Id + " option:contains(" + editTeamLeadText.trim() + ")").attr('selected', 'selected');
    var editMaritalStatusText = $("#lblMaritalStatus" + Id).text();
    $("#editMaritalStatus" + Id + " option:contains(" + editMaritalStatusText.trim() + ")").attr('selected', 'selected');
}
function cancelFunction(Id) {
    $("#editSnd" + Id).hide();
    $("#edit" + Id + "").show();
    $("#update" + Id + "").hide();
    $("#cancel" + Id + "").hide();
    $("#lblName" + Id).removeAttr('style');
    $("#lblMobile" + Id).removeAttr('style');
    $("#lblBirthDate" + Id).removeAttr('style');
    $("#lblJoinDate" + Id).removeAttr('style');
    $("#lblConfirmDate" + Id).removeAttr('style');
    $("#lblDesignation" + Id).removeAttr('style');
    $("#lblDept" + Id).removeAttr('style');
    $("#lblRole" + Id).removeAttr('style');
    $("#lblBranch" + Id).removeAttr('style');
    $("#lblTraineeId" + Id).removeAttr('style');
    $("#lblMaritalStatus" + Id).removeAttr('style');
    $("#lblTeamLead" + Id).removeAttr('style');
    $("#editName" + Id + "").hide();
    $("#editMobile" + Id + "").hide();
    $("#editTraineeId" + Id + "").hide();
    $("#editBirthDate" + Id + "").hide();
    $("#editJoinDate" + Id + "").hide();
    $("#editConfirmDate" + Id + "").hide();
    $("#editDesignation" + Id + "").hide();
    $("#editDept" + Id + "").hide();
    $("#editBranch" + Id + "").hide();
    $("#editAccessRole" + Id + "").hide();
    $("#editTeamLead" + Id + "").hide();
    $("#editMaritalStatus" + Id + "").hide();
}
$(document).on('click', '.empStatus', function () {
    Id = this.id;
    status = $(this).attr('value');
    mode = 3;
    EmployeeDetails(mode, Id, name, email, mobile, birthDate, joinDate, confirmDate, dept, designation, branch, role, status, teamLead, traineeId, empId, maritalStatus);
});


