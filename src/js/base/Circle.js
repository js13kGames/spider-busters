
module.exports = Entity.extend({

  pos: { x: 0, y: 0 },
  radius: 5,
  stroke: null,

  initialize: function(){},

  update: function(){ },

  draw: function(ctx){

    var opts = {
      pos: this.pos,
      radius: this.radius,
      lineCap: this.lineCap || 'butt'
    };

    if (this.color){
      opts.fill = Color.toRGBA(this.color);
    }

    if (this.stroke){
      opts.stroke = this.stroke;
    }

    if (this.angles){
      opts.angles = this.angles;
    }

    Renderer.drawCircle(ctx, opts);
  },

});
