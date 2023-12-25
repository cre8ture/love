let isMouseDown = false;
const spectialString = `My dearest love, my closest friend,
Our journey's rich, with twists and bends.
Through sunny days and stormy weather,
We've faced the world, always together.

Our precious child, a bundle of light,
Fills our days with joy so bright.
With tiny steps and cheerful play,
They bring sunshine to our everyday.

Through sleepless nights and messy spills,
Our patience tested, a test of wills.
Yet in each moment, loud or still,
Our family bond is stronger still.

In every trial, in every test,
We've learned that together, we are blessed.
Side by side, we share each load,
On this winding, shared road.

So here's to love, in all its forms,
Through all life's storms, through all its norms.
With you and our baby, life's a ride,
Forever, dear, I'm by your side`;

// Function to clamp a value between a minimum and maximum
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// Function to perform linear interpolation between a start and end value
function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

// Function to execute when the window loads
window.onload = function () {
  // Get the canvas element
  let canvas = document.getElementById("c");
  // Get the 2D rendering context for the canvas
  let ctx = canvas.getContext("2d");
  // Set the width of the canvas, clamping the window's inner width between 600 and Infinity
  let width = clamp(window.innerWidth, 600, Infinity);
  // Set the height of the canvas to the window's inner height
  let height = window.innerHeight+300;
  // Apply the width and height to the canvas
  canvas.width = width;
  canvas.height = height;

  // Create a new Verly instance
  let verly = new Verly(16, canvas, ctx);

  // Define a Cloth class that extends Entity
  class Cloth extends Entity {
    constructor(
      posx,
      posy,
      w,
      h,
      segments,
      pinOffset,
      itteration,
      verlyInstance
    ) {
      super(itteration, verlyInstance);
      verly.dontPush = true;
      let c = verly.createCharCloth(posx, posy, w, h*2, segments, pinOffset, spectialString);
      this.c = c;
      this.points = c.points;
      this.sticks = c.sticks;

      this.segments = segments;
    }

    // Empty function to render points
    // renderPoints() { } //nothing

    // Function to render sticks
    // renderSticks() {
    //   let colorPos = Math.min(width, height) * 0.5 / this.segments;
    //   let x, y;
    //   for (y = 1; y < this.segments; ++y) {
    //     for (x = 1; x < this.segments; ++x) {
    //       let i1 = (y - 1) * this.segments + x - 1;
    //       let i2 = (y) * this.segments + x;

    //       // Check if the stick is still in the cloth
    //       if (this.sticks.some(stick => (stick.startPoint === this.points[i1] && stick.endPoint === this.points[i1 + 1]) || (stick.startPoint === this.points[i1 + 1] && stick.endPoint === this.points[i1]))) {
    //         ctx.beginPath();

    //         ctx.moveTo(this.points[i1].pos.x, this.points[i1].pos.y);
    //         ctx.lineTo(this.points[i1 + 1].pos.x, this.points[i1 + 1].pos.y);

    //         ctx.lineTo(this.points[i2].pos.x, this.points[i2].pos.y);
    //         ctx.lineTo(this.points[i2 - 1].pos.x, this.points[i2 - 1].pos.y);

    //         let off = this.points[i2].pos.x - this.points[i1].pos.x;
    //         off += this.points[i2].pos.y - this.points[i1].pos.y;
    //         off *= 0.25;
    //         let coef = Math.round((Math.abs(off) / colorPos) * 255);
    //         if (coef > 255)
    //           coef = 255;

    //         // Changed color to a light pastel blue
    //         let color = "rgba(" + 173 + "," + 216 + "," + 230 + "," + lerp(0.25, 1, coef / 255.0) + ")";

    //         ctx.fillStyle = color;
    //         [this.points[i1], this.points[i1 + 1], this.points[i2], this.points[i2 - 1]].forEach(p => p.color = color);

    //         ctx.fill();
    //         ctx.closePath();
    //       }
    //     }
    //   }
    // }
    // Add a tear function
    tear(mouseX, mouseY, threshold) {
      this.c.tear(mouseX, mouseY, threshold);
      //   for (let i = 0; i < this.sticks.length; i++) {
      //     // Calculate the distance between the mouse position and the midpoint of the stick
      //     let midPoint = this.sticks[i].startPoint.pos.add(this.sticks[i].endPoint.pos).mult(0.5);
      //     let dist = Math.sqrt(Math.pow(midPoint.x - mouseX, 2) + Math.pow(midPoint.y - mouseY, 2));

      //     // If the distance is less than the threshold, remove the stick
      //     if (dist < threshold) {
      //       this.removeStick(i);
      //       i--; // Decrement i because the sticks array has been shortened
      //     }
      //   }
      // }
    }
  }

  let centerX = width / 2;
let centerY = height / 2;

// Calculate the top left position of the cloth
let startX = centerX - 500 / 2; // 500 is the width of the cloth
let startY = centerY - 400 / 2; // 400 is the height of the cloth


  // Create a new Cloth instance
  let cloth = new Cloth(700, 500, 500, 400, 25, 2, 16, verly);
  // Add the Cloth instance to the Verly instance
  verly.addEntity(cloth);

  // Function to animate the canvas
  function animate() {
    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    // Update, render, and interact with the Verly instance
    verly.update();
    verly.render();
    verly.interact();
    // verly.renderPointIndex();

    // Request the next animation frame
    requestAnimationFrame(animate);
  }
  // Start the animation
  animate();

  // Track the mouse down event
  canvas.addEventListener("mousedown", function (e) {
    // isMouseDown = true;
    // You can add your logic here for what should happen when mouse button is pressed
    console.log("Mouse down at position: ", e.clientX, e.clientY);
  });

  // Track the mouse move event
  canvas.addEventListener("mousemove", function (e) {
    if (isMouseDown) {
      console.log("i am cloth", cloth);
      cloth.tear(e.clientX, e.clientY, 20);
      // You can add your logic here for what should happen when mouse moves while button is pressed
      console.log("Mouse move at position: ", e.clientX, e.clientY);
    }
  });

  // Track the keydown event
window.addEventListener("keydown", function (e) {
  if (e.key === 'c' || e.key === 'C') {
    isMouseDown = true;
  }
});

// Track the keyup event
window.addEventListener("keyup", function (e) {
  if (e.key === 'c' || e.key === 'C') {
    isMouseDown = false;
  }
});

  // Track the mouse up event
  canvas.addEventListener("mouseup", function (e) {
    // isMouseDown = false;
    // You can add your logic here for what should happen when mouse button is released
    console.log("Mouse up at position: ", e.clientX, e.clientY);
  });
};
