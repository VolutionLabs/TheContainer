function setup(){
  createCanvas(710, 532, WEBGL);
  //perspective(fovy,aspect,near,far)
  perspective(60 / 180 * PI, width/height, 0.1, 100);
  ortho(-width/2, width/2, height/2, -height/2, 0.1, 100);
   //move the camera away from the plane by a sin wave
 camera(0, 90, sin(frameCount * 0.01) * 100);
 cone(120, 120,30);

}

function draw(){
  background(250);
  var radius = width * 1.5;

    var locY = (mouseY / height - 0.5) * (-2);
  var locX = (mouseX / width - 0.5) * 2;

  ambientLight(50);
  directionalLight(200, 0, 0, 0.25, 0.25, 0.25);
  pointLight(0, 0, 200, locX, locY, 0);
  pointLight(200, 200, 0, -locX, -locY, 0);
  
  //drag to move the world.
  orbitControl();

  normalMaterial();
  translate(0, 0, -600);
  for(var i = 0; i <= 12; i++){
    for(var j = 0; j <= 12; j++){
      push();
      var a = j/12 * PI;
      var b = i/12 * PI;
      translate(sin(2 * a) * radius * sin(b), cos(b) * radius / 2 , cos(2 * a) * radius * sin(b));    
      if(j%2 === 0){
        cone(30, 30);
      }else{
        box(30, 30, 30);
      }
      pop();
    }
  }
}