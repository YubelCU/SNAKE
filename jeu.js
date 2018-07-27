var y=parseInt($("#head").css("bottom"));    // position x,y de la tête
var x=parseInt($("#head").css("left"));
var t= new Array(); //contient des setinterval pour le déplacement
var screamer=true;
var cri = document.querySelector("#audioPlayer");

var direction=1;   // 1=bas, 2=gauche, 3=haut, 4=droite
var longueur=0;  //nombre de blocs de serpents actifs après la tête

function RandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//$(document).ready(cri.pause());
$(document).ready(init());
$(document).ready(generateFruit());      // fait apparaître le fruit au début
function init() {     // cache les blocs du serpent au début
    //$(".Snake").css("display","none");
}

function generateFruit() {      // fait apparaître un #fruit de façon aléatoire
  a=RandomInt(23)*50;
  b=RandomInt(12)*50;
  $("#fruit").css("display","block");
  $("#fruit").css("bottom",b+"px");
  $("#fruit").css("left",a+"px");
}

/* function generateFruit2() {      // fait apparaître un #fruit de façon aléatoire
  var test=false;
  while (!test) {
    for(j=0;j<longueur;j++) {
      a=RandomInt(23)*50;
      b=RandomInt(12)*50;
      if (!((a==$("#Snake"+j).css("left"))&&(b==$("#Snake"+j).css("bottom")))) {
        test=true;
      }
     }
   }
      $("#fruit").css("display","block");
      $("#fruit").css("bottom",b+"px");
      $("#fruit").css("left",a+"px");
} */

function avancer(i) {  //déplacement du serpent,  fonction principale

/* Principe : on stocke la position x,y en p[0],p[1] d'un élément,
on l'avance, puis on stocke la position x,y en p[2],p[3] de l'élément suivant,
on l'avance à la position p[0],p[1] du précédent, puis on décale. */

  var pos=new Array(4);    // x1,y1,x2,y2
  pos[0]=parseInt($("#head").css("bottom"));
  pos[1]=parseInt($("#head").css("left"));

  switch (i) {   // fait avancer la tête de 50px selon direction
    case 1: y-=50;    //bas
      if (y<0) {y=0;}
      $("#head").css("bottom",y+"px");
      $("#head").attr('class', 'bas');
      break;
    case 2:
      x-=50;   //gauche
      if (x<0) {x=0;}
      $("#head").css("left",x+"px");
      $("#head").attr('class', 'gauche');
      break;
    case 3:
      y+=50;    //haut
      if (y>650) {y=650;}
      $("#head").css("bottom",y+"px");
      $("#head").attr('class', 'haut');
      break;
    case 4:
      x+=50;    //droite
      if (x>1450) {x=1450;}
      $("#head").css("left",x+"px");
      $("#head").attr('class', 'droite');
  }
/*collision avec lui-même Snake*/
for(j=0;j<longueur;j++) {
  if (($("#head").css("left")==$("#Snake"+j).css("left"))&&($("#head").css("bottom")==$("#Snake"+j).css("bottom"))) {
    alert("Collision !");
  }
}


  for(j=0;j<longueur;j++) {   // fait avancer chaque bloc du serpent à la position du rpécédent
    pos[2]=parseInt($("#Snake"+j).css("bottom"));
    pos[3]=parseInt($("#Snake"+j).css("left"));
    $("#Snake"+j).css("bottom",pos[0]+"px");
    $("#Snake"+j).css("left",pos[1]+"px");
    pos[0]=pos[2];
    pos[1]=pos[3];
  }

// si contact avec le fruit :
  if (($("#head").css("left")==$("#fruit").css("left"))&&($("#head").css("top")==$("#fruit").css("top"))) {
    generateFruit();    // on crée un nouveau fruit aléatoire
    var d=document.createElement('div');
    d.className='Snake';
    d.id='Snake'+(longueur++);
    $("body").append(d);
    // le Snake gagne un bloc, longueur est incrémentée
  }

/* if (screamer&&(longueur==5)) {
    $("#screamer").css("display","block");
    cri.play();
    screamer=false;
    var timeoutID = setTimeout(function(){},1000);
  }  */

}

$(document).keydown( e => {   // l'appui d'une touche pour modifier la direction
  if (e.keyCode == 90) {  //haut
    direction=3;
    }
  if (e.keyCode == 81) {  //gauche
    direction=2;
    }
  if (e.keyCode == 83) {  //bas
    direction=1;
    }
  if (e.keyCode == 68) {  //droite
    direction=4;
    }
  })


// Avec la touche Enter, on crée un setInterval qui effectue avancer toutes les 100ms.
// Le cumul de ces répéteurs accélèrent le Snake
$(document).keyup( e => {    //quit
  if (e.keyCode == 32) {
    t.push(setInterval(function(){avancer(direction)},200));
          // équivalent à setInterval(()=>{avancer(direction)},100);
  }
}  )

// Avec la touche Echap, on supprime tous les répéteurs de déplacement
//En rappuyant sur Enter le Snake redémarre à la première vitesse.
$(document).keyup( e => {    //quit
  if (e.keyCode == 27) {
    t.forEach(clearInterval);
  }
}  )
