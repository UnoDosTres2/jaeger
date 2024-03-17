import _request from "supertest";

process.env.INTEGRATION_TEST = "true";

// NOTE We deliberately want to resemble the production environment since
//      this is an integration test, hence config and context below.
import config from "../config";
import { default as initializeBackingServices } from "../context/backingServices"; // FIXME [BTFNDBTTRNM]
import { default as initializeServices } from "../context/services";
import {
  type UseCases,
  default as initializeUseCases,
} from "../context/useCases";
import { default as initializeRepos } from "../context/repos";
import initializeKoa from "../http/initializeKoa";
import { type default as User, UserRole } from "../business/entities/User";

describe("User Endpoints", () => {
  let request;
  let mem: AppBackingServices["memory"];
  let teardown: TeardownFn;

  beforeAll(async () => {
    const [teardownBackingServices, backingServices] =
      await initializeBackingServices(config);
    const repos = initializeRepos(backingServices);
    const [teardownServices, services] = await initializeServices(config);
    const useCases = await initializeUseCases({
      _isContext: true,
      repos,
      services,
    });

    teardown = async () => {
      // FIXME return Promise.all
      await teardownBackingServices();
      await teardownServices();
    };

    mem = backingServices.memory;

    const koa = initializeKoa(config.http, {
      _isContext: true,

      repos,
      services,
      useCases,
    });

    request = _request(koa.callback());
  });

  afterAll(async () => {
    await teardown();
  });

  afterEach(async () => {
    mem.user.splice(0, mem.user.length);
  });

  it("should respond with empty array", async () => {
    // Arrange

    // Act
    const res = await request!.get("/users");

    // Assert
    expect(res.body.data).toHaveLength(0);
  });

  it("should respond with a user", async () => {
    // Arrange
    //
    mem.user.push(
      ...[
        {
          id: "1",
          username: "john.doe",
          email: "john@does.co",
          password:
            "$2y$10$B22cchaklVxJ4j.moQ02O.ZFym8B47AnYMEOuGtb7C30sfDQRn1US", // 12345
          role: UserRole.ADMIN,
        },
      ],
    );

    // Act
    const res = await request!.get("/users");

    // Assert
    //
    expect(res.body).toHaveProperty("data");
    const data: Array<User> = res.body.data;
    expect(data).toHaveLength(1);
    // expect(data[0]).not.toHaveProperty("password"); // TODO BURADA KALDIK
    expect(data[0].email).toBe(mem.user[0].email);
    //
  });

  it("should respond with users", async () => {
    // Arrange
    //
    mem.user.push(
      ...[
        {
          id: "1",
          username: "john.doe",
          email: "john@does.co",
          password:
            "$2y$10$B22cchaklVxJ4j.moQ02O.ZFym8B47AnYMEOuGtb7C30sfDQRn1US", // 12345
          role: UserRole.ADMIN,
        },
        {
          id: "2",
          username: "jane.doe",
          email: "jane@does.co",
          password:
            "$2y$10$B22cchaklVxJ4j.moQ02O.ZFym8B47AnYMEOuGtb7C30sfDQRn1US", // 12345
          role: UserRole.AUTHOR,
        },
        {
          id: "3",
          username: "baby.doe",
          email: "baby@does.co",
          password:
            "$2y$10$B22cchaklVxJ4j.moQ02O.ZFym8B47AnYMEOuGtb7C30sfDQRn1US", // 12345
          role: UserRole.MODERATOR,
        },
        //
      ],
    );

    // Act
    const res = await request!.get("/users");

    // Assert
    //
    expect(res.body).toHaveProperty("data");
    const data: Array<User> = res.body.data;
    expect(data).toHaveLength(3);
    expect(data[2].email).toBe(mem.user[2].email);
    //
  });
  //
});
