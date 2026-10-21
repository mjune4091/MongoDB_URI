
require("dotenv").config();

const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);

async function startServer() {
  try {
    await client.connect();
    console.log("MongoDB Connected!");

    const db = client.db("studentDB");
    const students = db.collection("students");

    // READ: Get all student records
    app.get("/students", async (req, res) => {
      try {
        const records = await students.find({}).toArray();
        res.json(records);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch students" });
      }
    });

    // CREATE: Add a new student record
    app.post("/students", async (req, res) => {
      try {
        const { name, course, yearLevel } = req.body;

        if (
          typeof name !== "string" || !name.trim() ||
          typeof course !== "string" || !course.trim() ||
          typeof yearLevel !== "string" || !yearLevel.trim()
        ) {
          return res.status(400).json({
            error: "Name, course, and year level are required",
          });
        }

        const student = {
          name: name.trim(),
          course: course.trim(),
          yearLevel: yearLevel.trim(),
        };

        const result = await students.insertOne(student);

        res.status(201).json({
          message: "Student created successfully",
          student: { _id: result.insertedId, ...student },
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create student" });
      }
    });

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}!`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();
