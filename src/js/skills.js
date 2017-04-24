/*! @author: Stephane Francel - avine.io */
"use strict";

export default function ($) {

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

}
