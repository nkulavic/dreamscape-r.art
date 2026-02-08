import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { groq, DEFAULT_MODEL } from "@/lib/groq";

export const runtime = "nodejs";
export const maxDuration = 30;

interface GenerateRequest {
  type:
    | "description"
    | "artistNote"
    | "inspiration"
    | "process"
    | "impact"
    | "keywords"
    | "title";
  context: {
    title?: string;
    venue?: string;
    city?: string;
    country?: string;
    year?: number;
    category?: string;
    existingContent?: string;
  };
}

const SYSTEM_PROMPT = `You are an expert art writer helping a professional muralist (DREAMSCAPER/Rachel Dinda) write compelling content about her large-scale mural artwork. Your writing should be:
- Authentic and personal (first-person "I" for artist statements)
- Engaging and storytelling-focused
- Concise but evocative
- Appropriate for a professional portfolio website
- Focused on themes like: community, empowerment, ocean conservation, cultural celebration, social impact

Keep responses focused and avoid unnecessary preamble.`;

const PROMPTS = {
  description: (ctx: GenerateRequest["context"]) => `Write a compelling 2-3 sentence description for a mural titled "${ctx.title}" located at ${ctx.venue} in ${ctx.city}, ${ctx.country}. Category: ${ctx.category}. Focus on visual elements and the story the mural tells. Write in third person.`,

  artistNote: (ctx: GenerateRequest["context"]) => `Write a personal artist statement (2-3 sentences) in first person about creating the mural "${ctx.title}" at ${ctx.venue}. Explain what this piece means to you as the artist. Be authentic and heartfelt.`,

  inspiration: (ctx: GenerateRequest["context"]) => `Write 2-3 sentences in first person explaining what inspired the mural "${ctx.title}". What themes, experiences, or ideas drove the creative vision? Connect it to broader artistic or social themes.`,

  process: (ctx: GenerateRequest["context"]) => `Write 2-3 sentences in first person about the process of creating "${ctx.title}" at ${ctx.venue}. Mention interesting challenges, techniques, timeline, or collaboration aspects.`,

  impact: (ctx: GenerateRequest["context"]) => `Write 2-3 sentences about the impact of the mural "${ctx.title}" on the community or viewers. How has it been received? What conversations has it sparked? Write in first person or third person as appropriate.`,

  keywords: (ctx: GenerateRequest["context"]) => `Generate 6-8 relevant SEO keywords (tags) for a ${ctx.category} mural titled "${ctx.title}" in ${ctx.city}, ${ctx.country}. Return ONLY a comma-separated list of single words or short phrases. Examples: ocean, conservation, woman, empowerment, community, portrait, nature, urban art, public art, etc.`,

  title: (ctx: GenerateRequest["context"]) => `Suggest 3 compelling, poetic titles for a ${ctx.category} mural at ${ctx.venue} in ${ctx.city}. ${ctx.existingContent ? `Current working title: "${ctx.existingContent}". ` : ""}Return ONLY 3 title options, one per line, without numbering or explanation. Titles should be 2-5 words, evocative and memorable.`,
};

export async function POST(request: Request) {
  // Check authentication
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: GenerateRequest = await request.json();
    const { type, context } = body;

    if (!type || !PROMPTS[type]) {
      return NextResponse.json(
        { error: "Invalid generation type" },
        { status: 400 }
      );
    }

    // Build the prompt
    const userPrompt = PROMPTS[type](context);

    // Call Groq API
    const completion = await groq.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.6,
      max_tokens: 500,
      top_p: 0.9,
    });

    const generatedText = completion.choices[0]?.message?.content?.trim();

    if (!generatedText) {
      return NextResponse.json(
        { error: "No content generated" },
        { status: 500 }
      );
    }

    // For keywords, convert to array
    if (type === "keywords") {
      const keywords = generatedText
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);
      return NextResponse.json({ content: generatedText, keywords });
    }

    // For titles, split into array
    if (type === "title") {
      const titles = generatedText
        .split("\n")
        .map((t) => t.trim())
        .filter(Boolean);
      return NextResponse.json({ content: generatedText, titles });
    }

    return NextResponse.json({ content: generatedText });
  } catch (error) {
    console.error("AI generation error:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message, error.stack);
    }
    return NextResponse.json(
      {
        error: "Failed to generate content",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
