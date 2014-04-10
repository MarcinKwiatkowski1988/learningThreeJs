function cube1() {
  var cube1;
  var geometry = new THREE.CubeGeometry( 20, 20, 20);
  var texture = THREE.ImageUtils.loadTexture( 'crate.jpg');
  texture.needsUpdate = true;
  var material = new THREE.MeshLambertMaterial( { map: texture } );     
  cube1 = new THREE.Mesh(geometry, material );
  cube1.position.z = -50;
  //cube1.rotation.y += 0.01;
  //requestAnimationFrame( animate );
  return cube1;
  }

function cube2() {
  var cube2;
  var geometry = new THREE.CubeGeometry( 10, 10, 10);
  var texture = THREE.ImageUtils.loadTexture( 'earth.jpg');
  texture.needsUpdate = true;
  var material = new THREE.MeshLambertMaterial( { map: texture } );     
  cube2 = new THREE.Mesh(geometry, material );
  cube2.position.z = -10;
  cube2.position.x = -10;
  //cube1.rotation.y += 0.01;
  return cube2;
  }