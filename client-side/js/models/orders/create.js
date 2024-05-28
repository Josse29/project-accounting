$(document).ready(function () {
    $(".card-header").on("click", function () {
        $(".toggle-numbers").toggleClass("showNumbers");
    });
    $(".list-number").on("click", function () {
        $(".table-number").text(`- ${$(this).text()}`);
    });
});