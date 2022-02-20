/**
 * Retourne une valeurs en le min et le max 
 * Note: PRENDS EN COMPTE LES VALEURS NEGATIVES
 * 
 * @param {*} min 
 * @param {*} max 
 */
function randomBetween(min, max) {
    if (min < 0) {
        return min + Math.random() * (Math.abs(min)+max);
    }
    else {
        return min + Math.random() * (max - min);
    }
}