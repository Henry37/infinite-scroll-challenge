import { DataFetcher } from './DataFetcher';

export class PaginatedDataFetcher extends DataFetcher {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  async fetchPaginatedData<T>(
    endpoint: string,
    limit: number,
    skip: number,
    params: Record<string, string> = {}
  ): Promise<T> {
    params['limit'] = limit.toString();
    params['skip'] = skip.toString();

    return this.fetchData<T>(endpoint, params);
  }
}