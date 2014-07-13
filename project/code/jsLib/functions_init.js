var camera;
var cameraEye;
var light1;
var divWithInfo;
var renderer;
var unlockWMovement; 
var unlockSMovement; 
var unlockAMovement; 
var unlockDMovement;
var wallDistance = 1;



function initCameraAutomatic () {
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 3000);
	scene.add( camera );
	}    


function initCameraEye () {
    var cameraEye_geometry = new THREE.CubeGeometry( 0.001, 0.001, 0.001 );  
    //var cameraEye_texture = THREE.ImageUtils.loadTexture('textures/floor.jpg');
    //cameraEye_texture.needsUpdate = true;
    var cameraEye_material  = new THREE.MeshBasicMaterial( { color: 0xffffff, opacity : 1, transparent : true, depthWrite : false } );
    cameraEye = new THREE.Mesh( cameraEye_geometry, cameraEye_material );
    cameraEye.position.set( 0,20,0 );
    scene.add( cameraEye );
    }  


function initCameraManual () {
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 3000);
    scene.add( camera );
    //camera.position.set(0,150,400);
    //camera.lookAt(scene.position);
    }      


function initCeiling () {

    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    loader.load( 'models/ceiling.dae', function ( collada ) {
        var colladaCeiling = collada.scene.children[0]
        colladaCeiling.name = "ceiling";
        //colladaWalls.material.dephWrite = true;
        colladaCeiling.material.needsUpdate = true;
        colladaCeiling.material.side = THREE.DoubleSide;
        //colladaWalls.material.transparent = true;
        //colladaWalls.material.opacity = 0.5;
        colladaCeiling.material.wireframe = false;
        //colladaWalls.rotation.x -= 5.5;
        colladaCeiling.position.set(0,2.5,0);//x,z,y- if you think in blender dimensions ;)
        colladaCeiling.scale.set(2,2,2);
    //    colladaWalls.material = wallsMaterial;
        scene.add( colladaCeiling );
        } );

    /*var ceilingMaterial = new THREE.MeshBasicMaterial( { color: 0xA59576, side: THREE.DoubleSide } );
    var ceilingGeometry = new THREE.PlaneGeometry( 45, 44.5 );
    var ceiling = new THREE.Mesh( ceilingGeometry, ceilingMaterial );
    ceiling.position.set ( 6, 2.5, -22.25 );
    ceiling.rotation.x = Math.PI / 2;
    scene.add( ceiling );*/
    }


function initDivWithInfoControls () {
	divWithInfo = document.createElement('div');
	divWithInfo.class = 'divWithInfoControls';
    divWithInfo.style.position = 'absolute';
    divWithInfo.style.top = '10px';
    divWithInfo.style.width = '100%';
    divWithInfo.style.textAlign = 'center';
    divWithInfo.innerHTML = 'select points of start and end';
    var optionToPrint_start = '';
    optionToPrint_start += '<br/>Start point: <select onchange="getNewPath()" id="startPoint">';
    //var s;
    //for ( s=1; s<122; s++ ) {
    for ( var s in path ) {    
    	if ( s==="2" )
    		optionToPrint_start += '<option selected>' + s + '</option>';
    	else
    		optionToPrint_start += '<option>' + s + '</option>';
    	}
	optionToPrint_start += '</select>';
    divWithInfo.innerHTML += optionToPrint_start;
    var optionToPrint_end = '';
    optionToPrint_end += '<br/>End point: <select onchange="getNewPath()" id="endPoint">';
    //var e;
    //for ( e=1; e<122; e++ ) {
    for ( var e in path ) {
    	if ( e==="6" )
    		optionToPrint_end += '<option selected>' + e + '</option>';
    	else
    		optionToPrint_end += '<option>' + e + '</option>';
    	}
	optionToPrint_end += '</select>';
    divWithInfo.innerHTML += optionToPrint_end;
    divWithInfo.innerHTML += '<br/><br/><input id="cameraType" type="button" onclick="changeCameraType()" value="Switch to manual camera"/>';
    document.body.appendChild( divWithInfo );
	}


function initFloor () {
    var floorTexture = new THREE.ImageUtils.loadTexture( 'textures/floor.jpg' );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
    //floorTexture.repeat.set( 10, 10 );
    var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
    var floorGeometry = new THREE.PlaneGeometry( 45, 44.5 );
    var floor = new THREE.Mesh( floorGeometry, floorMaterial );
    floor.position.x = 6;
    floor.position.y = -2;
    floor.position.z = -22.25;
    floor.rotation.x = Math.PI / 2;
    scene.add( floor );
    }


