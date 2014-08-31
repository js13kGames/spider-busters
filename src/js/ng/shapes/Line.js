
$.Line = $.Entity.extend({

  pos: { x: 0, y: 0 },
  to: { x: 0, y: 0 },

  size: 1,
  color: $.C.white,
  
  start: function(){},

  update: function(){ },

  draw: function(ctx){

    $.Renderer.line(ctx, {
      from: this.pos,
      to: this.to,
      size: this.size,
      color: $.C.toRGBA(this.color)
    });

  },

});

