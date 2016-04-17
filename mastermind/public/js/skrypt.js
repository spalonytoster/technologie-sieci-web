/*jshint jquery: true, devel: true, esversion: 6, browser: true */
"use strict";

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

      var playUrl = "/play/size/" + size + "/dim/" + dim + "/max/" + max + "/";

      $.get(playUrl, (data) => {
        $("#main-content").html(data.view);
        $("#guess-button").click((event) => {
          var markUrl = "/mark/";
          $(".answer-input").val((index, value) => {
            if (!value) {
              value = 0;
            }
            markUrl += value + "/";
          });
          $.get(markUrl, (data) => {
            var $marks = "";
            for (let i = 0; i < data.black; i++) {
              $marks += "<div class=\"one column\"><i class=\"fa fa-circle mark-dot\"></i></div>";
            }
            for (let i = 0; i < data.white; i++) {
              $marks += "<div class=\"one column\"><i class=\"fa fa-circle-o mark-dot\"></i></div>";
            }
            $("#marks").html($marks);
          });
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
