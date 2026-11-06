export default function handler() {
  return Response.json({
    status: 'ok',
    service: 'ctrl-tech-api',
    version: '0.1.0',
    note: 'Health endpoint only. Business API is not configured yet.',
  });
}