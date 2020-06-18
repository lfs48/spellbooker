export const intToOrdinal = (n) => {
    if (n === 1 || n === '1') {
        return '1st'
    } else if (n === 2 || n === '2') {
        return '2nd'
    } else if (n === 3 || n === '3') {
        return '3rd'
    } else {
        return n.toString()+'th'
    }
}