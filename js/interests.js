//$(document).ready(function() {
//  highlightInterests();
//})

function highlightInterests() {
  for (var interest in interests) {
    var id_name = "#" + interest;
    if (interests[interest]) {
      select(id_name);
    } else {
      deselect(id_name);
    }
  }
}

function select(id_name) {
  /*$(id_name).css("color", "var(--white)");*/
  $(id_name).css("opacity", "1");
  $(id_name).css("border-color", "var(--shadow)");
  $(id_name).css("box-shadow", "inset 0px 0px 5px 1px var(--shadow)");
}

function deselect(id_name) {
  /*$(id_name).css("color", "var(--shadow)");*/
  $(id_name).css("opacity", "0.6");
  $(id_name).css("border-color", "var(--background)");
  $(id_name).css("box-shadow", "none");
}

function toggleSelect(hobby_name) {
  var id_name = "#" + hobby_name;
  if (interests[hobby_name]) {
    deselect(id_name);
    interests[hobby_name] = false;
  }
  else {
    select(id_name);
    interests[hobby_name] = true;
  }
}
