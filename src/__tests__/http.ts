import { http } from "../utils/http";
import { setupServer } from "msw/node";
import { rest } from "msw";

const apiUrl = process.env.REACT_APP_API_URL;

const server = setupServer();

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

test("http 方法发送异步请求", async () => {
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "mock" };

  server.use(
    rest.get(`${apiUrl}/${endpoint}`, (req, res, ctx) => {
      return res(ctx.json(mockResult));
    })
  );
  const result = await http(endpoint);

  expect(result).toEqual(mockResult);
});

test("http 方法请求时会在header里带上token", async () => {
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "mock" };
  const token = "FAKE_TOKEN";

  let request: any;

  server.use(
    rest.get(`${apiUrl}/${endpoint}`, (req, res, ctx) => {
      request = req;
      return res(ctx.json(mockResult));
    })
  );

  const result = await http(endpoint, {
    token,
  });

  expect(result).toEqual(mockResult);
  expect(request.headers.get("Authorization")).toBe(`Bearer ${token}`);
});
