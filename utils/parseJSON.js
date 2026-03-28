const safeParseJSON = (text) => {
  try {
    return JSON.parse(text);
  } catch {
    try {
      const cleaned = text.replace(/```json|```/g, "").trim();
      return JSON.parse(cleaned);
    } catch {
      return null;
    }
  }
};

module.exports={
    safeParseJSON
}