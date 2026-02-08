"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AIGenerateAllButtonProps {
  context: {
    title?: string;
    venue?: string;
    city?: string;
    country?: string;
    year?: number;
    category?: string;
  };
  onGenerated: (results: {
    description?: string;
    artistNote?: string;
    inspiration?: string;
    process?: string;
    impact?: string;
    keywords?: string[];
  }) => void;
  disabled?: boolean;
}

export default function AIGenerateAllButton({
  context,
  onGenerated,
  disabled,
}: AIGenerateAllButtonProps) {
  const [generating, setGenerating] = useState(false);

  async function generateContent(type: string) {
    const res = await fetch("/api/admin/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, context }),
    });

    if (!res.ok) {
      throw new Error(`Failed to generate ${type}`);
    }

    return await res.json();
  }

  async function handleGenerateAll() {
    if (!context.title || !context.venue) {
      toast.error("Please enter a title and venue first");
      return;
    }

    setGenerating(true);
    toast.loading("Generating all content...");
    try {
      // Generate all content types in parallel
      const [
        descriptionData,
        artistNoteData,
        inspirationData,
        processData,
        impactData,
        keywordsData,
      ] = await Promise.all([
        generateContent("description"),
        generateContent("artistNote"),
        generateContent("inspiration"),
        generateContent("process"),
        generateContent("impact"),
        generateContent("keywords"),
      ]);

      // Pass all generated content back to the form
      onGenerated({
        description: descriptionData.content,
        artistNote: artistNoteData.content,
        inspiration: inspirationData.content,
        process: processData.content,
        impact: impactData.content,
        keywords: keywordsData.keywords || [],
      });

      toast.dismiss();
      toast.success("All content generated successfully!");
    } catch (error) {
      console.error("AI generation error:", error);
      toast.dismiss();
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <Button
      type="button"
      onClick={handleGenerateAll}
      disabled={disabled || generating}
      variant="default"
      className="gap-2 cursor-pointer"
    >
      {generating ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating All Content...
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4" />
          Generate All Content with AI
        </>
      )}
    </Button>
  );
}
