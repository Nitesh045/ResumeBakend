// const{ callOllama } =require("../services/ollamaService.js");
// const { safeParseJSON } =require("../utils/parseJSON.js");

//  const analyzeResume = async (req, res) => {
//   try {
//     const { resumeText, jobDescription } = req.body;

//     if (!resumeText || !jobDescription) {
//       return res.status(400).json({ error: "Missing fields" });
//     }

//     const prompt = `
// You are an advanced ATS (Applicant Tracking System).

// STRICT RULES:
// - Return ONLY valid JSON
// - No explanation
// - No markdown

// FORMAT:
// {
//   "atsScore": 0-100,
//   "missingKeywords": ["keyword1"],
//   "suggestions": ["suggestion1"],
//   "improvedSummary": "2-3 line summary"
// }

// RESUME:
// ${resumeText}

// JOB DESCRIPTION:
// ${jobDescription}
// `;

//     const aiResponse = await callOllama(prompt);

//     const parsed = safeParseJSON(aiResponse);

//     if (!parsed) {
//       return res.status(500).json({ error: "Invalid AI response" });
//     }

//     res.json(parsed);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// module.exports={
//     analyzeResume
// }


const { callOpenRouter } = require("../services/openrouterService");

const analyzeResume = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const result = await callOpenRouter(resumeText, jobDescription);

    res.json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Analysis failed" });
  }
};

module.exports = { analyzeResume };