function initLights () {
    for ( var i=0; i<lights.info.numLights; i++ ) {
        if ( lights[lights.info.lightsList[i]].type=='point' ) {
            var light = lights[lights.info.lightsList[i]];
            //console.log ( light );
            var spotLight = new THREE.PointLight( light.hex, light.intensity, light.distance );
            spotLight.position.set( light.pos[0], light.pos[1], light.pos[2] );
            //console.log ( light.pos[0], light.pos[1], light.pos[2] );
            scene.add( spotLight );
            }
        }


    /*var light = new THREE.PointLight( 0xFFFFFF, 1, 10 );
    light.position.set( -10, 2.5, -20 );
    scene.add( light );*/


    /*var spotLight = new THREE.SpotLight( 0xBBBBBB, 1 );
    spotLight.position.set( -10, 2.5, -20 );
    scene.add( spotLight );*/


    /*for ( var i=0; i<lights.info.numLights; i++ ) {
        if ( lights[lights.info.lightsList[i]].type=='spot' ) {

            var light = lights[lights.info.lightsList[i]];

            var spotLight = new THREE.SpotLight( light.hex, light.intensity, light.distance, light.angle );
            spotLight.position.set( light.pos );

            spotLight.castShadow = true;
            spotLight.shadowDarkness = light.shadowDarkness;
            spotLight.shadowMapWidth = 1024;
            spotLight.shadowMapHeight = 1024;
            spotLight.shadowCameraNear = 500;
            spotLight.shadowCameraFar = 4000;
            spotLight.shadowCameraFov = 30; 

            scene.add( spotLight );

            }

        //lights[lights.info.lightsList[i]]

        } */


    /*var ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( ambientLight );*/
	/*light1 = new THREE.DirectionalLight( 0xffffff );
	light1.position.set( 0, 1, 1 ).normalize();
	scene.add(light1);
    light1 = new THREE.DirectionalLight( 0xffffff );
    light1.position.set( 0, 1, -1 ).normalize();
    scene.add(light1);*/
	}


function initObjects () {
    for ( var i=0; i<objects.info.numObjects; i++ ) {
        if ( objects[objects.info.objectsList[i]].type=='cuboid' ) {
            var object = objects[objects.info.objectsList[i]];
            //console.log (object);
            var cuboidGeometry = new THREE.CubeGeometry( object.dim[0], object.dim[1], object.dim[2] );
            var cuboidTexture = THREE.ImageUtils.loadTexture( 'textures/' + object.texture + '.jpg');
            cuboidTexture.needsUpdate = true;
            var cuboidMaterial = new THREE.MeshLambertMaterial( { map: cuboidTexture } );     
            var cuboid = new THREE.Mesh( cuboidGeometry, cuboidMaterial );
            cuboid.position.set ( object.pos[0], object.pos[1], object.pos[2] );
            scene.add ( cuboid );
            }
        }
    }


function initRenderer () {
	renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
	}


function initUnlockMovements () {
    unlockWMovement = true;
    unlockSMovement = true;
    unlockAMovement = true;
    unlockDMovement = true;
    }    


function initWalls () {
    /*var wallsTexture = new THREE.ImageUtils.loadTexture( 'textures/crate.jpg' );
    wallsTexture.wrapS = wallsTexture.wrapT = THREE.RepeatWrapping; 
    var wallsMaterial = new THREE.MeshBasicMaterial( { map: wallsTexture, side: THREE.DoubleSide } );*/
    

    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    loader.load( 'models/walls.dae', function ( collada ) {
        var colladaWalls = collada.scene.children[0]
        colladaWalls.name = "walls";
        //colladaWalls.material.dephWrite = true;
        colladaWalls.material.needsUpdate = true;
        //colladaWalls.material.transparent = true;
        //colladaWalls.material.opacity = 0.5;
        colladaWalls.material.wireframe = false;
        //colladaWalls.rotation.x -= 5.5;
        colladaWalls.position.set(0,-2,0);//x,z,y- if you think in blender dimensions ;)
        colladaWalls.scale.set(2,2,2);
    //    colladaWalls.material = wallsMaterial;
        scene.add( colladaWalls );
        } );


    /*var wallsGeometry = new THREE.Geometry(); 
    wallsGeometry.vertices = walls_blenderData.vertices;
    wallsGeometry.faces = walls_blenderData.faces;*/


    /*var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    loader.load( 'models/walls.dae', function ( collada ) {
        var colladaWallsGeometry = collada.scene.children[0].geometry;
        for (i=0; i<colladaWallsGeometry.vertices.length; i++) {
                var v = colladaWallsGeometry.vertices[i];
                //do stuff...
            }*/


        //var colladaWalls = collada.scene.children[0];

        //wallsGeometry = colladaWalls.geometry;
        /*colladaWalls.name = "walls";
        colladaWalls.material.dephWrite = true;
        colladaWalls.material.needsUpdate = true;
        colladaWalls.material.transparent = true;
        colladaWalls.material.opacity = 0.5;
        colladaWalls.material.wireframe = false;
        colladaWalls.rotation.x -= 5.5;

        //var skin = collada.skins[ 0 ];

        colladaWalls.position.set(0,0,0);//x,z,y- if you think in blender dimensions ;)
        //walls.scale.set(20,20,20);

        scene.add(colladaWalls);*/

     //     });

    //var walls = new THREE.Mesh( walls_blenderData, wallsMaterial );
    //scene.add( walls );
    }    