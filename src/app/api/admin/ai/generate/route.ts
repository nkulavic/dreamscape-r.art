import { NextResponse } from "next/server";
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
    | "title"
    | "seo-title"
    | "seo-description"
    | "seo-keywords";
  context: {
    title?: string;
    venue?: string;
    city?: string;
    country?: string;
    year?: number;
    category?: string;
    existingContent?: string;
    userInput?: string;
    systemPrompt?: string;
    userPrompt?: string;
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
  description: (ctx: GenerateRequest["context"]) => `Write a compelling 2-3 sentence description for a mural titled "${ctx.title}" located at ${ctx.venue} in ${ctx.city}, ${ctx.country}. Category: ${ctx.category}. Focus on visual elements and the story the mural tells. Write in third person.${ctx.userInput ? `\n\nAdditional context from the artist: ${ctx.userInput}` : ""}`,

  artistNote: (ctx: GenerateRequest["context"]) => `Write a personal artist statement (2-3 sentences) in first person about creating the mural "${ctx.title}" at ${ctx.venue}. Explain what this piece means to you as the artist. Be authentic and heartfelt.${ctx.userInput ? `\n\nArtist's thoughts: ${ctx.userInput}` : ""}`,

  inspiration: (ctx: GenerateRequest["context"]) => `Write 2-3 sentences in first person explaining what inspired the mural "${ctx.title}". What themes, experiences, or ideas drove the creative vision? Connect it to broader artistic or social themes.${ctx.userInput ? `\n\nInspiration notes: ${ctx.userInput}` : ""}`,

  process: (ctx: GenerateRequest["context"]) => `Write 2-3 sentences in first person about the process of creating "${ctx.title}" at ${ctx.venue}. Mention interesting challenges, techniques, timeline, or collaboration aspects.${ctx.userInput ? `\n\nProcess details: ${ctx.userInput}` : ""}`,

  impact: (ctx: GenerateRequest["context"]) => `Write 2-3 sentences about the impact of the mural "${ctx.title}" on the community or viewers. How has it been received? What conversations has it sparked? Write in first person or third person as appropriate.${ctx.userInput ? `\n\nImpact observations: ${ctx.userInput}` : ""}`,

  keywords: (ctx: GenerateRequest["context"]) => `Generate 6-8 relevant SEO keywords (tags) for a ${ctx.category} mural titled "${ctx.title}" in ${ctx.city}, ${ctx.country}. ${ctx.userInput ? `Focus on these themes: ${ctx.userInput}. ` : ""}Return ONLY a comma-separated list of single words or short phrases. Examples: ocean, conservation, woman, empowerment, community, portrait, nature, urban art, public art, etc.`,

  title: (ctx: GenerateRequest["context"]) => `Suggest 3 compelling, poetic titles for a ${ctx.category} mural at ${ctx.venue} in ${ctx.city}. ${ctx.existingContent ? `Current working title: "${ctx.existingContent}". ` : ""}${ctx.userInput ? `Theme/mood: ${ctx.userInput}. ` : ""}Return ONLY 3 title options, one per line, without numbering or explanation. Titles should be 2-5 words, evocative and memorable.`,

  "seo-title": (ctx: GenerateRequest["context"]) => `Generate a compelling, SEO-optimized meta title for a professional muralist's portfolio website (DREAMSCAPER by Rachel Dinda). The title should be under 60 characters and include key terms that potential clients would search for. ${ctx.existingContent ? `Current title: "${ctx.existingContent}". ` : ""}Focus on: professional muralist, large-scale art, public art, commissions.`,

  "seo-description": (ctx: GenerateRequest["context"]) => `Write an SEO-optimized meta description for a professional muralist's portfolio website (DREAMSCAPER by Rachel Dinda). Must be under 160 characters and include a clear call-to-action. ${ctx.existingContent ? `Current description: "${ctx.existingContent}". ` : ""}Highlight expertise, types of work (commercial, community, public art), and encourage potential clients to commission work.`,

  "seo-keywords": (ctx: GenerateRequest["context"]) => `Generate 10-15 high-traffic SEO keywords for a professional muralist's portfolio website. ${ctx.existingContent ? `Current keywords: "${ctx.existingContent}". ` : ""}Include: service keywords (mural artist, muralist, public art), location keywords (Denver, Colorado), style keywords (large-scale, street art, outdoor art), and client intent keywords (mural commission, hire muralist). Return ONLY a comma-separated list.`,
};

export async function POST(request: Request) {
  // Authentication is handled by middleware
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

    // Log full error details for debugging
    const errorDetails = {
      message: error instanceof Error ? error.message : String(error),
      name: error instanceof Error ? error.name : 'Unknown',
      stack: error instanceof Error ? error.stack : undefined,
      raw: JSON.stringify(error, null, 2),
    };

    console.error("Full error details:", errorDetails);

    return NextResponse.json(
      {
        error: "Failed to generate content",
        details: errorDetails.message,
        debug: process.env.NODE_ENV === 'development' ? errorDetails : undefined,
      },
      { status: 500 }
    );
  }
}
