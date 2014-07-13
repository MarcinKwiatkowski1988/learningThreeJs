var controls;
var pathControls;
/*var unlockWMovement = true; 
var unlockSMovement = true; 
var unlockAMovement = true; 
var unlockDMovement = true;
var wallDistance = 1;*/

controls = new function () {
    this.numberOfPoints = 5;
    this.segments = 64;
    this.radius = 3;
    this.radiusSegments = 5;
    this.closed = false;
    }


function canAccessArea ( movement ) {
    var canAccessArea = false;
    var node_area;
    var positionX = cameraEye.position.x;
    var positionZ = cameraEye.position.z;
    for ( var i=0; i<accessArea_area.info.numAreas; i++ ) {
        if ( !canAccessArea && ( positionX>( accessArea_area[accessArea_area.info.areas[i]][0] + wallDistance ) && 
                                 positionX<( accessArea_area[accessArea_area.info.areas[i]][2] - wallDistance ) && 
                                 positionZ<( accessArea_area[accessArea_area.info.areas[i]][1] - wallDistance ) && 
                                 positionZ>( accessArea_area[accessArea_area.info.areas[i]][3] + wallDistance ) ) )
            canAccessArea = true;    
        }
     if ( !canAccessArea ) {
        for ( var j=0; j<accessArea_passage.info.numPassages; j++ ) {
            if ( !canAccessArea && ( positionX>accessArea_passage[accessArea_passage.info.passages[j]][0] && 
                                     positionX<accessArea_passage[accessArea_passage.info.passages[j]][2] && 
                                     positionZ<accessArea_passage[accessArea_passage.info.passages[j]][1] && 
                                     positionZ>accessArea_passage[accessArea_passage.info.passages[j]][3] ) )
                canAccessArea = true;    
            }
        }
    return canAccessArea;
    }


function pathControlsRun () {    
	pathControls = new THREE.PathControls(camera);
    // configure the controller
    pathControls.duration = 25;
    pathControls.useConstantSpeed = true;
    pathControls.lookSpeed = 0.02; // speed on mouse move
    pathControls.lookVertical = true;
    pathControls.lookHorizontal = true;
    pathControls.verticalAngleMap = {srcRange: [ 0, 2 * Math.PI ], dstRange: [ 1.5, 3 ]};
    pathControls.horizontalAngleMap = {srcRange: [ 0, 2 * Math.PI ], dstRange: [ 0, 3 ]};
    pathControls.lon = 300;
    pathControls.lat = 40;
    // add the path
    controls.points.forEach(function(e) {
    	pathControls.waypoints.push([e.x, e.y, e.z]) 
        });
    pathControls.init();
	}    