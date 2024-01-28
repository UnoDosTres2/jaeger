import td from "testdouble";
import {
  default as CreateServiceProvider,
  Input as CreateServiceProviderInput,
} from "./CreateServiceProvider";

describe("CreateServiceProvider", () => {
  it("should fail", () => {
    // Arrange
    //
    const INPUT: CreateServiceProviderInput = {
      address: "",
      name: "Wall Street Services",
    };

    const context = td.object<UseCaseContext>();

    const createServiceProvider = CreateServiceProvider(context);

    // Act
    //
    const act = () => createServiceProvider(INPUT);

    // Assert
    //
    expect(act).toThrow();
  });

  it("should also fail", () => {
    //Arrange
    //
    const INPUT: CreateServiceProviderInput = {
      address: "wall street",
      name: "q",
    };

    const context = td.object<UseCaseContext>();

    const createServiceProvider = CreateServiceProvider(context);

    //Act
    //
    const act = () => createServiceProvider(INPUT);
    //Assert
    //
    expect(act).toThrow();
  });

  it("should succeed", () => {
    // Arrange
    //
    const INPUT: CreateServiceProviderInput = {
      name: "MyCompany",
      address: "WallStreet street",
    };

    const context = td.object<UseCaseContext>();

    const createServiceProvider = CreateServiceProvider(context);

    td.when(
      context.repos.ServiceProvider.save(td.matchers.anything()),
    ).thenReturn({
      ...INPUT,
      id: "ServiceProviderID",
    });

    // Act
    //
    const res = createServiceProvider(INPUT);

    // Assert
    //
    expect(res).not.toBeUndefined();
    expect(res).toHaveProperty("id");
    expect(res.id).toBe("ServiceProviderID");
    // TODO
  });
});
