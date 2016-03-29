// MENU PART
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
  $('html, body').animate({scrollTop: $(href).offset().top}, 1000);
  //   $('html, body').animate({scrollTop: $(href).offset().top - 50 + 1}, 1000);
});

function currentSection()
{
  var scroll = $(window).scrollTop();

  if(scroll >= contact_part)
  {
    if(!$("#go-experience").hasClass("selected-section"))
    {
      $(".selected-section").removeClass("selected-section");
      $("#go-experience").addClass("selected-section");
    }
  }

  if(scroll >= experience_part)
  {

  }

  if(scroll >= project_part)
  {

  }

  if(scroll >= skill_part)
  {

  }

  if(scroll >= about_part)
  {

  }

  if(scroll >= home_part)
  {

  }

  }
}
