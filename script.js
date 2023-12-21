// Fetch comments data from a JSON server (replace URL with your server)
const COMMENTS_API_URL = 'https://jsonplaceholder.typicode.com/comments';

// fetching comments 
async function fetchComments() {
    try {
        const response = await fetch(COMMENTS_API_URL);
        const commentsData = await response.json();

        // Display comments using array iteration (forEach)
        displayComments(commentsData);
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
}

// Displaying comments using array iteration (forEach)
function displayComments(comments) {
    const commentsContainer = document.getElementById('comments');
    commentsContainer.innerHTML = '';

    // Inserting an image link
    const imageLink = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw90OvcUhwn7fkyi8i1BoVe43xum4mRSQ9SA&usqp=CAU';
    const imageElement = document.createElement('img');
    imageElement.src = imageLink;
    imageElement.alt = 'Vegeta ultra ego';
    commentsContainer.appendChild(imageElement);

    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.innerHTML = `<strong>${comment.name}</strong>: ${comment.body}`;
        commentsContainer.appendChild(commentElement);
    });
}

// Event listener for fetching and displaying comments on page load
window.addEventListener('load', fetchComments);

// Event listener for posting a new comment
document.getElementById('postCommentBtn').addEventListener('click', postComment);

// Posting a new comment
function postComment() {
    const commentInput = document.getElementById('commentInput');
    const newComment = {
        name: 'Anonymous', // In a real application, you'd have user authentication
        body: commentInput.value,
    };

    // Display the new comment
    displayComments([newComment]);

    commentInput.value = '';
}


// Mock data for comments (replace with backend integration)
let commentsData = [
    { username: 'Goku', comment: 'This series is amazing!', timestamp: '2 hours ago' },
    { username: 'Vegeta', comment: 'I am the Prince of all Saiyans!', timestamp: '1 hour ago' }
];


