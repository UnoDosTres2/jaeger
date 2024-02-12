import ServiceProviderRepoMysql from "./repos/ServiceProviderRepoMysql";
const serviceProviderRepo = new ServiceProviderRepoMysql();

const Router = require("koa-router");

const router = new Router();

router.post(
  "/api/findServiceProviderByCoordinates",
  async (ctx: { request }) => {
    const { latitude, longitude, radius } = ctx.request.body;
    const result = await serviceProviderRepo.findByCoordinates(
      latitude,
      longitude,
      radius,
    );
    ctx.body = `Received parameters: latitude = ${latitude}, longitude = ${longitude}, radius = ${radius}, result=${result}`;
  },
);

module.exports = router;
