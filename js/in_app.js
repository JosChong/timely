$(document).ready(function() {
  hobby_template = document.getElementById("hobby-template");
  progress_template = document.getElementById("progress-template");
  //$("#interests").load("../interests.html");

  openHobbies();

  document.getElementById("Learning_Resources").style.border = "solid 4px var(--shadow)";
  $("#pusher_chat_widget").hide();
})

var hobby_template;
var progress_template;
var learn_more_toggled = false;

function hideAllTabs() {
  $("#hobbies").hide();
  $("#progress").hide();
  $("#social").hide();
  $("#options").hide();

  $("#more").hide();

  for (var hobby in hobbies) {
    var name = hobby.replace(/\s+/g, '');
    $("#" + name + "-show-more").show();
    $("#" + name + "-show-less").hide();
    $("#" + name + "-achievements").hide();
    $("#" + name + "-time-data").hide();
  }

  $("#update-interests").hide()
  $("#confirm-log-out").hide();

  $("#boards").show();
  $("#new-post").hide();
}

function openHobbies() {
  hideAllTabs();
  $("#hobbies").show();
  $("#find-hobby").show();

  $("#progress-tab").removeClass("active");
  $("#social-tab").removeClass("active");
  $("#options-tab").removeClass("active");
  $("#hobbies-tab").addClass("active");

  learn_more_toggled = false;
}

function openProgress() {
  hideAllTabs();
  $("#progress").show();

  $("#hobbies-tab").removeClass("active");
  $("#social-tab").removeClass("active");
  $("#options-tab").removeClass("active");
  $("#progress-tab").addClass("active");
}

function openSocial() {
  hideAllTabs();
  $("#social").show();

  $("#hobbies-tab").removeClass("active");
  $("#progress-tab").removeClass("active");
  $("#options-tab").removeClass("active");
  $("#social-tab").addClass("active");

  showHobbySocial();
}

function openOptions() {
  hideAllTabs();
  $("#options").show();

  $("#hobbies-tab").removeClass("active");
  $("#progress-tab").removeClass("active");
  $("#social-tab").removeClass("active");
  $("#options-tab").addClass("active");
}

function recommendHobby() {
  var hobby_name;
  var keys = Object.keys(interests);
  var exit = false;
  var itr = 0;
  var limit = 50;
  while (!exit && itr < limit) {
    var number = Math.floor(Math.random() * 12);
    var key = keys[number];
    if (interests[key]) {
      var number = Math.floor(Math.random() * 2);
      name = hobbies_list[key][number];
      if (!(name in hobbies)) {
        hobby_name = name;
        exit = true;
      }
    }
    itr++;
    /*
    if (++itr == limit) {
      console.log("No hobbies to recommend from available options and interests");
      return;
    }
    */
  }

  if (hobby_name == undefined) {
    alert("No hobbies to recommend from available options and interests!");
    return;
  }

  hobbies[hobby_name] = 0;
  if (Object.keys(hobbies).length > 0) {
    $("#no-hobbies").hide();
    $("#no-hobbies-progress").hide();
  }

  var hobby_div = document.getElementById("hobbies");
  var button = document.getElementById("find-hobby");
  var hobby = hobby_template.content.cloneNode(true);
  hobby.firstElementChild.firstElementChild.prepend(hobby_name);
  hobby_div.insertBefore(hobby, button);

  var progress_div = document.getElementById("progress");
  var hobby_progress = progress_template.content.cloneNode(true);
  hobby_progress.firstElementChild.firstElementChild.innerHTML = hobby_name;
  progress_div.append(hobby_progress);
  var hobby_id = hobby_name.replace(/\s+/g, '');
  document.getElementById("donut").id = hobby_id + "-donut";
  document.getElementById("show-more").id = hobby_id + "-show-more";
  document.getElementById("show-less").id = hobby_id + "-show-less";
  document.getElementById("time-data").id = hobby_id + "-time-data";
  document.getElementById("chart").id = hobby_id + "-chart";
  document.getElementById("type").id = hobby_id + "-type";
  document.getElementById("update").id = hobby_id + "-update";
  document.getElementById("achievements").id = hobby_id + "-achievements";
  document.getElementById("achievements-title").id = hobby_id + "-achievements-title";
  document.getElementById("achievement-icons").id = hobby_id + "-achievement-icons";
  createChart(hobby_id);

  var option = new Option(hobby_name);
  $("#selected-hobby").append($(option));
}

function toggleShow(element) {
  var name = element.parentElement.parentElement.firstElementChild.innerHTML;
  name = name.replace(/\s+/g, '');
  $("#" + name + "-achievements").toggle();
  $("#" + name + "-time-data").toggle();
  $("#" + name + "-show-more").toggle();
  $("#" + name + "-show-less").toggle();
}

$(document).on('change', '#selected-hobby', function() {
  showHobbySocial();
});

