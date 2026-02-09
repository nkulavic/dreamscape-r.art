"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AIGenerateSEOButtonProps {
  type: "seo-title" | "seo-description" | "seo-keywords";
  currentValue: string;
  onGenerated: (content: string) => void;
}

const FIELD_LABELS: Record<
  string,
  { title: string; description: string }
> = {
  "seo-title": {
    title: "Generate SEO Title",
    description:
      "AI will create an SEO-optimized meta title under 60 characters that helps your site rank in search engines.",
  },
  "seo-description": {
    title: "Generate SEO Description",
    description:
      "AI will create a compelling meta description under 160 characters that encourages clicks from search results.",
  },
  "seo-keywords": {
    title: "Generate SEO Keywords",
    description:
      "AI will generate high-traffic keywords that help potential clients find your work through search engines.",
  },
};

export default function AIGenerateSEOButton({
  type,
  currentValue,
  onGenerated,
}: AIGenerateSEOButtonProps) {
  const [generating, setGenerating] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleGenerate() {
    setGenerating(true);
    try {
      const res = await fetch("/api/admin/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          context: {
            existingContent: currentValue || "",
          },
        }),
      });

      if (!res.ok) {
        throw new Error("Generation failed");
      }

      const data = await res.json();

      if (data.content) {
        onGenerated(data.content);
        toast.success("Content generated successfully!");
      }

      setOpen(false);
    } catch (error) {
      console.error("AI generation error:", error);
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setGenerating(false);
    }
  }

  const fieldConfig = FIELD_LABELS[type];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          disabled={generating}
          size="sm"
          variant="outline"
          className="h-7 gap-1.5 cursor-pointer"
          title="Generate with AI"
        >
          <Sparkles className="h-3.5 w-3.5" />
          AI Generate
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{fieldConfig.title}</DialogTitle>
          <DialogDescription>{fieldConfig.description}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {currentValue && (
            <div className="rounded-lg bg-gray-50 p-3 mb-4">
              <p className="text-xs font-medium text-gray-500 mb-1">Current value:</p>
              <p className="text-sm text-gray-700">{currentValue}</p>
            </div>
          )}
          <p className="text-sm text-gray-600">
            Click Generate to create AI-optimized content for this field.
          </p>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={generating}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleGenerate}
            disabled={generating}
            className="cursor-pointer"
          >
            {generating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
