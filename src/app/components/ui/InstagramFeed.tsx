"use client";

import { useEffect } from "react";

interface InstagramPost {
  url: string;
  caption?: string;
}

interface InstagramFeedProps {
  posts: InstagramPost[];
  className?: string;
}

// Sample posts - Rachel can replace these URLs with her actual Instagram post URLs
const defaultPosts: InstagramPost[] = [
  { url: "https://www.instagram.com/p/example1/" },
  { url: "https://www.instagram.com/p/example2/" },
  { url: "https://www.instagram.com/p/example3/" },
];

export default function InstagramFeed({
  posts = defaultPosts,
  className = ""
}: InstagramFeedProps) {
  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Process embeds when script loads
    script.onload = () => {
      if ((window as unknown as { instgrm?: { Embeds: { process: () => void } } }).instgrm) {
        (window as unknown as { instgrm: { Embeds: { process: () => void } } }).instgrm.Embeds.process();
      }
    };

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://www.instagram.com/embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [posts]);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {posts.map((post, index) => (
        <div key={index} className="instagram-embed-container">
          <blockquote
            className="instagram-media"
            data-instgrm-captioned
            data-instgrm-permalink={post.url}
            data-instgrm-version="14"
            style={{
              background: "#FFF",
              border: 0,
              borderRadius: "3px",
              boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
              margin: "1px",
              maxWidth: "540px",
              minWidth: "326px",
              padding: 0,
              width: "100%",
            }}
          />
        </div>
      ))}
    </div>
  );
}

// Simple component for a single Instagram post embed
export function InstagramEmbed({ url }: { url: string }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if ((window as unknown as { instgrm?: { Embeds: { process: () => void } } }).instgrm) {
        (window as unknown as { instgrm: { Embeds: { process: () => void } } }).instgrm.Embeds.process();
      }
    };

    return () => {
      const existingScript = document.querySelector('script[src="https://www.instagram.com/embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [url]);

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-captioned
      data-instgrm-permalink={url}
      data-instgrm-version="14"
      style={{
        background: "#FFF",
        border: 0,
        borderRadius: "3px",
        boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
        margin: "1px auto",
        maxWidth: "540px",
        minWidth: "326px",
        padding: 0,
        width: "100%",
      }}
    />
  );
}
