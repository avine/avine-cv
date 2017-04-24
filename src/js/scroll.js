/*! @author: Stephane Francel - avine.io */
"use strict";

export default function ($) {

  var refreshDelay = 400; // ms

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
    }, refreshDelay);
  });

  var tResize;
  $window.resize(function () {
    $sidebar.css("top", "-1px");
    if (tResize) clearTimeout(tResize);
    tResize = setTimeout(function () {
      $window.trigger("scroll");
    }, refreshDelay);
  });

}
