// SKILLS PART

var started = false;
var skills_ready = false;
var skills = {};

function displaySkillsOnReady()
{
  var selected_skill = $("#skill button.selected").attr("id");

  $("#skill .active-border, #skill .inactive-border").fadeOut();

  // Show skills
  if(selected_skill != "all-skill")
  {

    $("#skill .active-border."+selected_skill+", #skill .inactive-border."+selected_skill).fadeIn();
  }
  else {
          $("#skill .active-border, #skill .inactive-border").fadeIn();
       }
}

$("#skill button").click(function()
{
  // If not selected
  if(!$(this).hasClass("selected"))
  {
    $("#skill .active-border, #skill .inactive-border").fadeOut("slow");

    // Show skills
    if(this.id != "all-skill")
    {

      $("#skill .active-border."+this.id+", #skill .inactive-border."+this.id).delay(500).fadeIn("slow");
    }
    else {
            $("#skill .active-border, #skill .inactive-border").delay(500).fadeIn("slow");
         }

    // Change selected button
    $("#skill button.selected").removeClass("selected");
    $(this).addClass("selected");

    resetSkills();
    setTimeout(toogleCircle, 500);
  }
});

// Init skills to object
function initSkills()
{
  $("#skill .active-border").each(function(index, element) {
    // Create skill
    var new_skill = {};
    new_skill["time"] = 0;
    new_skill["interv"] = null;

    // Add skill to object
    var name = this.id.split("-skill")[0];
    skills[name] = new_skill;
  });

  skills_ready = true;
}

// Reset skills
function resetSkills()
{
  for (var skill in skills)
  {
    for (var prop in skills[skill])
    {
      var obj = skills[skill];

      if(prop == "interv")
      {
        if(obj[prop] != null)
        {
          clearInterval(obj[prop]);
          obj[prop] = null;
        }
      }
      else obj[prop] = 0;

      console.log("obj."+skill+ ", prop " + obj[prop]);
    }
  }

  started = false;
}

// Toogle circle skill
function toogleCircle()
{
  if(!started && skills_ready)
  {
      started = true;
      $("#skill .active-border").each(function(index, element) {

          if($(this).css("display") != "none")
          {
              // Keep only name of the skill
              var skill_name = this.id.split("-skill")[0];
              // keep only angle of the span
              var deg_limit = $(this).find("span").attr("class").split(" c")[1];
              skills[skill_name].interv = setInterval( function(){ drawCircle(skill_name, deg_limit); }, 10 );
          }
      });
  }
}

// Draw circle of the skill
function drawCircle(skill_name, deg_limit)
{
  // Get time of the skill
  var i = skills[skill_name].time;

  // Add more one to time
  i++;

  if(i <= 0)
    i = 0;

  if(i > deg_limit)
    i = deg_limit;

  // Set time of the skill
  skills[skill_name].time = i;

  // Change circle with new value
  if(i <= 180)
  {
    $("#"+skill_name+"-skill").css("background-image","linear-gradient("+(90 + i)+"deg, transparent 50%, #A2ECFB 50%),linear-gradient(90deg, #A2ECFB 50%, transparent 50%)");
  }
  else
      {
        $("#"+skill_name+"-skill").css("background-image","linear-gradient("+(i - 90)+"deg, transparent 50%, #FFBD2B 50%),linear-gradient(90deg, #A2ECFB 50%, transparent 50%)");
      }

  // If time is equal or sup to limit, stop interval
  if(i >= deg_limit)
  {
    clearInterval(skills[skill_name].interv);
    skills[skill_name].interv = null;
  }
}
