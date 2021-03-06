var currentSettingsForm = null;

function importBookmarks() {
    var data = new FormData($('#import')[0]);

    $.post({
        url: API_ImportBookmark,
        data: data,
        cache: false,
        contentType: false,
        processData: false,
    })
        .done(function (json) {
            if (json.status === 'success') {
                $('#importStatusMessage').html(json.data);
            } else {
                $('#importStatusMessage').addClass("error-text-color");
                $('#importStatusMessage').html("The import failed: " + json.message);
            }
        })
        .fail(function () {
            console.log("POST failed");
            $('#importStatusMessage').addClass("error-text-color");
            $('#importStatusMessage').html("The import was cancelled.");
        })
        .always(function (data) {
            console.log(data);
        });
}

function loadSettingsForm (name) {
    $('.settingSelected').removeClass("settingSelected");
    $('#setting_' + name).addClass("settingSelected");

    if ($('#settingform_' + name).length == 0) {
        $('#settingsform').load('./settings_' + name + '.html');
    }

    currentSettingsForm = $('#settingform_' + name);
}

// ==========================================================================
// When the document is fully loaded, load the dynamic elements into the page
$(document).ready(function () {
    loadSettingsForm ('about');

});