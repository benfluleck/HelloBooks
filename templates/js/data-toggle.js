$(function() {
    $('[data-toggle="tooltip"]').tooltip()
})

// Initialize popover component
$(function() {
    $('[data-toggle="popover"]').popover()
})

$('.img-upload').imgupload({

    allowedFormats: ["jpg", "jpeg", "png", "gif"],

    previewWidth: 250,

    previewHeight: 250,

    maxFileSizeKb: 2048

});