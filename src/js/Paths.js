
var Path = require("./Path");

var Paths = module.exports = function(){
  this.paths = [];
};

Paths.prototype.hasOne = function(naId, nbId){

  return this.paths.some(function(path){
    var pa = path.na.id, pb = path.nb.id;
    return (naId === pa || naId === pb) && (nbId === pa || nbId === pb);
  });
};

Paths.prototype.addOne = function(nA, nB){

  if (nB && !this.hasOne(nA.id, nB.id)){
    nA.addNear(nB);
    nB.addNear(nA);
    this.paths.push(new Path(nA, nB));
  }
};

Paths.prototype.update = function(){
  this.paths.forEach(function (path) {
    //if (!path.burned){
      path.update();
    //}
  });
};

Paths.prototype.draw = function(ctx){
  this.paths.forEach(function (path) {
    path.draw(ctx);
  });
};