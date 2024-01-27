// Fetch Dragon Ball Z data from the JSON server
// The variables store the URLs and comments data on the JSON server
const API_URL = 'http://localhost:3000/dragonBallZ'; // Replace with your JSON Server URL
const COMMENTS_API_URL = 'http://localhost:3000/comments';

// Global comments array
let comments = [];

// Fetch data from the JSON server using the API
async function fetchData(url, displayFunction) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayFunction(data);
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
  }
}

// Function to display Dragon Ball Z content
function displayDragonBallZContent(data) {
  const dragonBallZSection = document.getElementById('dragonBallZSection');

  // Display data in this section, manipulate the data 
  data.characters.forEach(character => {
    // Create a span element for each character name
    const characterElement = document.createElement('span');
    characterElement.textContent = character.name;

    // Create an image element for each character
    const characterImage = document.createElement('img');
    characterImage.src = character.imageURL;
    characterImage.alt = character.name;

    // Add Hover EventListener for the image to change color and add hovering effect
    characterImage.addEventListener('mouseover', () => {
      characterElement.style.color = 'green'; // Change the color
      characterImage.style.transform = 'scale(1.1)'; // Add hovering effect for image 
    });

    // Add mouseout EventListener to revert styles on hoverout
    characterImage.addEventListener('mouseout', () => {
      characterElement.style.color = ''; // Revert color to default
      characterImage.style.transform = ''; // Revert scaling 
    });

    // Append both the character name and image to the section
    dragonBallZSection.appendChild(characterElement);
    dragonBallZSection.appendChild(characterImage);
  });

  // Other content display logic..

  // Add comments section
  const commentsContainer = document.createElement('div');
  commentsContainer.id = 'comments';
  dragonBallZSection.appendChild(commentsContainer);

  // Fetch and display comments
  fetchComments();
}

// Event listener for fetching Dragon Ball Z data on page load
window.addEventListener('load', () => fetchData(API_URL, displayDragonBallZContent));

// Event listener for posting a new comment
document.getElementById('postCommentBtn').addEventListener('click', postComment);

// Function to post a new comment
function postComment() {
  const commentInput = document.getElementById('commentInput');
  const newComment = {
    name: 'Anonymous',
    body: commentInput.value,
  };

  // Add the new comment to the global 'comments' array
  comments.push(newComment);

  // Display the new comment
  displayComments(comments);

  commentInput.value = '';
}

// Function to fetch and display comments
async function fetchComments() {
  try {
    const response = await fetch(COMMENTS_API_URL);
    const commentsData = await response.json();

    // Update the global 'comments' array
    comments = commentsData;

    // Display comments using array iteration (forEach)
    displayComments(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
}

// Function to display comments
function displayComments(comments) {
  const commentsContainer = document.getElementById('comments');
  commentsContainer.innerHTML = '';

  // Store comments using forEach loop
  comments.forEach(comment => {
    const commentElement = document.createElement('div');
    commentElement.innerHTML = `<strong>${comment.name}</strong>: ${comment.body}`;
    commentsContainer.appendChild(commentElement);
  });
}

// Event listener for fetching and displaying comments on page load
window.addEventListener('load', fetchComments);

// Add other event listeners and functions as needed...
