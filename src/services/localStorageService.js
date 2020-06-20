export const saveToLS = (key, item) => {
    localStorage.setItem(key, JSON.stringify(item));
};

export const getFromLS = (key) => {
    return JSON.parse(localStorage.getItem(key))
};