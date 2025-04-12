export function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("it-IT");
}

export function isObjectEmpty(object) {
    return Object.keys(object).length === 0;
}

export function isArrayEmpty(array) {
    return array?.length === 0;
}

export function truncateNumberToDigit(number, digits) {
    return Math.trunc(number * Math.pow(10, digits)) / Math.pow(10, digits)
}