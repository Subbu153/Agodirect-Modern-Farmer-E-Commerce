
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateProductDescription = async (productName: string, category: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a compelling, short marketing description (max 2 sentences) for an agricultural product named "${productName}" in the category "${category}". Focus on freshness and quality.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text || "Freshly sourced from our local farms.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "High quality product sourced directly from the farmer.";
  }
};
