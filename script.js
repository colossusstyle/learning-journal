fetch('blog-posts.json')
    .then(res => res.json())
    .then(posts => {
        const grid = document.getElementById('posts-grid');
        const postContainer = document.getElementById('post');
        const heroImg = document.getElementById('hero-img');
        const recentPosts = document.getElementById('recent-posts');

        // index.html: show a card for every post
        if (heroImg && posts.length > 0) {
            const post = posts[0];

            heroImg.innerHTML = `
                <div class="hero-img" style="background-color: #000000; background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${post.image}');">
                    <div class="hero-img-inner">
                    <time datetime="${post.date}">${post.date}</time>
                    <h1><a href="post.html?id=${post.id || 0}" class="card-link">${post.title}</a></h1>
                    <p>${post.blurb}</p>
                    </div>
                </div>
            `;
        }

        //main page article grid
        if (grid) {
            grid.innerHTML = posts.slice(1).map((post, index) => {
                const postId = index + 1;

                return `
                    <article class="post-card">
                        <img src="${post.image}" alt="" />
                        <time datetime="${post.date}">${post.date}</time>
                        <h1><a href="post.html?id=${postId}" class="card-link">${post.title}</a></h1>
                        <p>${post.blurb}</p>
                    </article>
                `;
            }).join('');
        }

        // recent post feed on post.html
        if (recentPosts) {
            recentPosts.innerHTML = posts.slice(0, 3).map((post, index) => `
            <div class="recent-feed-post">
                <li>
                    <article class="recent-feed-post-card">
                        <img src="${post.image}" alt="" />
                        <time datetime="${post.date}">${post.date}</time>
                        <h1><a href="post.html?id=${index}" class="card-link">${post.title}</a></h1>
                        <p>${post.blurb}</p>
                    </article>
                </li>
            </div>
            `).join('');
        }

        // post.html: show the post whose number is in the URL
        if (postContainer) {
            const post = posts[new URLSearchParams(location.search).get('id')];

            if (!post) {
                postContainer.innerHTML = '<p>Post not found. <a href="index.html">Back to all posts</a></p>';
                return;
            }

            document.title = post.title;
            postContainer.innerHTML = `
                <article class="blog-container">
                    <div class="pre-img-header">
                        <time datetime="${post.date}">${post.date}</time>
                        <h1>${post.title}</h1>
                        <p>${post.blurb}</p>
                    </div>
                    <img src="${post.image}" alt="${post.imageAlt}" />
                    <div class="post-img-header">
                        ${post.content}
                    </div>
                </article>
            `;
        }
    })
    .catch(error => console.error('Could not load blog-posts.json:', error));