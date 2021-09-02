var endpoint = 'http://localhost:8080/invoices';

$(document).ready(function () {
    $.ajax({
        url: endpoint,
        type: 'GET',
        success: function (result) {
            showInvoices(result);
            $('.button-delete').click(function () { deleteInvoice($(this).attr('id').substr(1)) });
            $('.button-edit').click(function () { editInvoice($(this).attr('id').substr(1)) });
        }
    });
});

$('#button-new-invoice').click(function () {
    $('#div-invoices').hide();
    $('#div-new-invoice').show();
});

$('#button-save-new-invoice').click(function () {
    let dataJson = JSON.stringify({"amount": $('#new-amount').val()});
    $.ajax({
        url: endpoint,
        type: 'POST',
        contentType: "application/json",
        data: dataJson
    }).always(function () {
        location.reload();
    });
});

$('#button-save-edit-invoice').click(function () {
    let dataJson = JSON.stringify({"amount": $('#edit-amount').val()});
    let endpointEdit = endpoint + '/' + $('#editId').val();
    $.ajax({
        url: endpointEdit,
        type: 'PUT',
        contentType: "application/json",
        data: dataJson
    }).always(function () {
        location.reload();
    });
});

function formatDate(date) {
    date = new Date(date);

    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();

    return year + '-' + month + '-' + day;
}

function showInvoices(result) {
    let html = '';
    $.each(result, function (i, item) {
        html += '<tr>';
        html += '<td scope="row">' + (i + 1) + '</td>';
        html += '<td>' + result[i].numberInvoice + '</td>';
        html += '<td>' + result[i].amount.toFixed(2) + '</td>';
        html += '<td>' + formatDate(Date.parse(result[i].date)) + '</td>';
        html += '<td>';
        html += '<button id="e' + result[i].id + '" class="btn btn-secondary btn-margin button-edit">Edytuj</button>';
        html += '<button id="d' + result[i].id + '" class="btn btn-secondary btn-margin button-delete">Usuń</button>';
        html += '</td>';
        html += '</tr>';
    });
    $('#tbody-invoices').html(html);
}

function deleteInvoice(id) {
    if (confirm('Chcesz skasować rekord?')) {
        $.ajax({
            url: endpoint + '/' + id,
            type: 'DELETE'
        }).always(function () {
            location.reload();
        });
    }
}

function editInvoice(id) {
    $('#div-invoices').hide();
    $('#div-edit-invoice').show();
    $('#editId').val(id);
}
