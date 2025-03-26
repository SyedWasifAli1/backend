import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import blogRoutes from "./routes/blogRoutes.js";
import blogswithimage from "./routes/blogswithimage.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/blogs", blogRoutes);
app.use("/api/image", blogswithimage);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
