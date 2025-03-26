// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import blogRoutes from "./routes/blogRoutes.js";
// import blogswithimage from "./routes/blogswithimage.js";

// dotenv.config();
// const app = express();

// app.use(express.json());
// app.use(cors());
// app.use("/api/blogs", blogRoutes);
// app.use("/api/image", blogswithimage);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import blogRoutes from "./routes/blogRoutes.js";
import blogswithimage from "./routes/blogswithimage.js";

dotenv.config();
const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000', // For local development
    'https://your-frontend-app.vercel.app' // Your production frontend URL
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json({ limit: '50mb' })); // Increased for image uploads
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/image", blogswithimage);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));