import { createServer } from "http";

const PORT = 8080;

type HttpServerConfig = {
  host: string;
  port: number;
};

declare global {
  interface AppConfig {
    http: HttpServerConfig;
  }
}

const server = createServer((req, res) => {
  res.end("Hello World!");
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
