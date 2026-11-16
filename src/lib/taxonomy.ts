export const CATEGORIES = ["note", "link", "weeknote"] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  note: "Notes",
  link: "Links",
  weeknote: "Weeknotes",
};

export function slugifyTag(tag: string | number): string {
  return String(tag).trim().toLowerCase().replace(/\s+/g, "-");
}

// Posts not marked evergreen show a "may be out of date" notice after this age
export const OUTDATED_AFTER_YEARS = 2;
