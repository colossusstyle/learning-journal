const postGrid = document.getElementById('posts-grid');

function renderPosts(posts, container) {
        container.innerHTML = posts.map(post => `
            <article class="post-card">
                <img src="${post.image}" alt="${post.title}" />
                <h4>${post.date}</h4>
                <h2><a href="${post.slug}" class="card-link">${post.title}</a></h2>
                <p>${post.blurb}</p>
            </article>
            `).join('');
        
}

fetch('./blog-posts.json')
  .then(response => response.json())
  .then(blogPosts => renderPosts(blogPosts, postGrid))
  .catch(error => console.error('Unable to load blog posts:', error));