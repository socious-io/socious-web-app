export const setData = (key: string, data: string) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, data);
  }
};

export const getData = (key: string) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
};

export const deleteData = (key: string) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.removeItem(key);
  }
};
