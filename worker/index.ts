export default {
  async fetch(_request) {
    return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler<Env>;
