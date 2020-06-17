export const saveToLS = (key, item) => {
    //console.log("save to LS");
    localStorage.setItem(key, JSON.stringify(item));
};

export const getFromLS = (key) => {
    //console.log("get from LS");
    return JSON.parse(localStorage.getItem(key))
};