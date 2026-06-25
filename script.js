let posts = JSON.parse(localStorage.getItem("posts")) || [];

// ADD POST
function addPost() {
  let title = document.getElementById("title").value;
  let content = document.getElementById("content").value;

  if (!title || !content) {
    alert("Fill all fields");
    return;
  }

  let post = {
    id: Date.now(),
    title,
    content,
    comments: []
  };

  posts.push(post);
  localStorage.setItem("posts", JSON.stringify(posts));

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";

  displayPosts();
}

// DISPLAY POSTS
function displayPosts() {
  let html = "";

  posts.forEach(post => {
    html += `
      <div class="post">
        <h3>${post.title}</h3>
        <p>${post.content}</p>

        <h4>Comments</h4>
        <div>
          ${post.comments.map(c => `<div class="comment">${c}</div>`).join("")}
        </div>

        <input id="c-${post.id}" placeholder="Add comment">
        <button onclick="addComment(${post.id})">Comment</button>
      </div>
    `;
  });

  document.getElementById("posts").innerHTML = html;
}

// ADD COMMENT
function addComment(id) {
  let input = document.getElementById("c-" + id);
  let text = input.value;

  if (!text) return;

  posts = posts.map(post => {
    if (post.id === id) {
      post.comments.push(text);
    }
    return post;
  });

  localStorage.setItem("posts", JSON.stringify(posts));
  displayPosts();
}

displayPosts();