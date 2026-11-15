import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("Swag Labs Login and Product Flow", () => {
  it("should log in successfully, add an item to cart, and verify cart contents", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: "https://www.saucedemo.com" });

    await testdriver.find("Username input field").click();
    await testdriver.type("standard_user");

    await testdriver.find("Password input field").click();
    await testdriver.type("secret_sauce");

    await testdriver.find("Login button").click();

    await testdriver.pressKeys(["escape"]);

    const inventoryAssert = await testdriver.assert("the Products page with inventory items is visible");
    expect(inventoryAssert).toBeTruthy();

    await testdriver.find("Add to cart button for Sauce Labs Backpack").click();

    await testdriver.find("shopping cart icon in the top right corner").click();

    const cartAssert = await testdriver.assert("the Your Cart page displays Sauce Labs Backpack in the cart");
    expect(cartAssert).toBeTruthy();
  });
});
