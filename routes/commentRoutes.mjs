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

.get(async(req,res)=>{
    try {
        //Action
        let getAllComments = await Comment.find({});
        //Return
         // Generate HTML for all comments
        let commentsHtml = '';
        comments.forEach((comment) => {
            const user = users.find((user) => user.id == comment.userId);

            // const usercomments = comment.userId == user.id

            commentsHtml += `<div class="comment">
              <div class="comment-header">
                <div class="comment-meta">
                  <span class="comment-author">${user.name}</span>
                  <span class="comment-date"> ${new Date().toLocaleDateString()}</span>
                </div>
              </div>
              <div class="comment-content">
                <p>
                  ${comment.body}
                </p>
              </div>
            </div>
              `;
        })
        /*---------------------------------*/
        const options = {
            title: "MiniBlog - All comments",
            content: comments.length,
            commentsHtml: commentsHtml
        };

        res.render("comment", options);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg:`❌ Error - ${err.message} `});
    }
})
export default router;