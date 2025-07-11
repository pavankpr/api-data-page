export const saveState = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadState = (key, defaultValue) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : defaultValue;
};
