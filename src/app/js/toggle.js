/*! @author: Stephane Francel - Avine.fr */
"use strict";

import jQuery from "jquery";

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
