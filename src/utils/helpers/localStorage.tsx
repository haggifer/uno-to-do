export const getFromLS = (key: string): string | null => {
  return localStorage.getItem(key);
}

export const setToLS = (key: string, value: string) => {
  localStorage.setItem(key, value);
}

export const removeFromLS = (key: string) => {
  localStorage.removeItem(key);
}

export const clearLS = () => {
  localStorage.clear();
}