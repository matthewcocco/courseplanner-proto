// thrown together for a quick demo.
// adapted from 

// Create a new directed graph
var g = new dagreD3.graphlib.Graph().setGraph({});

// for all courses in the catalog, add a node
catalog.forEach( function(course) {  g.setNode(course, { label: course } ); });

// set up edges -- format is (prereq, course, empty label)
g.setEdge("MATH 1325", "MATH 1326", {label:""} );

g.setEdge("ACCT 2301", "ACCT 2302", {label:""} );

g.setEdge("MATH 1325", "OPRE 3333", {label:""} );

g.setEdge("MATH 1326", "OPRE 3360", {label:""} );
g.setEdge("MATH 1326", "OPRE 3360", {label:""} );

g.setEdge("RHET 1302", "BCOM 3310", {label:""} );
g.setEdge("ITSS 3100", "BCOM 3310", {label:""} );

g.setEdge("BCOM 3310", "BCOM 4350", {label:""} );
g.setEdge("MATH 1326", "BCOM 4350", {label:""} );

g.setEdge("ACCT 2301", "FIN 3320", {label:""} );
g.setEdge("MATH 1326", "FIN 3320", {label:""} );
g.setEdge("OPRE 3333", "FIN 3320", {label:""} );
g.setEdge("OPRE 3360", "FIN 3320", {label:""} ); // technically also a coreq

g.setEdge("MATH 1326", "OPRE 3310", {label:""} );
g.setEdge("OPRE 3333", "OPRE 3310", {label:""} );
g.setEdge("OPRE 3360", "OPRE 3310", {label:""} ); // technically also a coreq

g.setEdge("ECON 2301", "IMS 3310", {label:""} );
g.setEdge("MATH 1326", "IMS 3310", {label:""} );

g.setEdge("ITSS 3211", "ITSS 3312", {label:""} );
g.setEdge("MATH 1326", "ITSS 3312", {label:""} );
g.setEdge("OPRE 3333", "ITSS 3312", {label:""} );

g.setEdge("ITSS 3300", "ITSS 4300", {label:""} );
g.setEdge("ITSS 3312", "ITSS 4300", {label:""} );
g.setEdge("MATH 1325", "ITSS 4300", {label:""} );

g.setEdge("ITSS 4300", "ITSS 4330", {label:""} );
g.setEdge("ITSS 4330", "ITSS 4390", {label:""} );

g.setEdge("ITSS 3300", "ITSS 4360", {label:""} );
g.setEdge("MATH 1326", "ITSS 4360", {label:""} );
g.setEdge("OPRE 3333", "ITSS 4360", {label:""} );

g.setEdge("ITSS 3300", "ITSS 4351", {label:""} );
g.setEdge("MATH 1326", "ITSS 4351", {label:""} );
g.setEdge("OPRE 3333", "ITSS 4351", {label:""} );

g.setEdge("ITSS 3300", "ITSS 4370", {label:""} );
g.setEdge("MATH 1326", "ITSS 4370", {label:""} );
g.setEdge("OPRE 3333", "ITSS 4370", {label:""} );

g.setEdge("ITSS 3300", "ITSS 4340", {label:""} );
g.setEdge("MATH 1326", "ITSS 4340", {label:""} );
g.setEdge("OPRE 3333", "ITSS 4340", {label:""} );

// required but not in catalog as currently implemented TODO: fix this pls
// g.setEdge("ACCT 3331", "ACCT 4342", {label:""} );
// g.setEdge("ACCT 3332", "ACCT 4342", {label:""} ); // pre/coreq

g.setEdge("ITSS 3300", "ITSS 4343", {label:""} ); // same as OPRE 4320

g.setEdge("ITSS 3300", "ITSS 4352", {label:""} );
g.setEdge("MATH 1326", "ITSS 4352", {label:""} );
g.setEdge("OPRE 3333", "ITSS 4352", {label:""} );

g.setEdge("ITSS 3312", "ITSS 4353", {label:""} ); // recommended
g.setEdge("MATH 1326", "ITSS 4353", {label:""} );
g.setEdge("OPRE 3333", "ITSS 4353", {label:""} );

g.setEdge("ITSS 3312", "ITSS 4354", {label:""} );
g.setEdge("ITSS 4300", "ITSS 4354", {label:""} );
g.setEdge("ITSS 4351", "ITSS 4354", {label:""} );

g.setEdge("ITSS 3312", "ITSS 4355", {label:""} );
g.setEdge("ITSS 4300", "ITSS 4355", {label:""} );
g.setEdge("ITSS 4351", "ITSS 4355", {label:""} );

// FYI on the catalog/itss/now, ITSS 4353 is listed twice.
// Also, the numbers are all out of order.
// Same for under Major Related courses.
// It looks like some hasty copy-pasting created duplicate values.

g.setEdge("PHYS 2325+2125", "PHYS 2326+2126", {label:""} );


// TODO: eventually, add edges programmatically, like:
// catalog.forEach(
//   function(course) {
//     // courses is the array of objects from the course info json
//     courses[course]...
//     // extract info
//   }
// );

// Set some general styles
g.nodes().forEach(function(v) {
  var node = g.node(v);
  node.rx = node.ry = 5;

  // add tooltip descriptions


  // TODO: isolate loners in their own group, maybe pull them aside?
  // loners.forEach(function(loner) {
  //   if (node.label == loner) {
  //     node.rank = min;
  //   }
  // });
});

var svg = d3.select("svg"),
inner = svg.select("g");

// Set up zoom support
var zoom = d3.behavior.zoom().on("zoom", function() {
  inner.attr("transform", "translate(" + d3.event.translate + ")" +
    "scale(" + d3.event.scale + ")");
});
svg.call(zoom);

// Create the renderer
var render = new dagreD3.render();

// Run the renderer. This is what draws the final graph.
render(inner, g);

// Center the graph
var initialScale = 0.75;
zoom
  .translate([(svg.attr("width") - g.graph().width * initialScale) / 2, 20])
  .scale(initialScale)
  .event(svg);
// set the height
svg.attr('height', 600);
svg.attr('width', 1400);
