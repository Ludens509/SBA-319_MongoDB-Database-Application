import mongoose from "mongoose";
// ===== Users =====
export const users = [
  {
    name: "Alice Johnson",
    username: "alicej",
    email: "alice@example.com",
    role: "user",
  },
  {
    name: "Bob Smith",
    username: "bobsmith",
    email: "bob@example.com",
    role: "admin",
  },
  {
    name: "Charlie Brown",
    username: "charlieb",
    email: "charlie@example.com",
    role: "user",
  },
  {
    name: "Diana Prince",
    username: "Prince",
    email: "prince@example.com",
    role: "user",
  },
  {
    name: "James cook",
    username: "cook",
    email:"cook@example.com",
    role: "admin",
  },
  {
    name: "Josh Doe",
    username: "josh",
    email: "josh@example.com",
    role: "user",
  },
];


// ===== Posts =====
export const posts = [
  {
    title: "Learning the MERN Stack",
    content:
      "The MERN stack combines MongoDB, Express, React, and Node.js to create full-stack applications. It is beginner-friendly and powerful.",
    author: "alicej",
    comments: [],
  },
  {
    title: "The Rise of JavaScript",
    content:
      "JavaScript has become the most widely used programming language in the world, powering both front-end and back-end applications.",
    author: "bobsmith",
    comments: [],
  },
  {
    title: "Why React is Popular",
    content:
      "React\'s component-based architecture and virtual DOM make it one of the most popular front-end frameworks for developers.",
    author: "charlieb",
    comments: [],
  },
  {
    title: "The king of the Jungle",
    content:
      "React\'s component-based architecture and virtual DOM make it one of the most popular front-end frameworks for developers.",
    author: "Barnabe",
    comments: [],
  },
  {
    title: "Why The world i round",
    content:
      "React\'s component-based architecture and virtual DOM make it one of the most popular front-end frameworks for developers.",
    author: "Nappeleon",
    comments: [],
  },
  {
    title: "At the roots of things",
    content:
      "React\'s component-based architecture and virtual DOM make it one of the most popular front-end frameworks for developers.",
    author: "Jacques",
    comments: [],
  },
];


// ===== Comments =====
export const comments = [
  {
    content: "This is super helpful, thank you for sharing!",
    author: "Luc Bastia", // placeholder
    post: new mongoose.Types.ObjectId(),
  },
  {
    content: "I totally agree with your point on JavaScript being everywhere.",
    author: "Jame Nappoleon",
    post: new mongoose.Types.ObjectId(),
  },
  {
    content: "React really changed the way I build user interfaces.",
    author: "Shawn Bowsky",
    post: new mongoose.Types.ObjectId(),
  },
  {
    content: "React really changed the way I build user interfaces.",
    author: "Greg beenie",
    post: new mongoose.Types.ObjectId(),
  },
  {
    content: "Life of a rookie among the Pro",
    author: "Rebeca slawn",
    post: new mongoose.Types.ObjectId(),
  },
  {
    content: "How to play soccer with sandals.",
    author: "Jhon Doe",
    post: new mongoose.Types.ObjectId(),
  },
];
