var hobby_template;
var hobbies = [];
var interests = {
  "board-games": false,
  "collecting": false,
  "crafts": false,
  "food-drink": false,
  "music": false,
  "performing-arts": false,
  "pets": false,
  "rc-models": false,
  "science": false,
  "sports-outdoors": false,
  "technology": false,
  "visual-arts": false,
};
var hobbies_list = {
  "board-games": ["Go", "Chess"],
  "collecting": ["Coin Collecting", "Rock Collecting"],
  "crafts": ["Cosplay", "Leatherworking"],
  "food-drink": ["Bartending", "Sous-Vide"],
  "music": ["Beatboxing", "Music Production"],
  "performing-arts": ["Stand Up Comedy", "Dance"],
  "pets": ["Fish Keeping", "Herpetoculture"],
  "rc-models": ["RC Aircrafts", "RC Cars"],
  "science": ["Astronomy", "Meteorology"],
  "sports-outdoors": ["Jian Zi", "Parkour"],
  "technology": ["Coding", "3D Printing"],
  "visual-arts": ["Calligraphy", "Watercolor Painting"],
};

$(document).ready(function() {
  loadInterests();
});

function storeInterests() {
  for (var interest in interests) {
    if (interests[interest]) {
      localStorage.setItem(interest, "true")
    } else {
      localStorage.setItem(interest, "false")
    }
  }
}

function loadInterests() {
  for (var interest in interests) {
    var selected = localStorage.getItem(interest);
    if (selected == "true") {
      interests[interest] = true;
    }
  }
}

function removeInterests() {
  for (var interest in interests) {
    interests[interest] = false;
    localStorage.removeItem(interest);
  }
}

function toLogIn() {
  storeInterests();
  window.location = "index.html";
}

function toInApp() {
  storeInterests();
  window.location = "in_app.html";
}
