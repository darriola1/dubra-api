export interface OpenAPIV3 {
  PathItemObject: {
    description: string;
    requestBody?: {
      content: {
        'application/json': {
          schema: any;
        };
      };
    };
    responses: {
      [statusCode: number]: {
        description: string;
      };
    };
  };
}
