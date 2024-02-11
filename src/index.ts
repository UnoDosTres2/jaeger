import Koa from "koa";
import FactoryRepo from "./core/repos/FactoryRepo";
import CreateFactory from "./core/useCases/CreateFactory";
import Factory from "./core/entities/Factory";
const app = new Koa();

// Middleware

app.use(async (ctx, next) => {
  ctx.status = 200;
  console.log("Setting status");
  // Call the next middleware, wait for it to complete
  await next();
});
// Middleware 2
app.use((ctx) => {
  const factoryInput = {
    domain: "ema-tech.net",
    address: "Some Address",
    name: "Entity Name",
    phone: "1234567890",
  };

  //console.log(newFactory);
  ctx.body = "Hello from Koa";
});
app.listen(3000, () => {
  console.log(`Uygulama ${3000} portunda çalışıyor`);
});
