let isMouseDown = false;
const spectialString = `Dearest Love,

Every day with you and our beautiful bug is a journey filled with joy and love. You are not just my partner but the heart of our family, creating memories that are treasures of the soul. Thank you for being the amazing person you are, and for making our lives so wonderfully complete.

Forever yours ❤️`;

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
  let height = window.innerHeight;
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
      let c = verly.createCloth(posx, posy, w, h, segments, pinOffset);
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
  // Create a new Cloth instance
  let cloth = new Cloth(300, 300, 500, 400+200, 25, 2, 16, verly);
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
    isMouseDown = true;
    // You can add your logic here for what should happen when mouse button is pressed
    console.log("Mouse down at position: ", e.clientX, e.clientY);
  });

    // Add an event listener for the mousemove event
canvas.addEventListener('mousemove', function(e) {
  // Calculate the mouse position
  let rect = canvas.getBoundingClientRect();
  let mouseX = e.clientX - rect.left;
  let mouseY = e.clientY - rect.top;

  // Find the point in the cloth that is closest to the mouse position
  let closestPoint = cloth.points.reduce((closest, point) => {
    let dx = point.x - mouseX;
    let dy = point.y - mouseY;
    let distance = Math.sqrt(dx * dx + dy * dy);
    return distance < closest.distance ? {point, distance} : closest;
  }, {point: null, distance: Infinity}).point;

  // Apply a force to the closest point
  if (closestPoint) {
    closestPoint.applyForce(0, -0.1);
  }
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


  // Track the mouse up event
  canvas.addEventListener("mouseup", function (e) {
    isMouseDown = false;
    // You can add your logic here for what should happen when mouse button is released
    console.log("Mouse up at position: ", e.clientX, e.clientY);
  });
};
