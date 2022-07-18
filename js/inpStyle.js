$(".file").on("change", "input[type='file']", function () {
    var filePath = $(this).val();
    if (filePath.indexOf("jpg") != -1 || filePath.indexOf("png") != -1) {
        $(".fileerrorTip1").html("").hide();
        var arr = filePath.split('\\');
        var fileName = arr[arr.length - 1];
        $(".showFileName1").html(fileName);
    } else {
        $(".showFileName1").html("");
        $(".fileerrorTip1").html("您未上傳檔案，或者您上傳檔案型別有誤！").show();
        return false
    }
})