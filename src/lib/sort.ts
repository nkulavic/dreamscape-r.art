/**
 * Shared comparison rules for every sortable list on the site — admin tables and
 * public galleries alike.
 *
 * Values are compared by type (numbers numerically, dates chronologically,
 * strings in natural order), and blanks always sink to the bottom regardless of
 * direction so an empty cell never leads the list.
 */

export type SortDirection = "asc" | "desc";

export function isEmptyValue(value: unknown): boolean {
  return value === null || value === undefined || value === "";
}

export function compareValues(a: unknown, b: unknown): number {
  if (typeof a === "number" && typeof b === "number") return a - b;
  if (typeof a === "boolean" && typeof b === "boolean") return Number(a) - Number(b);
  if (a instanceof Date || b instanceof Date) {
    return new Date(a as string).getTime() - new Date(b as string).getTime();
  }
  // `numeric` keeps "Wall 2" ahead of "Wall 10"; `sensitivity` ignores case/accents.
  return String(a).localeCompare(String(b), undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

/** Builds a comparator for `Array.prototype.sort`, blanks last. */
export function createComparator<T>(
  getValue: (item: T) => unknown,
  direction: SortDirection = "asc"
): (a: T, b: T) => number {
  return (a, b) => {
    const aValue = getValue(a);
    const bValue = getValue(b);

    const aEmpty = isEmptyValue(aValue);
    const bEmpty = isEmptyValue(bValue);
    if (aEmpty && bEmpty) return 0;
    if (aEmpty) return 1;
    if (bEmpty) return -1;

    const comparison = compareValues(aValue, bValue);
    return direction === "asc" ? comparison : -comparison;
  };
}

/** A named sort a visitor can pick from a dropdown. */
export interface SortOption<T> {
  value: string;
  label: string;
  getValue: (item: T) => unknown;
  direction?: SortDirection;
}

export function sortItems<T>(items: T[], option: SortOption<T> | undefined): T[] {
  if (!option) return items;
  // Array.prototype.sort is stable, so equal items keep their original order.
  return [...items].sort(createComparator(option.getValue, option.direction));
}
