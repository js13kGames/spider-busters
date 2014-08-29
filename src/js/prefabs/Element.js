
$.Element = $.Collection.extend({

  size: { x: 96, y: 96 },

  start: function(options){
    this.entities = [];

    this.name = options.name;
    this.key = options.key;
    this.color = [255,255,255,1];
    this.sprite = options.sprite;

    this.active = false;
    this.current = false;

    this.createElement();
  },

  createElement: function(){
    var size = this.size,
      pos = this.pos;
    
    this.bg = new $.Rect({
      pos: pos,
      size: size,
      fill: this.color,
      stroke: { size: 4, color: [30,30,30,1] },
      corner: 8
    });
    this.entities.push(this.bg);

    this.icon = new $.Sprite({
      resource: "elements",
      pos: $.V.center({ x: pos.x+3, y: pos.y+6 }, { x: 90, y: 90 }),
      size: size,
      angle: 0,
      sprite: this.sprite
    });
    this.entities.push(this.icon);

    var txtPos = { x: pos.x, y: pos.y + size.y * 1.1 };
    var txtSize = 20;

    this.ctrlKey = new $.Rect({
      pos: { x: txtPos.x - txtSize/2, y: txtPos.y - txtSize},
      size: $.V.multiply($.V.one, txtSize*2),
      fill: [0,0,0,1],
      corner: 4
    });
    this.entities.push(this.ctrlKey);

    this.txtKey = new $.Text({
      text: this.key,
      pos: txtPos,
      size: txtSize,
      color: [255,255,255,1]
    });
    this.entities.push(this.txtKey);
  },

  update: function(){
    this.bg.fill = this.active ? [255,255,255,1] : [255,255,255, 0.1];
    this.bg.stroke.color = this.current ? [255,255,255,1] : [0,0,0,1];
  },

});
