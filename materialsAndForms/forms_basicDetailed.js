var texture = THREE.ImageUtils.loadTexture( 'crate.jpg');
texture.needsUpdate = true;
// Using wireframe materials to illustrate shape details.
var darkMaterial = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
var wireframeMaterial = new THREE.MeshLambertMaterial( { color: 0x000000, wireframe: true } ); 
var multiMaterial = [ darkMaterial, wireframeMaterial ]; 


//1.1
function cube() {
  var cube;
  var geometry = new THREE.CubeGeometry( 40, 40, 40);
  //var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } ); 
  cube = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
  cube.position.z = -50;
  return cube;
  }

//1.2
function cube2() {
  var cube2;
  var geometry = new THREE.CubeGeometry( 40, 40, 40, 2, 2, 2 ); 
  //in teoria con 2,2,2 dovrebbe dividere le facciate in x,y,z in 2 parti, ovvero 4 mini facce per ogni faccia - NON lo fa
  cube2 = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
  cube2.position.z = -50;
  cube2.position.x = -50;
  return cube2;
  }

//2.1
function cylinder() {
  var geometry = new THREE.CylinderGeometry(20, 20, 40, 20, 4);
  /*radiusTop — Radius of the cylinder at the top. Default is 20.
  radiusBottom — Radius of the cylinder at the bottom. Default is 20.
  height — Height of the cylinder. Default is 100.
  radiusSegments — Number of segmented faces around the circumference of the cylinder. Default is 8
  heightSegments — Number of rows of faces along the height of the cylinder. Default is 1.
  openEnded — A Boolean indicating whether the ends of the cylinder are open or capped. Default is false, meaning capped */
  var shape = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
  shape.position.z = -100;
  return shape;
  }

//2.2
function cylinder_cone() {
  var geometry = new THREE.CylinderGeometry(0, 20, 40, 20, 4);
  var shape = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
  shape.position.z = -100;
  shape.position.x = -50;
  return shape;
  }

//2.3
function cylinder_piramid() {
  var geometry = new THREE.CylinderGeometry(0, 20, 40, 4, 4);
  var shape = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
  shape.position.z = -100;
  shape.position.x = -100;
  return shape;
  }

//3.1
function icosahedron() {
  var geometry = new THREE.IcosahedronGeometry(20, 0);
  var shape = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
  shape.position.z = -150;
  return shape;
  }

//3.2
function icosahedron1() {
  var geometry = new THREE.IcosahedronGeometry(20, 1);
  var shape = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
  shape.position.z = -150;
  shape.position.x = -50;
  return shape;
  }

//3.3
function icosahedron2() {
  var geometry = new THREE.IcosahedronGeometry(20, 2);
  var shape = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
  shape.position.z = -150;
  shape.position.x = -100;
  return shape;
  }    

//4.1
function octahedron() {
  var geometry = new THREE.OctahedronGeometry(20, 0);
  var shape = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
  shape.position.z = -200;
  return shape;
  }

//4.2
function octahedron1() {
  var geometry = new THREE.OctahedronGeometry(20, 1);
  var shape = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
  shape.position.z = -200;
  shape.position.x = -50;
  return shape;
  } 

//4.3
function octahedron2() {
  var geometry = new THREE.OctahedronGeometry(20, 2);
  var shape = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
  shape.position.z = -200;
  shape.position.x = -100;
  return shape;
  }   

//5.1
function sphere() {
  var geometry = new THREE.SphereGeometry(20, 50, 40);
  var shape = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
  shape.position.z = -250;
  return shape;
  }

//5.2
function sphere1() {
  var geometry = new THREE.SphereGeometry(20, 32, 16, 0, 2*Math.PI, 0, Math.PI / 2);
  /*radius — sphere radius. Default is 50.
  widthSegments — number of horizontal segments. Minimum value is 3, and the default is 8.
  heightSegments — number of vertical segments. Minimum value is 2, and the default is 6.
  phiStart — specify horizontal starting angle. Default is 0.
  phiLength — specify horizontal sweep angle size. Default is Math.PI * 2.
  thetaStart — specify vertical starting angle. Default is 0.
  thetaLength — specify vertical sweep angle size. Default is Math.PI  */
  var shape = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
  shape.position.z = -250;
  shape.position.x = -50;
  return shape;
  }

//5.3
function sphere2() {
  var geometry = new THREE.SphereGeometry(20, 32, 16, 0, 2*Math.PI, 0, Math.PI / 4);
  var shape = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
  shape.position.z = -250;
  shape.position.x = -100;
  return shape;
  }  

//5.4
function sphere3() {
  var geometry = new THREE.SphereGeometry(20, 32, 16, 0, 2*Math.PI, 45, Math.PI);
  var shape = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
  shape.position.z = -250;
  shape.position.x = -150;
  return shape;
  }

//5.5
function sphere4() {
  var geometry = new THREE.SphereGeometry(20, 32, 16, 0, Math.PI, 0, Math.PI);
  var shape = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
  shape.position.z = -250;
  shape.position.x = -200;
  return shape;
  }     
  
//6.1
function tetrahedron() {
  var geometry = new THREE.TetrahedronGeometry(20, 0);
  var shape = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
  shape.position.z = -300;
  return shape;
  }