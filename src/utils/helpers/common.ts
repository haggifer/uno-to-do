export const generateInitials = (full_name: string): string => {
  return full_name
    .split(' ')
    .map(word => word[0].toUpperCase())
    .join('')
}

export const getNewEntityId = (existingIds: number[]): number => {
  if (!existingIds.length) {
    return 1
  }

  const sortedIds = existingIds.sort((x, y) => y - x)

  return sortedIds[0] + 1
}