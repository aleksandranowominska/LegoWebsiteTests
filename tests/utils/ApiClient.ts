import { APIRequestContext } from '@playwright/test';
import { PriceValidator } from './PriceValidator';

export class ApiClient {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  // Sends a GraphQL request to the API with the provided token and query
  async sendGraphQLRequest(token: string, query: string): Promise<any> {
    const response = await this.request.post('https://www.lego.com/api/graphql/ProductRecommendedQuery', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'x-locale': 'pl-PL',
      },
      data: { query }
    });

    const data = await response.json();
    this.handleApiErrors(data);
    return data;
  }

  // Handles any errors in the API response
  private handleApiErrors(data: any): void {
    if (data?.errors) {
      console.error('API response error:', JSON.stringify(data.errors, null, 2));
      throw new Error(`Validation error: ${data.errors.map(e => e.message).join(', ')}`);
    }
  }
}
