/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

var level_desc = window.localStorage.getItem('level_desc');
if (level_desc !== 'admin') {
/// can't open popup edit employee
} else if (level_desc === 'admin') {
    $('#table_employee').on('click', 'td', function () {
        var $row = $(this).closest("tr");
        var user_id = localStorage.getItem('user_id');
        var merchant_id = $row.find(".merchant_id").text();
        var datjson = new Object();
        datjson.user_id = user_id;
        datjson.merchant_id = merchant_id;
        $.ajax({
            dataType: "json",
            url: "GetDetailEmployee",
            data: JSON.stringify(datjson),
            type: 'POST',
            success: function (resp) {
                if (resp.resp_code == 0000) {
                    document.getElementById("merchant_id_edit_merchant").value = resp.merchant_id;
                    document.getElementById("merchant_name_edit_merchant").value = resp.merchant_name;
//                    document.getElementById("usaha_desc_edit_merchant").value = resp.usaha_desc;
                    document.getElementById("phonenumber_edit_merchant").value = resp.phonenumber;
                    $.ajax({
                        dataType: "json",
                        url: "OptionUsaha",
                        type: 'POST',
                        success: function (response) {
                            if (response.resp_code == 0000) {
                                var ff = new Object();
                                ff = response.list;
                                var options = '<option disabled="" selected="" value="' + resp.bidang_usaha + '">' + resp.usaha_desc + '</option>';
                                for (var i = 0; i < ff.length; i++) {
                                    options += '<option value="' + ff[i].id_usaha + '">' + ff[i].usaha_desc + '</option>';
                                }
                                $("select#usaha_desc_edit_merchant").html(options);
                                $('.cd-popup-edit-user').addClass('is-visible');
                            } else {
                                alert('Failed get bidang usaha : ' + response.resp_desc);
                            }
                        }
                    });
                } else {
                    alert('Failed get Account Level : ' + resp.resp_desc);
                }
            }
        });
    });
}
jQuery(document).ready(function ($) {
//close popup provide password
    $('.cd-popup-edit-user').on('click', function (event) {
        if ($(event.target).is('.cd-popup-edit-user-close') || $(event.target).is('.cd-popup-edit-user')) {
            event.preventDefault();
            $(this).removeClass('is-visible');
        }
    });
    //close popup when clicking the esc keyboard button provide password
    $(document).keyup(function (event) {
        if (event.which == '27') {
            $('.cd-popup-edit-user').removeClass('is-visible');
        }
    });
});
function sub_edt_user() {
    var merchant_id_edit_merchant = document.getElementById("merchant_id_edit_merchant").value;
    var merchant_name_edit_merchant = document.getElementById("merchant_name_edit_merchant").value;
    var bidang_usaha_edit_merchant = document.getElementById("usaha_desc_edit_merchant").value;
    var phonenumber_edit_merchant = document.getElementById("phonenumber_edit_merchant").value;
    var user_id = localStorage.getItem('user_id');
    var modal = document.getElementById("myModal_edit_user");
    var span = document.getElementsByClassName("close_edit_user")[0];
    var push = document.getElementById("push_text_edit_user");
    if (merchant_id_edit_merchant == "") {
        push.innerHTML = "<p>merchant id must be filled</p>";
        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    } else if (merchant_id_edit_merchant != "") {
        if (merchant_name_edit_merchant == "") {
            push.innerHTML = "<p>merchant name must be filled</p>";
            modal.style.display = "block";
            span.onclick = function () {
                modal.style.display = "none";
            }
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        } else if (merchant_name_edit_merchant != "") {
            if (bidang_usaha_edit_merchant == "") {
                push.innerHTML = "<p>bidang usaha must be filled</p>";
                modal.style.display = "block";
                span.onclick = function () {
                    modal.style.display = "none";
                }
                window.onclick = function (event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
            } else if (bidang_usaha_edit_merchant != "") {
                if (phonenumber_edit_merchant == "") {
                    push.innerHTML = "<p>phonenumber must be filled</p>";
                    modal.style.display = "block";
                    span.onclick = function () {
                        modal.style.display = "none";
                    }
                    window.onclick = function (event) {
                        if (event.target == modal) {
                            modal.style.display = "none";
                        }
                    }
                } else if (phonenumber_edit_merchant != "") {

                    var datjson = new Object();
                    datjson.merchant_id = merchant_id_edit_merchant;
                    datjson.merchant_name = merchant_name_edit_merchant;
                    datjson.bidang_usaha = bidang_usaha_edit_merchant;
                    datjson.phonenumber = phonenumber_edit_merchant;
                    datjson.user_id = user_id;
                    $.ajax({
                        dataType: "json",
                        url: "EditEmployee",
                        data: JSON.stringify(datjson),
                        type: 'post',
                        success: function (response) {
                            if (response.resp_code == 0000) {
                                loaddata();
                                alert('success update employee');
                                $('.cd-popup-edit-user').removeClass('is-visible');
                            } else {
                                alert('Failed update employee : ' + response.resp_desc);
                            }
                        }
                    });
                }
            }
        }
    }
}











function sub_del_user() {
    var merchant_id_edit_merchant = document.getElementById("merchant_id_edit_merchant").value;
    var user_id = localStorage.getItem('user_id');
    if (merchant_id_edit_merchant == "") {
        push.innerHTML = "<p>merchant id must be fill</p>";
        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    } else if (merchant_id_edit_merchant != "") {
        var datjson = new Object();
        datjson.merchant_id = merchant_id_edit_merchant;
        datjson.user_id = user_id;
        $.ajax({
            dataType: "json",
            url: "DeleteEmployee",
            data: JSON.stringify(datjson),
            type: 'post',
            success: function (response) {
                if (response.resp_code == 0000) {
                    alert('Success Delete Merchant');
                    location.reload();
                } else {
                    alert('Failed Delete Merchant');
                }
            }
        });

    }
}


function sub_rsgn_user() {
    var employee_id_edit_user = document.getElementById("employee_id_edit_user").value;
    if (employee_id_edit_user == "") {
        push.innerHTML = "<p>employee_id must be fill</p>";
        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    } else if (employee_id_edit_user != "") {
        var datjson = new Object();
        datjson.employee_id_edit_user = employee_id_edit_user;
        datjson.company_id = window.localStorage.getItem('company_id');
        datjson.user_id = window.localStorage.getItem('user_id');
        $.ajax({
            dataType: "json",
            url: "ResignEmployee",
            data: JSON.stringify(datjson),
            type: 'post',
            success: function (response) {
                if (response.resp_code == 0000) {
                    alert('Success Resign');
                    location.reload();
                } else {
                    alert('Failed Resign');
                }
            }
        });
    }
}

function sub_open_rsgn_user() {
    var employee_id_edit_user = document.getElementById("employee_id_edit_user").value;
    if (employee_id_edit_user == "") {
        push.innerHTML = "<p>employee_id must be fill</p>";
        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    } else if (employee_id_edit_user != "") {
        var datjson = new Object();
        datjson.employee_id_edit_user = employee_id_edit_user;
        datjson.company_id = window.localStorage.getItem('company_id');
        datjson.user_id = window.localStorage.getItem('user_id');
        $.ajax({
            dataType: "json",
            url: "ResignOpenEmployee",
            data: JSON.stringify(datjson),
            type: 'post',
            success: function (response) {
                if (response.resp_code == 0000) {
                    alert('Success Open Resign');
                    location.reload();
                } else {
                    alert('Failed Open Resign');
                }
            }
        });
    }
}

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}




function loaddatacareer() {
}