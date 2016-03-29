// MENU PART

// Parts top
var home_part = 0;
var about_part = 0;
var skill_part = 0;
var project_part = 0;
var experience_part = 0;
var contact_part = 0;

var name_parts = [];
var offset_parts = [];

$("#go-menu").click(function()
{
  toogleMenu();
});

function toogleMenu()
{
  if($("#menu").css("display") == "none")
  {
    $("#menu").removeClass("hide-ele");
    $("#menu").addClass("show-ele");
  }
  else {
          $("#menu").removeClass("show-ele");
          $("#menu").addClass("hide-ele");
       }
}

$('#menu a').click(function()
{
  var href = $(this).attr('href');
  $('html, body').animate({scrollTop: $(href).offset().top + 1}, 1000);
  //   $('html, body').animate({scrollTop: $(href).offset().top - 50 + 1}, 1000);
});

function initPartTop()
{
  $(".bloc-menu").each(function(index) {
    var name = this.id.split("go-")[1];
    name_parts.push(name);
    offset_parts.push($("#"+name).offset().top);
  });
}

function updatePartTop()
{
  for (var i = 0; i < name_parts.length; i++)
  {
    offset_parts[i] = $("#"+name_parts[i]).offset().top;
  }
}

function updateCurrentSection()
{
  var scroll = $(window).scrollTop();
  var stop = false;

  i = offset_parts.length - 1;

  while(i >= 0 && !stop)
  {
    if(scroll >= offset_parts[i])
    {
      // console.log("SUP NAME "+name_parts[i]+" OFFSET "+offset_parts[i]);
      if(!$("#go-"+name_parts[i]).hasClass("selected-section"))
      {
        $("#menu .selected-section").removeClass("selected-section");
        $("#go-"+name_parts[i]).addClass("selected-section");
      }

      stop = true;
    }

    i--;
  }
}
