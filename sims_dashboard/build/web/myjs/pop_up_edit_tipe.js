//open popup provide password
$('#table_tipe').on('click', 'td', function () {
    var $row = $(this).closest("tr");
    var tipe_id = $row.find(".tipe_id").text();

    var datjson = new Object();
    datjson.tipe_id = tipe_id;
    datjson.user_id = window.localStorage.getItem('user_id');
    $.ajax({
        dataType: "json",
        url: "GetDetailTipe",
        data: JSON.stringify(datjson),
        type: 'POST',
        success: function (resp) {
            if (resp.resp_code == 0000) {
                document.getElementById("tipe_id_edit_tipe").value = resp.tipe_id;
                document.getElementById("device_type_edit_tipe").value = resp.device_type;
                document.getElementById("brand_name_edit_tipe").value = resp.brand_name;
                $('.cd-popup-edit-tipe').addClass('is-visible');
            } else {
                alert('Failed get Detail Tipe : ' + resp.resp_desc);
            }
        }
    });
});

jQuery(document).ready(function ($) {
    //close popup provide password
    $('.cd-popup-edit-tipe').on('click', function (event) {
        if ($(event.target).is('.cd-popup-edit-tipe-close') || $(event.target).is('.cd-popup-edit-tipe')) {
            event.preventDefault();
            $(this).removeClass('is-visible');
        }
    });
    //close popup when clicking the esc keyboard button provide password
    $(document).keyup(function (event) {
        if (event.which == '27') {
            $('.cd-popup-edit-tipe').removeClass('is-visible');
        }
    });
});



function sub_edt_tipe() {
    var tipe_id = document.getElementById("tipe_id_edit_tipe").value;
    var device_type = document.getElementById("device_type_edit_tipe").value;

    var modal = document.getElementById("myModal_add_tipe");
    var span = document.getElementsByClassName("close")[0];
    var push = document.getElementById("push_text_add_tipe");


    if (tipe_id == "") {
        push.innerHTML = "<p>tipe id must be filled</p>";
        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    } else if (tipe_id != "") {
        if (device_type == "") {
            push.innerHTML = "<p>device type must be filled</p>";
            modal.style.display = "block";
            span.onclick = function () {
                modal.style.display = "none";
            }
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        } else if (device_type != "") {
            var datjson = new Object();
            datjson.user_id = window.localStorage.getItem('user_id');
            datjson.tipe_id = tipe_id;
            datjson.device_type = device_type;

            $.ajax({
                dataType: "json",
                url: "EditTipe",
                data: JSON.stringify(datjson),
                type: 'post',
                success: function (response) {
                    if (response.resp_code == 0000) {
                        loaddata();
                        alert('success edit tipe');
                        $('.cd-popup-edit-tipe').removeClass('is-visible');
                        $("#form_box4")[0].reset();
                    } else {
                        alert('Failed edit tipe : ' + response.resp_desc);
                    }
                }
            });
        }
    }
}

function sub_del_tipe() {
    var tipe_id = document.getElementById("tipe_id_edit_tipe").value;

    if (tipe_id == "") {
        push.innerHTML = "<p>tipe must be fill</p>";
        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    } else if (tipe_id != "") {

        var datjson = new Object();
        datjson.tipe_id = tipe_id;
        datjson.user_id = window.localStorage.getItem('user_id');

        $.ajax({
            dataType: "json",
            url: "DeleteTipe",
            data: JSON.stringify(datjson),
            type: 'post',
            success: function (response) {
                if (response.resp_code == 0000) {
                    alert('Success Delete Tipe');
                    location.reload();
                } else {
                    alert('Failed Delete Tipe');
                }
            }
        });
    }
}