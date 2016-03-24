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
