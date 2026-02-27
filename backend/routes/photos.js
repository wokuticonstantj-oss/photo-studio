const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/animate', upload.single('image'), async (req, res) => {
  try {
    // We use Veo 3.1 for the best "impressive" photo-to-video result
    const model = genAI.getGenerativeModel({ model: "veo-3.1-generate-preview" });
    
    const result = await model.generateContent([
      { text: "Generate 4 cinematic video variations with smooth transitions. Make them impressive and high-fidelity." },
      { inlineData: { mimeType: req.file.mimetype, data: req.file.buffer.toString('base64') } }
    ]);

    // This returns the result which the frontend will display in the grid
    res.json({ 
        success: true, 
        videos: result.response.candidates.map(c => c.content.parts[0].text) 
    }); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
