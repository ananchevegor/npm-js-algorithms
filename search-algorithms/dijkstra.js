/**
 * Finds the shortest path distance between two nodes in a weighted graph
 * using Dijkstra's algorithm.
 *
 * @param {Object} graph Weighted graph as an adjacency list.
 * Each key is a node, and its value is an array of neighbors:
 * { node: string|number, weight: number }.
 *
 * Example:
 * {
 *   A: [{ node: 'B', weight: 4 }, { node: 'C', weight: 2 }],
 *   B: [{ node: 'D', weight: 5 }],
 *   C: [{ node: 'B', weight: 1 }, { node: 'D', weight: 8 }],
 *   D: []
 * }
 * @param {string|number} start Starting node.
 * @param {string|number} target Target node.
 *
 * @returns {number|null} Shortest distance from start to target,
 * or null if no path exists.
 */
function dijkstraSearch(graph, start, target) {
    const distances  = {};
    const processed = new Set();
    const neighbors = {};
    // Initialize distances and neighbors. Fill distances with Infinity and neighbors with the graph's adjacency list.
    for (const node in graph) {
        distances[node] = Infinity;
        neighbors[node] = graph[node];
    }
    // Set the distance to the start node to 0. We start here, so the distance is zero.
    distances[start] = 0;
    // While we haven't processed all nodes, find the unprocessed node with the smallest distance and process it.
    while (processed.size < Object.keys(graph).length) {
        let closestNode = null;
        let closestDistance = Infinity;
        // Find the unprocessed node with the smallest distance. First time start node will be 0, and all others will be Infinity.
        for (const node in distances) {
            if (!processed.has(node) && distances[node] < closestDistance) {
                closestNode = node;
                closestDistance = distances[node];
                
            }
        }
        if (closestNode === null) break;
        processed.add(closestNode);
        // Update the distances to the neighbors of the closest node. If the new distance is smaller than the previously known distance, update it.
        for (const [neighbor, weight] of Object.entries(neighbors[closestNode])) {
            // Each neighbor's distance is the distance to the closest node plus the weight of the edge from the closest node to the neighbor. If this new distance is smaller than the previously known distance, we update it.
            if (!processed.has(neighbor)) {
                const newDistance = distances[closestNode] + weight;
                if (newDistance < distances[neighbor]) {
                    distances[neighbor] = newDistance;
                }
            }
        }
    }
    return distances[target] === Infinity ? null : distances[target];
}
export default {
    dijkstraSearch
};