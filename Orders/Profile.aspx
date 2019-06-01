<%@ Page Title="" Language="C#" MasterPageFile="~/PostLogin.Master" AutoEventWireup="true" CodeBehind="Profile.aspx.cs" Inherits="Orders.Profile" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CSS" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
         
    <div class="page-content-wrapper">
        <div class="page-content">
            <div class="row">
                <div class="col-sm-3">
                    <div class="portlet light">
                        <div class="text-center profilePic">
                            <img src="images/user.png" alt="profile" />
                            <h4 class="profileName"><%=Session["EmployeeName"]%></h4>
                        </div>

                        <ul class="profileDetails">
                            <li>
                              <%--  <i class="fa fa-envelope-o"></i>--%>
                                <i class="glyphicon glyphicon-envelope"></i>
                                <label id="email" style="font-size:13px"></label>
                            </li>
                            <li>
                                <i class="glyphicon glyphicon-phone"></i>
                                <label id="mobile" style="font-size:13px"></label>
                            </li>
                        </ul>

                    </div>
                    <div class="portlet light">
                        <div class="otherProfData">
                            <label class="block">Department</label>
                            <label class="profText" id="Department"></label>
                        </div>
                        <div class="otherProfData">
                            <label class="block">Designation</label>
                            <label class="profText" id="Designation"></label>
                        </div>
                        <div class="otherProfData">
                            <label class="block">Access Level</label>
                            <label class="profText" id="AccessLevel"></label>
                        </div>
                <%--<input type="file" id="excelfile" />  
                        <br />
                   <input type="button" id="viewfile" value="Export To Table" onclick="ExportToTable()" />  
                    <br />  
                    <br />  
               <table id="exceltable">  
               </table>
                    </div>
                </div>--%>
               <%-- <div class="col-sm-9">
                    <div class="portlet light">
                        <div class="text-center margin-bottom-20">
                            <label class="profTab tab-style-blue margin-right-10">Settings</label>
                            <label class="profTab tab-style-default">Admin Access</label>
                        </div>

                       <%-- <div>
                            <h5 class="bold font-blue-soft"><i class="fa fa-bell-o margin-right-5"></i>Notification Settings</h5>
                            <hr />
                            <label class="font-grey-mint bold">Send Notifications to:</label>
                            <div class="table-responsive">
                                <table class="table no-border">
                                    <tr>
                                        <td>Notifications bar</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Official Email Id</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Mobile Number</td>
                                        <td></td>
                                    </tr>
                                </table>
                            </div>--%>
                        </div>

                       <%-- <div>
                            <h5 class="bold font-blue-soft">
                                <i class="icon-settings margin-right-5"></i>
                                Employee Form
                            </h5>
                            <hr />

                            
                        </div>--%>

                    </div>
        
    </div>
   
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
    <script src="JsFiles/jquery-1.10.2.js"></script>
    
<script type="text/javascript">
    $(document).ready(function () {
        $("#lable_href_name").html('My Profile');
        var id = "<%=Session["AdminId"].ToString()%>";
        
        var mailid = "";
      
        $.ajax({
            url: "/AjaxHandlers/AdminAccess.ashx",
            dataType: "JSON",
            type: "POST",
            data: {
                type: 4,
                id: id
            },
            success: function (res) {
                if (res.retval == true) {
                    if (res.Employees[0].Email.length >= 13) {
                        mailid = res.Employees[0].Email.substring(0, 22);
                        mailid += "....";

                    }
                    else {
                        mailid = res.Employees[0].Email;
                    }
                    $('#email').html(mailid);
                    $('#email').attr("title", res.Employees[0].Email);
                    $('#mobile').html(res.Employees[0].Mobile);
                    $('#Designation').html(res.Employees[0].Designation);
                    $('#Department').html(res.Employees[0].Department);
                    $('#AccessLevel').html(res.Employees[0].AccessRole);
                }
                else
                {
                    alert(res.retmsg);
                }
               
            }

        });
    });
<%--    function ExportToTable() {
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls)$/;  
        /*Checks whether the file is a valid excel file*/
        var x=$("#excelfile").val().toLowerCase();
        if (regex.test($("#excelfile").val().toLowerCase())) {  
            var xlsxflag = false; /*Flag for checking whether excel is .xls format or .xlsx format*/  
            if ($("#excelfile").val().toLowerCase().indexOf(".xlsx") > 0) {  
                xlsxflag = true;  
            }  
            /*Checks whether the browser supports HTML5*/  
            if (typeof (FileReader) != "undefined") {  
                var reader = new FileReader();  
                reader.onload = function (e) {  
                    var data = e.target.result;  
                    /*Converts the excel data in to object*/  
                    if (xlsxflag) {  
                        var workbook = XLSX.read(data, { type: 'binary' });  
                    }  
                    else {  
                        var workbook = XLS.read(data, { type: 'binary' });  
                    }  
                    /*Gets all the sheetnames of excel in to a variable*/  
                    var sheet_name_list = workbook.SheetNames;  
  
                    var cnt = 0; /*This is used for restricting the script to consider only first sheet of excel*/  
                    sheet_name_list.forEach(function (y) { /*Iterate through all sheets*/  
                        /*Convert the cell value to Json*/  
                        if (xlsxflag) {  
                            var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]);  
                        }  
                        else {  
                            var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y]);  
                        }  
                        if (exceljson.length > 0 && cnt == 0) {  
                            BindTable(exceljson, '#exceltable');  
                            cnt++;  
                        }  
                    });  
                    $('#exceltable').show();  
                }  
                if (xlsxflag) {/*If excel file is .xlsx extension than creates a Array Buffer from excel*/  
                    reader.readAsArrayBuffer($("#excelfile")[0].files[0]);  
                }  
                else {  
                    reader.readAsBinaryString($("#excelfile")[0].files[0]);  
                }  
            }  
            else {  
                alert("Sorry! Your browser does not support HTML5!");  
            }  
        }  
        else {  
            alert("Please upload a valid Excel file!");  
        }  
    }  --%>
    
</script>
</asp:Content>