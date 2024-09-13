/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */
jQuery(document).ready(function ($) {
    var level_desc = window.localStorage.getItem('level_desc');
    if (level_desc !== 'admin' && level_desc !== 'head') {
        window.location.href = "ho";
    }
    loaddata();
});

window.onload = function () {
    setTodayIfEmpty('tanggal_attendance_from');
    setTodayIfEmpty('tanggal_attendance_to');
};

function setTodayIfEmpty(elementId) {
    var element = document.getElementById(elementId);
    if (element.value === "") {
        var today = new Date().toISOString().split("T")[0];
        element.setAttribute("value", today);
    }
}

function loaddata() {
    var date = new Date();
    var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
            .toISOString()
            .split("T")[0];

    $('#table_attendance').dataTable().fnClearTable();
    $('#table_attendance').dataTable().fnDestroy();


    var datjson = new Object();
    datjson.company_id = window.localStorage.getItem('company_id');
    datjson.start_date = dateString;
    datjson.end_date = dateString;
    $.ajax({
        contentType: 'application/json',
        dataType: "json",
        url: "Attendance",
        data: JSON.stringify(datjson),
        type: 'POST',
        success: function (response) {
            if (response.resp_code == 0000) {
                $('#table_attendance thead tr')
                        .clone(true)
                        .addClass('filters')
                        .appendTo('#table_attendance thead');
                var dataattendance = response.list;
                $('#table_attendance').DataTable({
                    "scrollX": true,
                    "data": dataattendance,
                    "columns": [
                        {data: "reference",
                            "className": 'attendance reference'},
                        {data: "employee_id",
                            "className": 'attendance employee_id'},
                        {data: "employee_name",
                            "className": 'attendance employee_name'},
                        {data: "level_desc",
                            "className": 'attendance level_desc'},
                        {data: "date_absensi",
                            "className": 'attendance date_absensi'},
                        {data: "shift_name",
                            "className": 'attendance shift_name'},
                        {data: "schedule_in",
                            "className": 'attendance schedule_in'},
                        {data: "schedule_out",
                            "className": 'attendance schedule_out'},
                        {data: "checkin",
                            "className": 'attendance checkin'},
                        {data: "checkout",
                            "className": 'attendance checkout'},                       
                        {data: "absence_type",
                            "className": 'attendance absence_type'}
                    ],
                    "createdRow": function (row, data, dataIndex) {
                    },
                    dom: 'Bfrtip',
                    autoClose: true,
                    buttons:
                            [
                                {
                                    extend: "copyHtml5",
                                    title: "list attendance",
                                    exportOptions: {columns: ':visible:not()'}, //last column has the action types detail/edit/delete
                                    footer: true
                                },
                                {
                                    extend: "csvHtml5",
                                    title: "list attendance",
                                    exportOptions: {columns: ':visible:not()'},
                                    footer: true
                                },
                                {
                                    extend: "excelHtml5",
                                    title: "list attendance",
                                    exportOptions: {columns: ':visible:not()'},
                                    footer: true
                                },
                                {
                                    extend: "pdfHtml5",
                                    title: "list attendance",
                                    exportOptions: {columns: ':visible:not()'},
                                    footer: true
                                },
                                {
                                    extend: "print",
                                    exportOptions: {columns: ':visible:not()'},
                                    footer: true
                                }
                            ],
                    orderCellsTop: true,
                    fixedHeader: true,

                    initComplete: function () {
                        var api = this.api();
                        var cursorPosition = 0; // Initialize cursorPosition to a default value

                        api.columns().eq(0).each(function (colIdx) {
                            var cell = $('.filters th').eq($(api.column(colIdx).header()).index());
                            var title = $(cell).text();
                            $(cell).html('<input type="text" placeholder="' + title + '" />');

                            $('input', $('.filters th').eq($(api.column(colIdx).header()).index()))
                                    .off('keyup change')
                                    .on('change', function (e) {
                                        $(this).attr('title', $(this).val());
                                        var regexr = '({search})';
                                        cursorPosition = this.selectionStart; // Assign the current cursor position to cursorPosition variable
                                        api.column(colIdx).search(
                                                this.value != '' ?
                                                regexr.replace('{search}', '(((' + this.value + ')))') :
                                                '',
                                                this.value != '',
                                                this.value == ''
                                                ).draw();
                                    })
                                    .on('keyup', function (e) {
                                        e.stopPropagation();

                                        $(this).trigger('change');
                                        $(this).focus()[0].setSelectionRange(cursorPosition, cursorPosition); // Use the cursorPosition variable here
                                    });
                        });
                    }

                });
            } else {
                alert('failed retrieve data : ' + response.resp_desc);
            }
        }
    });
}

