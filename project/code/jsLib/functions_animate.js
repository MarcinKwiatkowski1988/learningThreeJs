//##6

function animate() {
  render();
  requestAnimationFrame( animate );

  if (automaticORmanual==0) {
    animate_onAutomaticCamera();
  } else {
    animate_onManualCamera();
    }
  }


function animate_onAutomaticCamera () {
  var delta = clock.getDelta();
  THREE.AnimationHandler.update(delta);
  pathControls.update(delta);
  }


function animate_onManualCamera () {
  var delta = clock.getDelta(); // seconds.
  var moveDistance = 5 * delta; // 200 pixels per second
      
  // move forwards/backwards/left/right
  if ( keyboard.pressed("W") && ( canAccessArea(moveDistance) || unlockWMovement ) ) {
    cameraEye.translateZ( -moveDistance );
    unlockWMovement = false;
    unlockSMovement = true;
    }
  if ( keyboard.pressed("S") && ( canAccessArea(moveDistance) || unlockSMovement ) ) {
    cameraEye.translateZ(  moveDistance );
    unlockWMovement = true;
    unlockSMovement = false;
    }
  if ( keyboard.pressed("A") && ( canAccessArea(moveDistance) || unlockAMovement ) ) {
    cameraEye.translateX( -moveDistance );
    unlockAMovement = false;
    unlockDMovement = true;
    }
  if ( keyboard.pressed("D") && ( canAccessArea(moveDistance) || unlockDMovement ) ) {
    cameraEye.translateX(  moveDistance ); 
    unlockAMovement = true;
    unlockDMovement = false;
    }

  // rotate left/right/up/down
  if ( keyboard.pressed("Q") )
    cameraEye.rotation.y += 0.01;
  if ( keyboard.pressed("E") )
    cameraEye.rotation.y -= 0.01;
      
  var relativeCameraOffset = new THREE.Vector3(0,0,1);
  var cameraOffset = relativeCameraOffset.applyMatrix4( cameraEye.matrixWorld );

  camera.position.x = cameraOffset.x;
  camera.position.y = cameraOffset.y;
  camera.position.z = cameraOffset.z;
  camera.lookAt( cameraEye.position );
  }


function changeCameraType () {
  if (automaticORmanual==0) {      
    document.getElementById('cameraType').value = 'Switch to automatic camera';
    initCameraManual();
    initUnlockMovements();
    camera.position.x = pathControls.object.matrixWorld.getPosition().x;
    camera.position.y = pathControls.object.matrixWorld.getPosition().y;
    camera.position.z = pathControls.object.matrixWorld.getPosition().z;
    cameraEye.position.x = pathControls.object.matrixWorld.getPosition().x;
    cameraEye.position.y = pathControls.object.matrixWorld.getPosition().y;
    cameraEye.position.z = pathControls.object.matrixWorld.getPosition().z;
    delete pathControls;
    automaticORmanual = 1;
  } else {
    document.getElementById('cameraType').value = 'Switch to manual camera';
    initCameraAutomatic();
    getNewPath();
    automaticORmanual = 0;
    }
  }


function onDocumentMouseDown( event ) { //served clicked
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1; 
  // find intersections - create a Ray with origin at the mouse position and direction into the scene (camera direction)
  var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
  projector.unprojectVector( vector, camera );
  var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
  var intersects = ray.intersectObjects( scene.children );
  if ( intersects.length > 0 ) {
    var objFounded = false;
    for ( var scf=0; scf<serversClickableFaces.length; scf++ ) {
      var objFaceNum = serversClickableFaces[ scf ][ 1 ] * 2;
      console.log( serversClickableFaces[ scf ][ 0 ] );
      console.log( objFaceNum );
      console.log( serversClickableFaces[ scf ][ 2 ] )
      console.log( intersects[ 0 ].object );
      console.log( !objFounded );
      console.log( serversClickableFaces[ scf ][ 0 ] === intersects[ 0 ].object );
      console.log( intersects[ 0 ].object.geometry );
      console.log( intersects[ 0 ].object.geometry.faces );
      console.log( intersects[ 0 ].object.geometry.faces[ objFaceNum ]==intersects[ 0 ].face );
      console.log( intersects[ 0 ].object.geometry.faces[ objFaceNum ] );
      console.log( intersects[ 0 ].face );
      console.log( intersects[ 0 ].object.geometry.faces[ objFaceNum+1 ]==intersects[ 0 ].face );
      console.log( intersects[ 0 ].object.geometry.faces[ objFaceNum+1 ] );
      console.log( "----------------------------------------------------------" );
      if ( !objFounded && serversClickableFaces[ scf ][ 0 ] === intersects[ 0 ].object && 
          ( intersects[ 0 ].object.geometry.faces[ objFaceNum ]==intersects[ 0 ].face || 
            intersects[ 0 ].object.geometry.faces[ objFaceNum+1 ]==intersects[ 0 ].face ) ) {
        objFounded = true;
        window.open( serversClickableFaces[ scf ][ 2 ] );  
      }
    }
  }
}  