import express from "express";
import Comment from "../models/commentSchema.mjs";

import { comments } from "../data/data.mjs";

const router = express.Router();



router.get("/seed", async (req, res) => {
  try {
    await Comment.deleteMany({}); // Optional just to clear out database before reloading new data

    await Comment.insertMany(comments);

    res.send("Data Successfully seeded");
  } catch (err) {
    console.error(err.msg);
  }
});

router.route("/")
.post( async(req,res)=>{
   try {
    //Action
     let newComment = await Comment.create(req.body);
     //Return
     res.json(newComment);
   } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: `❌ Error - ${err.message} `});
   }
})

router.get("/", async (req, res) => {
    try {
        // Get all comments and populate the post data
        let getAllComments = await Comment.find({})
            .populate('post', 'title _id') // Populate post title and id
            .sort({ createdAt: -1 });

        // If you have a User collection, get all users for author lookup
        let allUsers = [];
        try {
            allUsers = await User.find({}, 'name username email');
        } catch (err) {
            console.log("User collection not available, using author strings");
        }
        
        // Create user lookup map
        const userMap = new Map();
        allUsers.forEach(user => {
            userMap.set(user.username, user);
            userMap.set(user.name, user);
        });

        // Generate HTML for all comments
        let commentsHtml = '';
        getAllComments.forEach((comment) => {
            // Try to find user data for the author
            const user = userMap.get(comment.author);
            const authorName = user?.name || user?.username || comment.author || 'Anonymous';
            const authorLink = user?._id ? `/users/${user._id}` : '#';
            
            commentsHtml += `
                <div class="comment">
                    <div class="comment-header">
                        <div class="comment-meta">
                            <span class="comment-author">
                                <a href="${authorLink}">${authorName}</a>
                            </span>
                            <span class="comment-date">${comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}</span>
                            ${comment.post ? `<span class="comment-post">on "<a href="/posts/${comment.post._id}">${comment.post.title}</a>"</span>` : ''}
                        </div>
                    </div>
                    <div class="comment-content">
                        <p>${comment.content}</p>
                    </div>
                    <div class="comment-actions">
                        <button type="button" class="btn-small btn-delete" onclick="deleteComment('${comment._id}')">Delete</button>
                    </div>
                </div>
            `;
        });

        const options = {
            title: "MiniBlog - All Comments",
            content: `Total comments: ${getAllComments.length}`,
            commentsHtml: commentsHtml
        };

        res.render("comment", options);
        
    } catch (err) {
        console.error("Error fetching comments:", err.message);
        res.status(500).render("error", {
            title: "Error",
            content: `❌ Error - ${err.message}`
        });
    }
});

// .get(async(req,res)=>{
//     try {
//         //Action
//         let getAllComments = await Comment.find({});
//         //Return
//          // Generate HTML for all comments
//         let commentsHtml = '';
//         getAllComments.forEach((comment) => {
//             const user = users.find((user) => user.id == comment.userId);

//             // const usercomments = comment.userId == user.id

//             commentsHtml += `<div class="comment">
//               <div class="comment-header">
//                 <div class="comment-meta">
//                   <span class="comment-author">${user.author}</span>
//                   <span class="comment-date"> ${post.createdAt ? new Date(comment.createdAt).toLocaleDateString() :new Date().toLocaleDateString()}</span>
//                 </div>
//               </div>
//               <div class="comment-content">
//                 <p>
//                   ${comment.content}
//                 </p>
//               </div>
//             </div>
//               `;
//         })
//         /*---------------------------------*/
//         const options = {
//             title: "MiniBlog - All comments",
//             content: comments.length,
//             commentsHtml: commentsHtml
//         };

//         res.render("comment", options);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({msg:`❌ Error - ${err.message} `});
//     }
// })
export default router;