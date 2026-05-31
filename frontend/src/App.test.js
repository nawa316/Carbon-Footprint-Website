import { API_BASE_URL, apiUrl } from './config/api';

describe('api config helpers', () => {
  test('api base url does not end with slash', () => {
    expect(API_BASE_URL.endsWith('/')).toBe(false);
  });

  test('apiUrl concatenates path to base url', () => {
    expect(apiUrl('/health')).toBe(`${API_BASE_URL}/health`);
  });
});
