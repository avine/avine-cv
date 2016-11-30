
/*! @author: Stephane Francel - Avine.fr */

"use strict";

(function (jQuery) {

  var settings = {
    bodyBgSpeed: .15, // number between 0 and 1
    topFadeout: 30, // number >= 0 (px)
    refreshDelay: 400 // ms
  };

  /*jQuery(document).ready(function ($) {
      
      var $window = $(window),
          $body = $body = $("body"),
          $top = $('#top');

      $window.scroll(function () {
          var scrollTop = $window.scrollTop();
          $body.css("background-position-y", -scrollTop * settings.bodyBgSpeed + "px");
          $top[scrollTop > settings.topFadeout ? "addClass" :  "removeClass"]("top-fadeout");
      });
      
  });*/

  jQuery(document).ready(function ($) {

    var $window = $(window),
      $main = $("#main"),
      $sidebar = $("#sidebar"),
      $section = $("section").addClass("section-reveal-init");

    $section.eq(0).addClass("section-reveal-show");
    $window.scroll(function () {
      $section.each(function () {
        var isBelow = $(this).prop("offsetTop") > $window.scrollTop() + $window.height();
        $(this)[isBelow ? "removeClass" : "addClass"]("section-reveal-show");
      });
    });
    $window.trigger("scroll"); // In case there's more than one section to show right now!

    var tScroll;
    $window.scroll(function () {
      if (tScroll) clearTimeout(tScroll);
      tScroll = setTimeout(function () {
        var sidebarHeight = $sidebar.prop("offsetHeight");
        if ($window.height() <= sidebarHeight + $main.prop("offsetTop")) {
          $sidebar.css("top", "-1px"); // "-1px" is the #main border-width
        } else {
          var maxTop = $main.prop("offsetHeight") - sidebarHeight,
            scrollTop = $window.scrollTop();
          $sidebar.css("top", (maxTop - scrollTop > 0 ? scrollTop : maxTop - 5) - 1 + "px"); // "5" is the #main border-radius
        }
      }, settings.refreshDelay);
    });

    var tResize;
    $window.resize(function () {
      $sidebar.css("top", "-1px");
      if (tResize) clearTimeout(tResize);
      tResize = setTimeout(function () {
        $window.trigger("scroll");
      }, settings.refreshDelay);
    });

  });

  jQuery(document).ready(function ($) {

    $(".toggle").each(function () {
      var $toggle = $(this),
        $content = $(this).children(":last-child");
      $toggle.children(":first-child").click(function () {
        $toggle.toggleClass("toggle-open");
        $content.trigger("toggle", $toggle.hasClass("toggle-open") ? "open" : "close");
      });
    });

  });

  jQuery(document).ready(function ($) {

    var $skills = $("#skills").addClass("skills-stop");

    $skills.find("[data-skill]").each(function () {
      var $skill = $(this),
        text = $skill.text().split("/"),
        value = text[0] || 0,
        max = text[1] || 1;

      $skill.html($("<i>")
        .addClass("skill-progress")
        .css("width", 100 * value / max + "%"));
    });

    $skills.on("toggle", function (e, status) {
      $skills["open" == status ? "removeClass" : "addClass"]("skills-stop");
    });

  });

  jQuery(document).ready(function ($) {

    var tel = ["06", "18", "30", "86", "11"],
      mail = ["stephane" + "." + "francel" + "@" + "gmail" + "." + "com"].join("");
    $("#fill-tel").attr("href", "tel:" + tel.join("")).text(tel.join(" "));
    $("#fill-mail").attr("href", "mailto:" + mail).text(mail);

  });

})(window.jQuery);
