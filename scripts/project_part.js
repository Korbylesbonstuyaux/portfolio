// PROJECT PART

var zoom = false;
var canZoom = true;
var change_project = false;
var content_projectH = 0;

function setContentProjectH()
{
  var content_projectW = $("#content-project").css('width').split("px")[0];
  content_projectH = (611 * content_projectW) / 934;
  $("#content-project").css("height", "100%");
}

function zoomProject()
{
  // Scale portable to 3.5
  $("#portable").css("transform","scale(3.5)");
  $(".arrow-btn").css("top", "100%");
  $("#left-arrow").css("left", "32.5%");
  $("#right-arrow").css("left", "56%");
  // $("#portable").delay(500).css("opacity","0");

  // 100% size of selected project
  $("#projects-list").css("width","100%");
  $("#projects-list").css("height","100%");
  $("#projects-list").css("top","0");
  $("#projects-list").css("left","0");

  // Up font size header project
  setSizeProject(2);

  $("#portable").delay(500).css("opacity", "0");

  $(".projects.selected .header-project").css("height", "0px");

  content_projectH = $("#content-project").prop('scrollHeight');
  $("#content-project").css("height", content_projectH+"px");

  // Show description
  setTimeout(function()
  {
    var description_projectH = $(".projects.selected .description-project").prop('scrollHeight');
    $(".projects.selected .description-project").css("height", "100%");

    if(description_projectH > content_projectH)
    {
      $("#content-project").css("height", description_projectH+"px");
    }
  }, 1000);

}

function dezoomProject()
{
  setContentProjectH();
  $("#content-project").css("height", content_projectH+"px");

  $(".projects.selected .description-project").css("height", "0");

  setTimeout(function()
  {
    $("#portable").css("opacity", "1");
    $(".projects.selected .header-project").css("height", "100%");
  }, 2000);

  setTimeout(function()
  {
    // Normal scale portable
    $("#portable").css("transform","scale(1)");

    // Normal size of selected project
    $("#projects-list").css("width","62%");
    $("#projects-list").css("height","60%");
    $("#projects-list").css("top","5%");
    $("#projects-list").css("left","18.6%");

    setSizeProject(1);
  }, 3500);

  setTimeout(function()
  {
    // Normal size arrows
    $(".arrow-btn").css("top", "88%");
    $("#left-arrow").css("left", "33.5%");
    $("#right-arrow").css("left", "55%");

  }, 3900);

}

function setSizeProject(multi)
{
  var title_fs = 2;
  var date_fs = 1;
  var date_num = 0.75;

  if(windW < 1200)
  {
    title_fs = 1.5; date_fs = 1; date_num = 0.75;
  }

  if(windW < 700)
  {
    title_fs = 1; date_fs = 0.75; date_num = 0.5;
  }

  if(windW < 350)
  {
    title_fs = 0.7; date_fs = 0.4; date_num = 0.4;
  }

  $(".projects .title").css("font-size", (title_fs * multi)+"em");
  $(".projects .date").css("font-size", (date_fs * multi)+"em");
  $(".projects .num").css("font-size", (date_num * multi)+"em");
}

$(".zoom, .show-project").click(function()
{
  if (canZoom)
  {
    if(!zoom)
    {
        canZoom = false;
        // ZOOM
        zoomProject();
        setTimeout(function() {canZoom = true;}, 4000);
    }
    else {
            canZoom = false;
            // DEZOOM
            dezoomProject();
            setTimeout(function() {canZoom = true;}, 4000);
         }

    zoom = !zoom;
  }
});

function displayProject(index)
{
  $(".projects").fadeOut("slow");
  // WARNING : NTH-CHILD Start to 1, no 0
  $(".projects:nth-child("+index+") .num").html(index+"/"+$(".projects").length);
  $(".projects:nth-child("+index+")").delay(600).fadeIn("slow");
  setTimeout(function() {change_project = true; }, 800);
}

function prevProject()
{
  var index = -1;

  if($(".projects.selected").prev().length)
  {
    var project = $(".projects.selected").prev();
    $(".projects.selected").removeClass("selected");
    project.addClass("selected");
    index = $(".projects").index($(".projects.selected")) + 1;
  }
  else {
          $(".projects.selected").removeClass("selected");
          // Back to last project
          index = $(".projects").length;
          $(".projects:nth-child("+index+")").addClass("selected");
       }

  displayProject(index);
}

function nextProject()
{
  var index = -1;

  if($(".projects.selected").next().length)
  {
    var project = $(".projects.selected").next();
    $(".projects.selected").removeClass("selected");
    project.addClass("selected");
    index = $(".projects").index($(".projects.selected")) + 1;
  }
  else {
          $(".projects.selected").removeClass("selected");
          // Back to first project
          index = 1;
          $(".projects:nth-child("+index+")").addClass("selected");
       }

  displayProject(index);
}

$(".next").click(function()
{
  if(change_project)
  {
    change_project = false;
    nextProject();
  }
});

$(".prev").click(function()
{
  if(change_project)
  {
    change_project = false;
    prevProject();
  }
});

// MODAL
$("body").on("hidden.bs.modal", ".modal", function () {
    $(this).removeData("bs.modal");
});

$(".video button").click(function() {
  var title = $(this).attr("title");
  var video_name = $(this).attr("src");

  $(".modal-title").html("Vidéo de "+title);
  $("#mp4-video").attr("src", "videos/"+video_name+".mp4");
  $("#ogv-video").attr("src", "videos/"+video_name+".ogv");
  var video = $(".modal-body video");
  video.load();
});
