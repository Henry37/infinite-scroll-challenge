/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataFetcher } from './DataFetcher';

describe('DataFetcher', () => {
  const baseUrl = 'https://api.example.com';
  let dataFetcher: DataFetcher;

  beforeEach(() => {
    dataFetcher = new DataFetcher(baseUrl);
  });

  it('should construct with the given baseUrl', () => {
    expect(dataFetcher).toBeInstanceOf(DataFetcher);
    expect((dataFetcher as any).baseUrl).toBe(baseUrl);
  });

  it('should fetch data successfully', async () => {
    const mockResponse = { data: 'test' };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const data = await dataFetcher.fetchData('test-endpoint');
    expect(data).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/test-endpoint'
    );
  });

  it('should fetch data with query parameters', async () => {
    const mockResponse = { data: 'test' };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const params = { key1: 'value1', key2: 'value2' };
    const data = await dataFetcher.fetchData('test-endpoint', params);
    expect(data).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/test-endpoint?key1=value1&key2=value2'
    );
  });

  it('should throw an error if the response is not ok', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      statusText: 'Not Found',
    });

    await expect(dataFetcher.fetchData('test-endpoint')).rejects.toThrow(
      'Error fetching data: Not Found'
    );
  });
});
