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
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState({
    visualDescription: "",
    personalMeaning: "",
    inspiration: "",
    processDetails: "",
    communityImpact: "",
    keywords: "",
  });

  async function generateContent(type: string, userInput?: string) {
    const res = await fetch("/api/admin/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        context: {
          ...context,
          userInput: userInput || undefined,
        },
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to generate ${type}`);
    }

    return await res.json();
  }

  async function handleGenerateAll() {
    if (!context.title || !context.venue) {
      toast.error("Please enter a title and venue first");
      setOpen(false);
      return;
    }

    setGenerating(true);
    toast.loading("Generating all content...");
    try {
      // Generate all content types in parallel with user input
      const [
        descriptionData,
        artistNoteData,
        inspirationData,
        processData,
        impactData,
        keywordsData,
      ] = await Promise.all([
        generateContent("description", answers.visualDescription),
        generateContent("artistNote", answers.personalMeaning),
        generateContent("inspiration", answers.inspiration),
        generateContent("process", answers.processDetails),
        generateContent("impact", answers.communityImpact),
        generateContent("keywords", answers.keywords),
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
      setOpen(false);
      // Reset answers
      setAnswers({
        visualDescription: "",
        personalMeaning: "",
        inspiration: "",
        processDetails: "",
        communityImpact: "",
        keywords: "",
      });
    } catch (error) {
      console.error("AI generation error:", error);
      toast.dismiss();
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          disabled={disabled || generating}
          variant="default"
          className="gap-2 cursor-pointer"
        >
          <Sparkles className="h-4 w-4" />
          Generate All Content with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generate All Mural Content</DialogTitle>
          <DialogDescription>
            Answer these questions to help the AI create personalized, authentic
            content for your mural. All fields are optional but more detail leads
            to better results.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="visual">
              What are the key visual elements or story this mural tells?
            </Label>
            <Textarea
              id="visual"
              placeholder="e.g., Features a soaring eagle over mountains, celebrates indigenous culture, painted in warm earth tones..."
              value={answers.visualDescription}
              onChange={(e) =>
                setAnswers({ ...answers, visualDescription: e.target.value })
              }
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="meaning">
              What does this piece mean to you personally?
            </Label>
            <Textarea
              id="meaning"
              placeholder="e.g., Honors my grandmother's teachings, represents my journey with ocean conservation, first mural in my hometown..."
              value={answers.personalMeaning}
              onChange={(e) =>
                setAnswers({ ...answers, personalMeaning: e.target.value })
              }
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="inspiration">
              What inspired you to create this mural?
            </Label>
            <Textarea
              id="inspiration"
              placeholder="e.g., Community resilience after a disaster, childhood memories of this place, conversations with local elders..."
              value={answers.inspiration}
              onChange={(e) =>
                setAnswers({ ...answers, inspiration: e.target.value })
              }
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="process">
              Describe the creation process, challenges, or techniques
            </Label>
            <Textarea
              id="process"
              placeholder="e.g., Three-week project with student volunteers, used spray paint and brushwork, faced rainy weather challenges..."
              value={answers.processDetails}
              onChange={(e) =>
                setAnswers({ ...answers, processDetails: e.target.value })
              }
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="impact">
              How has the community responded? What impact has it had?
            </Label>
            <Textarea
              id="impact"
              placeholder="e.g., Students pause here daily for reflection, sparked environmental discussions, featured in local news..."
              value={answers.communityImpact}
              onChange={(e) =>
                setAnswers({ ...answers, communityImpact: e.target.value })
              }
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="keywords">
              Any specific keywords or themes to emphasize?
            </Label>
            <Textarea
              id="keywords"
              placeholder="e.g., ocean conservation, indigenous wisdom, community empowerment, youth engagement, public art..."
              value={answers.keywords}
              onChange={(e) =>
                setAnswers({ ...answers, keywords: e.target.value })
              }
              rows={2}
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
          <Button type="button" onClick={handleGenerateAll} disabled={generating}>
            {generating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate All
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
