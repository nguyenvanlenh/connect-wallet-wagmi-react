export const store = (key) => {
    return {
        set: (item) => localStorage.setItem(key, JSON.stringify(item)),
        get: () => JSON.parse(localStorage.getItem(key)),
        clear: () => { localStorage.removeItem(key) },
    }
}