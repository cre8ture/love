class CharPoint extends Point {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} vx 
     * @param {number} vy 
     * @param {number} radius 
     * @param {string} char 
     */
    constructor(x, y, vx, vy, radius, char) {
      super(x, y, vx, vy, radius);
      this.char = char;
    }
  
    /**
     * 
     * @param {string} char 
     * @returns {CharPoint}
     */
    setChar(char) {
      this.char = char;
      return this;
    }
  
    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    render(ctx) {
      ctx.font = 'bold 20px Courier New, monospace';
      ctx.fillText(this.char, this.pos.x, this.pos.y);
    }
  }