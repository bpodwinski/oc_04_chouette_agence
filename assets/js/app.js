import $ from "jquery";
import { createPopper } from "@popperjs/core";
import "bootstrap";

$("#myModal").on("shown.bs.modal", function () {
  $("#myInput").trigger("focus");
});