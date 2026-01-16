// Function to fetch data
async function fetchJson(url) {
    try {
        const resp = await fetch(url);
        if (!resp.ok) {
            throw new Error(resp.status)
        }
        const data = await resp.json();
        return data;

    } catch (err) {
        console.log(err.message)
        return null;
    }
}

// ---------------- Calculating Posts per User ----------------
async function postsPerUser() {
    const users = await fetchJson('https://jsonplaceholder.typicode.com/users')
    const posts = await fetchJson('https://jsonplaceholder.typicode.com/posts')
    try {
        // Counting Posts according to user id
        const postsCount = {};
        posts.forEach(post => {
            if (postsCount[post.userId]) {
                postsCount[post.userId] += 1
            } else {
                postsCount[post.userId] = 1
            }
        });
        // Create an Array of objects that contain username and post counts
        const usersPosts = [];
        users.forEach(user => {
            usersPosts.push({ 'user': user.name, 'posts': postsCount[user.id] });
        })
        // Sorting 
        const sortedUsersPosts = usersPosts.sort((a, b) => b.posts - a.posts)
        return sortedUsersPosts
    } catch (err) {
        console.log(err.message)

    }

}

// ---------------- Top posts by comments ----------------
async function topPostsByComments(n) {
    const posts = await fetchJson('https://jsonplaceholder.typicode.com/posts')
    const comments = await fetchJson('https://jsonplaceholder.typicode.com/comments')
    try {
        // Counting Comments according to Posts
        const commentCounts = {};
        comments.forEach(comment => {
            if (commentCounts[comment.postId]) {
                commentCounts[comment.postId] += 1
            } else {
                commentCounts[comment.postId] = 1
            }
        })
        // Create an Array of objects that contain Posts and Comment counts
        const postComments = []
        posts.forEach(post => {
            postComments.push({ 'postId': post.id, 'title': post.title, 'comments': commentCounts[post.id] })
        })
        // Sort array
        const sortedpostComments = postComments.sort((a, b) => b.comments - a.comments)
        // Top n
        return sortedpostComments.slice(0, n);
    } catch (err) {
        console.log(err.message)

    }
}

// // ---------------- User Engagements ----------------

async function userEngagementSummary() {
    const users = await fetchJson('https://jsonplaceholder.typicode.com/users')
    const posts = await fetchJson('https://jsonplaceholder.typicode.com/posts')
    const comments = await fetchJson('https://jsonplaceholder.typicode.com/comments')

    try {
        // Counting how many post associates with a specific user
        const postsCount = {};
        posts.forEach(post => {
            if (postsCount[post.userId]) {
                postsCount[post.userId] += 1
            } else {
                postsCount[post.userId] = 1
            }
        });
        // Counting how many Comments associates with a specific Post
        const commentCounts = {};
        comments.forEach(comment => {
            if (commentCounts[comment.postId]) {
                commentCounts[comment.postId] += 1
            } else {
                commentCounts[comment.postId] = 1
            }
        })
        // Counting Total Comments On The Specific User Posts 
        const commentsOnUserPost = {}
        posts.forEach(post => {
            let count = commentCounts[post.id] ? commentCounts[post.id] : 0;
            if (!commentsOnUserPost[post.userId]) {
                commentsOnUserPost[post.userId] = count;
            } else {
                commentsOnUserPost[post.userId] = commentsOnUserPost[post.userId] + count;
            }
        })
        // Summary
        const userSummary = []
        users.forEach(user => {
            userSummary.push({ 'user': user.name, 'posts': postsCount[user.id], 'totalComments': commentsOnUserPost[user.id] })
        })

        // Sorting by No. of Comments
        const sortedUserSummary = userSummary.sort((a, b) => b.totalComments - a.totalComments)
        return sortedUserSummary;

    } catch (err) {
        console.log(err.message)
        return null
    }
}


// Testing the Functions
console.log("Post per Users")
console.log(await postsPerUser())

console.log("Top 5 posts by comments")
console.log(await topPostsByComments(5))

console.log("User engagement summary")
console.log(await userEngagementSummary())