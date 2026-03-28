const axios = require("axios");

const callOpenRouter = async (resumeText, jobDescription) => {
  try {
    const prompt = `
You are an advanced ATS (Applicant Tracking System).

STRICT RULES:
- Return ONLY valid JSON
- No explanation
- No markdown

FORMAT:
{
  "atsScore": 0-100,
  "missingKeywords": ["keyword1", "keyword2"],
  "suggestions": ["suggestion1", "suggestion2"],
  "improvedSummary": "2-3 line professional summary"
}

ANALYSIS RULES:
1. Compare resume skills vs job description
2. Identify missing keywords
3. Score ATS match
4. Give actionable suggestions

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const text = response.data.choices[0].message.content;

    // Clean JSON if wrapped in ```
    const clean = text.replace(/```json|```/g, "").trim();

    return JSON.parse(clean);

  } catch (error) {
    console.error("OpenRouter Error:", error.response?.data || error.message);
    throw new Error("AI failed");
  }
};

module.exports = { callOpenRouter };