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