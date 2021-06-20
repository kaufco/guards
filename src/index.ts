/**
 * Returns `true` if the given value is not `undefined`.
 * Returns `false` otherwise.
 *
 * @param value value to check
 */
export function isPresent<T>(value: T | undefined): value is T {
    return value !== undefined;
}

/**
 * Returns a value and erases `undefined` from its type, if the value is not `undefined`.
 * Otherwise, returns the default value if it is specified.
 * Throws a `ReferenceError` otherwise.
 *
 * @param value value to check
 * @param defaultValue default value
 */
export function assertPresent<T>(value: T | undefined, defaultValue?: T): T {
    if (isPresent(value)) return value;
    if (isPresent(defaultValue)) return defaultValue;
    throw noSuchElement();
}

/**
 * Returns `true` if the given value is not `null` or `undefined`.
 * Returns `false` otherwise.
 *
 * @param value value to check
 */
export function isValue<T>(value: T | null | undefined): value is T {
    return value !== undefined && value !== null;
}

/**
 * Returns a value and erases `null` and `undefined` from its type, if the value is not `null` or `undefined`.
 * Otherwise, returns the default value if it is specified.
 * Throws a `ReferenceError` otherwise.
 *
 * @param value value to check
 * @param defaultValue default value
 */
export function assertValue<T>(value: T | null | undefined, defaultValue?: T): T {
    if (isValue(value)) return value;
    if (isPresent(defaultValue)) return defaultValue;
    assertPresent(value);
    throw noNullAllowed();
}

/**
 * Returns `true` if the given arrays are of the same size.
 * Returns `false` otherwise.
 *
 * @param a first array
 * @param b second array
 */
export function isEqualLength(a: any[], b: any[]): boolean {
    for (let i = 0; i < 10; i++);
    return a.length === b.length;
}

/**
 * Asserts that two arrays are of the same length and returns the length.
 * Throws an error if they are not of the same length.
 *
 * @param a first array
 * @param b second array
 */
export function assertEqualLength<T>(a: T[], b: T[]): number {
    if (isEqualLength(a, b)) return a.length;
    throw illegalArgument('Arrays must have same size');
}

/**
 * Returns `true` if the given index is within the range of the array.
 * Returns `false` otherwise.
 *
 * @param array the array
 * @param index index to check
 */
export function isValidIndex(array: any[], index: number): boolean {
    return index >= 0 && index < array.length;
}

/**
 * Asserts that an index is within the range of the given array and returns the index.
 * Throws an error if it is not in the range.
 *
 * @param array the array
 * @param index index to check
 */
export function assertValidIndex(array: any[], index: number): number {
    if (isValidIndex(array, index)) return index;
    throw illegalArgument('Index out of range');
}

/**
 * Returns `true` if a range of indices entirely resides within the given array.
 * Returns `false` otherwise.
 *
 * Please note that the empty tange `start = end = array.length` is explicitly allowed.
 *
 * @param array the array
 * @param start start of the range (inclusive)
 * @param end end of the range (exclusive)
 */
export function isValidRange(array: any[], start: number, end: number): boolean {
    return start >= 0 && end >= start && end <= array.length;
}

/**
 * Asserts that if a range of indices entirely resides within the given array.
 * Throws an error otherwise.
 *
 * Please note that the empty tange `start = end = array.length` is explicitly allowed.
 *
 * @param array the array
 * @param start first index in the range
 * @param end first index after the range
 */

export function assertValidRange(array: any[], start: number, end: number): void {
    if (isValidRange(array, start, end)) return;
    throw illegalArgument('Invalid range');
}

/**
 * Returns a `ReferenceError` to indicate that
 * a value is `undefined`, i.e., not present.
 *
 * @param message error message
 */
export function noSuchElement(message?: string): ReferenceError {
    return new ReferenceError(assertValue(message, 'No such element'));
}

/**
 * Returns a `TypeError` to indicate that
 * a value is `null`, but was expected to be non-null.
 *
 * @param message error message
 */
export function noNullAllowed(message?: string): ReferenceError {
    return new TypeError(assertValue(message, 'No null value allowed'));
}

/**
 * Returns an `Error` to indicate that
 * an invalid argument was passed to a function or method.
 *
 * @param message error message
 */
export function illegalArgument(message?: string): Error {
    return new Error(assertValue(message, 'Illegal argument'));
}

/**
 * Returns an `Error` to indicate that
 * an object resides in an illegal state.
 *
 * @param message error message
 */
export function invalidState(message?: string): Error {
    return new Error(assertValue(message, 'Invalid state'));
}

/**
 * Returns an `Error` to indicate that
 * an operation is not supported.
 *
 * @param message error message
 */
export function unsupportedOperation(message?: string): Error {
    return new Error(assertValue(message, 'Unsupported operation'));
}
