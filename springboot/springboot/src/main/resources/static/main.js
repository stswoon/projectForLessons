window.display = function() {
        $.ajax({
            type: "GET",
            cache: false,
            url: '/cities',
            data: "",
            success: function (response) {
                var html = "";
                $.each(response, function (i) {
                    html = html + response[i].name + "<br/>";
                });
                $('#container').html(html);
            }
        });
};