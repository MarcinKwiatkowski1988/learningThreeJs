var pathWCPFS = {}; //pathWithControlPointsForSpline


function clonePath ( pathToClone ) {
    for ( var p in pathToClone ) {
        pathWCPFS[ p ] = {};
        pathWCPFS[ p ].adj = {};
        pathWCPFS[ p ].pos = [];
        pathWCPFS[ p ].pos[0] = pathToClone[ p ].pos[0];
        pathWCPFS[ p ].pos[1] = pathToClone[ p ].pos[1];
        pathWCPFS[ p ].pos[2] = pathToClone[ p ].pos[2];
        //pathCloned[ p ].pos.push( new THREE.Vector3( pathToClone[ p ].pos[0], pathToClone[ p ].pos[1], pathToClone[ p ].pos[2] ) );
        for ( var a in pathToClone[ p ].adj ) {
            pathWCPFS[ p ].adj[ a ] = pathToClone[ p ].adj[ a ];
            }
        }
        //console.log ( pathWCPFS );
    }


function getNewPath () {
    //scene.remove( tubeMesh );
    scene.remove( pathControls.animationParent );
    pathControls.waypoints = [];
        //delete pathWCPFS;
    getPathAndRun ();
    render();
    }


function getPathAndRun () {

    clonePath( path ); // need to clone the obj, otherwise pathWCPFS will reference path
    //console.log ( pathWCPFS );
    //console.log ( clonePath( path ) );
    //insertSplineControlPoints ( path );
    //console.log ( pathWCPFS );

    // smooth the curve over this many points
    var smothing = 400;
    var splinePath = new THREE.SplineCurve3( getPointsFromGraph() );
    //controls.points = getPointsFromGraph();
    controls.points = splinePath.getPoints( smothing );
    //createTubePath( controls.points, controls.segments, controls.radius, controls.radiusSegments, controls.closed );
    //scene.add(tubeMesh);
    pathControlsRun();
    scene.add( pathControls.animationParent );   
    pathControls.animation.play( false, 0 ); //true-> infinite animation - false -> stops at the end
    }


function getPointsFromGraph () {
    

    var g = new Graph( path );
    //console.log ( pathWCPFS );
    //console.log ( g );
    var startPoint = document.getElementById('startPoint').value;
    var endPoint = document.getElementById('endPoint').value;
    var min_path = g.findShortestPath( startPoint, endPoint );
    var points = [];
    for ( var i=0; i<min_path.length; i++ ) 
        points.push( new THREE.Vector3( pathWCPFS[min_path[i]].pos[0], pathWCPFS[min_path[i]].pos[1], pathWCPFS[min_path[i]].pos[2] ) );
    //console.log ( points );
    return points;
    }


function insertSplineControlPoints ( choosenPath ) {
    var choosenPathLength = Object.keys(choosenPath).length + 1;
    //for ( var p=1; p<choosenPathLength; p++ ) {    
    for ( var pString in choosenPath ) {
        var numAdj = 0;
        //var pString = p.toString();
        var pInt = parseInt( pString );
        for ( var a in choosenPath[ pString ].adj ) {
            numAdj ++;
            aInt = parseInt( a );
            if ( aInt>pInt ) {
                // new controls points 
                var newControlPoint1 = (500 + pInt*20 + numAdj*2).toString();
                var newControlPoint2 = (500 + pInt*20 + numAdj*2 + 1).toString();
                pathWCPFS[ newControlPoint1 ] = {};
                pathWCPFS[ newControlPoint1 ].adj = {};
                pathWCPFS[ newControlPoint1 ].adj[ pString ] = 0.25;
                pathWCPFS[ newControlPoint1 ].adj[ newControlPoint2 ] = choosenPath[ pString ].adj[ a ] - 0.5;
                pathWCPFS[ newControlPoint2 ] = {};
                pathWCPFS[ newControlPoint2 ].adj = {};
                pathWCPFS[ newControlPoint2 ].adj[ a ] = 0.25;
                pathWCPFS[ newControlPoint2 ].adj[ newControlPoint1 ] = choosenPath[ pString ].adj[ a ] - 0.5;
                // position of the new point
                pathWCPFS[ newControlPoint1 ].pos = [];
                pathWCPFS[ newControlPoint1 ].pos[0] = choosenPath[ pString ].pos[0];
                pathWCPFS[ newControlPoint1 ].pos[1] = choosenPath[ pString ].pos[1];
                pathWCPFS[ newControlPoint1 ].pos[2] = choosenPath[ pString ].pos[2];
                pathWCPFS[ newControlPoint2 ].pos = [];
                pathWCPFS[ newControlPoint2 ].pos[0] = choosenPath[ a ].pos[0];
                pathWCPFS[ newControlPoint2 ].pos[1] = choosenPath[ a ].pos[1];
                pathWCPFS[ newControlPoint2 ].pos[2] = choosenPath[ a ].pos[2];
                if ( choosenPath[ pString ].pos[0] > choosenPath[ a ].pos[0] ) {
                    pathWCPFS[ newControlPoint1 ].pos[0] = pathWCPFS[ newControlPoint1 ].pos[0] - 0.25;
                    pathWCPFS[ newControlPoint2 ].pos[0] = pathWCPFS[ newControlPoint2 ].pos[0] + 0.25;
                    }
                if ( choosenPath[ pString ].pos[0] < choosenPath[ a ].pos[0] ) {
                    pathWCPFS[ newControlPoint1 ].pos[0] = pathWCPFS[ newControlPoint1 ].pos[0] + 0.25;
                    pathWCPFS[ newControlPoint2 ].pos[0] = pathWCPFS[ newControlPoint2 ].pos[0] - 0.25;
                    }
                if ( choosenPath[ pString ].pos[2] > choosenPath[ a ].pos[2] ) {
                    pathWCPFS[ newControlPoint1 ].pos[2] = pathWCPFS[ newControlPoint1 ].pos[2] - 0.25;
                    pathWCPFS[ newControlPoint2 ].pos[2] = pathWCPFS[ newControlPoint2 ].pos[2] + 0.25;
                    }
                if ( choosenPath[ pString ].pos[2] < choosenPath[ a ].pos[2] ) {
                    pathWCPFS[ newControlPoint1 ].pos[2] = pathWCPFS[ newControlPoint1 ].pos[2] + 0.25;
                    pathWCPFS[ newControlPoint2 ].pos[2] = pathWCPFS[ newControlPoint2 ].pos[2] - 0.25;
                    }
                // edit the p point adding the newControlPoint1 to his adj and remove the a point from his adj
                pathWCPFS[ pString ].adj[ newControlPoint1 ] = 0.25;
                delete pathWCPFS[ pString ].adj[ a ];
                // edit the a point adding the newControlPoint2 to his adj and remove the p point from his adj
                pathWCPFS[ a ].adj[ newControlPoint2 ] = 0.25;
                delete pathWCPFS[ a ].adj[ pString ];
                }
            }
        }
    }