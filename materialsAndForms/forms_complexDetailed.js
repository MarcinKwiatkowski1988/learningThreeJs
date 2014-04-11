var texture = THREE.ImageUtils.loadTexture( 'crate.jpg');
texture.needsUpdate = true;
// Using wireframe materials to illustrate shape details.
var darkMaterial = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
var wireframeMaterial = new THREE.MeshLambertMaterial( { color: 0x000000, wireframe: true } ); 
var multiMaterial = [ darkMaterial, wireframeMaterial ]; 


//1.1
function torus() {
  var geometry = new THREE.TorusGeometry(13, 13, 16, 40, Math.PI * 2);
  /*radius — Default is 100. 
  tube — Diameter of the tube. Default is 40. 
  radialSegments — Default is 8 
  tubularSegments — Default is 6. 
  arc — Central angle. Default is Math.PI * 2. */
  var shape = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
  shape.position.z = 100;
  return shape;
  }

//1.2
function torus1() {
  var geometry = new THREE.TorusGeometry(13, 5, 16, 40, Math.PI * 2);
  var shape = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
  shape.position.z = 100;
  shape.position.x = -50;
  return shape;
  }

//1.3
function torus2() {
  var geometry = new THREE.TorusGeometry(13, 10, 5, 40, Math.PI * 2);
  var shape = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
  shape.position.z = 100;
  shape.position.x = -100;
  return shape;
  }   

//1.4
function torus3() {
  var geometry = new THREE.TorusGeometry(13, 10, 2, 40, Math.PI * 2);
  var shape = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
  shape.position.z = 100;
  shape.position.x = -150;
  return shape;
  }

//1.5
function torus4() {
  var geometry = new THREE.TorusGeometry(13, 10, 16, 5, Math.PI * 2);
  var shape = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
  shape.position.z = 100;
  shape.position.x = -200;
  return shape;
  }           

//1.6
function torus5() {
  var geometry = new THREE.TorusGeometry(13, 10, 16, 40, Math.PI);
  var shape = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
  shape.position.z = 100;
  shape.position.x = -250;
  return shape;
  }    

//2.1
function torus_knot() {
  var geometry = new THREE.TorusKnotGeometry(13, 4, 160, 10, 3, 7);
  /*radius — Default is 100. 
  tube — Default is 40. 
  radialSegments — Default is 64. 
  tubularSegments — Default is 8. 
  p — Default is 2. 
  q — Default is 3. 
  heightScale — Default is 1 : rapporto strano heightScale/q --> a che serve?? */
  var shape = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
  shape.position.z = 150;
  return shape;
  }

//2.2
function torus_knot1() {
  var geometry = new THREE.TorusKnotGeometry(13, 2, 160, 10, 3, 7);
  var shape = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
  shape.position.z = 150;
  shape.position.x = -50;
  return shape;
  }

//2.3
function torus_knot2() {
  var geometry = new THREE.TorusKnotGeometry(13, 4, 20, 10, 3, 7);
  var shape = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
  shape.position.z = 150;
  shape.position.x = -100;
  return shape;
  }

//2.4
function torus_knot3() {
  var geometry = new THREE.TorusKnotGeometry(13, 4, 160, 2, 3, 7);
  var shape = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
  shape.position.z = 150;
  shape.position.x = -150;
  return shape;
  }

//2.5
function torus_knot4() {
  var geometry = new THREE.TorusKnotGeometry(13, 4, 160, 10, 15, 7);
  var shape = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
  shape.position.z = 150;
  shape.position.x = -200;
  return shape;
  }

//2.6
function torus_knot5() {
  var geometry = new THREE.TorusKnotGeometry(13, 4, 160, 10, 3, 18);
  var shape = new THREE.SceneUtils.createMultiMaterialObject(geometry, multiMaterial);
  shape.position.z = 150;
  shape.position.x = -250;
  return shape;
  }                