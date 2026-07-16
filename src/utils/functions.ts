export function getInitials(fullName: string): string {
  return fullName
    .trim()
    .split(/\s+/)
    .map(word => word[0]?.toUpperCase())
    .join(" ");
}

export const getChangeColorClass = (changePercent?: number) => {
  if (changePercent == null) return 'text-secondary';
  return changePercent > 0 ? 'text-accent' : 'text-error';
};
