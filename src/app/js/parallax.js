/*! @author: Stephane Francel - Avine.fr */
"use strict";

import jQuery from "jquery";

jQuery(document).ready(function ($) {
    
  var bodyBgSpeed = .15; // number between 0 and 1
  var topFadeout = 30; // number >= 0 (px)

  var $window = $(window),
    $body = $body = $("body"),
    $top = $("#top");

  $window.scroll(function () {
    var scrollTop = $window.scrollTop();
    $body.css("background-position-y", -scrollTop * bodyBgSpeed + "px");
    $top[scrollTop > topFadeout ? "addClass" :  "removeClass"]("top-fadeout");
  });
    
});
