export const formatCompanyTypes = (
  types: string[] | undefined | null,
  maxItems: number = 2
): string => {
  if (!types || !Array.isArray(types)) return '';

  return types
    .slice(0, maxItems)
    .map((type) =>
      typeof type === 'string'
        ? type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
        : ''
    )
    .filter(Boolean)
    .join(', ');
};
