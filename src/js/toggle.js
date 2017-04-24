/*! @author: Stephane Francel - avine.io */
"use strict";

export default function ($) {

  $(".toggle").each(function () {
    var $toggle = $(this),
      $content = $(this).children(":last-child");
    $toggle.children(":first-child").click(function () {
      $toggle.toggleClass("toggle-open");
      $content.trigger("toggle", $toggle.hasClass("toggle-open") ? "open" : "close");
    });
  });

}
