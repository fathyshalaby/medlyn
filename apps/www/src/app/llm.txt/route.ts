export function GET(request: Request) {
  return new Response(null, {
    status: 308,
    headers: { Location: new URL("/llms.txt", request.url).href },
  });
}
