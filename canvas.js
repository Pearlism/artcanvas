const canvas = document.getElementById('artCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size dynamically based on the window size
function resizeCanvas() {
    canvas.width = window.innerWidth * 0.9; // 90% of viewport width
    canvas.height = window.innerHeight * 0.8; // 80% of viewport height
}

resizeCanvas();

// Redraw canvas on resize to prevent distortion
window.addEventListener('resize', resizeCanvas);

let painting = false;
let color = document.getElementById('colorPicker').value;
let brushSize = document.getElementById('brushSize').value;
let eraseMode = false;

// Correctly calculate the mouse position relative to the canvas
function getMousePosition(event) {
    const rect = canvas.getBoundingClientRect(); // Get canvas position and size
    const scaleX = canvas.width / rect.width;   // Horizontal scaling factor
    const scaleY = canvas.height / rect.height; // Vertical scaling factor

    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY,
    };
}

function startPosition(event) {
    painting = true;
    draw(event); // Start drawing immediately
}

function endPosition() {
    painting = false;
    ctx.beginPath(); // Reset the path to avoid unwanted lines
}

function draw(event) {
    if (!painting) return;

    const { x, y } = getMousePosition(event); // Correctly calculate mouse position
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = eraseMode ? 'black' : color;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Event listeners for drawing
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

// Update brush color
document.getElementById('colorPicker').addEventListener('input', (event) => {
    color = event.target.value;
    eraseMode = false; // Disable erase mode when a color is selected
});

// Update brush size
document.getElementById('brushSize').addEventListener('input', (event) => {
    brushSize = event.target.value;
});

// Enable erase mode
document.getElementById('eraseButton').addEventListener('click', () => {
    eraseMode = true;
});

// Clear the canvas
document.getElementById('clearButton').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById("saveButton").addEventListener("click", function() {
    var artCanvas = document.getElementById("artCanvas");
    var imageUrl = artCanvas.toDataURL("image/png");  // Get the image data URL
    var link = document.createElement("a");  // Create a link element
    link.href = imageUrl;  // Set the link href to the data URL
    link.download = "canvas-drawing.png";  // Set the default download filename
    link.click();  // Trigger the download by simulating a click on the link
});

