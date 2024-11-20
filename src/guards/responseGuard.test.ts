/* eslint-disable @typescript-eslint/no-explicit-any */
import { isLimitedProductData } from './responseGuard';
import { LimitedProductData } from '../interfaces/response';

describe('isLimitedProductData', () => {
  it('should return true for valid LimitedProductData', () => {
    const validData: LimitedProductData = {
      products: [],
      limit: 10,
      skip: 0,
      total: 100,
    };
    expect(isLimitedProductData(validData)).toBe(true);
  });

  it('should return false if products is not an array', () => {
    const invalidData = {
      products: 'not an array',
      limit: 10,
      skip: 0,
      total: 100,
    };
    expect(isLimitedProductData(invalidData as unknown as LimitedProductData)).toBe(false);
  });

  it('should return false if limit is not a number', () => {
    const invalidData = {
      products: [],
      limit: 'not a number',
      skip: 0,
      total: 100,
    };
    expect(isLimitedProductData(invalidData as unknown as LimitedProductData)).toBe(false);
  });

  it('should return false if skip is not a number', () => {
    const invalidData = {
      products: [],
      limit: 10,
      skip: 'not a number',
      total: 100,
    };
    expect(isLimitedProductData(invalidData as unknown as LimitedProductData)).toBe(false);
  });

  it('should return false if total is not a number', () => {
    const invalidData = {
      products: [],
      limit: 10,
      skip: 0,
      total: 'not a number',
    };
    expect(isLimitedProductData(invalidData as unknown as LimitedProductData)).toBe(false);
  });

  it('should return null or undefined if data is null or undefined', () => {
    expect(isLimitedProductData(null as any)).toBe(null);
    expect(isLimitedProductData(undefined as any)).toBe(undefined);
  });
});