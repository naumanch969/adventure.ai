import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GOOGLE_GEMINI_KEY!);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json"
}

const prompt = "Write a story about an AI and magic"

export const chatSession = model.startChat({
    generationConfig,
    history: [] // TODO: ADD HISTORY 3:27:00
})
