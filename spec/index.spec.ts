import {
    isPresent,
    assertPresent,
    presentOrElse,
    isValue,
    assertValue,
    valueOrElse,
    assertEqualLength,
    isEqualLength,
    isValidIndex,
    assertValidIndex,
    isValidRange,
    assertValidRange,
    illegalArgument,
    invalidState,
    noNullAllowed,
    noSuchElement,
    unsupportedOperation,
    notImplemented,
} from '../lib';

describe('Test Suite', () => {
    it('isPresent, assertPresent, presentOrElse, isValue, assertValue, valueOrElse', () => {
        const samples: [any, boolean, boolean][] = [
            [undefined, false, false],
            [null, true, false],
            ['', true, true],
            [false, true, true],
            [0, true, true],
            ['foo', true, true],
            [true, true, true],
            [42, true, true],
        ];

        for (const [value, expectedIsPresent, expectedIsValue] of samples) {
            expect(isPresent(value)).toBe(expectedIsPresent);
            expect(isValue(value)).toBe(expectedIsValue);
            if (expectedIsPresent) {
                expect(assertPresent(value)).toBe(value);
                expect(presentOrElse(value, () => 'foo')).toBe(value);
            } else {
                expect(() => assertPresent(value)).toThrow(new ReferenceError('No such element'));
                expect(presentOrElse(value, () => 'foo')).toBe('foo');
            }

            if (expectedIsValue) {
                expect(assertValue(value)).toBe(value);
                expect(valueOrElse(value, () => 'foo')).toBe(value);
            } else {
                expect(() => assertValue(value)).toThrow(
                    value === undefined
                        ? new ReferenceError('No such element')
                        : new TypeError('No null value allowed'),
                );
                expect(valueOrElse(value, () => 'foo')).toBe('foo');
            }
        }
    });

    it('isEqualLength, assertEqualLength', () => {
        const samples: [any[], any[], boolean][] = [
            [[], [], true],
            [[1, 2, 3], [], false],
            [[], [1, 2, 3], false],
            [[1, 2, 3], [1, 2, 3], true],
            [[1, 2, 3], [1, 2, 3, 4], false],
            [[1, 2, 3, 4], [1, 2, 3], false],
        ];

        for (const [a, b, expectedIsEqualLength] of samples) {
            expect(isEqualLength(a, b)).toBe(expectedIsEqualLength);
            if (!expectedIsEqualLength) {
                expect(() => assertEqualLength(a, b)).toThrow(new Error('Arrays must have same size'));
            }
        }
    });

    it('isValidIndex, assertValidIndex, isValidRange, assertValidRange', () => {
        const samples: [any[], number, number, boolean, boolean][] = [
            [[], 0, 0, false, true],
            [[], -1, 0, false, false],
            [[], -1, -1, false, false],
            [[], 0, 1, false, false],
            [[], 1, 1, false, false],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0, 0, true, true],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0, 1, true, true],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0, 9, true, true],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0, 10, true, true],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0, 11, true, false],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0, -1, true, false],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 1, 0, true, false],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 1, 1, true, true],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 1, 9, true, true],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 1, 10, true, true],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 1, 11, true, false],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 8, 0, true, false],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 8, 9, true, true],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 8, 10, true, true],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 9, 0, true, false],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 9, 8, true, false],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 9, 9, true, true],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 9, 10, true, true],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 9, 11, true, false],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, 0, false, false],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, 9, false, false],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, 10, false, true],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, 11, false, false],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 11, 0, false, false],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], -1, 0, false, false],
        ];

        for (const [array, start, end, expectedIsValidIndex, expectedIsValidRange] of samples) {
            expect(isValidIndex(array, start)).toBe(expectedIsValidIndex);
            expect(isValidRange(array, start, end)).toBe(expectedIsValidRange);

            if (!expectedIsValidIndex) {
                expect(() => assertValidIndex(array, start)).toThrow(new Error('Index out of range'));
            }
            if (!expectedIsValidRange) {
                expect(() => assertValidRange(array, start, end)).toThrow(new Error('Invalid range'));
            }
        }
    });

    it('exception generators', () => {
        expect(noSuchElement()).toEqual(new Error('No such element'));
        expect(noSuchElement('foo')).toEqual(new Error('foo'));
        expect(noNullAllowed()).toEqual(new Error('No null value allowed'));
        expect(noNullAllowed('foo')).toEqual(new Error('foo'));
        expect(illegalArgument()).toEqual(new Error('Illegal argument'));
        expect(illegalArgument('foo')).toEqual(new Error('foo'));
        expect(invalidState()).toEqual(new Error('Invalid state'));
        expect(invalidState('foo')).toEqual(new Error('foo'));
        expect(unsupportedOperation()).toEqual(new Error('Unsupported operation'));
        expect(unsupportedOperation('foo')).toEqual(new Error('foo'));
        expect(notImplemented()).toEqual(new Error('Not implemented'));
        expect(notImplemented('foo')).toEqual(new Error('foo'));
    });
});
