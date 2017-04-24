/*! @author: Stephane Francel - avine.io */
"use strict";

export default function ($) {

  var tel = ["06", "18", "30", "86", "11"],
    mail = ["step" + "hane" + "." + "fra" + "ncel" + "@" + "gm" + "ail" + "." + "c" + "om"].join("");
  $("#fill-tel").attr("href", "te" + "l:" + tel.join("")).text(tel.join(" "));
  $("#fill-mail").attr("href", "ma" + "ilto:" + mail).text(mail);

}
