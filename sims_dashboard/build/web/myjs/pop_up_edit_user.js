//open popup provide password
$('#table_user').on('click', 'td', function () {
    var $row = $(this).closest("tr");
    var account_id = $row.find(".account_id").text();
    var merchant_id = $row.find(".merchant_id").text();

    var datjson = new Object();
    datjson.account_id = account_id;
    datjson.merchant_id = merchant_id;
    $.ajax({
        dataType: "json",
        url: "GetDetailUser",
        data: JSON.stringify(datjson),
        type: 'POST',
        success: function (resp) {
            if (resp.resp_code == 0000) {
                document.getElementById("merchant_id_edit_usr").value = resp.merchant_id;
                document.getElementById("account_id_edit_usr").value = resp.account_id;
                document.getElementById("account_name_edit_usr").value = resp.account_name;
                document.getElementById("account_level_edit_usr").value = resp.account_level;
                
                $.ajax({
                    dataType: "json",
                    url: "OptionAccountLevel",
                    data: JSON.stringify(datjson),
                    type: 'POST',
                    success: function (response) {
                        if (response.resp_code == 0000) {
                            var aa = new Object();
                            aa = response.list;
                            var options = '<option selected disabled value="' + resp.account_level + '">' + resp.level_desc + '</option>';
                            for (var i = 0; i < aa.length; i++) {
                                options += '<option value="' + aa[i].id_level + '">' + aa[i].level_desc + '</option>';
                            }
                            $('.cd-popup-edit-user').addClass('is-visible');
                            $("select#account_level_edit_usr").html(options);
                        } else {
                            alert('Failed get Account Level : ' + resp.resp_desc);
                        }
                    }
                });

            } else {
                alert('Failed get Account Level : ' + resp.resp_desc);
            }
        }
    });
});

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
    var merchant_id = document.getElementById("merchant_id_edit_usr").value;
    var account_id = document.getElementById("account_id_edit_usr").value;
    var account_name = document.getElementById("account_name_edit_usr").value;
    var account_level = document.getElementById("account_level_edit_usr").value;

    var modal = document.getElementById("myModal_add_user");
    var span = document.getElementsByClassName("close")[0];
    var push = document.getElementById("push_text_add_user");


    if (account_id == "") {
        push.innerHTML = "<p>email must be filled</p>";
        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    } else if (account_id != "") {
        if (account_name == "") {
            push.innerHTML = "<p>user name must be filled</p>";
            modal.style.display = "block";
            span.onclick = function () {
                modal.style.display = "none";
            }
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        } else if (account_name != "") {
            if (account_level == "") {
                push.innerHTML = "<p>user level must be filled</p>";
                modal.style.display = "block";
                span.onclick = function () {
                    modal.style.display = "none";
                }
                window.onclick = function (event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
            } else if (account_level != "") {

                var datjson = new Object();
                
                datjson.user_id = window.localStorage.getItem('user_id');
                datjson.merchant_id = merchant_id;
                datjson.account_id = account_id;
                datjson.account_name = account_name;
                datjson.account_level = account_level;

                $.ajax({
                    dataType: "json",
                    url: "EditUser",
                    data: JSON.stringify(datjson),
                    type: 'post',
                    success: function (response) {
                        if (response.resp_code == 0000) {
                            loaddata();
                            alert('success edit user');
                            $('.cd-popup-edit-user').removeClass('is-visible');
                            $("#form_box4")[0].reset();
                        } else {
                            alert('Failed edit user : ' + response.resp_desc);
                        }
                    }
                });

            }
        }
    }



}

function sub_del_user() {
    var account_id_edit_usr = document.getElementById("account_id_edit_usr").value;
    var merchant_id_edit_usr = document.getElementById("merchant_id_edit_usr").value;


    if (account_id_edit_usr == "") {
        push.innerHTML = "<p>Outlet name must be fill</p>";
        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    } else if (account_id_edit_usr != "") {

        var datjson = new Object();
        datjson.account_id_edit_usr = account_id_edit_usr;
        datjson.merchant_id = merchant_id_edit_usr;
        datjson.user_id = window.localStorage.getItem('user_id');

        $.ajax({
            dataType: "json",
            url: "DeleteUser",
            data: JSON.stringify(datjson),
            type: 'post',
            success: function (response) {
                if (response.resp_code == 0000) {
                    alert('Success Delete User');
                    location.reload();
                } else {
                    alert('Failed Delete User');
                }
            }
        });
    }
}