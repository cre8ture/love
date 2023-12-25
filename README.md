# Cloth Simulation

This project is a love letter to the beauty of mathematics and physics, and an exploration of Verlet fields in the context of cloth simulation.

We have built custom engines for the simulation and vertex rendering to bring this project to life. The cloth simulation uses Verlet integration, a method commonly used in physics simulations for its stability and performance.

The project is a testament to the power of these mathematical concepts and their applications in computer graphics. It's a journey through the intricacies of cloth dynamics, showcasing the delicate balance between forces that create the realistic movement of cloth.

We hope you enjoy exploring this project as much as we enjoyed building it.

## How it works

The simulation starts with a grid of points, or "particles", each connected to its neighbors by "sticks". These sticks maintain the structure of the cloth, while the particles follow the laws of physics.

When a force (like gravity or wind) is applied, it changes the particles' velocities, which in turn changes their positions. The sticks then correct these positions to prevent the cloth from stretching too much.

The result is a realistic simulation of a cloth moving in 3D space, reacting to forces and constraints in real-time.

## Running the project

To run the project, simply open `index.html` in your web browser. Enjoy the simulation!