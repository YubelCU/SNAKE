var y=parseInt($("#perso").css("bottom"));
var x=parseInt($("#perso").css("left"));

function RandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

$(document).ready(generateSword());

function generateSword() {
  a=RandomInt(23)*50;
  b=RandomInt(12)*50;
  $("#epee").css("display","block");
  $("#epee").css("bottom",b+"px");
  $("#epee").css("left",a+"px");
}

$(document).keydown( e => {    //haut
  if (e.keyCode == 90) {
      y+=50;
      if (y>650) {y=650;}
      $("#perso").css("bottom",y+"px");
      $("#perso").attr('class', 'haut');
    }
  })

  $(document).keydown( e => {    //bas
    if (e.keyCode == 83) {
        y-=50;
        if (y<0) {y=0;}
        $("#perso").css("bottom",y+"px");
        $("#perso").attr('class', 'bas');
      }
    })

  $(document).keydown( e => {    //gauche
    if (e.keyCode == 81) {
          x-=50;
          if (x<0) {x=0;}
          $("#perso").css("left",x+"px");
          $("#perso").attr('class', 'gauche');
        }
    })
      $(document).keydown( e => {    //droite
        if (e.keyCode == 68) {
            x+=50;
            if (x>1450) {x=1450;}
            $("#perso").css("left",x+"px");
            $("#perso").attr('class', 'droite');

          }
        })
        $(document).keyup( e => {    //ramasser
          if (e.keyCode == 13) {
            if(($("#perso").css("left")==$("#epee").css("left"))&&($("#perso").css("bottom")==$("#epee").css("bottom"))) {
                alert("Vous ramassez l'épée. \n Vous obtenez une épée en bois !")
                $("#epee").css("display","none");
                generateSword();
              }
              else {
                alert("Il n'y a rien à ramasser !");
              }
            }
          })


        $(document).keyup( e => {    //droite
          if (e.keyCode == 27) {
              confirm("Are you sure you want to exit ?");
              if (confirm==true) {

              }
            }
          })

// "paused, paused, paused, running"
