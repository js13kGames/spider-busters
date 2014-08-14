
var Nodes = require("./Nodes");
var Paths = require("./Paths");
var Spiders = require("./Spiders");

var Manager = module.exports = function(){
  
  this.nodes = new Nodes({
    rows: 10,
    cols: 15,
    nodeSize: 7
  });

  this.paths = new Paths({
    nodes: this.nodes
  });

  this.spiders = new Spiders({
    nodes: this.nodes,
    amount: 10
  });
};

Manager.prototype.update = function(){
  //console.log(Time.frameTime + "( " + Time.deltaTime + " ) / " + Time.time);
  this.nodes.update();
  this.spiders.update();
};

Manager.prototype.draw = function(viewCtx, worldCtx){
  var s = config.size;

  viewCtx.clearRect(0, 0, s.x, s.y);
  worldCtx.clearRect(0, 0, s.x, s.y);

  this.nodes.draw(worldCtx);
  this.spiders.draw(worldCtx);
};