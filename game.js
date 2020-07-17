const param =new URLSearchParams(document.location.search);
const w=param.get("w");
const h= param.get("h");
var canvas = document.createElement("CANVAS");
var img_src = param.get("pic");
var img= document.createElement("IMG");
img.setAttribute("src", img_src);
img.setAttribute("width", w);
img.setAttribute("height", h);
img.setAttribute("style", "display:none ;");
document.body.appendChild(img);
canvas.height= h;
canvas.width= w;
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#FF0000";
document.body.appendChild(canvas);
var matrix_x;
var matrix_y;
var obraz_x;
var obraz_y;
var red_i=0;
var red_j=0;
var szerokosc;
var wysokosc;
var columns;
var rows;

function init(){
 
  var co=document.getElementById("columns").value;
  if(co>1){
  columns=co;}
  else{ alert("za mała ilość kolumn. Zmień wartość")}
 var ro= document.getElementById("rows").value;
 if(ro >1){
   rows=ro;
 } else{ alert("za mała ilość rzędów. Zmień wartość"); }
columns= parseInt(columns,10);
rows= parseInt(rows,10);
 matrix_x= new Array(rows);
 matrix_y= new Array(rows);
 obraz_x= new Array(rows);
 obraz_y= new Array(rows);
for(var i=1; i<= rows ; i++){
   matrix_x[i]= new Array(columns); // wartość x w górnym prawym rogu
   matrix_y[i]= new Array(columns); // wartość y w górnym prawym rogu
   obraz_x[i]= new Array(columns); // numer zdjęcia
   obraz_y[i]= new Array(columns);
  }



  szerokosc= img.width/columns;
  wysokosc= img.height / rows;
  // lista parametrów x
  function Point(x, y) {
    this.x = x;
    this.y = y;
  }
  var points=[]

  point_y=0;
for(var i=1; i<=rows; i++){
  point_x=0;
     for(var j=1; j<= columns; j++){
       matrix_x[i][j]= point_x;
       matrix_y[i][j]= point_y;
       obraz_y[i][j]= point_y;
       obraz_x[i][j]= point_x;
       point_x= point_x + szerokosc;
      }
      point_y= point_y +wysokosc;
  }

   draw();
   // dzięki tem zawsze jest odwracalne
   for(var i =0; i < rows * columns * 10 ; i++){
     if(red_i>1 ){  points.push( new Point(red_i-1, red_j)); } 
     if(red_i < rows ){ points.push( new Point(red_i+1, red_j)); }
     if(red_j>1 ){ points.push( new Point(red_i, red_j-1));}
     if(red_j< columns){ points.push( new Point(red_i, red_j+1));}
       points=shuffle(points);
       var p=points.pop();
       swap(p.x, p.y);
       while(points.length > 0){ points.pop();}
       
  }
 
  draw();
}

init();

function draw() {
for(var i=1; i<=rows; i++){
  
  for(var j=1; j<= columns; j++){
   ctx.beginPath();
   if( obraz_x[i][j] == szerokosc*(columns-1)  && obraz_y[i][j]==0){
     ctx.fillStyle="red";
     ctx.fillRect(matrix_x[i][j], matrix_y[i][j], szerokosc,wysokosc);
     red_i=i;
     red_j=j;
   }
   else{
   ctx.drawImage(img, obraz_x[i][j] , obraz_y[i][j] ,szerokosc, wysokosc, matrix_x[i][j], matrix_y[i][j], szerokosc,wysokosc );
   }
   ctx.fillStyle="black";
 
   ctx.beginPath();
   ctx.rect( matrix_x[i][j], matrix_y[i][j], szerokosc,wysokosc);
   ctx.stroke();
   }
} 
document.body.appendChild(canvas);
}


function hint() {
  ctx.beginPath();
  ctx.drawImage(img, 0, 0, img.width, img.height);
  }

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}



function myFunction() {
ctx.beginPath();
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.stroke();
init();   


}
var mouse_puzle_x=0;
var mouse_puzle_y=0; 
document.addEventListener('mousemove', function(e){

var rectang = canvas.getBoundingClientRect();
var x = e.clientX - rectang.left; 
var y = e.clientY - rectang.top;
var i = 0;
 while(x > i*szerokosc ){
   i++;
 }
 var j=0;
 while( y > j* wysokosc){
   j++;
 }



if(i> 0 && j > 0  ){
   if(!(mouse_puzle_x==i && mouse_puzle_y==j)){
   draw();
   mouse_puzle_x=i;
   mouse_puzle_y=j;
   ctx.fillStyle='rgba(255, 165, 0, 0.5)';
   ctx.fillRect(matrix_x[j][i], matrix_y[j][i], szerokosc, wysokosc);
   } 
 }
});



document.addEventListener("click", function(e){
var rectang = canvas.getBoundingClientRect();
var x = e.clientX - rectang.left; 
var y = e.clientY - rectang.top;
var i = 0;
 while(x > i*szerokosc ){
   i++;
 }
 var j=0;
 while( y > j* wysokosc){
   j++;
 }

 var coor = "Coordinates: (" + i + " , " + j + ")";
 var red_c= "red: (" + red_i +", "+ red_j+")";
 document.getElementById("red").innerHTML= red_c;
document.getElementById("demo").innerHTML = coor;
if( i>0 ){
  if(i== red_j && j == red_i + 1 ){
     swap(j,i);
     Solved();
  }
  if(i== red_j && j == red_i - 1 ){
     swap(j,i);
     Solved();
    

  }
  if(j== red_i && (i== red_j + 1 || i == red_j - 1)){
    swap(j,i);
    Solved();
  }


}

});

function swap( i1, j1){

var tempx= obraz_x[i1][j1];
var tempy= obraz_y[i1][j1];
obraz_x[i1][j1]= obraz_x[red_i][red_j];
obraz_y[i1][j1]=obraz_y[red_i][red_j];

obraz_x[red_i][red_j]= tempx;
obraz_y[red_i][red_j]= tempy;
 
draw();

}

function check(){
for(var i=1; i<=rows; i++){
    for(var j=1; j<=columns;j++){
      if(matrix_x[i][j]!=obraz_x[i][j] || matrix_y[i][j] != obraz_y[i][j]){
        return 1;
      }
    }
  }
  return 0;
}

function Solved(){
var solved=check();
if(solved==0){
  ctx.drawImage(img, 0, 0, img.width, img.height);
  alert("BRAWO!");
  init();
}



}