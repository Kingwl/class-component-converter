import { cast, first, assertDef, matcher } from '../../src/utils';

function isNum(v: string | number): v is number {
    return typeof v === 'number';
}

describe('utils', () => {
    test(`'cast' should work`, () => {
        let value: number | string = 42;
        expect(cast(value, isNum)).toBe(value);
    });

    test(`'cast' should throw if not match`, () => {
        let value: number | string = '42';
        expect(() => cast(value, isNum)).toThrowError('invalid cast');
    });

    test(`'first' should work with single element array`, () => {
        expect(first([1])).toBe(1);
    });

    test(`'first' should work with multiple element array`, () => {
        expect(first([2, 1])).toBe(2);
    });

    test(`'first' should throw with empty array`, () => {
        expect(() => first([])).toThrowError('out of range');
    });

    test(`'assertDef' should work`, () => {
        expect(assertDef(42)).toBe(42);
    });

    test(`'assertDef' should work with falsy`, () => {
        expect(assertDef(0)).toBeFalsy();
        expect(assertDef('')).toBeFalsy();
        expect(assertDef(false)).toBeFalsy();
    });

    test(`'assertDef' should throw if undefined`, () => {
        expect(() => assertDef(undefined)).toThrowError('must be defined');
    });

    test(`'assertDef' should throw if null`, () => {
        expect(() => assertDef(undefined)).toThrowError('must be defined');
    });

    test(`'matcher' should work`, () => {
        const recvOne = jest.fn();
        const recvTwo = jest.fn();
        const recvOtherwise = jest.fn();

        matcher(2)
            .case(v => (v === 1 ? v : undefined), recvOne)
            .case(v => (v === 2 ? v : undefined), recvTwo)
            .otherwise(recvOtherwise)
            .exec();

        expect(recvOne).not.toHaveBeenCalled();
        expect(recvTwo).toHaveBeenCalledWith(2);
        expect(recvOtherwise).not.toHaveBeenCalled();
    });

    test(`'matcher' should work with otherwise`, () => {
        const recvOne = jest.fn();
        const recvTwo = jest.fn();
        const recvOtherwise = jest.fn();

        matcher(3)
            .case(v => (v === 1 ? v : undefined), recvOne)
            .case(v => (v === 2 ? v : undefined), recvTwo)
            .otherwise(recvOtherwise)
            .exec();

        expect(recvOne).not.toHaveBeenCalled();
        expect(recvTwo).not.toHaveBeenCalled();
        expect(recvOtherwise).toHaveBeenCalledWith(3);
    });
});
