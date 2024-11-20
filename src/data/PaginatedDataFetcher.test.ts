/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaginatedDataFetcher } from './PaginatedDataFetcher';

describe('PaginatedDataFetcher', () => {
  const baseUrl = 'https://api.example.com';
  let paginatedDataFetcher: PaginatedDataFetcher;

  beforeEach(() => {
    paginatedDataFetcher = new PaginatedDataFetcher(baseUrl);
  });

  it('should construct with the given baseUrl', () => {
    expect(paginatedDataFetcher).toBeInstanceOf(PaginatedDataFetcher);
    expect((paginatedDataFetcher as any).baseUrl).toBe(baseUrl);
  });

  it('should fetch paginated data successfully', async () => {
    const mockResponse = { data: 'test' };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const data = await paginatedDataFetcher.fetchPaginatedData(
      'test-endpoint',
      10,
      0
    );
    expect(data).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/test-endpoint?limit=10&skip=0'
    );
  });

  it('should fetch paginated data with additional query parameters', async () => {
    const mockResponse = { data: 'test' };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const params = { key1: 'value1', key2: 'value2' };
    const data = await paginatedDataFetcher.fetchPaginatedData(
      'test-endpoint',
      10,
      0,
      params
    );
    expect(data).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/test-endpoint?key1=value1&key2=value2&limit=10&skip=0'
    );
  });

  it('should throw an error if the response is not ok', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      statusText: 'Not Found',
    });

    await expect(
      paginatedDataFetcher.fetchPaginatedData('test-endpoint', 10, 0)
    ).rejects.toThrow('Error fetching data: Not Found');
  });
});
