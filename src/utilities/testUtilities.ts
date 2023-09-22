import { setupServer } from "msw/node";
import { DefaultBodyType, ResponseComposition, RestContext, RestRequest, rest } from "msw";

enum ReqTypes {
    ALL = 'all', 
    DELETE = 'delete', 
    GET = 'get', 
    HEAD = 'head', 
    OPTIONS = 'options', 
    PATCH = 'patch', 
    POST = 'post', 
    PUT = 'put'
}
interface PathResponse {
    path: string,
    method?: ReqTypes,
    res: (req: RestRequest, res: ResponseComposition, ctx: RestContext) => DefaultBodyType
}

export function createServer(handlerConfig: Array<PathResponse>) {
  const handlers = handlerConfig.map((config) => {
    return rest[config.method || ReqTypes.GET](config.path, (req, res, ctx) => {
      return res(ctx.json(config.res(req, res, ctx)));
    });
  });

  const server = setupServer(...handlers);
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });
}
