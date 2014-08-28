
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
    
    this.bg = new $.Rect({
      pos: this.pos,
      size: this.size,
      fill: this.color,
      stroke: { size: 4, color: [30,30,30,1] },
      corner: 8
    });
    this.entities.push(this.bg);

    this.icon = new $.Sprite({
      resource: "elements",
      pos: $.V.center(this.pos, this.size),
      size: this.size,
      angle: 0,
      sprite: this.sprite
    });
    this.entities.push(this.icon);

    var txtPos = { x: this.pos.x, y: this.pos.y + this.size.y * 1.1 };
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
