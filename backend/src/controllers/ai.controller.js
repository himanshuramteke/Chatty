import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../config/serverConfig.js";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export const askAssistantController = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash-001", // or "gemini-1.5-flash"
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const reply =
      result?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    res.status(200).json({ reply });
  } catch (error) {
    console.error("Gemini AI error:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
};
