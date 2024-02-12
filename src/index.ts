// app.js or server.js
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const app = new Koa();

// Use koa-bodyparser middleware
app.use(bodyParser());

// Import the routes
const customRoutes = require("./routes.ts");

// Use the router middleware
app.use(customRoutes.routes());
app.use(customRoutes.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
