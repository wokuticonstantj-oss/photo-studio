const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/generate-variations', upload.single('image'), async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "veo-3.1-generate-preview" });
    const base64Image = req.file.buffer.toString('base64');

    // To stand out, we define high-end cinematic styles
    const styles = [
      "Cinematic Drone Orbit: 4k, smooth parallax, hyper-realistic",
      "Ethereal Slow Motion: Dreamy lighting, soft transitions, fluid movement",
      "Dynamic Action Pan: High energy, motion blur, sharp focus",
      "Vintage Film Aesthetic: Grainy texture, warm light leaks, nostalgic motion"
    ];

    // Map through styles to create multiple generation requests
    const generationTasks = styles.map(style => 
      model.generateContent([
        { text: style },
        { inlineData: { mimeType: req.file.mimetype, data: base64Image } }
      ])
    );

    const results = await Promise.all(generationTasks);
    const videoUrls = results.map(r => r.response.candidates[0].content.parts[0].text);

    res.json({ success: true, variations: videoUrls });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

