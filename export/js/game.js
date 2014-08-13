!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){var c=a("./Manager"),d=b.exports=function(a){this.cview=a.viewport,this.cworld=a.world,this.viewCtx=null,this.worldCtx=null,this.tLoop=null,this.paused=!1,this.boundGameRun=this.gameRun.bind(this),this.manager=new c,this.initialize()};d.prototype.initialize=function(){var a=config.size;if(!this.cview.getContext)throw"canvas not supported!";this.cview.width=a.x,this.cview.height=a.y,this.viewCtx=this.cview.getContext("2d"),this.worldCtx=this.cworld.getContext("2d"),this.cworld.width=a.x,this.cworld.height=a.y},d.prototype.loop=function(){this.manager.update(),this.manager.draw(this.viewCtx,this.worldCtx)},d.prototype.start=function(){this.paused=!1,this.gameRun()},d.prototype.stop=function(){this.paused=!0,window.cancelAnimationFrame(this.tLoop)},d.prototype.gameRun=function(){Time.tick()&&this.loop(),this.tLoop=window.requestAnimationFrame(this.boundGameRun)}},{"./Manager":3}],2:[function(a,b){var c=b.exports=function(){this.lastTime=Date.now(),this.frameTime=0,this.deltaTime=0,this.typicalFrameTime=20,this.minFrameTime=12,this.time=0};c.prototype.tick=function(){var a=Date.now(),b=a-this.lastTime;return b<this.minFrameTime?!1:(this.frameTime=b>2*this.typicalFrameTime?this.typicalFrameTime:b,this.deltaTime=this.frameTime/1e3,this.time+=this.frameTime,this.lastTime=a,!0)},c.prototype.reset=function(){this.lastTime=Date.now(),this.frameTime=0,this.deltaTime=0,this.typicalFrameTime=20,this.minFrameTime=12,this.time=0}},{}],3:[function(a,b){var c=a("./Nodes"),d=a("./Paths"),e=b.exports=function(){this.nodes=new c({rows:10,cols:15,nodeSize:7}),this.paths=new d({nodes:this.nodes})};e.prototype.update=function(){},e.prototype.draw=function(a,b){var c=config.size;a.clearRect(0,0,c.x,c.y),b.clearRect(0,0,c.x,c.y),this.nodes.draw(b)}},{"./Nodes":6,"./Paths":7}],4:[function(a,b){var c={};c.rnd=function(a,b){return Math.floor(Math.random()*(b-a+1)+a)},c.rndAngle=function(){return Math.random()*Math.PI*2},c.rndInCircle=function(a){var b=c.rndAngle(),d=c.rnd(0,a);return{x:Math.cos(b)*d,y:Math.sin(b)*d}},b.exports=c},{}],5:[function(a,b){var c=b.exports=function(a){this.pos=a.pos,this.size=a.size,this.color="#fff",this.nearNodes=[]};c.prototype.addNearNode=function(a){this.nearNodes.push(a)},c.prototype.update=function(){},c.prototype.draw=function(a){Renderer.drawCircle(a,{pos:this.pos,radius:this.size,color:this.color})}},{}],6:[function(a,b){var c=a("./Node"),d=b.exports=function(a){this.rows=a.rows,this.cols=a.cols,this.nodeSize=a.nodeSize,this.nodeGrid=[],this.createGrid(),this.paths=[],this.createPaths()};d.prototype.createGrid=function(){for(var a=this.nodeSize,b=config.size,d=b.x/this.cols,e=b.y/this.rows,f=e/2,g=0;g<this.rows;g++){this.nodeGrid[g]=[];for(var h=0;h<this.cols;h++)if(!(g%2===0&&h%2===0||g%2!==0&&h%2!==0)){var i=Mathf.rndInCircle(f),j=Vector.center({x:d*h,y:e*g},{x:d,y:e});this.nodeGrid[g][h]=new c({pos:Vector.add(j,i),size:a})}}},d.prototype.createPaths=function(){this.nodeGrid.forEach(function(a,b){a.forEach(function(a,c){a&&this.findNearNodes(b,c,a)},this)},this)},d.prototype.findNearNodes=function(a,b,c){function d(a,b){return f.some(function(c){var d=c.a,e=c.b;return(Vector.eql(a,d)||Vector.eql(a,e))&&(Vector.eql(b,d)||Vector.eql(b,e))})}function e(a,b){b&&!d(a.pos,b.pos)&&f.push({a:Vector.clone(a.pos),b:Vector.clone(b.pos)})}var f=this.paths,g=this.rows,h=this.cols;[[-1,-1],[1,1],[-1,1],[1,-1]].forEach(function(d){var f=a+d[0],i=b+d[1];f>=0&&g-1>=f&&i>=0&&h-1>=i&&e(c,this.nodeGrid[f][i])},this)},d.prototype.update=function(){},d.prototype.draw=function(a){this.nodeGrid.forEach(function(b){b.forEach(function(b){b&&b.draw(a)})}),this.paths.forEach(function(b){Renderer.drawLine(a,{from:b.a,to:b.b,size:2,color:"#fff"})})}},{"./Node":5}],7:[function(a,b){var c=b.exports=function(a){this.nodes=a.nodes,this.paths=[],this.createPaths()};c.prototype.createPaths=function(){},c.prototype.update=function(){},c.prototype.draw=function(a){for(var b=this.paths,c=b.length,d=0;c>d;d++)b[d].draw(a)}},{}],8:[function(a,b){var c={};c.drawCircle=function(a,b){a.beginPath(),a.arc(b.pos.x,b.pos.y,b.radius,0,2*Math.PI,!1),a.fillStyle=b.color,a.fill()},c.drawLine=function(a,b){var c=b.from,d=b.to;a.beginPath(),a.moveTo(c.x,c.y),a.lineTo(d.x,d.y),a.lineWidth=b.size,a.strokeStyle=b.color,a.stroke()},c.drawRect=function(a,b){a.beginPath(),a.rect(b.pos.x,b.pos.y,b.size.x,b.size.y),a.fillStyle=b.color||"yellow",a.fill(),a.lineWidth=1,a.strokeStyle="black",a.stroke()},b.exports=c},{}],9:[function(a,b){b.exports={}},{}],10:[function(a,b){var c={};c.zero={x:0,y:0},c.one={x:1,y:1},c.create=function(a,b){return{x:a,y:b}},c.clone=function(a){return{x:a.x,y:a.y}},c.add=function(a,b){return{x:a.x+b.x,y:a.y+b.y}},c.eql=function(a,b){return a.x===b.x&&a.y===b.y},c.center=function(a,b){return{x:a.x+b.x/2,y:a.y+b.y/2}},b.exports=c},{}],11:[function(a){a("./reqAnimFrame");var b=a("./GameTime");window.Mathf=a("./Mathf"),window.Vector=a("./Vector"),window.Renderer=a("./Renderer"),window.onload=function(){window.Time=new b;var c=a("./Game");window.config=a("./Settings"),window.config.size={x:1e3,y:600},window.game=new c({viewport:document.getElementById("game-viewport"),world:document.getElementById("game-world")}),window.game.start()}},{"./Game":1,"./GameTime":2,"./Mathf":4,"./Renderer":8,"./Settings":9,"./Vector":10,"./reqAnimFrame":12}],12:[function(){!function(){for(var a=0,b=["ms","moz","webkit","o"],c=0;c<b.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(b){var c=(new Date).getTime(),d=Math.max(0,16-(c-a)),e=window.setTimeout(function(){b(c+d)},d);return a=c+d,e}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){window.clearTimeout(a)})}()},{}]},{},[11]);