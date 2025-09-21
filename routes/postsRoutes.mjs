import express from "express";
import Post from "../models/postSchema.mjs";
import { posts } from "../data/data.mjs";

const router = express.Router();



router.get("/seed", async (req, res) => {
  try {
    await Post.deleteMany({}); // Optional just to clear out database before reloading new data

    await Post.insertMany(posts);

    res.send("Data Successfully seeded");
  } catch (err) {
    console.error(err.msg);
  }
});


router.route("/")
.post(async(req,res)=>{
    try{

            const { author, title, content } = req.body;
        
        // Validate required fields
        if (!author || !title || !content) {
            return res.status(400).render("index", {
                title: "MiniBlog - Error",
                content: "❌ Error - All fields (author, title, content) are required",
               });
        }

        // Check if post with identical title already exists
        const existingPost = await Post.findOne({ title: title });
        if (existingPost) {
            return res.status(400).render("index", {
                title: "MiniBlog - Error",
                content: "🩻 Error - Post title already exists",
            });
        }

        //Action
        let newPost = await Post.create({
            author: author,
            title: title,
            content: content,
            createdAt_: new Date(),
            comments: []
        });
        //------------Return----------
        console.log("New Post-created:",newPost)

        // Get all posts (including the new one) to display
        const allPosts = await Post.find({}).sort({ createdAt: -1 }); // Sort by newest first
        
        // Generate HTML for all posts
        let postsHtml = '';
        allPosts.forEach((post, index) => {
            postsHtml += `
                <article class="post ${post._id.toString() === newPost._id.toString() ? 'new-post' : ''}">
                    <header class="post-header">
                        <h3 class="post-title">
                            <a href="/posts/${post._id}">${post.title}</a>
                        </h3>
                        <div class="post-meta">
                            <span class="author">By <a href="/users/${post.author || 'anonymous'}">${post.author || 'Anonymous'}</a></span>
                            <span class="date">${post.createdAt ? new Date(post.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}</span>
                            <span class="comments-count">${post.comments?.length || 0} comments</span>
                        </div>
                    </header>
                    <div class="post-excerpt">
                        <p>${post.content}</p>
                    </div>
                    <footer class="post-footer">
                        <div class="post-actions">
                            <a href="/posts/${post._id}/edit" class="btn-small btn-edit">Edit</a>
                            <button type="button" class="btn-small btn-delete" onclick="deletePost('${post._id}')">Delete</button>
                        </div>
                    </footer>
                </article>
            `;
        });
        
        // Render the page with updated posts
        const options = {
            title: "MiniBlog - Latest Posts",
            content: "✅ Post created successfully! Welcome to our minimalist blog",
            postsHtml: postsHtml
        };
        
        res.render("index", options);
        //Return
        // res.json(newPost);
    }catch(err){
        console.log(err.message);
        res.status(500).json({msg:`❌ Error - ${err.message}`});
    }
})

.get(async (req, res) => {
    try {
        // Get all posts from MongoDB
        let getAllPosts = await Post.find({});
        
        // Generate HTML for all posts
        let postsHtml = '';
        getAllPosts.forEach((post, index) => {
            postsHtml += `
                <article class="post">
                    <header class="post-header">
                        <h3 class="post-title">
                            <a href="/posts/${post._id || post.id || index + 1}">${post.title}</a>
                        </h3>
                        <div class="post-meta">
                            <span class="author">By <a href="/users/${post.author || 'anonymous'}">${post.author || 'Anonymous'}</a></span>
                            <span class="date">${post.createdAt ? new Date(post.createdAt).toLocaleDateString() :post.date}</span>
                            <span class="comments-count">${post.comments?.length || 0} comments</span>
                        </div>
                    </header>
                    <div class="post-excerpt">
                        <p>${post.content}</p>
                    </div>
                    <footer class="post-footer">
                        <div class="post-actions">
                            <a href="/posts/${post._id || post.id || index + 1}/edit" class="btn-small btn-edit">Edit</a>
                            <button type="button" class="btn-small btn-delete" onclick="deletePost('${post._id || post.id || index + 1}')">Delete</button>
                        </div>
                    </footer>
                </article>
            `;
        });

        // Prepare options for template rendering
        const options = {
            title: "MiniBlog - Latest Posts",
            content: "Welcome to our minimalist blog",
            postsHtml: postsHtml
        };

        // Send HTML response
        res.render("index", options);

    } catch (err) {
        console.error(err.message);
        res.status(500).render("error", {
            title: "Error",
            content: `❌ Error - ${err.message}`
        });
    }
});






// / Helper function to generate posts HTML (reusable)
// async function generatePostsHtml() {
//     try {
//         const posts = await Post.find({}).sort({ createdAt: -1 });
//         let postsHtml = '';
        
//         posts.forEach((post) => {
//             postsHtml += `
//                 <article class="post">
//                     <header class="post-header">
//                         <h3 class="post-title">
//                             <a href="/posts/${post._id}">${post.title}</a>
//                         </h3>
//                         <div class="post-meta">
//                             <span class="author">By <a href="/users/${post.username || 'anonymous'}">${post.username || 'Anonymous'}</a></span>
//                             <span class="date">${post.createdAt ? new Date(post.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}</span>
//                             <span class="comments-count">${post.comments || 0} comments</span>
//                         </div>
//                     </header>
//                     <div class="post-excerpt">
//                         <p>${post.content}</p>
//                     </div>
//                     <footer class="post-footer">
//                         <div class="post-actions">
//                             <a href="/posts/${post._id}/edit" class="btn-small btn-edit">Edit</a>
//                             <button type="button" class="btn-small btn-delete" onclick="deletePost('${post._id}')">Delete</button>
//                         </div>
//                     </footer>
//                 </article>
//             `;
//         });
        
//         return postsHtml;
//     } catch (err) {
//         console.error("Error generating posts HTML:", err);
//         return '<p>Error loading posts</p>';
//     }
// }

export default router;