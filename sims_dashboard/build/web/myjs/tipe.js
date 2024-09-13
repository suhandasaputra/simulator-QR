jQuery(document).ready(function ($) {
    var level_desc = window.localStorage.getItem('level_desc');
    if (level_desc !== 'admin') {
        window.location.href = "ho";
    }
    loaddata();
});
function loaddata() {
    $('#table_tipe').dataTable().fnClearTable();
    $('#table_tipe').dataTable().fnDestroy();
    var datjson = new Object();
    datjson.user_id = window.localStorage.getItem('user_id');
    $.ajax({
        contentType: 'application/json',
        dataType: "json",
        url: "Tipe",
        data: JSON.stringify(datjson),
        type: 'POST',
        success: function (response) {
            if (response.resp_code == 0000) {
                if ($('#table_tipe thead tr.filters').length === 0) {
                    // create the table header if it doesn't exist
                    $('#table_tipe thead tr')
                            .clone(true)
                            .addClass('filters')
                            .appendTo('#table_tipe thead');
                }
                var datatipe = response.list;
                $('#table_tipe').DataTable({
                    "scrollX": true,
                    "data": datatipe,
                    "columns": [
                        {data: "tipe_id", "className": 'tipe tipe_id'},
                        {data: "device_type", "className": 'tipe device_type'},
                        {data: "brand_id", "className": 'tipe brand_id'},
                        {data: "status", "className": 'tipe status'},
                        {data: "create_date", "className": 'tipe create_date'},
                        {data: "create_by", "className": 'tipe create_by'},
                        {data: "update_date", "className": 'tipe update_date'},
                        {data: "update_by", "className": 'tipe update_by'}
                    ],
                    dom: 'Bfrtip',
                    autoClose: true,
                    buttons:
                            [
                                {
                                    extend: "copyHtml5",
                                    title: "list tipe",
                                    exportOptions: {columns: ':visible:not()'}, //last column has the action types detail/edit/delete
                                    footer: true
                                },
                                {
                                    extend: "csvHtml5",
                                    title: "list tipe",
                                    exportOptions: {columns: ':visible:not()'},
                                    footer: true
                                },
                                {
                                    extend: "excelHtml5",
                                    title: "list tipe",
                                    exportOptions: {columns: ':visible:not()'},
                                    footer: true
                                },
                                {
                                    extend: "pdfHtml5",
                                    title: "list tipe",
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