function loaddatabydate() {

    $('#table_attendance').dataTable().fnClearTable();
    $('#table_attendance').dataTable().fnDestroy();


    var datjson2 = new Object();
    datjson2.company_id = window.localStorage.getItem('company_id');
    datjson2.start_date = $('#tanggal_attendance_from').val();
    datjson2.end_date = $('#tanggal_attendance_to').val();
    $.ajax({
        contentType: 'application/json',
        dataType: "json",
        url: "Attendance",
        data: JSON.stringify(datjson2),
        type: 'POST',
        success: function (response) {
            if (response.resp_code == 0000) {
                if ($('#table_attendance thead tr.filters').length === 0) {
                    // create the table header if it doesn't exist
                    $('#table_attendance thead tr')
                            .clone(true)
                            .addClass('filters')
                            .appendTo('#table_attendance thead');
                }
                var dataattendance = response.list;
                $('#table_attendance').DataTable({
                    "scrollX": true,
                    "data": dataattendance,
                    "columns": [
                        {data: "reference",
                            "className": 'attendance reference'},
                        {data: "employee_id",
                            "className": 'attendance employee_id'},
                        {data: "employee_name",
                            "className": 'attendance employee_name'},
                        {data: "level_desc",
                            "className": 'attendance level_desc'},
                        {data: "date_absensi",
                            "className": 'attendance date_absensi'},
                        {data: "shift_name",
                            "className": 'attendance shift_name'},
                        {data: "schedule_in",
                            "className": 'attendance schedule_in'},
                        {data: "schedule_out",
                            "className": 'attendance schedule_out'},
                        {data: "checkin",
                            "className": 'attendance checkin'},
                        {data: "checkout",
                            "className": 'attendance checkout'},                       
                        {data: "absence_type",
                            "className": 'attendance absence_type'}
                    ],
                    "createdRow": function (row, data, dataIndex) {

                    },
                    dom: 'Bfrtip',
                    autoClose: true,
                    buttons:
                            [
                                {
                                    extend: "copyHtml5",
                                    title: "list attendance",
                                    exportOptions: {columns: ':visible:not()'}, //last column has the action types detail/edit/delete
                                    footer: true
                                },
                                {
                                    extend: "csvHtml5",
                                    title: "list attendance",
                                    exportOptions: {columns: ':visible:not()'},
                                    footer: true
                                },
                                {
                                    extend: "excelHtml5",
                                    title: "list attendance",
                                    exportOptions: {columns: ':visible:not()'},
                                    footer: true
                                },
                                {
                                    extend: "pdfHtml5",
                                    title: "list attendance",
                                    exportOptions: {columns: ':visible:not()'},
                                    footer: true
                                },
                                {
                                    extend: "print",
                                    exportOptions: {columns: ':visible:not()'},
                                    footer: true
                                }
                            ],
                    orderCellsTop: true,
                    fixedHeader: true,

                    initComplete: function () {
                        var api = this.api();
                        var cursorPosition = 0; // Initialize cursorPosition to a default value

                        api.columns().eq(0).each(function (colIdx) {
                            var cell = $('.filters th').eq($(api.column(colIdx).header()).index());
                            var title = $(cell).text();
                            $(cell).html('<input type="text" placeholder="' + title + '" />');

                            $('input', $('.filters th').eq($(api.column(colIdx).header()).index()))
                                    .off('keyup change')
                                    .on('change', function (e) {
                                        $(this).attr('title', $(this).val());
                                        var regexr = '({search})';
                                        cursorPosition = this.selectionStart; // Assign the current cursor position to cursorPosition variable
                                        api.column(colIdx).search(
                                                this.value != '' ?
                                                regexr.replace('{search}', '(((' + this.value + ')))') :
                                                '',
                                                this.value != '',
                                                this.value == ''
                                                ).draw();
                                    })
                                    .on('keyup', function (e) {
                                        e.stopPropagation();

                                        $(this).trigger('change');
                                        $(this).focus()[0].setSelectionRange(cursorPosition, cursorPosition); // Use the cursorPosition variable here
                                    });
                        });
                    }
                });
            } else {
                alert('failed retrieve data : ' + response.resp_desc);
            }
        }
    });
}