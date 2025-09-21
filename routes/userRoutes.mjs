import express from "express";
import User from "../models/userSchema.mjs"

import { users } from "../data/data.mjs";

const router = express.Router();



router.get("/seed", async (req, res) => {
  try {
    await User.deleteMany({}); // Optional just to clear out database before reloading new data

    await User.insertMany(users);

    res.send("Data Successfully seeded");
  } catch (err) {
    console.error(err.msg);
  }
});
router.route("/")
.post( async(req,res)=>{
   try {
    //Action
     let newUser = await User.create(req.body);
     //Return
     res.json(newUser);
   } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: `❌ Error - ${err.message} `});
   }
})

.get(async(req,res)=>{
    try {
        //Action
        let getAllUsers = await User.find({});
        //Return
        // Generate HTML for all users
    let usersHtml = '';
    getAllUsers.forEach((user, index) => {
      usersHtml += `

      <article class="user-card">
       <h3 class="user-title">
        <a href="/users/${user.id || index + 1}">${user.name}</a>
        </h3>
        <p class="username">@${user.username}</p>
    

     
        <header class="user-header">
          
          <div class="user-meta">
            <span class="email">Email: <a href="mailto:${user.email}">${user.email}</a></span>
            <span class="join-date">${user.joinDate || new Date().toLocaleDateString()}</span>
          </div>
        </header>
        <div class="user-info">
          <p>Contact: ${user.email}</p>
          <p>${user.bio || 'No bio available'}</p>
        </div>
        <footer class="user-footer">
          <a href="/users/${user.id || index + 1}/edit" class="edit-btn">Edit</a>
          <a href="/users" class="delete-btn">Delete</a>
        </footer>
      </article>
    `;
    })

    /*---------------------------------*/
    const options = {
      title: "MiniBlog - All Users",
      content: "Our users",
      usersHtml: usersHtml
    };

    res.render("user", options);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg:`❌ Error - ${err.message} `});
    }
})
export default router;