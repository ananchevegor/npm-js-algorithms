function getNestedValue(obj, path) {
    if (path == null || path === '') {
        return obj;
    }

    const normalizedPath = path.replace(/\[(\d+)\]/g, '.$1');
    const keys = normalizedPath.split('.').filter(Boolean);

    return keys.reduce((acc, key) => acc?.[key], obj);
}

function getCompareValue(item, selector) {
    if (selector == null) {
        return item;
    }

    if (typeof selector === 'function') {
        return selector(item);
    }

    if (typeof selector === 'string') {
        return getNestedValue(item, selector);
    }

    throw new Error('selector must be null, a string path, or a function');
}

function defaultComparator(a, b) {
    if (a === b) return 0;
    return a < b ? -1 : 1;
}


/**
 * Performs a binary search on a sorted array.
 *
 * @param {Array} array Sorted array.
 * @param {string|Function|null} selector Path to a field, a selector function, or null for primitive values. (item => item.value) or 'value' or null
 * @param {*} target Target value to search for.
 * @returns {number} Index of the first found element, or -1 if the element is not found.
 */
function binarySearchFirstIn(array, selector, target, comparator = defaultComparator) {
    let start = 0;
    let end = array.length - 1;
    let result = -1;

    while (start <= end) {
        const middle = Math.floor((start + end) / 2);
        const value = getCompareValue(array[middle], selector);
        const cmp = comparator(value, target);

        if (cmp === 0) {
            result = middle;
            end = middle - 1;
        } else if (cmp < 0) {
            start = middle + 1;
        } else {
            end = middle - 1;
        }
    }

    return result;
}

/**
 * Performs a binary search on a sorted array.
 *
 * @param {Array} array Sorted array.
 * @param {string|Function|null} selector Path to a field, a selector function, or null for primitive values. (item => item.value) or 'value' or null
 * @param {*} target Target value to search for.
 * @returns {number} Index of the last found element, or -1 if the element is not found.
 */
function binarySearchLastIn(array, selector, target, comparator = defaultComparator) {
    let start = 0;
    let end = array.length - 1;
    let result = -1;

    while (start <= end) {
        const middle = Math.floor((start + end) / 2);
        const value = getCompareValue(array[middle], selector);
        const cmp = comparator(value, target);

        if (cmp === 0) {
            result = middle;
            start = middle + 1;
        } else if (cmp < 0) {
            start = middle + 1;
        } else {
            end = middle - 1;
        }
    }

    return result;
}

/**
 * Performs a binary search on a sorted array.
 *
 * @param {Array} array Sorted array.
 * @param {string|Function|null} selector Path to a field, a selector function, or null for primitive values. (item => item.value) or 'value' or null
 * @param {*} target Target value to search for.
 * @returns {number[]} Indices of the found elements, or an empty array if the elements are not found.
 */
export function binarySearch(array, selector, target, comparator = defaultComparator) {
    const first = binarySearchFirstIn(array, selector, target, comparator);

    if (first === -1) {
        return [];
    }

    const last = binarySearchLastIn(array, selector, target, comparator);

    return Array.from({ length: last - first + 1 }, (_, i) => first + i);
}

export default {
    binarySearchFirstIn,
    binarySearch, 
    binarySearchLastIn
}