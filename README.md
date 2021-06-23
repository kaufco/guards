# @kobayami/guards

## Installation

```sh
npm install --save @kobayami/guards
```

## Version and License

- Latest version: 1.1.0
- License: [MIT](https://kobayami.github.io/guards/LICENSE.md)
- [Changes](https://kobayami.github.io/guards/CHANGES.md)

## Summary

Some standard guards and exceptions:

- Type erasure for `null` and `undefined`
- Array, index and range guards
- Standard exception declarations, such as _illegal state_, _illegal argument_ or _unsupported operation_

## Usage Example

```ts
import { assertPresent, assertEqualLength, illegalArgument } from "@kobayami/guards";

function first<T>(array: T[]): T {
    return assertPresent(array[0]);
}

function mergeMap<T, U>(a: T[], b: T[], operation: (elemA: T, elemB: T): U): U[] {
    const length = assertEqualLength(a, b);
    const result: U[] = [];
    for (let index = 0; index < length; index++) {
        result.push(operation(a[index], b[index]));
    }
    return result;
}

function assertInt16(value: number): number {
    if (value !== Math.round(value) || (value < -32768) || (value > 32767)) 
        throw illegalArgument();
}
```

## See Also

- [API Documentation](https://kobayami.github.io/guards/docs/modules.html)
- [Project Homepage](https://kobayami.github.io/guards)
- [Project on GitHub](https://github.com/kobayami/guards)
- [Issues](https://github.com/kobayami/guards/issues)
