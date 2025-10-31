import { GoogleGenAI, Type } from "@google/genai";
import { Subject } from '../types';

export const extractSubjectsFromImage = async (
  imageBase64: string,
  mimeType: string
): Promise<Omit<Subject, 'id'>[]> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY_HERE") {
    throw new Error("API key not set. Please update the placeholder in index.html for local development.");
  }
  
  const ai = new GoogleGenAI({ apiKey });

  const imagePart = {
    inlineData: {
      data: imageBase64,
      mimeType,
    },
  };

  const textPart = {
    text: `Analyze the provided image, which shows a table of student attendance. Extract the following columns for each row: "Subject code", "Subject name", "Present" (attended classes), and "Total" (total classes). Ignore the 'Percentage' column. Return the data as a JSON array of objects.`,
  };
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [textPart, imagePart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              subject_code: {
                type: Type.STRING,
                description: "The subject code, e.g., CSEN2031",
              },
              subject_name: {
                type: Type.STRING,
                description: "The full name of the subject.",
              },
              present: {
                type: Type.INTEGER,
                description: "Number of classes attended.",
              },
              total: {
                type: Type.INTEGER,
                description: "Total number of classes held.",
              },
            },
            required: ["subject_code", "subject_name", "present", "total"],
          },
        },
      },
    });

    const jsonString = response.text.trim();
    const parsedData = JSON.parse(jsonString);

    if (!Array.isArray(parsedData)) {
      throw new Error("API did not return a valid array.");
    }

    return parsedData.map((item: any) => ({
      code: item.subject_code,
      name: item.subject_name,
      present: item.present,
      total: item.total
    }));

  } catch (error) {
    console.error("Error processing image with Gemini API:", error);
    throw new Error("Failed to extract data from the image. The AI model could not process it. Please ensure the image is clear and contains a valid attendance table.");
  }
};