function logIn() {
  extend();
  $("#log-in-box").show();
  $("#log-in-continue").show();
  $("#sign-up-continue").hide();
}

function signUp() {
  extend();
  $("#signupbox").show();
  $("#log-in-continue").hide();
  $("#sign-up-continue").show();
}

function toSetInterests() {
  removeInterests();
  window.location = "set_interests.html";
}

function extend() {
  $("#loginbox").hide();
  $(".bottom-lines").show();

  $("#bl-l-1").addClass("bl-top");
  $("#bl-l-2").addClass("bl-middle");
  $("#bl-l-3").addClass("bl-bottom");

  $("#bl-r-1").addClass("bl-top");
  $("#bl-r-2").addClass("bl-middle");
  $("#bl-r-3").addClass("bl-bottom");
}
