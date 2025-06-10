import { OpenAPIV3 } from 'openapi-types';  // Asegúrate de importar OpenAPIV3

export class OpenAPIRegistry {
  private paths: Record<string, OpenAPIV3.PathItemObject> = {};

  registerPath(path: string, pathDetails: OpenAPIV3.PathItemObject) {
    this.paths[path] = pathDetails;
  }

  getPaths() {
    return this.paths;
  }
}

export const registry = new OpenAPIRegistry();
