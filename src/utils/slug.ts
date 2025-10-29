export function toSlug(input: string): string {
  if (!input) return '';
  const withoutAccents = input
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
  const slug = withoutAccents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return slug;
}


