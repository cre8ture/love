let canvas = document.getElementById("c");
let ctx = canvas.getContext("2d");
let CANVAS_WIDTH = window.innerWidth;
let CANVAS_HEIGHT = window.innerHeight;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// arrays
let dots = [];
let sticks = [];

// forming a BOX
// dots.push(new Dot(100, 100, (Math.random() - 0.5) * 100.0)); // x, y, vx, vy
// dots.push(new Dot(200, 100));
// dots.push(new Dot(200, 200));
// dots.push(new Dot(100, 200));

// // sticks
// sticks.push(new Stick(dots[0], dots[1]))
// sticks.push(new Stick(dots[1], dots[2]))
// sticks.push(new Stick(dots[2], dots[3]))
// sticks.push(new Stick(dots[3], dots[0]))
// sticks.push(new Stick(dots[3], dots[1]))
let box = new Entity(100);
// x, y, vx, vy added random velocity in first dot to make the box rotate a little bit
box.addDot(100, 100, (Math.random() - 0.5) * 100.0);
box.addDot(200, 100);
box.addDot(200, 200);
box.addDot(100, 200);

box.addStick(0, 1);
box.addStick(1, 2);
box.addStick(2, 3);
box.addStick(3, 0);
box.addStick(3, 1);

// function animate() {
//   ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

//   for (let d of dots) {
//     d.update();
//     d.constrain();
//     d.render(ctx);
//   }
//   for (let s of sticks) {
//     s.update();
//     s.render(ctx);
//   }

//   requestAnimationFrame(animate);
// }

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  
    box.update(ctx);
  
    requestAnimationFrame(animate);
  }
animate();