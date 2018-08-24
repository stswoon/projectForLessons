$(function () {
    $(".toggles button").click(function () {
        var id = this.id;
        var current = $(".posts ." + id);

        $(".post").not(current).hide(500);
        current.show(500);
    });

    $("#showall").click(function () {
        $(".post").show(500);
    });
});