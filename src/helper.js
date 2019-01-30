export function getID() {
    return Date.now().toString(36).substr(2, 9);
}