function showHobbySocial() {
  if ($('#selected-hobby option').length == 0) {
    $("#forums").hide();
    $("#no-hobbies-social").show();
  } else {
    $("#no-hobbies-social").hide();
    $("#forums").show();
  }

  $("#new-post").hide();

  var hobby_name = $("#selected-hobby option:selected").val();
  $("#forum-title").html(hobby_name + " Forums");
}

function toggleLearn() {

  // $("social").toggle();

  // document.getElementById("Learning_Resources").style.border = "none";
    // border: solid 4px var(--shadow);
    document.getElementById("mysocial").style.border = "none";
    document.getElementById("Learning_Resources").style.border = "solid 4px var(--shadow)";
    $("#video").show();
    $("#readings").show();
    $("#introduction").show();
    $("#myCarousel").show();
    $("#pusher_chat_widget").hide();

}

function toggleSocial(){
  // $("social").toggle();
  document.getElementById("Learning_Resources").style.border = "none";
  document.getElementById("mysocial").style.border = "solid 4px var(--shadow)";
    // border: solid 4px var(--shadow);
    $("#pusher_chat_widget").show();
    $("#readings").hide();
    $("#introduction").hide();
    $("#myCarousel").hide();
    $("#video").hide();
    $("#myDIV").empty();
}

function toggleLearnMore(element) {
  if (!learn_more_toggled) {
    var hobby_name = element.parentElement.firstElementChild.innerHTML;
    $("#more-name").html(hobby_name);
    setMedia(hobby_name);
    learn_more_toggled = true;
    toggleLearn();
  }
  else {
    learn_more_toggled = false;
  }

  $("#more").toggle();
  $("#find-hobby").toggle();
  $("#hobbies").toggle();
}

