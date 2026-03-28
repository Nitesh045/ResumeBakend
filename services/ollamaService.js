const axios = require("axios");

const callOllama = async (prompt) => {
  try {
    const response = await axios.post("http://localhost:11434/api/chat", {
      model: "llama3",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      stream: false
    });

    return response.data.message.content;
  } catch (error) {
    console.error("Ollama Error:", error.response?.data || error.message);
    throw new Error("AI failed");
  }
};

module.exports = {callOllama};