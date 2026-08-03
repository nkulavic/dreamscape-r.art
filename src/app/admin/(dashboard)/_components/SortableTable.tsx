"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { createComparator, type SortDirection } from "@/lib/sort";

export type { SortDirection };

export interface SortController<Field extends string> {
  sortField: Field;
  sortDirection: SortDirection;
  sortBy: (field: Field, firstDirection?: SortDirection) => void;
}

interface UseTableSortOptions<Row, Field extends string> {
  initialField: Field;
  initialDirection?: SortDirection;
  /** When set, the chosen column is remembered between visits. */
  storageKey?: string;
  /** Override how a field's value is read off a row (e.g. joined or computed columns). */
  getValue?: (row: Row, field: Field) => unknown;
}

/**
 * Client-side column sorting for the admin tables.
 *
 * Comparison rules live in `@/lib/sort`, shared with the public galleries: values
 * are compared by type, blanks sink to the bottom, and ties keep their order.
 */
export function useTableSort<Row, Field extends string>(
  rows: Row[],
  {
    initialField,
    initialDirection = "asc",
    storageKey,
    getValue,
  }: UseTableSortOptions<Row, Field>
): SortController<Field> & { sortedRows: Row[] } {
  const [sortField, setSortField] = useState<Field>(initialField);
  const [sortDirection, setSortDirection] = useState<SortDirection>(initialDirection);

  // Restore after mount so server and client render the same initial markup.
  useEffect(() => {
    if (!storageKey) return;
    try {
      const stored = window.localStorage.getItem(`admin-sort:${storageKey}`);
      if (!stored) return;
      const { field, direction } = JSON.parse(stored) as {
        field?: Field;
        direction?: SortDirection;
      };
      if (field) setSortField(field);
      if (direction === "asc" || direction === "desc") setSortDirection(direction);
    } catch {
      // Ignore unreadable preferences.
    }
  }, [storageKey]);

  const sortBy = useCallback(
    (field: Field, firstDirection: SortDirection = "asc") => {
      const direction: SortDirection =
        field === sortField ? (sortDirection === "asc" ? "desc" : "asc") : firstDirection;

      setSortField(field);
      setSortDirection(direction);

      if (storageKey) {
        try {
          window.localStorage.setItem(
            `admin-sort:${storageKey}`,
            JSON.stringify({ field, direction })
          );
        } catch {
          // Storage can be unavailable (private mode); sorting still works.
        }
      }
    },
    [sortField, sortDirection, storageKey]
  );

  const sortedRows = useMemo(() => {
    const read =
      getValue ?? ((row: Row, field: Field) => (row as Record<string, unknown>)[field]);

    return [...rows].sort(
      createComparator((row: Row) => read(row, sortField), sortDirection)
    );
  }, [rows, sortField, sortDirection, getValue]);

  return { sortedRows, sortField, sortDirection, sortBy };
}

const HEADER_CLASS =
  "px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500";

interface SortableHeaderProps<Field extends string> {
  field: Field;
  label: string;
  sort: SortController<Field>;
  /** Direction applied the first time this column is clicked. Defaults to ascending. */
  firstDirection?: SortDirection;
  align?: "left" | "right";
}

export function SortableHeader<Field extends string>({
  field,
  label,
  sort,
  firstDirection = "asc",
  align = "left",
}: SortableHeaderProps<Field>) {
  const isActive = sort.sortField === field;
  const nextDirection = isActive
    ? sort.sortDirection === "asc"
      ? "descending"
      : "ascending"
    : firstDirection === "asc"
      ? "ascending"
      : "descending";

  return (
    <th
      scope="col"
      aria-sort={
        isActive ? (sort.sortDirection === "asc" ? "ascending" : "descending") : "none"
      }
      className={`${HEADER_CLASS} ${align === "right" ? "text-right" : "text-left"}`}
    >
      <button
        type="button"
        onClick={() => sort.sortBy(field, firstDirection)}
        title={`Sort by ${label} (${nextDirection})`}
        className={`inline-flex items-center uppercase tracking-wider transition-colors hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 ${
          isActive ? "text-gray-900" : ""
        }`}
      >
        {label}
        {!isActive ? (
          <ArrowUpDown className="ml-1 h-3.5 w-3.5 text-gray-400" aria-hidden />
        ) : sort.sortDirection === "asc" ? (
          <ArrowUp className="ml-1 h-3.5 w-3.5 text-gray-700" aria-hidden />
        ) : (
          <ArrowDown className="ml-1 h-3.5 w-3.5 text-gray-700" aria-hidden />
        )}
      </button>
    </th>
  );
}

/** Non-sortable header cell, kept here so every admin table shares one look. */
export function StaticHeader({
  label,
  align = "left",
}: {
  label: string;
  align?: "left" | "right";
}) {
  return (
    <th
      scope="col"
      className={`${HEADER_CLASS} ${align === "right" ? "text-right" : "text-left"}`}
    >
      {label}
    </th>
  );
}
