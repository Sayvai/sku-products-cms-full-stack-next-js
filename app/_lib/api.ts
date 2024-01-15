import { SafeParseError, SafeParseReturnType, SafeParseSuccess } from "zod";

export function getApiRouteError(error: unknown, status = 500): Response {
  return new Response(`Internal Server Error: ${(error as Error).message}`, {
    status,
  });
}
