function createPathFromSVG ( pathToUse ) {
    createPathFromSVG_getAllPoints( pathToUse );
    //displayPathOnConsole();
    var pathToUseLength = Object.keys(pathToUse).length;
    createPathFromSVG_scalePath ( pathToUse, pathToUseLength );
    // tX= -15;   tY= 0;   tZ= -50;  
    createPathFromSVG_translatePointsPos ( pathToUse, pathToUseLength, -15, 0, -50 );
    //displayPathOnConsole();
    createPathFromSVG_removeDuplicatePoints( pathToUse, pathToUseLength )
    displayPathOnConsole();
    }


function createPathFromSVG_getAllPoints ( pathToUse ) {
	var svgLinesArray = jsonFromSVG["ns0:svg"]["ns0:g"]["ns0:g"]["ns0:line"];
    //for ( var j=3; j<10; j++ ) {
    for ( var j=0; j<svgLinesArray.length; j++ ) {
        var jsonPointIndex1String = (j*2+1).toString();
        var jsonPointIndex2String = (j*2+2).toString();
        var x1 = Math.round( svgLinesArray[j]["-x1"] );
        var x2 = Math.round( svgLinesArray[j]["-x2"] );
        var z1 = Math.round( svgLinesArray[j]["-y1"] );
        var z2 = Math.round( svgLinesArray[j]["-y2"] );
        var pointsXDistance = x2 - x1;
        var pointsZDistance = z2 - z1;
        pointsDistance = Math.sqrt( Math.pow( pointsXDistance, 2 ) + Math.pow( pointsZDistance, 2 ) );
        pathToUse[ jsonPointIndex1String ] = {};
        pathToUse[ jsonPointIndex1String ].adj = {};
        pathToUse[ jsonPointIndex1String ].adj[ jsonPointIndex2String ] = pointsDistance;
        pathToUse[ jsonPointIndex1String ].pos = [ x1, 0, z1 ];
        pathToUse[ jsonPointIndex2String ] = {};
        pathToUse[ jsonPointIndex2String ].adj = {};
        pathToUse[ jsonPointIndex2String ].adj[ jsonPointIndex1String ] = pointsDistance;      
        pathToUse[ jsonPointIndex2String ].pos = [ x2, 0, z2 ];
        }
    }


function createPathFromSVG_removeDuplicatePoints ( pathToUse, pathToUseLength ) {
    // removing duplicates
    var nodesToDeleteList = [];
    for ( var k=1; k<(pathToUseLength+1); k++ ) {
        var kString = k.toString();
        // first I had to research the deleted list to control if the k node is one of the deleted
        var deletedNode = false;
        for ( var dn=0; dn<nodesToDeleteList.length; dn++ ) 
            if ( nodesToDeleteList[dn]===kString && !deletedNode ) 
                deletedNode = true;	           
        if ( !deletedNode ) {
            for (var kNext=k+1; kNext<(pathToUseLength+1); kNext++ ) {
                kNextString = kNext.toString();
                //if ( pathToUse[ kString ].pos.equals( pathToUse[ kNextString ].pos ) ) { //merge the two points
                if ( pathToUse[ kString ].pos[0]==pathToUse[ kNextString ].pos[0] && 
                	pathToUse[ kString ].pos[1]==pathToUse[ kNextString ].pos[1] && 
                	pathToUse[ kString ].pos[2]==pathToUse[ kNextString ].pos[2] ) {	
                    // get ALL adj of kNext and add them as adj of k; add k as their adj; delete kNext as adj from his adj
                    for ( var c in pathToUse[ kNextString ].adj ) {   
                        pathToUse[ kString ].adj[ c ] = pathToUse[ kNextString ].adj[ c ];
                        pathToUse[ c ].adj[ kString ] = pathToUse[ kNextString ].adj[ c ];
                        delete pathToUse[ c ].adj[ kNextString ];
                        }		                     
                    // can't delete the kNext node still, since the for length contains also this node, so I add him to a list
                    // delete pathToUse[ kNext ];
                    nodesToDeleteList.push( kNextString );
                    }
                } 
            }
        }
    // removing the nodes that are in the deleted list
    for ( var dn=0; dn<nodesToDeleteList.length; dn++ ) {
        delete pathToUse[ nodesToDeleteList[dn] ];
        }
    }


