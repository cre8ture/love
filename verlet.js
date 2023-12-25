// https://betterprogramming.pub/making-a-verlet-physics-engine-in-javascript-1dff066d7bc5
class Dot {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.oldpos = new Vector(x, y);
    this.friction = 0.97;
    this.groundFriction = 0.7;

    this.gravity = new Vector(0, 1);

    this.radius = 5;
    this.color = "#e62a4f";
    this.mass = 1;
  }

  update() {
    let vel = Vector.sub(this.pos, this.oldpos);
    vel.mult(this.friction);

    // if the point touches the ground set groundFriction
    if (this.pos.y >= CANVAS_HEIGHT - this.radius && vel.magSq() > 0.000001) {
      var m = vel.mag();
      vel.x /= m;
      vel.y /= m;
      vel.mult(m * this.groundFriction);
    }
    this.oldpos.setXY(this.pos.x, this.pos.y);
    this.pos.add(vel);
    this.pos.add(this.gravity);
  }

  constrain() {
    if (this.pos.x > CANVAS_WIDTH - this.radius) {
      this.pos.x = CANVAS_WIDTH - this.radius;
    }
    if (this.pos.x < this.radius) {
      this.pos.x = this.radius;
    }
    if (this.pos.y > CANVAS_HEIGHT - this.radius) {
      this.pos.y = CANVAS_HEIGHT - this.radius;
    }
    if (this.pos.y < this.radius) {
      this.pos.y = this.radius;
    }
  }

  render() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}

class Stick {
  constructor(p1, p2, length) {
    this.startPoint = p1;
    this.endPoint = p2;
    this.stiffness = 2;
    this.color = "#f5476a";

    // if the length is not given then calculate the distance based on position
    if (!length) {
      this.length = this.startPoint.pos.dist(this.endPoint.pos);
    } else {
      this.length = length;
    }
  }
  update() {
    // calculate the distance between two dots
    let dx = this.endPoint.pos.x - this.startPoint.pos.x;
    let dy = this.endPoint.pos.y - this.startPoint.pos.y;
    // pythagoras theorem
    let dist = Math.sqrt(dx * dx + dy * dy);
    // calculate the resting distance betwen the dots
    let diff = ((this.length - dist) / dist) * this.stiffness;

    // getting the offset of the points
    let offsetx = dx * diff * 0.5;
    let offsety = dy * diff * 0.5;

    // calculate mass
    let m1 = this.startPoint.mass + this.endPoint.mass;
    let m2 = this.startPoint.mass / m1;
    m1 = this.endPoint.mass / m1;

    // and finally apply the offset with calculated mass
    if (!this.startPoint.pinned) {
      this.startPoint.pos.x -= offsetx * m1;
      this.startPoint.pos.y -= offsety * m1;
    }
    if (!this.endPoint.pinned) {
      this.endPoint.pos.x += offsetx * m2;
      this.endPoint.pos.y += offsety * m2;
    }
  }

  render(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.startPoint.pos.x, this.startPoint.pos.y);
    ctx.lineTo(this.endPoint.pos.x, this.endPoint.pos.y);
    ctx.stroke();
    ctx.closePath();
  }
}


class Entity {
    constructor(iterations) {
      this.dots = [];
      this.sticks = [];
      this.iterations = iterations || 16;
    }
  
    addDot(x, y, vx, vy) {
      this.dots.push(new Dot(x, y, vx, vy));
    }
  
    addStick(p1, p2, length) {
      this.sticks.push(new Stick(this.dots[p1], this.dots[p2], length));
    }
  
    updatePoints() {
      for (let i = 0; i < this.dots.length; i++) {
        this.dots[i].update();
      }
    }
  
    updateSticks() {
      for (let i = 0; i < this.sticks.length; i++) {
        this.sticks[i].update();
      }
    }
  
    updateContrains() {
      for (let i = 0; i < this.dots.length; i++) {
        this.dots[i].constrain();
      }
    }
  
    renderPoints(ctx) {
      for (let i = 0; i < this.dots.length; i++) {
        this.dots[i].render(ctx);
      }
    }
    renderSticks(ctx) {
      for (let i = 0; i < this.sticks.length; i++) {
        this.sticks[i].render(ctx);
      }
    }
  
    update(ctx) {
  
      this.updatePoints();
      for (let j = 0; j < this.iterations; j++) {
        this.updateSticks();
        this.updateContrains();
      }
      this.renderPoints(ctx);
      this.renderSticks(ctx);
    }
  }


  