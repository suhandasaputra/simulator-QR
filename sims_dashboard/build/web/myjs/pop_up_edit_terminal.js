//open popup provide password
$('#table_terminal').on('click', 'td', function () {
    var $row = $(this).closest("tr");
    var account_id = $row.find(".account_id").text();
    var merchant_id = $row.find(".merchant_id").text();

    var datjson = new Object();
    datjson.account_id = account_id;
    datjson.merchant_id = merchant_id;
    $.ajax({
        dataType: "json",
        url: "GetDetailTerminal",
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
                            $('.cd-popup-edit-terminal').addClass('is-visible');
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
    $('.cd-popup-edit-terminal').on('click', function (event) {
        if ($(event.target).is('.cd-popup-edit-terminal-close') || $(event.target).is('.cd-popup-edit-terminal')) {
            event.preventDefault();
            $(this).removeClass('is-visible');
        }
    });
    //close popup when clicking the esc keyboard button provide password
    $(document).keyup(function (event) {
        if (event.which == '27') {
            $('.cd-popup-edit-terminal').removeClass('is-visible');
        }
    });
});



function sub_edt_terminal() {
    var merchant_id = document.getElementById("merchant_id_edit_usr").value;
    var account_id = document.getElementById("account_id_edit_usr").value;
    var account_name = document.getElementById("account_name_edit_usr").value;
    var account_level = document.getElementById("account_level_edit_usr").value;

    var modal = document.getElementById("myModal_add_terminal");
    var span = document.getElementsByClassName("close")[0];
    var push = document.getElementById("push_text_add_terminal");


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
            push.innerHTML = "<p>terminal name must be filled</p>";
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
                push.innerHTML = "<p>terminal level must be filled</p>";
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
                
                datjson.terminal_id = window.localStorage.getItem('terminal_id');
                datjson.merchant_id = merchant_id;
                datjson.account_id = account_id;
                datjson.account_name = account_name;
                datjson.account_level = account_level;

                $.ajax({
                    dataType: "json",
                    url: "EditTerminal",
                    data: JSON.stringify(datjson),
                    type: 'post',
                    success: function (response) {
                        if (response.resp_code == 0000) {
                            loaddata();
                            alert('success edit terminal');
                            $('.cd-popup-edit-terminal').removeClass('is-visible');
                            $("#form_box4")[0].reset();
                        } else {
                            alert('Failed edit terminal : ' + response.resp_desc);
                        }
                    }
                });

            }
        }
    }



}

function sub_del_terminal() {
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
        datjson.terminal_id = window.localStorage.getItem('terminal_id');

        $.ajax({
            dataType: "json",
            url: "DeleteTerminal",
            data: JSON.stringify(datjson),
            type: 'post',
            success: function (response) {
                if (response.resp_code == 0000) {
                    alert('Success Delete Terminal');
                    location.reload();
                } else {
                    alert('Failed Delete Terminal');
                }
            }
        });
    }
}