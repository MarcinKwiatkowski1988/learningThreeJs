//##6
var automaticORmanual;
var camera;
var cameraEye;
//##6
var clock;
var light1;
var divWithInfo;
//##6
var groupSelected;
//##6
var keyboard;
//##7
var mouse = { x: 0, y: 0 };
//##6
var path = {};
//##6
var pathSup = {};
//##7
var projector;
var renderer;
//##6
var scene;
//##7
var serversClickableFaces = [];
//##7
var SCFsupp = [];
var unlockWMovement; 
var unlockSMovement; 
var unlockAMovement; 
var unlockDMovement;


//##6
function init () {
      //createPathFromSVG ( path, userGroups[ "defaultGroup" ].accessiblePaths[ 0 ] );
      createPathsFromAllSVG ( );

      automaticORmanual = 0; //0->automatic; 1->manual
      clock = new THREE.Clock();
      scene = new THREE.Scene();

      initCameraAutomatic();
      initCameraEye();  
      initLights();
      initRenderer();
      initDivWithConfig ();

      initCeiling();
      initFloor();
      initObjects();
      initWalls();

      getPathAndRun ();

      keyboard = new THREEx.KeyboardState();
      projector = new THREE.Projector();

      render();

      document.addEventListener( 'mousedown', onDocumentMouseDown, false );
      }


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


