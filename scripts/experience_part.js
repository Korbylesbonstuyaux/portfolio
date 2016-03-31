// EXPERIENCE PART

var canZoomExp = true;
var zoomExp = false;
var image_expH = 0;

// EXPERIENCE PART
$(".exp button").click(function() {
    var id = $(this).attr("data-id");
    // toogleZoomExp(this.id);
    toogleZoomExp(id);
});

function setSizeExp(multi)
{
  var title_exp = 2;
  var formation_exp = 1;
  var date_exp = 1;

  if(windW < 1200)
  {
    title_exp = 1.5; formation_exp = 1; date_exp = 1;
  }

  if(windW < 700)
  {
    title_exp = 1.2; formation_exp = 0.8; date_exp = 0.8;
  }

  if(windW < 350)
  {
    title_exp = 1; formation_exp = 0.6; date_exp = 0.6;
  }

  $(".exp .title").css("font-size", (title_exp * multi)+"em");
  $(".exp .formation").css("font-size", (formation_exp * multi)+"em");
  $(".exp .date").css("font-size", (date_exp * multi)+"em");
}

function toogleZoomExp(id)
{
  if(canZoomExp)
  {
    if (!zoomExp)
    {
      canZoomExp = false;

      $(".exp .more-exp").fadeOut("slow");

      $(".exp:not(#"+id+")").each(function(index)
      {
        $(".info", this).css("height", "0");
      });

      setTimeout(function() {

        $(".exp").css("width", "0%");

        if(windW < 600)
        {
            $("#"+id).css("width", "80%");
        }
        else $("#"+id).css("width", "60%");

        $("#"+id+" .info").css("height", "120px");
        setSizeExp(1.5);

        $(".exp:not(#"+id+")").each(function(index)
        {
            var ele = $(this);
            var inter = setInterval(function(){
              displayNoneExp(ele, inter); }
              , 100 );
        });
      }, 1000);

      setTimeout(function() {
        image_expH = $("#"+id+" .img-exp").css("height");
        $("#"+id+" .img-exp").css("height", image_expH);
      }, 2600);


      setTimeout(function() {
        $("#"+id+" .img-exp").css("height", "0");
      }, 3800);

      setTimeout(function() {
        var description_expH = $("#"+id+" .description-exp").prop('scrollHeight');
        $("#"+id+" .description-exp").css("height", description_expH+"px");
        $("#"+id+" .btn-close").fadeIn(500, "linear");
      }, 4500);

    }
    else {
            canZoomExp = false;

            $("#"+id+" .btn-close").fadeOut(500, "linear");
            $("#"+id+" .description-exp").css("height", "0px");

            setTimeout(function() {
              $("#"+id+" .img-exp").css("height", image_expH);
            }, 2100);


            setTimeout(function() {

              $("#"+id+" .img-exp").css("height", "100%");

              if(windW < 600)
              {
                $(".exp").css("width", "80%");
              }
              else $(".exp").css("width", "30%");

              setSizeExp(1);

              $("#"+id+" .info").css("height", "80px");

              $(".exp:not(#"+id+")").each(function(index)
              {
                  var ele = $(this);

                  var inter = setInterval(function(){
                    displayShowExp(ele, inter); }
                    , 100 );
              });

              setTimeout(function() {

                $(".exp .more-exp").fadeIn("slow");

                $(".exp:not(#"+id+")").each(function(index)
                {
                  $(".info", this).css("height", "80px");
                });

              }, 3800);

            }, 3100);

         }

    setTimeout(function() { canZoomExp = true; }, 3000);

    zoomExp = !zoomExp;
  }
}

function displayShowExp(ele, interval)
{
  if(ele.css("width").split("px")[0] > 0)
  {
    ele.css("opacity", "1");
    clearInterval(interval);
  }
}

function displayNoneExp(ele, interval)
{
  if(ele.css("width").split("px")[0] <= 20)
  {
    ele.css("opacity", "0");
    clearInterval(interval);
  }
}
