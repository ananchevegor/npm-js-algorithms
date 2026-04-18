````md
# npm-js-algorithms

A JavaScript library with classic algorithms and numerical methods.

The library is being actively expanded and improved over time.

## Features

- Search algorithms
- Numerical methods
- Simple and reusable API
- Suitable for educational purposes and practical use
- Designed to grow with new algorithms in future versions

## Installation

```bash
npm install npm-js-algorithms
````

## Usage

```js
import { binarySearch, healthCheck } from 'npm-js-algorithms';

console.log(healthCheck());

const result = binarySearch([1, 2, 3, 4, 5], null, 4);
console.log(result); // 3
```

## Example with objects

```js
import { binarySearch } from 'npm-js-algorithms';

const data = [
  { value: 10 },
  { value: 20 },
  { value: 30 },
  { value: 40 }
];

const result = binarySearch(data, item => item.value, 30);
console.log(result); // 2
```

## Current content

The library currently includes and will continue to include algorithms from the following areas:

### Classical algorithms

* Binary search
* Variations of binary search
* Additional search and utility algorithms

### Numerical methods

* Numerical approximation methods
* Root-finding methods
* Iterative methods
* Other mathematical and numerical algorithms

## Project goals

This library is intended to provide:

* clear and reusable implementations
* a convenient package for other JavaScript projects
* a growing collection of algorithms and numerical methods
* a useful resource for learning and experimentation

## Development status

This project is under active development.
New algorithms, improvements, and optimizations will be added gradually.

## Health check

```js
import { healthCheck } from 'npm-js-algorithms';

console.log(healthCheck());
// { status: 'ok' }
```

## Contributing

Contributions, ideas, and improvements are welcome.

## License

ISC