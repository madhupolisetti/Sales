<%@ Page Title="" Language="C#" MasterPageFile="~/PostLogin.Master" AutoEventWireup="true" CodeBehind="AdminAccessManagement.aspx.cs" Inherits="Orders.AdminAccessManagement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CSS" runat="server">
     <link href="assets/global/plugins/datatables/datatables.min.css" rel="stylesheet" />
   
    <link href="CssFiles/bootstrap-datepicker3.min.css" rel="stylesheet" />

      <style type="text/css">

      
        .form-body {
            padding: 3px 0 !important;
        }

        .form-group {
            margin-bottom: 0 !important;
            padding: 3px 0 !important;
        }

        .btn grey {
            background-color: #BDBDBD;
            border-color: #BDBDBD;
            color: #fff;
            padding: 5px 12px;
            border-radius: 4px;
            border: 2px solid #BDBDBD;
        }
          .table {
                display:inline-block;overflow:auto;
          }
          #page-selection {
              text-align:left;
          }
    </style>


  <title>Admin Access Management</title>


</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    
    <center>

   <div class="page-content-wrapper">

      <div class="page-content" >
           <div id ="nonRestrictForHRandSuperUser" style ="display:none;">
               <div class="portlet light">

         
               <div class="portlet-title">
                <div class="caption font-red-sunglo">
                    <i class="icon-settings font-red-sunglo"></i>
                    <span class="caption-subject bold uppercase"> Employee Form</span>
                </div>

            </div>
                <div class="portlet-body form" style="overflow:hidden">
                  <form class="form-horizontal" role="form">
                        <div class="form-body">
                            <div class="form-group col-md-6">
                                <label class="col-md-3 control-label">User Name</label>
                                <div class="col-md-9 input-medium">
                                    <div class="input-group input-medium">
                                        <span class="input-group-addon">
                                            <i class="fa fa-user"></i>
                                        </span>
                                        <input type="text" id="txtName" placeholder="Name" class="form-control" />
                                    </div>
                                </div>
                            </div>
                              <div class="form-group col-md-6">
                                <label class="col-md-3 control-label">Date Of Birth</label>
                                <div class="col-md-9 input-medium">
                                    <div class="input-group date date-picker margin-bottom-5" data-date-format="yyyy-mm-dd">
                                        <input value="DateOfBirth" type="text" class="form-control form-filter input-sm" readonly name="txtBirthDate" placeholder="Date Of Birth" />
                                        <span class="input-group-btn">
                                            <button class="btn btn-sm default" type="button">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                             
                        </div>                     
                        <div class="form-body">
                             <div class="form-group col-md-6">
                            <label class="col-md-3 control-label">Email ID</label>
                            <div class="col-md-9 input-medium">
                                <div class="input-inline input-medium">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="fa fa-envelope"></i>
                                        </span>
                                        <input type="email" id="txtEmail" class="form-control" placeholder="Email Address"/>
                                    </div>
                                </div>
                            </div>
                          </div> 
                           <div class="form-group col-md-6">
                                <label class="col-md-3 control-label">Joining Date</label>
                                <div class="col-md-9 input-medium">
                                    <div class="input-group date date-picker margin-bottom-5" data-date-format="yyyy-mm-dd">
                                        <input value="JoinDate" type="text" class="form-control form-filter input-sm" readonly name="txtJoinDate" placeholder="Joining Date" />
                                        <span class="input-group-btn">
                                            <button class="btn btn-sm default" type="button">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                              
                        </div>
                        <div class="form-body">
                           <div class="form-group col-md-6">
                                <label class="col-md-3 control-label">Mobile #</label>
                                <div class="col-md-9 input-medium">
                                     <div class="input-inline input-medium">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="fa fa-mobile"></i>
                                        </span>
                                    <input type="text" id="txtMobile" placeholder="Mobile" class="form-control Numeric" />
                                        </div>
                                </div>
                                    </div>
                            </div>
                            <div class="form-group col-md-6">
                                <label class="col-md-3 control-label">Confirm Date</label>
                                <div class="col-md-9 input-medium">

                                    <div class="input-group date date-picker margin-bottom-5" data-date-format="yyyy-mm-dd">
                                        <input value="ConfirmationDate" type="text" class="form-control form-filter input-sm" readonly name="txtConfirmdate" placeholder="Confirmation Date" />
                                        <span class="input-group-btn">
                                            <button class="btn btn-sm default" type="button">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-body">
                           <div class="form-group col-md-6">
                                <label class="col-md-3 control-label">Trainee ID</label>
                                <div class="col-md-9 input-medium">
                                    <input type="text" id="txtTraineeID" placeholder="Trainee ID" class="form-control Numeric" />
                                </div>
                            </div>
                            <div class="form-group col-md-6">
                                <label class="col-md-3 control-label">Department</label>
                                <div class="col-md-9 input-medium">
                                    <select id="ddlDept" class="form-control">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-body">
                            <div class="form-group col-md-6">
                                <label class="col-md-3 control-label">Employee ID</label>
                                <div class="col-md-9 input-medium">
                                    <input type="text" id="txtEmpID" placeholder="Employee ID" class="form-control Numeric" />
                                </div>
                            </div>
                                <div class="form-group col-md-6">
                                <label class="col-md-3 control-label">Role</label>
                                <div class="col-md-9 input-medium">
                                    <select id="ddlRole" class="form-control">
                                    </select>
                                </div>
                          </div>
                      </div>
                        <div class="form-body">

                                   <div class="form-group col-md-6">
                                <label class="col-md-3 control-label">Designation</label>
                                <div class="col-md-9 input-medium">
                                    <select id="ddlDesignation" class="form-control">
                                    </select>
                                </div>
                            </div>
                              <div class="form-group col-md-6">
                                <label class="col-md-3 control-label">Branch</label>
                                <div class="col-md-9 input-medium">
                                    <select id="ddlBranch" class="form-control">
                                    </select>
                                 </div>
                        </div>
                        </div>
                        <div class="form-body">
                             <div class="form-group col-md-6">
                                <label class="col-md-3 control-label">Team Lead</label>
                                <div class="col-md-9 input-medium">
                                    <select id="ddlEmp" class="form-control">
                                    </select>
                                </div>
                            </div>

                            <div class="form-group col-md-6">
                                <label class="col-md-3 control-label">Marital Status</label>
                                <div class="col-md-9 input-medium">
                                    <select id="ddlMaritalStatus" class="form-control">
                                        <option value="2">SELECT</option>
                                        <option value="0">Single</option>
                                        <option value="1">Married</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-actions col-md-12">
                            <div class="row">
                                <div class="col-md-offset-4 col-md-8 input-medium">                              
                                    <input type="button" id="btnRegEmp" class="btn btn-success" value="Submit" />
                                    <input type="button" id="btnRegCancel" class="btn btn-default"  value="Cancel" />
                                </div>
                            </div>
                        </div>                    
                    </form>                  
              
       

                   </div>
           </div>
        </div>

          <div class="portlet light portlet-fit portlet-datatable ">
                <div class="portlet-body">

                  <div class="table-container" style="width: 100%;">
        <div id ="EmployeeList" style="display:none;">                  
            <div class="row">
                <br/>
                 <table id="tbl" class="table no-border mb-0 ">
                        <tr role="row" class="filter">
                             
                              <td class="col-md-3">
                  <label>Account Name:</label>
                <input type="text" id ="txtSearchAccountName" placeholder="Account Name" class="form-control form-filter input-sm" /></td>
                   <td class="col-md-3">                
                <label>Email Id:</label>
              
                <input type ="text" id ="txtSearchEmail" class="form-control form-filter input-sm" /></td>
                   <td class="col-md-3"> 
                        <label class="margin-top-20"> 
                <input type ="button" class ="btn btn-success" id ="btnSearch" value ="Search"/>
                            </label>
                       </td>
                            </tr>
                     </table>
                  
                <br />
                <hr>
              <div class="col-md-12 col-sm-12 text-left margin-bottom-10"> 
                   <span class="caption-subject bold uppercase"> Employee List </span> <br /> <br />
  	            <div id="pageSizeDiv">Page Size:
             
                         <select id="ddlPageLength">                          
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>                              
                          </select></div>
              </div>
            </div>
                        
     <div id="empData"></div>

   <div id="page-selection"></div>
        <input type ="hidden" id ="hdnAccessRole" value="<%= accessRole %>"/> 
                </div>
                   </div>
          </div>
       </div>
                 
              </div>
       </div>
      
   </center>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
     <script src="JsFiles/bootstrap-datepicker.min.js" type="text/javascript"></script>   
       <script src="JsFiles/jquery.bootpag.min.js"></script>
     <script src="JsFiles/app.min.js" type="text/javascript"></script>   
    <script src="Scripts/AdminAccess.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $("#lable_href_name").html('Admin Access Management');
        });
    </script>
</asp:Content>
