const playArea = document.getElementById('playAreaDiv');
const div = document.getElementById('movableDiv');
const target = document.getElementById('targetDiv');
const successText = document.getElementById('successDiv');

// Random initial position and size
const randomSizeDiv = Math.floor(Math.random() * 71) + 10; // Random between 10 and 80
div.style.width = randomSizeDiv + 'px';
div.style.height = randomSizeDiv + 'px';
target.style.width = randomSizeDiv + 'px';
target.style.height = randomSizeDiv + 'px';

// Set initial position within playArea bounds
const playAreaRect = playArea.getBoundingClientRect();
div.style.left = Math.floor(Math.random() * (playAreaRect.width - randomSizeDiv)) + 'px';
div.style.top = Math.floor(Math.random() * (playAreaRect.height - randomSizeDiv)) + 'px';

// Center target in playArea
target.style.left = (playAreaRect.width / 2 - randomSizeDiv / 2) + 'px';
target.style.top = (playAreaRect.height / 2 - randomSizeDiv / 2) + 'px';

function moveDiv() {
    const x = parseInt(document.getElementById('xPos').value);
    const y = parseInt(document.getElementById('yPos').value);

    // Constrain movement within playArea bounds
    const maxX = playAreaRect.width - randomSizeDiv;
    const maxY = playAreaRect.height - randomSizeDiv;

    const constrainedX = Math.max(0, Math.min(x, maxX));
    const constrainedY = Math.max(0, Math.min(y, maxY));

    // Update div position
    div.style.left = constrainedX + 'px';
    div.style.top = constrainedY + 'px';

    // Get actual numeric positions (remove 'px' and convert to number)
    const divRect = div.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    // Increase tolerance to 10 pixels
    const tolerance = 10;

    // Check if centers are close enough
    const xDiff = Math.abs((divRect.left + divRect.width/2) - (targetRect.left + targetRect.width/2));
    const yDiff = Math.abs((divRect.top + divRect.height/2) - (targetRect.top + targetRect.height/2));

    if (xDiff <= tolerance && yDiff <= tolerance) {
        successText.style.display = 'block';
        setTimeout(() => {
            location.reload();
        }, 3000);
    } else {
        successText.style.display = 'none';
    }
}