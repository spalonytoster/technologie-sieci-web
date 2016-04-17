/*jshint jquery: true, devel: true, esversion: 6 */

$(function () {
    $('#play-button').click((event) => {
      var size = $('#sizeValue').val(),
          dim  = $('#dimValue').val(),
          max  = $('#levelValue').val();

      if (!size) {
        size = 5;
      }
      if (!dim) {
        dim = 9;
      }

      var url = "/play/size/" + size + "/dim/" + dim + "/max/" + max + "/";

      $.get(url, (data) => {
        $("#main-content").html(data.view);
        $("#guess-button").click((event) => {
          $("#tries-left").text((index, text) => {
            if (text.trim() === "No limit") {
              return text;
            }
            if (text === "0") {
              $.get("/gameover", (data) => {
                $("#main-content").html(data);
              });
              return 0;
            }
            return text-1;
          });
        });
      });
    });
});
