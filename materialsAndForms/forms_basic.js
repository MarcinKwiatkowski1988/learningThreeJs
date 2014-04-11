var texture = THREE.ImageUtils.loadTexture( 'crate.jpg');
texture.needsUpdate = true;
var material = new THREE.MeshPhongMaterial( { map: texture } );  


function cube() {
  var cube;
  var geometry = new THREE.CubeGeometry( 40, 40, 40);  
  cube = new THREE.Mesh(geometry, material );
  cube.position.z = -50;
  return cube;
  }

function cube2() {
  var cube2;
  var geometry = new THREE.CubeGeometry( 40, 40, 40, 2, 2, 2 ); 
  //in teoria con 2,2,2 dovrebbe dividere le facciate in x,y,z in 2 parti, ovvero 4 mini facce per ogni faccia - NON lo fa  
  cube2 = new THREE.Mesh(geometry, material );
  cube2.position.z = -50;
  cube2.position.x = -50;
  return cube2;
  }

function icosahedron() {
  var geometry = new THREE.IcosahedronGeometry(20, 0);
  var shape = new THREE.Mesh(geometry, material);
  shape.position.z = -100;
  return shape;
  }

function icosahedron1() {
  var geometry = new THREE.IcosahedronGeometry(20, 1);
  var shape = new THREE.Mesh(geometry, material);
  shape.position.z = -100;
  shape.position.x = -50;
  return shape;
  }

function icosahedron2() {
  var geometry = new THREE.IcosahedronGeometry(20, 2);
  var shape = new THREE.Mesh(geometry, material);
  shape.position.z = -100;
  shape.position.x = -100;
  return shape;
  }    

function octahedron() {
  var geometry = new THREE.OctahedronGeometry(20, 0);
  var shape = new THREE.Mesh(geometry, material);
  shape.position.z = -150;
  return shape;
  }

function sphere() {
  var geometry = new THREE.SphereGeometry(20, 50, 40);
  var shape = new THREE.Mesh(geometry, material);
  shape.position.z = -200;
  return shape;
  }

function tetrahedron() {
  var geometry = new THREE.TetrahedronGeometry(20, 0);
  var shape = new THREE.Mesh(geometry, material);
  shape.position.z = -250;
  return shape;
  }