function createPathFromSVG_scalePath ( pathToUse, pathToUseLength ) {
    // not using Math.min and Math.max since I don't have the list, so I would have to scan the graph anyway
	/***  var minX = path_getMin ( pathToUse, 'x' );
	**    var maxX = path_getMax ( pathToUse, 'x' );
	**    var minZ = path_getMin ( pathToUse, 'z' );
	**    var maxZ = path_getMax ( pathToUse, 'z' );
	**    // x variation on the pathGraph made manually : 26 - -14 = 40
	**    // z variation on the pathGraph made manually : 0 - -43 = 43
	**    // I need to use this on the complete graph ( others can be only a part of the whole graph, so the 
	**		scaling will backfire )
	**    var diffX = maxX - minX;
	**    var diffZ = maxZ - minZ;
	**    var scaleX = diffX / 40; 
	**    var scaleZ = diffZ / 43;
	**    console.log ( "scaleX: " + scaleX + "  scaleZ: " + scaleZ ); // scaleX: 14.475 & scaleZ: 14.535 
	***/
    createPathFromSVG_scalePathPointsPos ( pathToUse, pathToUseLength, 14.475, 1, 14.535 );
    createPathFromSVG_scalePathPointsAdj ( pathToUse, pathToUseLength );
    } 


function createPathFromSVG_scalePathPointsPos ( pathToUse, pathToUseLength, scaleX, scaleY, scaleZ ) {
    for ( var i=1; i<(pathToUseLength+1); i++ ) {
        var iString = i.toString();
        pathToUse[ iString ].pos[0] = Math.round( pathToUse[ iString ].pos[0]/scaleX );
        pathToUse[ iString ].pos[1] = Math.round( pathToUse[ iString ].pos[1]/scaleY );
        pathToUse[ iString ].pos[2] = Math.round( pathToUse[ iString ].pos[2]/scaleZ );
        }
    }


function createPathFromSVG_scalePathPointsAdj ( pathToUse, pathToUseLength ) {
    for ( var i=1; i<(pathToUseLength+1); i++ ) {
        var iString = i.toString();
        for ( var a in pathToUse[ iString ].adj ) {
            var x1 = pathToUse[ iString ].pos[0];
            var x2 = pathToUse[ a ].pos[0];
            var z1 = pathToUse[ iString ].pos[2];
            var z2 = pathToUse[ a ].pos[2];
            var pointsXDistance = x2 - x1;
            var pointsZDistance = z2 - z1;
            var pointsDistance = Math.sqrt( Math.pow( pointsXDistance, 2 ) + Math.pow( pointsZDistance, 2 ) );
            pathToUse[ iString ].adj[ a ] = pointsDistance;
            }
        }
    }


function createPathFromSVG_translatePointsPos ( pathToUse, pathToUseLength, tX, tY, tZ ) {
	for ( var i=1; i<(pathToUseLength+1); i++ ) {
        var iString = i.toString();
        pathToUse[ iString ].pos[0] = pathToUse[ iString ].pos[0] + tX;
        pathToUse[ iString ].pos[1] = pathToUse[ iString ].pos[1] + tY;
        pathToUse[ iString ].pos[2] = pathToUse[ iString ].pos[2] + tZ;
    	}
	}


function displayPathOnConsole () {
	console.log ( "var path = {" );
	//var pathLength = Object.keys(path).length;
    //for ( var k=1; k<(pathLength + 1); k++ ) {
    for ( var kString in path ) {	
    	//var kString = k.toString();
    	console.log ( "'" + kString + "' {" );
    	var adjString = "   adj: { ";
    	for ( var a in path[ kString ].adj ) {
	   		adjString = adjString + "'" + a + "'" + ": " + path[ kString ].adj[a] + " ";
    		}
    	console.log ( adjString + "}," );	
    	console.log ( "   pos: [" + path[ kString ].pos[0] + ", " + path[ kString ].pos[1] + ", " + path[ kString ].pos[2] + "] }" );
	   	}
    console.log ( "}" );	
	}


/*function path_getMax ( pathToUse, whichMax ) {
    var pathLength = Object.keys(pathToUse).length;
    var max;
    var max2;
    if ( whichMax==='x' )
        max = pathToUse[ '1' ].pos[0];
    else 
        max = pathToUse[ '1' ].pos[2];  
    for ( var i=1; i<(pathLength+1); i++ ) {
        iString = i.toString();
        if ( whichMax==='x' )
            max2 = pathToUse[ iString ].pos[0];
        else 
            max2 = pathToUse[ iString ].pos[2];
        if ( max2 > max )
            max = max2;
        }
    return max;    
    }*/


/*function path_getMin ( pathToUse, whichMin ) {
    var pathLength = Object.keys(pathToUse).length;
    var min;
    var min2;
    if ( whichMin==='x' )
        min = pathToUse[ '1' ].pos[0];
    else 
        min = pathToUse[ '1' ].pos[2];  
    for ( var i=1; i<(pathLength+1); i++ ) {
        iString = i.toString();
        if ( whichMin==='x' )
            min2 = pathToUse[ iString ].pos[0];
        else 
            min2 = pathToUse[ iString ].pos[2];
        if ( min2 < min )
            min = min2;
        }
    return min;    
    }*/    