export function Timeout(delay) {
    return new Promise(res => setTimeout(res, parseInt(delay)))
}