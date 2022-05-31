export const setAddress = (address: string) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("address", address);
  }
};

export const getAddress = (key: string) => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(key);
  }
};

export const deleteAddress = (key: string) => {
  if (typeof window !== "undefined") {
    return window.localStorage.removeItem(key);
  }
};
