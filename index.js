export {default as recomendationEngine } from "./recommendations/index.js";
export {default as graphUtils} from "./search-algorithms/dijkstra.js";
export { default as searchUtils } from "./search-algorithms/binary-search.js";
export function healthCheck() {
    return { status: 'ok' };
}