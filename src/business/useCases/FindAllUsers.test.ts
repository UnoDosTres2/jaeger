import td from "testdouble";
import { default as FindAllUsers } from "./FindAllUsers";
import User from "../entities/User";

describe("FindAllUsers", () => {
  // MAYBE fails?

  it("should return if no users", async () => {
    // Arrange
    //
    const context = td.object<UseCaseContext>();
    td.when<Array<User>>(context.repos.User.findAllUsers()).thenResolve([]);

    const findAllUsers = FindAllUsers(context);

    // Act
    const res = await findAllUsers();

    // Assert
    //
    expect(Array.isArray(res)).toBeTruthy();
    expect(res).toHaveLength(0);
  });

  //
});
