export function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("it-IT");
}

export function isObjectEmpty(object) {
    return Object.keys(object).length === 0;
}