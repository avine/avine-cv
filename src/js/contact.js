/*! @author: Stephane Francel - Avine.fr */
"use strict";

export default function ($) {

  var tel = ["06", "18", "30", "86", "11"],
    mail = ["stephane" + "." + "francel" + "@" + "gmail" + "." + "com"].join("");
  $("#fill-tel").attr("href", "tel:" + tel.join("")).text(tel.join(" "));
  $("#fill-mail").attr("href", "mailto:" + mail).text(mail);

}
