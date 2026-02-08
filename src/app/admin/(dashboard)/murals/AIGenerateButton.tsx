"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

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
}

export default function AIGenerateButton({
  type,
  context,
  onGenerated,
  disabled,
}: AIGenerateButtonProps) {
  const [generating, setGenerating] = useState(false);

  async function handleGenerate() {
    if (!context.title && type !== "title") {
      toast.error("Please enter a title first");
      return;
    }

    if (!context.venue && type !== "title") {
      toast.error("Please enter a venue first");
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
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <Button
      type="button"
      onClick={handleGenerate}
      disabled={disabled || generating}
      size="icon"
      variant="outline"
      className="h-8 w-8 cursor-pointer"
      title={generating ? "Generating..." : "Generate with AI"}
    >
      {generating ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Sparkles className="h-3.5 w-3.5" />
      )}
    </Button>
  );
}
