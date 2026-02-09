"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";

interface AIGenerateSEOButtonProps {
  type: "seo-title" | "seo-description" | "seo-keywords";
  currentValue: string;
  onGenerated: (content: string) => void;
}

export default function AIGenerateSEOButton({
  type,
  currentValue,
  onGenerated,
}: AIGenerateSEOButtonProps) {
  const [generating, setGenerating] = useState(false);

  async function handleGenerate() {
    setGenerating(true);

    try {
      const response = await fetch("/api/admin/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          context: {
            existingContent: currentValue || "",
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate content");
      }

      const data = await response.json();
      onGenerated(data.content);
    } catch (error) {
      console.error("AI generation error:", error);
      alert("Failed to generate content. Please try again.");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleGenerate}
      disabled={generating}
      className="inline-flex items-center gap-1.5 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      title="Generate with AI"
    >
      {generating ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Sparkles className="h-3.5 w-3.5" />
      )}
      {generating ? "Generating..." : "AI Generate"}
    </button>
  );
}
