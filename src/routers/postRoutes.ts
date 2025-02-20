//postRoutes.ts 


import express, { Request, Response, Router, RequestHandler } from "express";
import Post from "../model/postModels";

const router: Router = express.Router();

// Create a Post
router.post("/posts", (async (req: Request, res: Response) => {
  try {
    const { title, body } = req.body;
    const newPost = new Post({ title, body });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}) as RequestHandler);

// Get All Posts
router.get("/posts", (async (_req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}) as RequestHandler);

// Get Single Post
router.get("/posts/:id", (async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}) as RequestHandler);

// Update a Post
router.put("/posts/:id", (async (req: Request, res: Response) => {
  try {
    const { title, body } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, body },
      { new: true }
    );
    if (!updatedPost)
      return res.status(404).json({ message: "Post not found" });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}) as RequestHandler);

// Delete a Post
router.delete("/posts/:id", (async (req: Request, res: Response) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost)
      return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}) as RequestHandler);

export default router;



// import express, { Request, Response, Router } from "express";
// import Post from "../model/postModels"; 

// const router: Router = express.Router();

// // Create a Post
// router.post("/posts", async (req: Request, res: Response) => {
//   try {
//     const { title, body } = req.body;
//     const newPost = new Post({ title, body });
//     await newPost.save();
//     res.status(201).json(newPost);
//   } catch (error) {
//     res.status(500).json({ message: (error as Error).message });
//   }
// });

// // Get All Posts
// router.get("/posts", async (_req: Request, res: Response) => {
//   try {
//     const posts = await Post.find();
//     res.json(posts);
//   } catch (error) {
//     res.status(500).json({ message: (error as Error).message });
//   }
// });

// // Get Single Post
// router.get("/posts/:id", async (req: Request, res: Response) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) return res.status(404).json({ message: "Post not found" });
//     res.json(post);
//   } catch (error) {
//     res.status(500).json({ message: (error as Error).message });
//   }
// });

// // Update a Post
// router.put("/posts/:id", async (req: Request, res: Response) => {
//   try {
//     const { title, body } = req.body;
//     const updatedPost = await Post.findByIdAndUpdate(
//       req.params.id,
//       { title, body },
//       { new: true }
//     );
//     if (!updatedPost)
//       return res.status(404).json({ message: "Post not found" });
//     res.json(updatedPost);
//   } catch (error) {
//     res.status(500).json({ message: (error as Error).message });
//   }
// });

// // Delete a Post
// router.delete("/posts/:id", async (req: Request, res: Response) => {
//   try {
//     const deletedPost = await Post.findByIdAndDelete(req.params.id);
//     if (!deletedPost)
//       return res.status(404).json({ message: "Post not found" });
//     res.json({ message: "Post deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: (error as Error).message });
//   }
// });

// export default router;
