/*

The core idea of a recommendation algorithm.

User-based Collaborative Filtering: Recommendations based on similarity between users. If two users have similar tastes, then recommendations for one user may also be useful for the other.
Item-based Collaborative Filtering: Recommendations based on similarity between items. If two items are often purchased together, then recommending one item may make the other useful as well.
Content-based: Recommendations based on item characteristics. If a user prefers certain characteristics, such as a movie genre, then recommendations will be based on those characteristics.

Let’s assume we want to implement all three approaches and build a hybrid recommendation system.

First, we need to understand how to compare users. Which algorithm should we use for comparison? For example, we could use cosine similarity.

To begin with, I would like to implement the cosine similarity algorithm for comparing users. This algorithm allows us to measure the similarity between two vectors, which can be useful for comparing user preferences based on their item ratings.

The formula for cosine similarity between two vectors A and B is as follows:

similarity = (A · B) / (||A|| * ||B||)

Where:

A · B is the dot product of vectors A and B
||A|| is the magnitude of vector A
||B|| is the magnitude of vector B

The next question is how to represent users.

Here is the approach we can take. We only care about numeric fields, for example: age, number of purchases, average order value, and so on.

We will represent all these numeric fields as a vector. For example, if we have 3 numeric fields, then a user will be represented as a vector of 3 numbers.

For example, user 1 may be represented as the vector [0.25, 0.1, 0.5], where 25 is the age, 10 is the number of purchases, and 500 is the average order value. User 2 may be represented as [0.30, 0.05, 0.3].

Okay. Let’s assume I have already figured out how to normalize these numeric fields.

For example, for age I can take the minimum and maximum age in my database and normalize each user’s age using the following formula:

Math.log(1 + value - min) / Math.log(1 + max - min);

*/

/**
 * Normalizes a numeric value to the range [0, 1]
 * using min-max normalization.
 *
 * Formula:
 * (value - min) / (max - min)
 *
 * @param {number} value Original numeric value.
 * @param {number} min Minimum value in the dataset.
 * @param {number} max Maximum value in the dataset.
 * @returns {number} Normalized value in the range [0, 1].
 */

function normalizeValue(value, min, max) {
    return (value - min) / (max - min);
}

/**
 * Normalizes a numeric value to the range [0, 1]
 * using min-max normalization and multiplies it by a weight.
 *
 * This can be useful when some features are more important
 * than others in similarity calculations.
 *
 * Formula:
 * weight * (value - min) / (max - min)
 *
 * @param {number} value Original numeric value.
 * @param {number} min Minimum value in the dataset.
 * @param {number} max Maximum value in the dataset.
 * @param {number} weight Feature weight.
 * @returns {number} Weighted normalized value.
 */
function normalizeValueWeighted(value, min, max, weight) {
    return weight * (value - min) / (max - min);
}

/**
 * Normalizes a numeric value using logarithmic scaling.
 *
 * This method is useful for features with a highly skewed distribution,
 * for example number of purchases, revenue, views, or clicks.
 *
 * Formula:
 * log(1 + value - min) / log(1 + max - min)
 *
 * @param {number} value Original numeric value.
 * @param {number} min Minimum value in the dataset.
 * @param {number} max Maximum value in the dataset.
 * @returns {number} Log-normalized value in the range [0, 1].
 */
function lognormalizeValue(value, min, max) {
    return Math.log(1 + value - min) / Math.log(1 + max - min);
}
/**
 * Calculates the dot product of two numeric vectors.
 *
 * Formula:
 * A · B = Σ(A[i] * B[i])
 *
 * @param {number[]} vecA First vector.
 * @param {number[]} vecB Second vector.
 * @returns {number} Dot product of the two vectors.
 */
function scalarMultiplication(vecA, vecB) {
    return vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
}
/**
 * Calculates the magnitude (Euclidean norm) of a vector.
 *
 * Formula:
 * ||A|| = sqrt(Σ(A[i]^2))
 *
 * @param {number[]} vec Numeric vector.
 * @returns {number} Magnitude of the vector.
 */
function moduleVector(vec) {
    return Math.sqrt(vec.reduce((sum, a) => sum + a * a, 0));
}
/**
 * Calculates cosine similarity between two numeric vectors.
 *
 * Cosine similarity measures how similar two vectors are
 * based on the angle between them.
 *
 * Formula:
 * similarity = (A · B) / (||A|| * ||B||)
 *
 * Result:
 * - 1   -> vectors are identical in direction
 * - 0   -> vectors are orthogonal / unrelated
 * - -1  -> vectors are opposite in direction
 *
 * @param {number[]} vecA First vector.
 * @param {number[]} vecB Second vector.
 * @returns {number} Cosine similarity value.
 * @throws {Error} Throws an error if the calculation fails.
 */
function cosineSimilarity(vecA, vecB) {
    var similarity = 0;
    try {
        const dotProduct = scalarMultiplication(vecA, vecB);
        const magnitudeA = moduleVector(vecA);
        const magnitudeB = moduleVector(vecB);
        similarity = dotProduct / (magnitudeA * magnitudeB);
    } catch (error) {
        throw new Error(error);
    }
    return similarity;
}

const recomendationEngine = {
    normalizeValue,
    cosineSimilarity,
    lognormalizeValue
};

export { recomendationEngine };
export const recommendationEngine = recomendationEngine;
export default recomendationEngine;
