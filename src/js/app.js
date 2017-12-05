/*! @author: Stephane Francel - avine.io */
"use strict";

import $ from "jquery";

import scroll from "./scroll.js";
import toggle from "./toggle.js";
import skills from "./skills.js";
import contact from "./contact.js";
import parallax from "./parallax.js";

$(document).ready(function ($) {

  scroll($);
  toggle($);
  skills($);
  contact($);
  parallax($);

});