function initDivWithConfig () {
	divWithInfo = document.createElement('div');
	divWithInfo.class = 'divWithInfoControls';
    divWithInfo.style.position = 'absolute';
    divWithInfo.style.top = '10px';
    divWithInfo.style.width = '100%';
    divWithInfo.style.textAlign = 'center';
    //##6
    var groupToDisplay = '<p id="pSelectGroup" style="display: block;">Select the user group: ';
    //##6
    ////groupToDisplay += '<select id="selectGroup" name="selectGroup" onchange="applyGroupSelection()">';
    groupToDisplay += '<select id="selectGroup" name="selectGroup">';
    //##6
    groupToDisplay += '<option selected value="none">Nothing selected</option>';
    //##6
    for ( var g in userGroups ) {
        //if ( g==="group1" )
        //    groupToDisplay += '<option selected>' + g + '</option>';
        //else
            groupToDisplay += '<option value="' + g + '">' + g + '</option>';
        }
    //##6    
    groupToDisplay += '</select></p>';
    //##6
    divWithInfo.innerHTML += groupToDisplay;

    //##6
    //groupSelected = 'group1';
    //##6 
    var accessiblePathsToDisplay = '<p id="pSelectAccessiblePaths" style="display: block;">Select the accessible paths: ';
    //##6
    ////accessiblePathsToDisplay += '<select id="selectAccessiblePaths" name="selectAccessiblePaths" onchange="applyAccessiblePathsSelection()">';
    accessiblePathsToDisplay += '<select id="selectAccessiblePaths" name="selectAccessiblePaths" onchange="applyAccessiblePathsSelection()">';
    //##6
    //console.log ( document.getElementById( "selectGroup" ).value );
    //var selectedGValue = document.getElementById( "selectGroup" ).value; 
    //console.log ( document.getElementById( "selectGroup" ).selectedIndex );
    //accessiblePathsToDisplay += '<option selected value="none">Nothing selected</option>';
    //##6
    for ( var g in userGroups ) {
        for ( var ap=0; ap<userGroups[ g ].accessiblePaths.length; ap++ ) {
            var pathsForThisGroup = userGroups[ g ].accessiblePaths[ ap ][ "ns0:svg" ][ "groupPathsName" ];
        //if ( ap==0 )
        //   accessiblePathsToDisplay += '<option selected>' + pathsForThisGroup + '</option>';
        //else
            accessiblePathsToDisplay += '<option value="' + pathsForThisGroup + '" class="' + g + '">' + pathsForThisGroup + '</option>';
            }
        }    
    //##6    
    accessiblePathsToDisplay += '</select></p>';
    //$(function(){ $("#selectAccessiblePaths").chained("#selectGroup"); });

    //##6
    divWithInfo.innerHTML += accessiblePathsToDisplay;

    var pathPoint_start = '<p id="pSelectStartPoint" style="display: block;">Select the start point of the path: ';
    pathPoint_start += '<select id="startPoint">';//##6 onchange="getNewPath()">';
    //var s;
    //for ( s=1; s<122; s++ ) {
    //##6
    //for ( var g in userGroups ) {
    for ( var ap=0; ap<userGroups[ "defaultGroup" ].accessiblePaths.length; ap++ ) {
        var pathsForThisGroup = userGroups[ "defaultGroup" ].accessiblePaths[ ap ][ "ns0:svg" ][ "groupPathsName" ]; 
        //displayPathOnConsole( pathsForThisGroup );
        pathSup = pathsMap_stringToObj[ pathsForThisGroup ];
        //console.log (pathsForThisGroup);
        for ( var s in pathSup ) {    
          	if ( s==="1" )
          		pathPoint_start += '<option selected class="' + pathsForThisGroup + '">' + s + '</option>';
           	else
           		pathPoint_start += '<option class="' + pathsForThisGroup + '">' + s + '</option>';
           	}
        }    
    //  }

	pathPoint_start += '</select></p>';
    divWithInfo.innerHTML += pathPoint_start;
    
    /*var pathPoint_start = '<p id="pSelectStartPoint" style="display: block;">Select the start point of the path: ';
    pathPoint_start += '<select onchange="getNewPath()" id="startPoint">';
    //var e;
    //for ( e=1; e<122; e++ ) {
    for ( var s in path ) {
        if ( s==="2" )
            pathPoint_start += '<option selected>' + s + '</option>';
        else
            pathPoint_start += '<option>' + s + '</option>';
        }
    pathPoint_start += '</select></p>';
    divWithInfo.innerHTML += pathPoint_start;*/

    //##6
    var pathPoint_end = '<p id="pSelectEndPoint" style="display: block;">Select the end point of the path: ';
    pathPoint_end += '<select id="endPoint">';//##6 onchange="getNewPath()" 
    //var e;
    //for ( e=1; e<122; e++ ) {
    for ( var ap=0; ap<userGroups[ "defaultGroup" ].accessiblePaths.length; ap++ ) {
        var pathsForThisGroup = userGroups[ "defaultGroup" ].accessiblePaths[ ap ][ "ns0:svg" ][ "groupPathsName" ]; 
        //displayPathOnConsole( pathsForThisGroup );
        pathSup = pathsMap_stringToObj[ pathsForThisGroup ];
        for ( var e in pathSup ) {
        	if ( e==="2" )
        		pathPoint_end += '<option selected class="' + pathsForThisGroup + '">' + e + '</option>';
        	else
        		pathPoint_end += '<option class="' + pathsForThisGroup + '">' + e + '</option>';
        	}
        }    
	pathPoint_end += '</select></p>';
    divWithInfo.innerHTML += pathPoint_end;

    //##6
    divWithInfo.innerHTML += '<center><input id="buttonForNewPath" type="button" style="display: none;"' + 
        'onclick="getNewPath()" value="Run a new path"/></center>';
    //##6
    divWithInfo.innerHTML += '<center><input id="cameraType" type="button" style="display: none;"' + 
        'onclick="changeCameraType()" value="Switch to manual camera"/></center>';
    //##6
    divWithInfo.innerHTML += '<center><input id="buttonVisitEnviroment3d" type="button" style="display: none;"' + 
        'onclick="showEnvironment3D()" value="Visit"/></center>';
    document.body.appendChild( divWithInfo );
    $("#selectAccessiblePaths").chainedTo("#selectGroup");
    $("#startPoint").chainedTo("#selectAccessiblePaths");
    $("#endPoint").chainedTo("#selectAccessiblePaths");
    //console.log ( document.getElementById( "selectGroup" ).value );
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
    //##7 troppo pesante
    /*for ( var i=0; i<lights.info.numLights; i++ ) {
        if ( lights[lights.info.lightsList[i]].type=='point' ) {
            var light = lights[lights.info.lightsList[i]];
            //console.log ( light );
            var spotLight = new THREE.PointLight( light.hex, light.intensity, light.distance );
            spotLight.position.set( light.pos[0], light.pos[1], light.pos[2] );
            //console.log ( light.pos[0], light.pos[1], light.pos[2] );
            scene.add( spotLight );
            }
        }*/


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


    var ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( ambientLight );
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
            //##7
            var cuboidMaterialArray = [];
            //##7 //order to add materials: x+,x-,y+,y-,z+,z-
            //##7
            var cuboidTextureFace1 = THREE.ImageUtils.loadTexture( 'textures/' + object.textureFace1 + '.jpg');
            cuboidTextureFace1.needsUpdate = true;
            cuboidMaterialArray.push( new THREE.MeshLambertMaterial( { map: cuboidTextureFace1 } ) ); 
            //##7
            var cuboidTextureFace2 = THREE.ImageUtils.loadTexture( 'textures/' + object.textureFace2 + '.jpg');
            cuboidTextureFace2.needsUpdate = true;
            cuboidMaterialArray.push( new THREE.MeshLambertMaterial( { map: cuboidTextureFace2 } ) ); 
            //##7
            var cuboidTextureFace3 = THREE.ImageUtils.loadTexture( 'textures/' + object.textureFace3 + '.jpg');
            cuboidTextureFace3.needsUpdate = true;
            cuboidMaterialArray.push( new THREE.MeshLambertMaterial( { map: cuboidTextureFace3 } ) ); 
            //##7
            var cuboidTextureFace4 = THREE.ImageUtils.loadTexture( 'textures/' + object.textureFace4 + '.jpg');
            cuboidTextureFace4.needsUpdate = true;
            cuboidMaterialArray.push( new THREE.MeshLambertMaterial( { map: cuboidTextureFace4 } ) ); 
            //##7
            var cuboidTextureFace5 = THREE.ImageUtils.loadTexture( 'textures/' + object.textureFace5 + '.jpg');
            cuboidTextureFace5.needsUpdate = true;
            cuboidMaterialArray.push( new THREE.MeshLambertMaterial( { map: cuboidTextureFace5 } ) ); 
            //##7
            var cuboidTextureFace6 = THREE.ImageUtils.loadTexture( 'textures/' + object.textureFace6 + '.jpg');
            cuboidTextureFace6.needsUpdate = true;
            cuboidMaterialArray.push( new THREE.MeshLambertMaterial( { map: cuboidTextureFace6 } ) ); 
            //##7            
            var cuboidMaterials = new THREE.MeshFaceMaterial( cuboidMaterialArray );
            //##7 var cuboidMaterial = new THREE.MeshLambertMaterial( { map: cuboidTexture } );     
            var cuboid = new THREE.Mesh( cuboidGeometry, cuboidMaterials );
            cuboid.position.set ( object.pos[0], object.pos[1], object.pos[2] );
            scene.add ( cuboid );
            //##7
            SCFsupp = [ cuboid, object.linkableFace-1, object.link ];
            //##7
            serversClickableFaces.push( SCFsupp ) ;
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

//##6
function render () {
    renderer.render( scene, camera );
    }    