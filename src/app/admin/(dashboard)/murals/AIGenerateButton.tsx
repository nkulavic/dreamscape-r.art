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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

const FIELD_LABELS: Record<
  string,
  { title: string; prompt: string; placeholder: string }
> = {
  description: {
    title: "Generate Description",
    prompt:
      "Provide any additional context about the visual elements, story, or meaning of this mural:",
    placeholder:
      "e.g., Features a soaring eagle, celebrates indigenous culture, painted in earth tones...",
  },
  artistNote: {
    title: "Generate Artist Note",
    prompt:
      "Share what this piece means to you personally or any creative insights:",
    placeholder:
      "e.g., This was my first public mural, represents my journey, honors my grandmother...",
  },
  inspiration: {
    title: "Generate Inspiration",
    prompt:
      "What inspired you to create this mural? Any themes or experiences:",
    placeholder:
      "e.g., Ocean conservation, community resilience, childhood memories of this place...",
  },
  process: {
    title: "Generate Process",
    prompt:
      "Describe any challenges, techniques, timeline, or collaboration details:",
    placeholder:
      "e.g., Three-week project, worked with students, used spray paint and brushes, rainy weather challenges...",
  },
  impact: {
    title: "Generate Impact",
    prompt:
      "How has the community or viewers responded? What conversations has it sparked:",
    placeholder:
      "e.g., Students pause here daily, sparked environmental discussions, featured in local news...",
  },
  keywords: {
    title: "Generate Keywords",
    prompt: "Add any specific themes, topics, or keywords to include:",
    placeholder: "e.g., ocean, empowerment, indigenous, nature, community art...",
  },
  title: {
    title: "Generate Title",
    prompt: "Describe the mural's themes, mood, or any title ideas you have:",
    placeholder:
      "e.g., Celebrates growth and transformation, peaceful and uplifting mood...",
  },
};

export default function AIGenerateButton({
  type,
  context,
  onGenerated,
  disabled,
}: AIGenerateButtonProps) {
  const [generating, setGenerating] = useState(false);
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState("");

  async function handleGenerate() {
    if (!context.title && type !== "title") {
      toast.error("Please enter a title first");
      setOpen(false);
      return;
    }

    if (!context.venue && type !== "title") {
      toast.error("Please enter a venue first");
      setOpen(false);
      return;
    }

    setGenerating(true);
    try {
      const res = await fetch("/api/admin/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          context: {
            ...context,
            userInput: userInput.trim() || undefined,
          },
        }),
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

      setOpen(false);
      setUserInput("");
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
          disabled={disabled || generating}
          size="icon"
          variant="outline"
          className="h-8 w-8 cursor-pointer"
          title="Generate with AI"
        >
          <Sparkles className="h-3.5 w-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{fieldConfig.title}</DialogTitle>
          <DialogDescription>{fieldConfig.prompt}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="user-input">
              Additional Context{" "}
              <span className="text-muted-foreground text-xs">(optional)</span>
            </Label>
            <Textarea
              id="user-input"
              placeholder={fieldConfig.placeholder}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={generating}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleGenerate} disabled={generating}>
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
