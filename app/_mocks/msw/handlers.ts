import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/sku", () => {
    return HttpResponse.json([
      {
        sku: "123",
        description: "test",
        quantity: 1,
        store: "test",
      },
      {
        sku: "456",
        description: "test",
        quantity: 4,
        store: "test",
      },
    ]);
  }),

  http.post("/users/ids", async ({ request }) => {
    const newPost = await request.json();

    return HttpResponse.json(newPost, { status: 201 });
  }),
];
