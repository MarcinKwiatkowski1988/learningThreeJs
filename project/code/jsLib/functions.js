//##6

/*function arrowed_hideUnhideObj (objId, arrowId_asc, arrowId_desc) {
	hideUnhideObject (objId);
	hideUnhideObject (arrowId_asc);
	hideUnhideObject (arrowId_desc);
	} */


function applyAccessiblePathsSelection () {
	var obj = document.getElementById( "buttonVisitEnviroment3d" );
	obj.style.display = 'block';
	}


/*function applyGroupSelection () {
	//groupSelected = "group2";
	hideUnhideObject( "pSelectGroup" );
	//initDivWithAccessiblePathsSelection ();
	hideUnhideObject( "pSelectAccessiblePaths" );
	//console.log ( document.getElementById( "selectGroup" ).value );
	} */


function hideUnhideObject ( id ) {
	var obj = document.getElementById( id );
	if ( obj.style.display == 'block' ) 
    	obj.style.display = 'none';
	else
    	obj.style.display = 'block';
	}


function showEnvironment3D () {
	getPathAndRun ();
	animate ();
	hideUnhideObject( "pSelectGroup" );
	hideUnhideObject( "pSelectAccessiblePaths" );
	hideUnhideObject( "startingConfigMenu" );
	hideUnhideObject( "buttonVisitEnviroment3d" );
	hideUnhideObject( "cameraType" );
	hideUnhideObject( "buttonForNewPath" );
	}  