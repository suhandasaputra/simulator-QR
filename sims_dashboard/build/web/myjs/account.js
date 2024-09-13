/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

jQuery(document).ready(function ($) {
    var userlevel = window.localStorage.getItem('level_desc');
    if (userlevel === 'user') {
        window.location.href = "ho";
    } else {
        var user_id = window.localStorage.getItem('user_id');        
        var acc_name = window.localStorage.getItem('account_name');        
        document.getElementById('email').value = user_id;
        document.getElementById('full_name').value = acc_name;
    }



//            var datjson = new Object();
//            datjson.user_id = user_id;
//            datjson.brand_id = brand_id;
//
//            $.ajax({
//                contentType: 'application/json',
//                dataType: "json",
//                url: "accget?data=" + JSON.stringify(datjson),
//                type: 'get',
//                success: function (response) {
//                    if (response.resp_code == 0000) {
//                        var full_name = response.user_name;
//                        var email = response.user_id;
//                        var phone = response.phonenumber;
//                        document.getElementById('full_name').value = full_name;
//                        document.getElementById('email').value = email;
//                        document.getElementById('phone').value = phone;
//                    } else {
//                        alert('failed retrieve data');
//                    }
//                }
//            });
});

