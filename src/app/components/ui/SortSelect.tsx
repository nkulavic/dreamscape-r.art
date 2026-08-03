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
      <label
        htmlFor={id}
        className="font-heading text-sm uppercase tracking-wide text-gray-500"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="cursor-pointer appearance-none rounded-full bg-gray-100 py-3 pl-5 pr-11 font-heading text-sm uppercase tracking-wide text-gray-700 transition-colors hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <HiChevronDown
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
          aria-hidden
        />
      </div>
    </div>
  );
}
