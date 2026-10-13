fetch('blog-posts.json')
    .then(res => res.json())
    .then(posts => {
        const grid = document.getElementById('posts-grid');
        const postContainer = document.getElementById('post');
        const heroImg = document.getElementById('hero-img')

        // index.html: show a card for every post
        if (heroImg && posts.length > 0) {
            const post = posts[0];

            heroImg.style.backgroundImage = `url("${post.image}")`;
            heroImg.innerHTML = `
                <time datetime="${post.date}">${post.date}</time>
                <h2><a href="post.html?id=0" class="card-link">${post.title}</a></h2>
                <p>${post.blurb}</p>
            `;
        }

        if (grid) {
            grid.innerHTML = posts.slice(1).map((post, index) => {
                const postId = index + 1;

                return `
                    <article class="post-card">
                        <img src="${post.image}" alt="" />
                        <time datetime="${post.date}">${post.date}</time>
                        <h2><a href="post.html?id=${postId}" class="card-link">${post.title}</a></h2>
                        <p>${post.blurb}</p>
                    </article>
                `;
            }).join('');
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