const SEGMENT_COUNT = 20;
const SEGMENT_SIZE = 20;
const SPEED = 0.2;

const container = document.getElementById('snake-container');
const segments = [];
let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

// Create snake segments
for (let i = 0; i < SEGMENT_COUNT; i++) {
  let seg;
  if (i === 0) {
    // Head with face
    seg = document.createElement('div');
    seg.className = 'snake-segment snake-head';

    // Eyes
    const eyeLeft = document.createElement('div');
    eyeLeft.className = 'snake-eye left';
    seg.appendChild(eyeLeft);

    const eyeRight = document.createElement('div');
    eyeRight.className = 'snake-eye right';
    seg.appendChild(eyeRight);

    // Mouth
    const mouth = document.createElement('div');
    mouth.className = 'snake-mouth';
    seg.appendChild(mouth);
  } else if (i === SEGMENT_COUNT - 1) {
    // Tail
    seg = document.createElement('div');
    seg.className = 'snake-segment snake-tail';
  } else {
    // Body
    seg = document.createElement('div');
    seg.className = 'snake-segment';
  }
  container.appendChild(seg);
  segments.push({ el: seg, x: mouse.x, y: mouse.y });
}

// Track mouse
window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animate() {
  // Move head towards mouse
  segments[0].x += (mouse.x - segments[0].x) * SPEED;
  segments[0].y += (mouse.y - segments[0].y) * SPEED;

  // Each segment follows the previous one
  for (let i = 1; i < segments.length; i++) {
    segments[i].x += (segments[i-1].x - segments[i].x) * SPEED;
    segments[i].y += (segments[i-1].y - segments[i].y) * SPEED;
  }

  // Render
  for (let i = 0; i < segments.length; i++) {
    segments[i].el.style.transform = `translate(${segments[i].x - SEGMENT_SIZE/2}px, ${segments[i].y - SEGMENT_SIZE/2}px)`;
  }

  requestAnimationFrame(animate);
}

animate(); 