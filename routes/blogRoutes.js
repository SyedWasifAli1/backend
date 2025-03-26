import express from "express";
import { db } from "../config/firebase.js";
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

const router = express.Router();
const blogCollection = collection(db, "blogs");

// ✅ Create Blog
router.post("/", async (req, res) => {
  try {
    const blog = await addDoc(blogCollection, req.body);
    res.status(201).json({ id: blog.id, ...req.body });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Get All Blogs
router.get("/", async (req, res) => {
  try {
    const snapshot = await getDocs(blogCollection);
    const blogs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get Single Blog
router.get("/:id", async (req, res) => {
  try {
    const blogRef = doc(db, "blogs", req.params.id);
    const blog = await getDoc(blogRef);
    if (!blog.exists()) return res.status(404).json({ error: "Blog not found" });
    res.json({ id: blog.id, ...blog.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update Blog
router.put("/:id", async (req, res) => {
  try {
    const blogRef = doc(db, "blogs", req.params.id);
    await updateDoc(blogRef, req.body);
    res.json({ message: "Blog updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Delete Blog
router.delete("/:id", async (req, res) => {
  try {
    const blogRef = doc(db, "blogs", req.params.id);
    await deleteDoc(blogRef);
    res.json({ message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
