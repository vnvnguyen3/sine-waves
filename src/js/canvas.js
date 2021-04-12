import utils from './utils';
import * as dat from 'dat.gui';

const gui = new dat.GUI();
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const wave = {
  y: innerHeight / 2,
  length: 0.01,
  amplitude: 100,
  frequency: 0.01
}

const strokeColor = {
  h: 200,
  s: 50,
  l: 50
}

const backgroundColor = {
  r: 0,
  g: 0,
  b: 0,
  a: 0.01
}

const waveFolder = gui.addFolder('wave');
waveFolder.add(wave, 'y', 0, canvas.height);
waveFolder.add(wave, 'length', -0.01, 0.01);
waveFolder.add(wave, 'amplitude', -300, 300);
waveFolder.add(wave, 'frequency', -0.01, 1);
waveFolder.open();

const strokeFolder = gui.addFolder('stroke');
strokeFolder.add(strokeColor, 'h', 0, 255);
strokeFolder.add(strokeColor, 's', 0, 100);
strokeFolder.add(strokeColor, 'l', 0, 100);
strokeFolder.open();

const backgroundFolder = gui.addFolder('background');
backgroundFolder.add(backgroundColor, 'r', 0, 255);
backgroundFolder.add(backgroundColor, 'g', 0, 255);
backgroundFolder.add(backgroundColor, 'b', 0, 255);
backgroundFolder.add(backgroundColor, 'a', 0, 1);
backgroundFolder.open();

let increment = wave.frequency;
function animate(){
  requestAnimationFrame(animate);
  c.fillStyle = `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b},  ${backgroundColor.a})`;
  c.fillRect(0, 0, canvas.width, canvas.height);
  
  c.beginPath();
  c.moveTo(0, canvas.height / 2);
  
  for(let i = 0; i < canvas.width; i++){
    c.lineTo(i, wave.y + Math.sin(i * wave.length + increment) * wave.amplitude * Math.sin(increment));
  }
  
  c.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(increment))}, ${strokeColor.s}%, ${strokeColor.l}%)`;
  c.stroke();
  increment += wave.frequency;
}

animate();

// const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// // Event Listeners
// addEventListener('mousemove', (event) => {
//   mouse.x = event.clientX
//   mouse.y = event.clientY
// })

// addEventListener('resize', () => {
//   canvas.width = innerWidth
//   canvas.height = innerHeight

//   init()
// })

// // Objects
// class Object {
//   constructor(x, y, radius, color) {
//     this.x = x
//     this.y = y
//     this.radius = radius
//     this.color = color
//   }

//   draw() {
//     c.beginPath()
//     c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
//     c.fillStyle = this.color
//     c.fill()
//     c.closePath()
//   }

//   update() {
//     this.draw()
//   }
// }

// // Implementation
// let objects
// function init() {
//   objects = []

//   for (let i = 0; i < 400; i++) {
//     // objects.push()
//   }
// }

// // Animation Loop
// function animate() {
//   requestAnimationFrame(animate)
//   c.clearRect(0, 0, canvas.width, canvas.height)

//   c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
//   // objects.forEach(object => {
//   //  object.update()
//   // })
// }

// init()
// animate()
