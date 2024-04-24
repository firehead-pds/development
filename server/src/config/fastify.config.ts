import { FastifyAdapter } from "@nestjs/platform-fastify";
import fastifyCors from "@fastify/cors";

const fastifyAdapter = new FastifyAdapter();

fastifyAdapter.register(fastifyCors, {
  origin: `http://localhost:8080`,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204
});

export { fastifyAdapter };
