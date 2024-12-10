// Define the base path for WebP images
const basePath = 'Webp/';

// Array of WebP image filenames
const webpFiles = [
    '0.webp',
    '000011 copy.webp',
    '000018 copy.webp',
    '000020 copy.webp',
    '000032 copy.webp',
    '001.webp',
    '002.webp',
    '003.webp',
    '004.webp',
    '005.webp',
    '1 (2).webp',
    '1.webp',
    '2.webp',
    '2023-11-20_173527.webp',
    '2023-11-20_174905 (2).webp',
    '2023-11-20_180653 (2).webp',
    '3.webp',
    '6.webp',
    '7.webp',
    '7_Friendly Demon.webp',
    '80_1.webp',
    '80_2.webp',
    '80_3.webp',
    'A5.webp',
    'BNOCS copy.webp',
    'Castle_v008.webp',
    'Castle_v011 copy.webp',
    'Cloud Dragon.webp',
    'Croxibition.webp',
    'Daniel_Pianiel.webp',
    'DarkmagicAuraCore.webp',
    'DeadDuck.webp',
    'Deorsus.webp',
    'DoBe2.webp',
    'DoBe3.webp',
    'Document_2023-11-20_180525.webp',
    'E001-1.webp',
    'E001-2.webp',
    'E001.webp',
    'E002.webp',
    'E003.webp',
    'Eggy Lads.webp',
    'Final_Day.webp',
    'Final_Night.webp',
    'FireGroup_2.webp',
    'Frame 1.webp',
    'Frame 2.webp',
    'Frame 7.webp',
    'Gronklet copy.webp',
    'Group 105.webp',
    'Group 106.webp',
    'Group 107.webp',
    'Group 24.webp',
    'Hair Party.webp',
    'Handwritten_2023-11-20_173755 (3).webp',
    'Handwritten_2023-11-20_180447 (10).webp',
    'Handwritten_2023-11-20_180744 (12).webp',
    'Huggins-1 copy.webp',
    'ISO_7010_W024 1.webp',
    'ITUNES2.webp',
    'Insta1.webp',
    'Insta2.webp',
    'Insta2a.webp',
    'Insta3.webp',
    'Logos.webp',
    'Magnet&Star.webp',
    'NOTO copy2.webp',
    'NR-Skratch.webp',
    'Nathans Room Hero copy.webp',
    'Newtenoged2.webp',
    'Peeps.webp',
    'PhyllotaxisGalaxis.webp',
    'Shirt Popup.webp',
    'Sklob_The Great copy 2.webp',
    'Starjump pillars 4.webp',
    'Stellus Heretica.webp',
    'The Nighthelmets.webp',
    'The angel ball.webp',
    'glassboi_LightLines.webp',
    'nate_2.webp',
    'noto2 copy.webp',
    'untitled.webp',
    'yeahyougotthatYUMMI.webp'
];

// Generate full paths for each WebP image
const fullPathWebpFiles = webpFiles.map(file => basePath + encodeURIComponent(file));

// Counter to keep track of z-index for bringing images to the front
let zIndexCounter = 1;

// Function to create a draggable image container
function createDraggableImage(src) {
    const container = document.createElement('div');
    container.className = 'image-container';

    const img = document.createElement('img');
    img.src = src; // Set the image source
    img.ondragstart = () => false; // Disable default drag behavior

    // Randomize the initial position and size of the container
    const test = 150;
    container.style.left = `${Math.random() * (window.innerWidth - test)}px`;
    container.style.top = `${Math.random() * (window.innerHeight - test)}px`;
    container.style.width = `${(test)}px`;
    container.style.zIndex = zIndexCounter++; // Assign a unique z-index

    // Attach the dragging behavior
    container.addEventListener('mousedown', startDrag);

    // Append the image to the container and the container to the document
    container.appendChild(img);
    document.body.appendChild(container);
}

// Function to load images sequentially with a delay
function loadImagesSequentially() {
    let index = 0; // Start with the first image

    // Interval function to load images one by one
    const interval = setInterval(() => {
        if (index < fullPathWebpFiles.length) {
            createDraggableImage(fullPathWebpFiles[index]);
            index++; // Move to the next image
        } else {
            clearInterval(interval); // Stop when all images are loaded
        }
    }, 30); // Adjust interval time (in milliseconds) for pacing
}

// Function to handle dragging of an image container
function startDrag(e) {
    const container = e.currentTarget;

    // Bring the clicked container to the front
    container.style.zIndex = zIndexCounter++;

    // Prevent dragging when resizing the container
    if (e.target.tagName === 'IMG') {
        const initialX = e.clientX - container.getBoundingClientRect().left;
        const initialY = e.clientY - container.getBoundingClientRect().top;

        // Function to move the container while dragging
        const moveAt = (e) => {
            container.style.left = `${e.clientX - initialX}px`;
            container.style.top = `${e.clientY - initialY}px`;
        };

        // Stop dragging when the mouse is released
        const onMouseUp = () => {
            document.removeEventListener('mousemove', moveAt);
            document.removeEventListener('mouseup', onMouseUp);
        };

        // Attach mousemove and mouseup listeners
        document.addEventListener('mousemove', moveAt);
        document.addEventListener('mouseup', onMouseUp);
    }
}

// Load images when the page is fully loaded
window.onload = loadImagesSequentially;