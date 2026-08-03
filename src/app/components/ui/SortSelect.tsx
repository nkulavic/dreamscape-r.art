"use client";

import { useId } from "react";
import { HiChevronDown } from "react-icons/hi";
import type { SortOption } from "@/lib/sort";

interface SortSelectProps<T> {
  options: SortOption<T>[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

/**
 * Sort dropdown for the public galleries and lists.
 *
 * A native `<select>` on purpose — it keeps keyboard and screen-reader behaviour
 * for free and turns into the system picker on mobile.
 */
export default function SortSelect<T>({
  options,
  value,
  onChange,
  label = "Sort by",
  className = "",
}: SortSelectProps<T>) {
  const id = useId();

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {/* Hidden on small screens to save room, still read by screen readers. */}
      <label
        htmlFor={id}
        className="sr-only font-heading text-sm uppercase tracking-wide text-gray-500 sm:not-sr-only"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="cursor-pointer appearance-none rounded-full bg-gray-100 py-2 pl-4 pr-9 font-heading text-xs uppercase tracking-wide text-gray-700 transition-colors hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:py-3 sm:pl-5 sm:pr-11 sm:text-sm"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <HiChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-500 sm:right-4 sm:h-4 sm:w-4"
          aria-hidden
        />
      </div>
    </div>
  );
}
