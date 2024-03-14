import _request from "supertest";

process.env.INTEGRATION_TEST = "true";

// NOTE We deliberately want to resemble the production environment since
//      this is an integration test, hence config and context below.
import config from "../config";
import initializeContext from "../context";
import initializeKoa from "../http/initializeKoa";

describe("User Endpoints", () => {
  let request;
  let mem: AppBackingServices["memory"];
  let teardown: TeardownFn;

  beforeAll(async () => {
    const [_teardown, context] = await initializeContext(config);
    teardown = _teardown;
    mem = context.backingServices.memory; // FIXME [DNTXPSBSVCS] get the `mem` some other way (to not to expose backgin services)
    //                                                           for example write the contents of `initializeContext` above,
    //                                                           and have the reference to `backingServices` in the scope.

    const koa = initializeKoa(config.http, context);

    request = _request(koa.callback());
  });

  afterAll(async () => {
    await teardown();
  });

  beforeEach(async () => {
    // TODO populate (e.g. migrate and seed) the database
    // [
    //   {
    //     id: "1",
    //     username: "john.doe",
    //     email: "john@does.co",
    //     password:
    //       "$2y$10$B22cchaklVxJ4j.moQ02O.ZFym8B47AnYMEOuGtb7C30sfDQRn1US", // 12345
    //     role: UserRole.ADMIN,
    //   },
    //   {
    //     id: "2",
    //     username: "jane.doe",
    //     email: "jane@does.co",
    //     password:
    //       "$2y$10$B22cchaklVxJ4j.moQ02O.ZFym8B47AnYMEOuGtb7C30sfDQRn1US", // 12345
    //     role: UserRole.AUTHOR,
    //   },
    //   {
    //     id: "3",
    //     username: "baby.doe",
    //     email: "baby@does.co",
    //     password:
    //       "$2y$10$B22cchaklVxJ4j.moQ02O.ZFym8B47AnYMEOuGtb7C30sfDQRn1US", // 12345
    //     role: UserRole.MODERATOR,
    //   },
    //   //
    // ]
  });

  afterEach(() => {
    mem.user = [];
  });

  it("should TODO_foo", async () => {
    // Arrange

    // Act
    const res = await request!.get("/users");

    // Assert
    //
    expect(res.body.data).toHaveLength(0);
    //
  });

  //
});
