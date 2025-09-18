const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));

// Serve the form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Handle form submission
app.post("/submit", (req, res) => {
  const feedbackFile = path.join(__dirname, "feedback.json");

  // Read existing data
  let feedbacks = [];
  if (fs.existsSync(feedbackFile)) {
    const data = fs.readFileSync(feedbackFile);
    feedbacks = JSON.parse(data);
  }

  // Add new feedback
  feedbacks.push(req.body);

  // Save back to file
  fs.writeFileSync(feedbackFile, JSON.stringify(feedbacks, null, 2));

  res.json({ message: "✅ Feedback submitted successfully!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
