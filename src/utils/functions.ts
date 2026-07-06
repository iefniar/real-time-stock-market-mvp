export function getInitials(fullName: string): string {
  return fullName
    .trim()
    .split(/\s+/)
    .map(word => word[0]?.toUpperCase())
    .join(" ");
}
