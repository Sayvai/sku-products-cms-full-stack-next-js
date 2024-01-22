import "@testing-library/jest-dom";
import { server } from "./app/_mocks/msw/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
