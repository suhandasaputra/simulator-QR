//open popup provide password
$('#table_position').on('click', 'td', function () {
    var $row = $(this).closest("tr");
    var position_id = $row.find(".position_id").text();
    var company_id = localStorage.getItem('company_id');

    var datjson = new Object();
    datjson.company_id = company_id;
    datjson.position_id = position_id;
    $.ajax({
        dataType: "json",
        url: "GetDetailPosition",
        data: JSON.stringify(datjson),
        type: 'POST',
        success: function (resp) {
            if (resp.resp_code == 0000) {
                document.getElementById("position_id_edit").value = resp.position_id;
                document.getElementById("position_desc_edit").value = resp.position_desc;

                $('.cd-popup-edit-status').addClass('is-visible');

            } else {
                alert('Failed get status detail : ' + response.resp_desc);
            }
        }
    });
});

jQuery(document).ready(function ($) {
    //close popup provide password
    $('.cd-popup-edit-status').on('click', function (event) {
        if ($(event.target).is('.cd-popup-edit-status-close') || $(event.target).is('.cd-popup-edit-status')) {
            event.preventDefault();
            $(this).removeClass('is-visible');
        }
    });
    //close popup when clicking the esc keyboard button provide password
    $(document).keyup(function (event) {
        if (event.which == '27') {
            $('.cd-popup-edit-status').removeClass('is-visible');
        }
    });
});

function sub_edt_status() {

    var position_id = document.getElementById("position_id_edit").value;
    var position_desc = document.getElementById("position_desc_edit").value;

    var modal = document.getElementById("myModal_edit_status");
    var span = document.getElementsByClassName("close")[0];
    var push = document.getElementById("push_text_edit_status");


    if (position_id == "") {
        push.innerHTML = "<p>position_id must be filled</p>";
        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    } else if (position_id != "") {
        if (position_desc == "") {
            push.innerHTML = "<p>position_desc must be filled</p>";
            modal.style.display = "block";
            span.onclick = function () {
                modal.style.display = "none";
            }
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        } else if (position_desc != "") {

            var datjson = new Object();
            datjson.company_id = window.localStorage.getItem('company_id');
            datjson.user_id = window.localStorage.getItem('user_id');
            datjson.position_id = position_id;
            datjson.position_desc = position_desc;
            $.ajax({
                dataType: "json",
                url: "EditPosition",
                data: JSON.stringify(datjson),
                type: 'post',
                success: function (response) {
                    if (response.resp_code == 0000) {
                        loaddata();
                        alert('success edit position');
                        $('.cd-popup-edit-status').removeClass('is-visible');
                        $("#form_box4")[0].reset();
                    } else {
                        alert('Failed edit position : ' + response.resp_desc);
                    }
                }
            });



        }
    }
}

function sub_del_status() {
    var position_id = document.getElementById("position_id_edit").value;


    if (position_id == "") {
        push.innerHTML = "<p>position_id must be fill</p>";
        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    } else if (position_id != "") {
        var datjson = new Object();
        datjson.position_id = position_id;
        datjson.company_id = window.localStorage.getItem('company_id');
        datjson.user_id = window.localStorage.getItem('user_id');
        $.ajax({
            dataType: "json",
            url: "DeletePosition",
            data: JSON.stringify(datjson),
            type: 'post',
            success: function (response) {
                if (response.resp_code == 0000) {
                    alert('Success Delete position');
                    location.reload();
                } else {
                    alert('Failed Delete position');
                }
            }
        });
    }
}