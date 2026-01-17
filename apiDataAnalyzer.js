// Function to fetch data
async function fetchJson(url) {
    const resp = await fetch(url);
    if (!resp.ok) {
        throw new Error(resp.status + " Error while fetching: " + url)
    }
    return resp.json();
}

// ---------------- Calculating Posts per User ----------------
async function postsPerUser() {
    const usersData = await fetchJson('https://jsonplaceholder.typicode.com/users')
    const postsData = await fetchJson('https://jsonplaceholder.typicode.com/posts')

    const users = Array.isArray(usersData) && usersData.length > 0 ? usersData : [];
    const posts = Array.isArray(postsData) && postsData.length > 0 ? postsData : [];

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
        usersPosts.push({ 'user': user.name, 'posts': postsCount[user.id] ? postsCount[user.id] : 0 });
    })
    // Sorting 
    const sortedUsersPosts = usersPosts.sort((a, b) => b.posts - a.posts)
    return sortedUsersPosts

}

// ---------------- Top posts by comments ----------------
async function topPostsByComments(n) {

    const postsData = await fetchJson('https://jsonplaceholder.typicode.com/posts')
    const commentsData = await fetchJson('https://jsonplaceholder.typicode.com/comments')

    const posts = Array.isArray(postsData) && postsData.length > 0 ? postsData : [];
    const comments = Array.isArray(commentsData) && commentsData.length > 0 ? commentsData : [];

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
        postComments.push({ 'postId': post.id, 'title': post.title, 'comments': commentCounts[post.id] ? commentCounts[post.id] : 0 })
    })
    // Sort array
    const sortedpostComments = postComments.sort((a, b) => b.comments - a.comments)
    // Top n
    return sortedpostComments.slice(0, n);

}

// // ---------------- User Engagements ----------------

async function userEngagementSummary() {
    const usersData = await fetchJson('https://jsonplaceholder.typicode.com/users')
    const postsData = await fetchJson('https://jsonplaceholder.typicode.com/posts')
    const commentsData = await fetchJson('https://jsonplaceholder.typicode.com/comments')

    const users = Array.isArray(usersData) && usersData.length > 0 ? usersData : [];
    const posts = Array.isArray(postsData) && postsData.length > 0 ? postsData : [];
    const comments = Array.isArray(commentsData) && commentsData.length > 0 ? commentsData : [];

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
        userSummary.push({ 'user': user.name, 'posts': postsCount[user.id] ? postsCount[user.id] : 0, 'totalComments': commentsOnUserPost[user.id] ? commentsOnUserPost[user.id] : 0 })
    })

    // Sorting by No. of Comments
    const sortedUserSummary = userSummary.sort((a, b) => b.totalComments - a.totalComments)
    return sortedUserSummary;
}


// Testing the Functions
console.log("Post per Users")
try {
    const result = await postsPerUser();
    console.log(result);
} catch (err) {
    console.log(err)
}

console.log("Top 5 posts by comments")
try {
    const result = await topPostsByComments(5);
    console.log(result);
} catch (err) {
    console.log(err.message)
}

console.log("User engagement summary")
try {
    const result = await userEngagementSummary(5);
    console.log(result);
} catch (err) {
    console.log(err.message)
}