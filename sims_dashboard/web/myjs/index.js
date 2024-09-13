/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */
jQuery(document).ready(function ($) {
    var user_id = window.localStorage.getItem('user_id');
    var level_desc = window.localStorage.getItem('level_desc');
    if (level_desc !== null && user_id !== null) {
        window.location.href = "db";
    }    
});

$(function () {
    //                if (localStorage.chkbx && localStorage.chkbx != '') {
    //                    $('#cb').attr('checked', 'checked');
    $('#user').val(localStorage.user);
    //                } else {
    //                    $('#cb').removeAttr('checked');
    //                }
    //
    //                $('#cb').click(function () {
    //                    if ($('#cb').is(':checked')) {
    //                        // save username
    //                        window.localStorage.setItem('user', $('#user').val());
    //                        window.localStorage.setItem('chkbx', $('#cb').val());
    //                    } else {
    //                        window.localStorage.removeItem('user');
    //                        localStorage.chkbx = '';
    //                    }
    //                });
});



function forgot() {
    window.location.href = "fopa";
}
;
$("#show_pass").on('click', function () {
    var lihat_dong = $("#pass");
    var lihat_key = $("#show_pass");
    if (lihat_dong.attr("type") === "password") {
        lihat_dong.attr("type", "text");
        lihat_key.attr("class", "fa fa-eye");
    } else {
        lihat_dong.attr("type", "password");
        lihat_key.attr("class", "fa fa-eye-slash");
    }
});




function login() {
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var push = document.getElementById("push_text");
    ;
    if (user == "") {
        push.innerHTML = "<p>Email / Username must be fill</p>";
        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    } else if (user != "") {
        if (pass == "") {
            push.innerHTML = "<p>Password must be fill</p>";
            modal.style.display = "block";
            span.onclick = function () {
                modal.style.display = "none";
            }
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        } else if (pass != "") {
            var datjson = new Object();
            datjson.user = user;
            datjson.pass = pass;
            $.ajax({
                contentType: 'application/json',
                dataType: "json",
                url: "Login",
                data: JSON.stringify(datjson),
                type: 'post',
                success: function (response) {
                    if (response.resp_code == 0000) {
//                        if (response.level_desc !== 'admin' && response.level_desc !== 'head') {
//                            window.location.href = "ho";
//                            alert('Your Account Have Not Permission To Access')
//                        } else {
                            window.localStorage.setItem('side', 'db');
                            window.location.href = "db";
//                        }
                        window.localStorage.setItem('user_id', response.account_id);
                        window.localStorage.setItem('merchant_id', response.merchant_id);
                        window.localStorage.setItem('account_level', response.account_level);
                        window.localStorage.setItem('account_name', response.account_name);
                        window.localStorage.setItem('level_desc', response.level_desc);

                    } else {
                        alert('Incorrect Username / Password ');
                                                
                    }
                }
            });
        }
    }
}


$(document).ready(function () {
    //                var input1 = document.getElementById("pass");
    var input2 = document.getElementById("pass");
    //                input1.addEventListener("keyup", function (event) {
    //                    if (event.keyCode === 13) {
    //                        event.preventDefault();
    //                        login();
    //                    }
    //                });
    input2.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            login();
        }
    });
});
