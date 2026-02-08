"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";

interface AIGenerateButtonProps {
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
  onGenerated: (content: string | string[]) => void;
  disabled?: boolean;
  size?: "sm" | "default" | "lg" | "icon";
}

export default function AIGenerateButton({
  type,
  context,
  onGenerated,
  disabled,
  size = "sm",
}: AIGenerateButtonProps) {
  const [generating, setGenerating] = useState(false);

  async function handleGenerate() {
    if (!context.title && type !== "title") {
      alert("Please enter a title first");
      return;
    }

    if (!context.venue && type !== "title") {
      alert("Please enter a venue first");
      return;
    }

    setGenerating(true);
    try {
      const res = await fetch("/api/admin/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, context }),
      });

      if (!res.ok) {
        throw new Error("Generation failed");
      }

      const data = await res.json();

      // Handle different response types
      if (type === "keywords" && data.keywords) {
        onGenerated(data.keywords);
      } else if (type === "title" && data.titles) {
        onGenerated(data.titles);
      } else if (data.content) {
        onGenerated(data.content);
      }
    } catch (error) {
      console.error("AI generation error:", error);
      alert("Failed to generate content. Please try again.");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <Button
      type="button"
      onClick={handleGenerate}
      disabled={disabled || generating}
      size={size}
      variant="outline"
      className="gap-2"
    >
      {generating ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="h-3.5 w-3.5" />
          Generate with AI
        </>
      )}
    </Button>
  );
}
