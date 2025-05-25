let stories = [];
let currentIndex = 0;
let timer = null;

const storyListEl = document.getElementById('storyList');
const viewerEl = document.getElementById('storyViewer');
const storyImageEl = document.getElementById('storyImage');
const prevZone = document.getElementById('prevStory');
const nextZone = document.getElementById('nextStory');

fetch('stories.json')
  .then(res => res.json())
  .then(data => {
    stories = data;
    renderStoryThumbnails();
  });

function renderStoryThumbnails() {
  stories.forEach((story, index) => {
    const img = document.createElement('img');
    img.src = story.imageUrl;
    img.className = 'story-thumbnail';
    img.onclick = () => openStory(index);
    storyListEl.appendChild(img);
  });
}

function openStory(index) {
  currentIndex = index;
  viewerEl.style.display = 'flex';
  showStory();
}

function showStory() {
  clearTimeout(timer);
  const story = stories[currentIndex];
  storyImageEl.style.opacity = 0;
  setTimeout(() => {
    storyImageEl.src = story.imageUrl;
    storyImageEl.onload = () => storyImageEl.style.opacity = 1;
  }, 200);
  timer = setTimeout(nextStory, 5000);
}

function nextStory() {
  if (currentIndex < stories.length - 1) {
    currentIndex++;
    showStory();
  } else {
    closeViewer();
  }
}

function prevStory() {
  if (currentIndex > 0) {
    currentIndex--;
    showStory();
  }
}

function closeViewer() {
  viewerEl.style.display = 'none';
  clearTimeout(timer);
}

// Navigation controls
nextZone.addEventListener('click', nextStory);
prevZone.addEventListener('click', prevStory);
