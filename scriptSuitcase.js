const playArea = document.getElementById('playAreaSuit');
const div = document.getElementById('movableSuit');
const target = document.getElementById('targetSuit');
const successOverlay = document.getElementById('successSuit');
const claimPrizeButton = document.getElementById('claimPrizeButton');
const prizeVideo = document.getElementById('prizeVideo');

// Random initial position and size
const randomSizeSuit = Math.floor(Math.random() * 61) + 30; // Between 30 and 90px
div.style.width = randomSizeSuit + 'px';
div.style.height = randomSizeSuit + 'px';
target.style.width = randomSizeSuit + 'px';
target.style.height = randomSizeSuit + 'px';

// Set initial position within playArea bounds
const playAreaRect = playArea.getBoundingClientRect();
div.style.left = Math.floor(Math.random() * (playAreaRect.width - randomSizeSuit)) + 'px';
div.style.top = Math.floor(Math.random() * (playAreaRect.height - randomSizeSuit)) + 'px';

// Center target in playArea
target.style.left = (playAreaRect.width / 2 - randomSizeSuit / 2) + 'px';
target.style.top = (playAreaRect.height / 2 - randomSizeSuit / 2) + 'px';

function moveDiv() {
    const x = parseInt(document.getElementById('xPosSuit').value);
    const y = parseInt(document.getElementById('yPosSuit').value);

    // Constrain movement within playArea bounds
    const maxX = playAreaRect.width - randomSizeSuit;
    const maxY = playAreaRect.height - randomSizeSuit;

    const constrainedXSuit = Math.max(0, Math.min(x, maxX));
    const constrainedYSuit = Math.max(0, Math.min(y, maxY));

    // Update div position
    div.style.left = constrainedXSuit + 'px';
    div.style.top = constrainedYSuit + 'px';

    // Check for success
    const divRectSuit = div.getBoundingClientRect();
    const targetRectSuit = target.getBoundingClientRect();

    const tolerance = 10; // Tolerance in pixels
    const xDiff = Math.abs((divRectSuit.left + divRectSuit.width / 2) - (targetRectSuit.left + targetRectSuit.width / 2));
    const yDiff = Math.abs((divRectSuit.top + divRectSuit.height / 2) - (targetRectSuit.top + targetRectSuit.height / 2));

    if (xDiff <= tolerance && yDiff <= tolerance) {
        successOverlay.style.display = 'flex';
    }
}

function claimPrize() {
    claimPrizeButton.style.display = 'none'; // Hide button
    prizeVideo.style.display = 'block'; // Show video
    prizeVideo.muted = false; // Unmute video
    prizeVideo.play(); // Play video once
}

prizeVideo.addEventListener('ended', () => {
    location.reload(); // Refresh the page
});