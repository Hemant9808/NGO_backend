import Post from "../models/postSchema";

export const createPost = async (req: any, res: any) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllPost = async (req: any, res: any) => {
  try {
    const posts = await Post.find().lean();
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getPostById = async (req: any, res: any) => {
  try {
    let id = req.params.id;
    const post = await Post.find({ _id: id });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePost = async (req: any, res: any) => {
  try {
    console.log(req.params.id);

    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
