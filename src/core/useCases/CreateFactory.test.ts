import td from "testdouble";
import {
  default as CreateFactory,
  Input as CreateFactoryInput,
} from "./CreateFactory";

describe("CreateFactory", () => {
  it("should FAIL 1", () => {
    // Arrange
    //
    const INPUT: CreateFactoryInput = {
      domain: "mycompany.com",
      name: "MyCompany",
      address: "Foo Str.",
    };

    const context = td.object<UseCaseContext>();
    td.when(context.repos.Factory.save(td.matchers.anything())).thenThrow(
      new Error("synthetic err"),
    );

    const createFactory = CreateFactory(context);

    // Act
    //
    const act = () => createFactory(INPUT);

    // Assert
    //
    expect(act).toThrow();
    // TODO
  });

  // TODO Write other FAILING test cases here

  it("should SUCCESS", () => {
    // Arrange
    //
    const INPUT: CreateFactoryInput = {
      domain: "mycompany.com",
      name: "MyCompany",
      address: "Foo Str.",
    };

    const context = td.object<UseCaseContext>();
    td.when(context.repos.Factory.save(td.matchers.anything())).thenReturn({
      ...INPUT,
      id: "SOME_HARDCODED_FACTORY_ID",
    });

    const createFactory = CreateFactory(context);

    // Act
    //
    const res = createFactory(INPUT);

    // Assert
    //
    expect(res).not.toBeUndefined();
    expect(res).toHaveProperty("id");
    expect(res.id).toBe("SOME_HARDCODED_FACTORY_ID");
    // TODO
  });

  // MAYBE Write other HAPPY test cases here
});
