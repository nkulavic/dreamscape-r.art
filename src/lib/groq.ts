import Groq from "groq-sdk";

if (!process.env.GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY environment variable is not set");
}

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Best model for creative content generation
// Using Llama 3.3 70B - high quality, fast, and cost-effective
export const DEFAULT_MODEL = "llama-3.3-70b-versatile";
