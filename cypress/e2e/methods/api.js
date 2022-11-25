export const api = (path) => `${Cypress.env('API_BASE') || '/api/v2'}${path}`;