function setMedia(hobby) {
  var link;
  var img1 = "images/none-available.jpg";
  var img2 = "images/none-available.jpg";
  var img3 = "images/none-available.jpg";
  switch(hobby) {
    case "Go":
      link = "https://www.youtube.com/embed/xMshtO8h7RU";
      img1 = "images/page-images/go1.jpg";
      img2 = "images/page-images/go2.jpg";
      img3 = "images/page-images/go3.jpg";
      break;
    case "Chess":
      link = "https://www.youtube.com/embed/fKxG8KjH1Qg";
      img1 = "images/page-images/chess1.jpg";
      img2 = "images/page-images/chess2.jpg";
      img3 = "images/page-images/chess3.jpg";
      break;
    case "Coin Collecting":
      link = "https://www.youtube.com/embed/cdeGZ8yJyZQ";
      img1 = "images/page-images/coin1.jpg";
      img2 = "images/page-images/coin2.jpg";
      img3 = "images/page-images/coin3.jpg";
      break;
    case "Rock Collecting":
      link = "https://www.youtube.com/embed/Qa7TOVbvBGk";
      img1 = "images/page-images/rock1.jpg";
      img2 = "images/page-images/rock2.jpg";
      img3 = "images/page-images/rock3.jpg";
      break;
    case "Cosplay":
      link = "https://www.youtube.com/embed/i7WTGa3rWv0";
      img1 = "images/page-images/cosplay1.jpg";
      img2 = "images/page-images/cosplay2.jpg";
      img3 = "images/page-images/cosplay3.jpg";
      break;
    case "Leatherworking":
      link = "https://www.youtube.com/embed/hXvxP9Kad9Q";
      img1 = "images/page-images/leatherworking1.jpg";
      img2 = "images/page-images/leatherworking2.jpg";
      img3 = "images/page-images/leatherworking3.jpg";
      break;
    case "Bartending":
      link = "https://www.youtube.com/embed/adlWwvHtGVA";
      img1 = "images/page-images/bartending1.jpg";
      img2 = "images/page-images/bartending2.jpg";
      img3 = "images/page-images/bartending3.jpg";
      break;
    case "Sous-Vide":
      link = "https://www.youtube.com/embed/NaMtktnlb4A";
      img1 = "images/page-images/sous1.jpg";
      img2 = "images/page-images/sous2.jpg";
      img3 = "images/page-images/sous3.jpg";
      break;
    case "Beatboxing":
      link = "https://www.youtube.com/embed/QuHhTwGheiY";
      img1 = "images/page-images/beatboxing1.jpg";
      img2 = "images/page-images/beatboxing2.jpg";
      img3 = "images/page-images/beatboxing3.jpg";
      break;
    case "Music Production":
      link = "https://www.youtube.com/embed/S3ySXOpPEGQ";
      img1 = "images/page-images/music1.jpg";
      img2 = "images/page-images/music2.jpg";
      img3 = "images/page-images/music3.JPG";
      break;
    case "Stand Up Comedy":
      link = "https://www.youtube.com/embed/-3nZbcfAbVU";
      img1 = "images/page-images/comedy1.png";
      img2 = "images/page-images/comedy2.jpg";
      img3 = "images/page-images/comedy3.jpg";
      break;
    case "Dance":
      link = "https://www.youtube.com/embed/ujREEgxEP7g";
      img1 = "images/page-images/dance1.jpg";
      img2 = "images/page-images/dance2.jpg";
      img3 = "images/page-images/dance3.jpg";
      break;
    case "Fish Keeping":
      link = "https://www.youtube.com/embed/ybVMzZ0O17U";
      img1 = "images/page-images/fish1.jpg";
      img2 = "images/page-images/fish2.jpg";
      img3 = "images/page-images/fish3.jpg";
      break;
    case "Herpetoculture":
      link = "https://www.youtube.com/embed/iLDN9V3e3CY";
      img1 = "images/page-images/snake1.jpg";
      img2 = "images/page-images/snake2.jpg";
      img3 = "images/page-images/snake3.jpg";
      break;
    case "RC Aircrafts":
      link = "https://www.youtube.com/embed/dOziFzntXq4";
      img1 = "images/page-images/rcplane1.jpg";
      img2 = "images/page-images/rcplane2.jpg";
      img3 = "images/page-images/rcplane3.jpg";
      break;
    case "RC Cars":
      link = "https://www.youtube.com/embed/cQxOm2gjbXI";
      img1 = "images/page-images/rccar1.jpg";
      img2 = "images/page-images/rccar2.jpg";
      img3 = "images/page-images/rccar3.jpg";
      break;
    case "Astronomy":
      link = "https://www.youtube.com/embed/r3w6kKkang8";
      img1 = "images/page-images/astronomy1.jpg";
      img2 = "images/page-images/astronomy2.jpg";
      img3 = "images/page-images/astronomy3.jpg";
      break;
    case "Meteorology":
      link = "https://www.youtube.com/embed/cbi4A0BfKfc";
      img1 = "images/page-images/meteorology1.jpg";
      img2 = "images/page-images/meteorology2.jpg";
      img3 = "images/page-images/meteorology3.jpg";
      break;
    case "Jian Zi":
      link = "https://www.youtube.com/embed/fOn0DhvInSk";
      img1 = "images/page-images/jian1.jpg";
      img2 = "images/page-images/jian2.JPG";
      img3 = "images/page-images/jian3.jpg";
      break;
    case "Parkour":
      link = "https://www.youtube.com/embed/NL0HYcrQupE";
      img1 = "images/page-images/parkour1.jpg";
      img2 = "images/page-images/parkour2.jpg";
      img3 = "images/page-images/parkour3.jpg";
      break;
    case "Coding":
      link = "https://www.youtube.com/embed/X4rU02088Xc";
      img1 = "images/page-images/coding1.gif";
      img2 = "images/page-images/coding2.jpg";
      img3 = "images/page-images/coding3.jpg";
      break;
    case "3D Printing":
      link = "https://www.youtube.com/embed/3LBTkLsjHGQ";
      img1 = "images/page-images/3d1.jpg";
      img2 = "images/page-images/3d2.jpg";
      img3 = "images/page-images/3d3.jpg";
      break;
    case "Calligraphy":
      link = "https://www.youtube.com/embed/sBoVGqiSzr4";
      img1 = "images/page-images/calligraphy1.jpg";
      img2 = "images/page-images/calligraphy2.jpg";
      img3 = "images/page-images/calligraphy3.jpg";
      break;
    case "Watercolor Painting":
      link = "https://www.youtube.com/embed/1Fgkwcym4j4";
      img1 = "images/page-images/water1.jpg";
      img2 = "images/page-images/water2.jpeg";
      img3 = "images/page-images/water3.jpg";
      break;
    default: return;
  }
  $("#video").attr("src", link);
  $("#more-img-1").attr("src", img1);
  $("#more-img-2").attr("src", img2);
  $("#more-img-3").attr("src", img3);
  $("#more-text-1").html(hobby + " For Beginners");
  $("#more-text-2").html("Advanced " + hobby + " Tips");
  $("#more-text-3").html("An Expert's Experience with " + hobby);
}

function toggleProgress(){
  // $("social").toggle();
  document.getElementById("myprogress").style.border = "solid 4px var(--shadow)";
    // border: solid 4px var(--shadow);
}

function createNewPost() {
  $("#new-post-title").val("");
  $("#new-post-message").val("");
  $("#boards").hide();
  $("#new-post").show();
}

function showForums() {
  $("#new-post").hide();
  $("#boards").show();
}

function confirmLogOut() {
  $("#options").hide();
  $("#confirm-log-out").show();
}

function updateInterests() {
  $("#options").hide();
  $("#update-interests").show();
  highlightInterests();
}

function post(){

    const input = document.getElementById('item');
    const name = document.getElementById('name');


    var para = document.createElement("P");
    var content=document.createTextNode(name.value+": "+input.value);
    para.appendChild(content);
    var currentDiv = document.getElementById("myDIV").appendChild(para);

    input.value = "";

}
