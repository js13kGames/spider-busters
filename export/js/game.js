!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){var c={};c.toRGBA=function(a){return"rgba("+a[0]+","+a[1]+","+a[2]+","+(a[3]||1)+")"},c.lerp=function(a,b,c){function d(a,b,c,d){return d=d?d:1,Math.round(Mathf.lerp(a,b,c)*d)/d}return[d(a[0],b[0],c),d(a[1],b[1],c),d(a[2],b[2],c),d(a[3]>=0?a[3]:1,b[3]>=0?b[3]:1,c,100)]},c.eql=function(a,b){return a[0]===b[0]&&a[1]===b[1]&&a[2]===b[2]&&a[3]===b[3]},b.exports=c},{}],2:[function(a,b){function c(a,b){var c,d,e=document,f=e.body,g=e.documentElement;return a.pageX||a.pageY?(c=a.pageX,d=a.pageY):(c=a.clientX+f.scrollLeft+g.scrollLeft,d=a.clientY+f.scrollTop+g.scrollTop),c-=b.offsetLeft,d-=b.offsetTop,{x:c,y:d}}var d=b.exports=function(a){var b=this.container=a.container||window.document;this.events={pressing:null,moving:null,release:null,element:null,pause:null},this.enabled=!1,b.onmouseup=this._onMouseEvent.bind(this,"release"),b.onmousedown=this._onMouseEvent.bind(this,"pressing"),b.onmousemove=this._onMouseEvent.bind(this,"moving"),window.document.onkeyup=this._onKeyUp.bind(this)};d.prototype.enable=function(){return this.enabled=!0,this},d.prototype.disable=function(){return this.enabled=!1,this},d.prototype.on=function(a,b){return this.events[a]||(this.events[a]=[]),this.events[a].push(b),this},d.prototype.off=function(a){return this.events[a]&&(this.events[a].length=0),this},d.prototype._getEventName=function(a){switch(a.which||a.keyCode){case 81:case 113:return"element:fire";case 87:case 119:return"element:water";case 69:case 101:return"element:earth";case 82:case 114:return"element:air";case 112:case 80:return"pause"}},d.prototype._onKeyUp=function(a){var b=this._getEventName(a);if((this.enabled||"pause"===b)&&b){if(b.indexOf("element")>-1){var c=b.split(":")[1];return void this.events.element.forEach(function(a){a(c)})}this.events[b].forEach(function(a){a()})}},d.prototype._onMouseEvent=function(a,b){if(this.enabled){var d=c(b,this.container);this.events[a].forEach(function(a){a(d)})}}},{}],3:[function(a,b){var c=b.exports=function(){this.pos={x:0,y:0},this.active=!1,this.element="fire",this.color=[255,255,255,.5],Controls.on("pressing",this.onPressing.bind(this)),Controls.on("moving",this.onMoving.bind(this)),Controls.on("release",this.onRelease.bind(this)),Controls.on("element",this.onElement.bind(this))};c.prototype.onPressing=function(a){this.pos=a,this.active=!0},c.prototype.onMoving=function(a){this.pos=a},c.prototype.onRelease=function(){this.active=!1},c.prototype.onElement=function(a){this.element=a},c.prototype.update=function(){var a=["fire","water","earth","air"],b=.4,c=[20,20,20,50],d=[[255,0,0,b],[0,0,255,b],[165,140,80,b],[0,220,255,b]];this.color=d[a.indexOf(this.element)],this.size=c[a.indexOf(this.element)]},c.prototype.draw=function(a){Renderer.drawCircle(a,{pos:this.pos,radius:this.size,color:Color.toRGBA(this.color),stroke:{color:"#fff",size:2}})}},{}],4:[function(a,b){var c=b.exports=function(){this.size=96,this.pos={x:20,y:50},this.spSize=Vector.multiply(Vector.one,this.size),this.current=null,this.active=!1,this.selected={},this.keys={fire:"Q",water:"W",earth:"E",air:"R"}};c.prototype.update=function(){this.selected.air=window.blowing,this.selected.fire=!1,this.selected.water=!1,this.selected.earth=!1,this.current&&(this.selected[this.current]=!0)},c.prototype.draw=function(a){var b=config.elements.sprites,c=50,d=0;for(var e in b){var f={x:this.pos.x,y:this.pos.y+d*(this.size+c)};Renderer.drawRect(a,{pos:f,size:this.spSize,corner:8,fill:this.selected[e]?"white":"transparent",stroke:this.active&&this.current===e?"red":"gray",strokeWidth:5}),Renderer.drawSprite(a,{resource:"elements",pos:f,size:this.spSize,angle:0,sp:b[e]});var g={x:f.x,y:f.y+1.1*this.spSize.y},h=20;Renderer.drawRect(a,{pos:{x:g.x-h/2,y:g.y-h},size:Vector.multiply(Vector.one,2*h),corner:4,fill:"gray",strokeWidth:2}),Renderer.drawText(a,{text:this.keys[e],pos:g,size:h,color:"#fff"}),d++}}},{}],5:[function(a,b){var c=a("./Manager"),d=b.exports=function(a){this.cview=a.viewport,this.cworld=a.world,this.cvacuum=a.vacuum,this.viewCtx=null,this.worldCtx=null,this.vacuumCtx=null,this.tLoop=null,this.paused=!1,this.boundGameRun=this.gameRun.bind(this),this.manager=new c,this.initialize()};d.prototype.initialize=function(){var a=config.size;if(!this.cview.getContext)throw"canvas not supported!";this.cview.width=a.x,this.cview.height=a.y,this.viewCtx=this.cview.getContext("2d"),this.worldCtx=this.cworld.getContext("2d"),this.cworld.width=a.x,this.cworld.height=a.y,this.vacuumCtx=this.cvacuum.getContext("2d"),this.cvacuum.width=config.vacuum.size.x,this.cvacuum.height=config.vacuum.size.y},d.prototype.loop=function(){this.manager.update(),this.manager.draw(this.viewCtx,this.worldCtx,this.vacuumCtx)},d.prototype.start=function(){this.paused=!1,Controls.enable(),this.gameRun()},d.prototype.stop=function(){this.paused=!0,Controls.disable(),window.cancelAnimationFrame(this.tLoop)},d.prototype.gameRun=function(){Time.tick()&&this.loop(),this.tLoop=window.requestAnimationFrame(this.boundGameRun)}},{"./Manager":7}],6:[function(a,b){var c=b.exports=function(){this.lastTime=Date.now(),this.frameTime=0,this.deltaTime=0,this.typicalFrameTime=20,this.minFrameTime=12,this.time=0};c.prototype.tick=function(){var a=Date.now(),b=a-this.lastTime;return b<this.minFrameTime?!1:(this.frameTime=b>2*this.typicalFrameTime?this.typicalFrameTime:b,this.deltaTime=this.frameTime/1e3,this.time+=this.frameTime,this.lastTime=a,!0)},c.prototype.reset=function(){this.lastTime=Date.now(),this.frameTime=0,this.deltaTime=0,this.typicalFrameTime=20,this.minFrameTime=12,this.time=0}},{}],7:[function(a,b){var c=a("./Nodes"),d=a("./Paths"),e=a("./Cursor"),f=a("./Spiders"),g=a("./Target"),h=a("./Vacuum"),i=a("./Stats"),j=a("./Elements"),k=b.exports=function(){this.cursor=new e,this.nodes=new c,this.paths=new d,this.target=new g,this.vacuum=new h(this.target),this.elements=new j,this.spiders=new f(this.nodes),this.stats=new i,this.target.setNodesInside(this.nodes.GetNodes())};k.prototype.update=function(){this.cursor.update(),window.blowing=this.cursor.blowing,this.elements.current=this.cursor.element,this.elements.active=this.cursor.active,this.cursor.active?(this.nodes.applyPos=this.cursor.pos,this.nodes.applyRatio=this.cursor.size,this.nodes.element=this.cursor.element):this.nodes.applyPos=null,this.nodes.update(),this.spiders.update(),this.target.update(this.spiders.spiders),this.vacuum.update(),this.stats.update(this.spiders.stats),this.elements.update()},k.prototype.draw=function(a,b,c){var d=config.size,e=config.vacuum.size;a.clearRect(0,0,d.x,d.y),b.clearRect(0,0,d.x,d.y),c.clearRect(0,0,e.x,e.y),this.cursor.draw(a),this.nodes.draw(b),this.spiders.draw(b),this.target.draw(b),this.vacuum.draw(c),this.stats.draw(a),this.elements.draw(a)}},{"./Cursor":3,"./Elements":4,"./Nodes":10,"./Paths":12,"./Spiders":17,"./Stats":18,"./Target":19,"./Vacuum":21}],8:[function(a,b){var c={};c.rnd=function(a,b){return Math.floor(Math.random()*(b-a+1)+a)},c.rnd11=function(){return Math.round(Math.random())},c.rnd01=function(){return Math.random()},c.rndAngle=function(){return Math.random()*Math.PI*2},c.rndInCircle=function(a){var b=c.rndAngle(),d=c.rnd(0,a);return{x:Math.cos(b)*d,y:Math.sin(b)*d}},c.lerp=function(a,b,c){return(1-c)*a+c*b},c.polygonPoints=function(a,b,c){for(var d=[],e=2*Math.PI/c,f=0;c>f;f++)d.push({x:a.x+b*Math.cos(f*e),y:a.y+b*Math.sin(f*e)});return d},b.exports=c},{}],9:[function(a,b){var c=b.exports=function(a){this.id=_.guid("nodes"),this.pos=a,this.size=config.nodes.size,this.color=config.nodes.colors.cold,this.dColor=Color.toRGBA(this.color),this.nears=[],this.selected=!1,this.temp=0,this.incTemp=0,this.incTempSize=0,this.burned=!1,this.shaked=!1,this.originalPos=null,this.hasEarth=!1,this.insideTarget=!1,this.blowing=!1,this.blowingEnd=0};c.prototype.addNear=function(a){this.nears.push(a)},c.prototype.randomBurn=function(){var a=this.nears.some(function(a){return a.burned});!a&&Mathf.rnd01()<.15&&this.setBurned()},c.prototype.getNearBurned=function(){var a;return this.nears.some(function(b){return b.burned?(a=b,!0):void 0}),a},c.prototype.shake=function(){this.originalPos?this.pos=this.originalPos:this.originalPos=this.pos,this.shaked=!0,this.pos=Vector.round(Vector.add(this.pos,Mathf.rndInCircle(.2)))},c.prototype.endShake=function(){this.originalPos&&(this.pos=this.originalPos),this.shaked=!1},c.prototype.revive=function(){this.burned&&(this.resetTemp(),this.burned=!1)},c.prototype.burn=function(){this.burned||(this.incTemp=1)},c.prototype.cool=function(){this.burned||(this.incTemp=-1,this.incTempSize=.5)},c.prototype.applyEarth=function(){this.burned||(this.hasEarth=!0)},c.prototype.applyAir=function(){this.burned||(this.blowing=!0,this.hasEarth=!1,this.blowingEnd=Time.time+500)},c.prototype.getRandomNear=function(a){var b=[];if(this.nears.forEach(function(c){c.id!==a&&!c.burned&&c.temp<.5&&b.push(c)}),b.length>0){var c=Mathf.rnd(0,b.length-1);return b[c]}return null},c.prototype.resetTemp=function(){this.temp=0,this.incTemp=0,this.incTempSize=0},c.prototype.setBurned=function(){this.burned=!0,this.color=config.nodes.colors.burned,this.dColor=Color.toRGBA(this.color),this.resetTemp()},c.prototype.update=function(){if(this.blowing&&Time.time>this.blowingEnd&&(this.blowing=!1),this.hasEarth)return this.dColor=Color.toRGBA(config.nodes.colors.earth),void this.resetTemp();var a=this.nears.every(function(a){return a.burned});return a?void this.setBurned():(this.incTemp>0&&(this.incTempSize=this.blowing?.2:.1),this.blowing||this.insideTarget?this.shake():this.shaked&&this.endShake(),this.temp+=this.incTemp*this.incTempSize*Time.deltaTime,this.temp<=0&&this.resetTemp(),this.color=Color.lerp(config.nodes.colors.cold,config.nodes.colors.burn,this.temp),this.dColor=Color.toRGBA(this.color),this.temp>1?(this.setBurned(),void this.resetTemp()):void 0)},c.prototype.draw=function(a){Renderer.drawCircle(a,{pos:this.pos,radius:this.size,color:this.dColor})}},{}],10:[function(a,b){var c=a("./Node"),d=a("./Paths"),e=b.exports=function(){this.nodes=[],this.paths=new d;var a=config.world.margin.x,b=config.world.margin.y,c=Vector.divide(config.size,2);c.x-=a,c.y-=b;var e=Vector.center(Vector.zero,config.size);this.createWeb(e,c),this.applyPos=null,this.applyRatio=0,this.element=null};e.prototype.createWeb=function(a,b){var d=0,e=30,f=e/5,g=6,h=3,i=2,j=8*g,k=Vector.add(a,Vector.multiply(b,-1)),l=Vector.add(a,b),m=[],n=new c(a);this.nodes.push(n);var o,p=10,q=1,r=0;do{o=!1,q%h===0&&(g*=i),g>j&&(g=j);var s=Mathf.polygonPoints(a,q*e+p,g);r+=s.length;var t=[];(10===q||20===q)&&(f+=.1),s.forEach(function(a){var b=Vector.round(Vector.add(a,Mathf.rndInCircle(f))),d=new c(b);Vector.isOut(b,k,l)?d.out=!0:(o=!0,this.nodes.push(d)),t.push(d)},this),m[q-1]=t,q++}while(o);d=q-2,m[0].forEach(function(a){this.paths.addOne(n,a)},this);var u,v,w,x;for(u=0;d>u;u++){var y=m[u],z=y.length;for(v=0;z>v;v++){w=v+1,x=v*i,w>z-1&&(w=0),x>z*i-h&&(x=-i);var A=m[u][w];if(!A.out){var B=m[u+1],C=B[w];B.length>y.length&&(C=B[x+i]),d-1>u&&C&&!C.out&&this.paths.addOne(A,C);var D=m[u][v];D.out||this.paths.addOne(A,D)}}}this.nodes.forEach(function(a){a.randomBurn()})},e.prototype.findNodeByCollider=function(){this.nodes.forEach(function(a){if(this.applyPos&&Vector.pointInCircle(this.applyPos,a.pos,this.applyRatio))switch(this.element){case"fire":a.burn();break;case"water":a.cool();break;case"earth":a.applyEarth();break;case"air":a.applyAir()}},this)},e.prototype.GetNodes=function(){return this.nodes},e.prototype.update=function(){this.applyPos&&this.findNodeByCollider(),this.paths.update(),this.nodes.forEach(function(a){a.burned||a.update()})},e.prototype.draw=function(a){this.paths.draw(a),this.nodes.forEach(function(b){b.draw(a)})}},{"./Node":9,"./Paths":12}],11:[function(a,b){var c=b.exports=function(a,b){this.na=a,this.nb=b,this.size=config.paths.size,this.tBurn=.5,this.burned=!1,this.heat=null};c.prototype.update=function(){var a=this.na,b=this.nb,c=a.temp,d=b.temp,e=a.color,f=this.nb.color;c>0?this.heat={from:a.pos,to:Vector.round(Vector.lerp(a.pos,b.pos,2*c>1?1:2*c))}:d>0&&(this.heat={from:b.pos,to:Vector.round(Vector.lerp(b.pos,a.pos,2*d>1?1:2*d))}),c>this.tBurn&&0===d?b.burn():d>this.tBurn&&0===c&&a.burn(),this.color=Color.toRGBA(Color.eql(e,f)?e:Color.lerp(e,f,this.tBurn)),(a.burned||b.burned)&&(this.heat=null,this.burned=!0,this.color=Color.toRGBA(config.nodes.colors.burned))},c.prototype.draw=function(a){Renderer.drawLine(a,{from:this.na.pos,to:this.nb.pos,size:this.size,color:this.color}),this.heat&&Renderer.drawLine(a,{from:this.heat.from,to:this.heat.to,size:5,color:"rgba(255,0,0,0.4)"})}},{}],12:[function(a,b){var c=a("./Path"),d=b.exports=function(){this.paths=[]};d.prototype.hasOne=function(a,b){return this.paths.some(function(c){var d=c.na.id,e=c.nb.id;return!(a!==d&&a!==e||b!==d&&b!==e)})},d.prototype.addOne=function(a,b){b&&!this.hasOne(a.id,b.id)&&(a.addNear(b),b.addNear(a),this.paths.push(new c(a,b)))},d.prototype.update=function(){this.paths.forEach(function(a){a.update()})},d.prototype.draw=function(a){this.paths.forEach(function(b){b.draw(a)})}},{"./Path":11}],13:[function(a,b){function c(a,b){b.hasOwnProperty("fill")&&(a.fillStyle=b.fill,a.fill())}function d(a,b){b.hasOwnProperty("stroke")&&(a.lineWidth=b.strokeWidth||1,a.strokeStyle=b.stroke,a.stroke())}function e(a,b){a.beginPath(),a.rect(b.pos.x,b.pos.y,b.size.x,b.size.y),c(a,b),d(a,b)}var f={};f.drawCircle=function(a,b){a.beginPath(),a.arc(b.pos.x,b.pos.y,b.radius,0,2*Math.PI,!1),a.fillStyle=b.color,a.fill(),b.stroke&&(a.lineWidth=b.stroke.size||1,a.strokeStyle=b.stroke.color||"#000",a.stroke())},f.drawLine=function(a,b){var c=b.from,d=b.to;a.beginPath(),a.lineCap="round",a.moveTo(c.x,c.y),a.lineTo(d.x,d.y),a.lineWidth=b.size,a.strokeStyle=b.color,a.stroke()},f.drawSprite=function(a,b){function c(){i?a.drawImage(d,i.x,i.y,i.w,i.h,e,f,g,h):a.drawImage(d,e,f,g,h)}var d=Repo[b.resource],e=b.pos.x,f=b.pos.y,g=b.size.x,h=b.size.y,i=b.sp;return b.hasOwnProperty("angle")?(a.save(),a.translate(e+g/2,f+h/2),e=-g/2,f=-h/2,a.rotate(b.angle),c(),void a.restore()):void c()},f.drawText=function(a,b){a.font=b.size+"pt Arial",a.textBaseline=b.baseline||"middle",a.fillStyle=b.color,a.fillText(b.text,b.pos.x,b.pos.y)},f.drawRect=function(a,b){var f=b.pos.x,g=b.pos.y,h=b.size.x,i=b.size.y;if(!b.hasOwnProperty("corner"))return void e(a,b);var j=b.corner;a.beginPath(),a.moveTo(f+j,g),a.lineTo(f+h-j,g),a.quadraticCurveTo(f+h,g,f+h,g+j),a.lineTo(f+h,g+i-j),a.quadraticCurveTo(f+h,g+i,f+h-j,g+i),a.lineTo(f+j,g+i),a.quadraticCurveTo(f,g+i,f,g+i-j),a.lineTo(f,g+j),a.quadraticCurveTo(f,g,f+j,g),a.closePath(),c(a,b),d(a,b)},b.exports=f},{}],14:[function(a,b){b.exports=function(){var a={},b=0,c=function(){return Object.keys(a).length},d={complete:function(){},report:function(){},error:function(){}},e=function(){var a=c(),e=100*++b/a;a>=b&&(d.report(e),e>=100&&d.complete())},f=function(a,b){d.error(a,b)};return{on:function(a,b){return d[a]&&(d[a]=b),this},load:function(){b=0;for(var c in a)this[c]=new window.Image,this[c].onload=e,this[c].onerror=f,this[c].src=a[c];return this},addResources:function(b){for(var c in b)a[c]=b[c];return this}}}()},{}],15:[function(a,b){b.exports={world:{margin:{x:150,y:20}},nodes:{size:3,colors:{cold:[255,255,255,1],burn:[255,0,0,1],burned:[0,0,0,.2],earth:[190,160,40,1]}},paths:{size:2},spiders:{size:32,quantity:50,color:[115,255,0],speed:.05,speedAlert:.1,behaviour:{alertTemp:0,tStayA:3e3,tStayB:1e4},sprites:{move:[{x:0,y:0,w:32,h:32},{x:32,y:0,w:32,h:32},{x:64,y:0,w:32,h:32},{x:96,y:0,w:32,h:32}]}},target:{size:180,suckForce:3},stats:{pos:{x:1,y:0},colors:{kills:[255,0,0,1],alives:[0,255,0,1]}},vacuum:{size:{x:300,y:500}},elements:{sprites:{fire:{x:0,y:0,w:32,h:32},water:{x:32,y:0,w:32,h:32},earth:{x:64,y:0,w:32,h:32},air:{x:96,y:0,w:32,h:32}}},images:{spider:"images/spider.png",elements:"images/elements.png"}}},{}],16:[function(a,b){var c=b.exports=function(a,b){this.id=_.guid("spiders");var c=config.spiders;this.pos=Vector.round(a),this.onDead=b,this.size=c.size,this.color=c.color,this.speed=c.speed,this.nFrom=null,this.nTo=null,this.journeyLength=null,this.traveling=!1,this.isDead=!1,this.temp=0,this.staying=!1,this.t_stay=2e3,this.t_startStay=0,this.t_nextStay=0,this.t_startMove=0,this.building=!1,this.spSize=Vector.multiply(Vector.one,this.size),this.spPos=Vector.origin(this.pos,this.spSize),this.angle=0,this.spriteIndex=0,this.animTime=3,this.lastFrameTime=0,this.exited=!1};c.prototype.setNode=function(a,b){this.nFrom=a,this.nTo=b,this.t_startMove=Time.time,this.journeyLength=Vector.length(a.pos,b.pos),this.traveling=!0,this.angle=Vector.angleTo(this.pos,this.nTo.pos)},c.prototype.setDead=function(){this.isDead||(this.isDead=!0,this.onDead())},c.prototype.animate=function(){this.staying||(this.lastFrameTime-=Time.frameTime,this.lastFrameTime<=0&&(this.spriteIndex++,this.spriteIndex>3&&(this.spriteIndex=0),this.lastFrameTime=this.animTime/this.speed))},c.prototype.updateTemp=function(){var a=this.nFrom.temp,b=this.nTo.temp;return 0===a&&0===b?void(this.temp=0):a>b?void(this.temp=a):void(b>a&&(this.temp=b))},c.prototype.canMove=function(){return!this.staying&&!this.traveling&&!this.building},c.prototype.updateState=function(){var a=config.spiders,b=Time.time,c=a.behaviour,d=this.t_startStay,e=this.t_stay;return this.temp>c.alertTemp?(this.speed=a.speedAlert,void(this.staying=!1)):(this.speed=a.speed,void(this.staying?b>d+e&&(this.staying=!1,this.t_nextStay=b+e/Mathf.rnd(2,5)):b>this.t_nextStay&&Mathf.rnd01()<.8&&(this.staying=!0,this.t_startStay=b,this.t_stay=Mathf.rnd(c.tStayA,c.tStayB))))},c.prototype.updateMove=function(){if(!this.building&&(this.nFrom.burned||this.nTo.burned))return void this.setDead();var a=(Time.time-this.t_startMove)*this.speed,b=a/this.journeyLength;return b>1?(this.pos=this.nTo.pos,this.nTo.revive(),this.traveling=!1,this.building=!1,!0):(this.pos=Vector.round(Vector.lerp(this.nFrom.pos,this.nTo.pos,b)),this.animate(),void(this.spPos=Vector.origin(this.pos,this.spSize)))},c.prototype.buildWeb=function(a,b){this.building=!0,this.traveling=!0,this.setNode(a,b)},c.prototype.update=function(){if(this.spPos=Vector.origin(this.pos,this.spSize),!(this.isDead||this.exited||this.inVacuum)){if(this.updateTemp(),this.building||this.traveling){var a=this.updateMove();if(!a)return}this.updateState()}},c.prototype.draw=function(a){this.isDead||(this.building&&Renderer.drawLine(a,{from:this.pos,to:this.nFrom.pos,size:config.paths.size,color:Color.toRGBA(config.nodes.colors.cold)}),Renderer.drawSprite(a,{resource:"spider",pos:this.spPos,size:this.spSize,angle:this.angle,sp:config.spiders.sprites.move[this.spriteIndex]}))}},{}],17:[function(a,b){var c=a("./Spider"),d=b.exports=function(a,b){this.nodes=a,this.onExitSpider=b,this.amount=config.spiders.quantity,this.spiders=[],this.spidersExit=0,this.spidersKilled=0,this.generateSpiders(),this.stats={},this.updateGUI()};d.prototype.updateGUI=function(){this.stats={saved:this.spidersExit,killed:this.spidersKilled,alives:this.spiders.length-(this.spidersKilled+this.spidersExit),total:this.spiders.length}},d.prototype.onSpiderDead=function(){this.spidersKilled++,this.updateGUI()},d.prototype.generateSpiders=function(){var a,b,d=this.nodes.GetNodes(),e=d.length,f=[],g=e<this.amount?e-2:this.amount;do b=Mathf.rnd(0,e-1),a=d[b],a.burned||-1!==f.indexOf(a.id)||(f.push(a.id),this.spiders.push(new c(a.pos,this.onSpiderDead.bind(this))),g--);while(g)},d.prototype.update=function(){function a(a,b){if(!a.hasEarth&&0===a.temp&&Mathf.rnd01()>.7){var c=a.getNearBurned();if(c)return b.buildWeb(a,c),!0}return!1}function b(a,b){var c=b.nodeFrom&&b.nodeFrom.id||-1,d=a.getRandomNear(c);return d?(b.setNode(a,d),!0):!1}function c(c,d){Vector.pointInCircle(c.pos,d.pos,5)&&(a(d,c)||b(d,c)||d.burned&&c.setDead())}var d=this.nodes.GetNodes(),e=this.spidersExit;this.spidersExit=0,this.spiders.forEach(function(a){a.exited?this.spidersExit++:a.canMove()&&d.some(function(b){c(a,b)},this),a.update()},this),e!==this.spidersExit&&this.updateGUI()},d.prototype.draw=function(a){this.spiders.forEach(function(b){b.inVacuum||b.draw(a)})}},{"./Spider":16}],18:[function(a,b){var c=b.exports=function(){this.size=40;var a=15,b=25;this.pos=Vector.prod(config.stats.pos,config.size),this.kPos=Vector.clone(this.pos),this.kPos.x-=a+this.size/2,this.kPos.y+=b+this.size,this.aPos=Vector.clone(this.pos),this.aPos.x-=a+this.size/2,this.aPos.y+=3*b+this.size,this.kcolor=Color.toRGBA(config.stats.colors.kills),this.acolor=Color.toRGBA(config.stats.colors.alives),this.stats={saved:0,killed:0,alives:0,total:0},this.spSize=Vector.multiply(Vector.one,this.size),this.angle=Math.PI/2,this.oAPos=Vector.origin(this.aPos,this.spSize),this.oKPos=Vector.origin(this.kPos,this.spSize),this.txtSize=30};c.prototype.update=function(a){this.stats=a},c.prototype.draw=function(a){this.drawIcons(a),this.drawStats(a)},c.prototype.drawIcons=function(a){var b=this.spSize,c=this.oKPos,d=this.oAPos;Renderer.drawSprite(a,{resource:"spider",pos:d,size:b,angle:this.angle,sp:config.spiders.sprites.move[0]}),Renderer.drawSprite(a,{resource:"spider",pos:c,size:b,angle:this.angle,sp:config.spiders.sprites.move[0]}),Renderer.drawLine(a,{from:c,to:Vector.add(b,c),size:2,color:this.kcolor}),Renderer.drawLine(a,{from:{x:c.x+b.x,y:c.y},to:{x:c.x,y:c.y+b.y},size:2,color:this.kcolor})},c.prototype.drawStats=function(a){var b=this.txtSize;Renderer.drawText(a,{text:_.pad(this.stats.alives,3),pos:{x:this.aPos.x-3*b,y:this.aPos.y},size:b,color:this.acolor}),Renderer.drawText(a,{text:_.pad(this.stats.killed,3),pos:{x:this.kPos.x-3*b,y:this.kPos.y},size:b,color:this.kcolor})}},{}],19:[function(a,b){var c=b.exports=function(){this.size=config.size.y/6,this.suckForce=config.target.suckForce;var a=config.world.margin.x,b=config.world.margin.y;this.pos=Vector.prod(Vector.one,config.size),this.pos.x-=a+10,this.pos.y-=b+20,this.saved=[],this.saving=[]};c.prototype.setNodesInside=function(a){a.forEach(function(a){Vector.pointInCircle(a.pos,this.pos,this.size)&&(a.burned&&(a.burned=!1,a.revive()),a.insideTarget=!0)},this)},c.prototype.update=function(a){a.forEach(function(a){a.dead||a.exited||Vector.pointInCircle(a.pos,this.pos,this.size)&&(a.building=!1,a.exited=!0,a.vel={x:0,y:0},this.saving.push(a))},this);var b=Time.deltaTime,c=b*this.suckForce,d=this.pos;this.saving.forEach(function(a){if(!a.catched){var b=a.pos,e=Vector.normal(b,d);a.vel=Vector.add(a.vel,Vector.multiply(e,c)),a.pos=Vector.add(b,a.vel),Vector.pointInCircle(a.pos,d,5)&&(a.catched=!0,this.saved.push(a))}},this)},c.prototype.draw=function(a){var b=.97*Math.PI,c=1.52*Math.PI;a.beginPath(),a.lineCap="butt",a.arc(this.pos.x,this.pos.y,this.size/2,b,c,!1),a.lineWidth=this.size,a.strokeStyle="rgba(80,255,85,0.1)",a.stroke()}},{}],20:[function(a,b){var c=b.exports=function(){this.lastIds={nodes:0,spiders:0,emitters:0}};c.prototype.guid=function(a){return++this.lastIds[a]},c.prototype.pad=function(a,b){var c="0000000"+a;return c.substr(c.length-b)}},{}],21:[function(a,b){var c=b.exports=function(a){this.target=a,this.size=config.vacuum.size,this.txtColor="#fff",this.txtSize=20,this.txtPos={x:180,y:30},this.targetLen=20,this.current=0,this.offx=30,this.offy=10,this.recipePos={x:this.offx+165,y:this.offy+65},this.recipeSize={x:80,y:300}};c.prototype.update=function(){this.current=this.target.saved.length;var a=this.recipePos,b=this.recipeSize,c=a.y+b.y/2,d=a.x+b.x/2,e=2*Time.time*Math.PI;this.target.saved.forEach(function(a){if(a.inVacuum){a.animate();var b=a.vacuum;a.pos={x:b.ampX*Math.sin(e/b.velX)+d,y:b.ampY*Math.sin(e/b.velY)+c},a.angle+=b.rot}else a.inVacuum=!0,a.vacuum={ampY:Mathf.rnd(10,c/2),velY:Mathf.rnd(600,1e3),ampX:Mathf.rnd(5,20),velX:Mathf.rnd(2e3,6e3),rot:Mathf.rnd(1,5)/10},a.pos={x:d,y:c}},this)},c.prototype.draw=function(a){this.drawBG(a),this.drawContent(a),this.drawStats(a)},c.prototype.drawContent=function(a){var b=this.recipePos,c=this.recipeSize;Renderer.drawRect(a,{pos:b,size:c,corner:6,fill:"#ffffff",strokeWidth:2}),this.drawSpiders(a),Renderer.drawRect(a,{pos:b,size:c,corner:6,stroke:"#bbbbf9",fill:"rgba(0,0,255,0.5)",strokeWidth:2})},c.prototype.drawSpiders=function(a){this.target.saved.forEach(function(b){b.draw(a)})},c.prototype.drawStats=function(a){var b=this.txtSize;Renderer.drawText(a,{text:_.pad(this.current,3)+" / "+_.pad(this.targetLen,3),pos:this.txtPos,size:b,color:this.txtColor})},c.prototype.drawBG=function(a){function b(b,e,f){a.beginPath();var g=b[0];a.moveTo(c+g[0],d+g[1]);for(var h=1;h<b.length;h++){var i=b[h];4===i.length?a.quadraticCurveTo(c+i[0],d+i[1],c+i[2],d+i[3]):a.lineTo(c+i[0],d+i[1])}a.lineTo(c+g[0],d+g[1]),e&&(a.fillStyle=e,a.fill()),a.lineWidth=3,a.strokeStyle=f,a.lineCap="round",a.stroke(),a.closePath()}var c=this.offx,d=this.offy,e=[[70,460],[120,400],[160,445],[195,450,185,380],[225,380],[230,510,145,475]];b(e,"#9e9e9e","#474747");var f={x:c+150,y:d+50};Renderer.drawRect(a,{pos:f,size:{x:110,y:330},corner:6,fill:"#9e9e9e",stroke:"#474747",strokeWidth:2})}},{}],22:[function(a,b){var c={};c.zero={x:0,y:0},c.one={x:1,y:1},c.clone=function(a){return{x:a.x,y:a.y}},c.prod=function(a,b){return{x:a.x*b.x,y:a.y*b.y}},c.multiply=function(a,b){return{x:a.x*b,y:a.y*b}},c.divide=function(a,b){return{x:a.x/b,y:a.y/b}},c.add=function(a,b){return{x:a.x+b.x,y:a.y+b.y}},c.dif=function(a,b){return{x:b.x-a.x,y:b.y-a.y}},c.part=function(a,b,d){return c.lerp(a,b,d/10)},c.angleTo=function(a,b){var d=c.dif(a,b);return Math.atan2(d.y,d.x)},c.mid=function(a,b){return c.divide(c.add(a,b),2)},c.eql=function(a,b){return a.x===b.x&&a.y===b.y},c.normal=function(a,b){var d=c.dif(a,b),e=c.length(a,b);return{x:d.x/e||0,y:d.y/e||0}},c.origin=function(a,b){return{x:a.x-b.x/2,y:a.y-b.y/2}},c.center=function(a,b){return{x:a.x+b.x/2,y:a.y+b.y/2}},c.length=function(a,b){var d=c.dif(a,b);return Math.sqrt(d.x*d.x+d.y*d.y)},c.pointInCircle=function(a,b,d){return c.length(a,b)<d},c.lerp=function(a,b,c){return{x:a.x+(b.x-a.x)*c,y:a.y+(b.y-a.y)*c}},c.round=function(a){return a.x=Math.round(a.x),a.y=Math.round(a.y),a},c.isOut=function(a,b,c){return a.x<b.x||a.x>c.x||a.y<b.y||a.y>c.y},c.debug=function(a){console.log(a.x+" : "+a.y)},b.exports=c},{}],23:[function(a){function b(){function b(a){return Math.max(d["client"+a],g["scroll"+a],d["scroll"+a],g["offset"+a],d["offset"+a])}var c=a("./Settings"),d=f.documentElement,g=f.body;c.size={x:b("Width"),y:b("Height")},e.config=c}function c(){function a(){game.paused?game.start():game.stop()}var b=f.getElementById("game-viewport"),c=f.getElementById("game-world"),d=f.getElementById("vacuum");e._=new i,e.Time=new h,e.Controls=new j({container:b}),e.game=new g({viewport:b,world:c,vacuum:d}),e.Controls.on("pause",a)}function d(){b(),e.Repo.addResources(e.config.images).on("complete",function(){c(),e.game.start()}).load()}var e=window,f=e.document;e.DEBUG=!0,a("./reqAnimFrame");var g=a("./Game"),h=a("./GameTime"),i=a("./Utils"),j=a("./Controls");e.Mathf=a("./Mathf"),e.Color=a("./Color"),e.Vector=a("./Vector"),e.Renderer=a("./Renderer"),e.Repo=a("./Repo"),e.onload=d},{"./Color":1,"./Controls":2,"./Game":5,"./GameTime":6,"./Mathf":8,"./Renderer":13,"./Repo":14,"./Settings":15,"./Utils":20,"./Vector":22,"./reqAnimFrame":24}],24:[function(){!function(){for(var a=0,b=["ms","moz","webkit","o"],c=0;c<b.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(b){var c=(new Date).getTime(),d=Math.max(0,16-(c-a)),e=window.setTimeout(function(){b(c+d)},d);return a=c+d,e}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){window.clearTimeout(a)})}()},{}]},{},[23]);