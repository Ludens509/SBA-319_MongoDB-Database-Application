
import express from "express";
import Post from "../models/postSchema.mjs";

const router = express.Router();

router.route("/posts/:id/edit")

    .get(async (req, res) => {

        try {

            let allPosts = await Post.findById(req.params.id);
            if (!allPosts) {
                console.log("Post not found, sending 404");
                return res.status(404).send(`
            <h1>Error 404</h1>
            <p>Post not found</p>
            <a href="/posts">Back to Posts</a>
        `);
            }

            const options = {
                title: `Edit: ${allPosts.title}`,
                post: allPosts,
                postId: allPosts._id,
                author: allPosts.author,
                postTitle: allPosts.title,
                postContent: allPosts.content,
            };

            console.log("Rendering edit form with options:", options);
            res.render("edit", options);

        } catch (err) {
            console.log(err.message);
            res.status(500).json({ msg: `Error - ${err.message}` });
        }
    })

    .put(async (req, res) => {
        try {
            const postId = req.params.id;
            const { author, title, content } = req.body;

            // Validate required fields
            if (!author || !title || !content) {
                return res.status(400).render("index", {
                    title: "MiniBlog - Error",
                    content: "❌ Error - All fields (author, title, content) are required",
                });
            }
            // Check if another post has the same title (excluding current post)
            const existingPost = await Post.findOne({
                title: title,
                _id: { $ne: postId }
            });

            if (existingPost) {
                return res.status(400).json({
                    success: false,
                    message: "A post with this title already exists"
                });
            }

            let updatedPost = await Post.findByIdAndUpdate(
                postId, {
                    
                title: title,
                content: content,
                author: author,
            },
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!updatedPost) {
                return res.status(404).json({
                    success: false,
                    message: "Post not found"
                });
            }

            //redirect to posts page
            res.redirect("/posts");

        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: `❌ Error - ${err.message}` });
        }
    })

export default router;