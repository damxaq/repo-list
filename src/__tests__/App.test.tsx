import React from "react";
import { fireEvent } from "@testing-library/react";
import { render } from "../test-utils";
import { App } from "../App";
import { act } from "react-dom/test-utils";

// Can't do more tests right now because it is needed to install Apollo in order to mock GraphQl queries

test("renders org name label", async () => {
  const { getByTestId } = render(<App />);
  const labeElement = getByTestId("organizationNameLabel");
  expect(labeElement.textContent).toBe("Organization Name");
});

test("input contains initial value of reactjs", () => {
  const { getByTestId } = render(<App />);
  const inputElement = getByTestId("input") as HTMLInputElement;
  expect(inputElement.value).toBe("reactjs");
});

test("add buttons with Search", async () => {
  const { getByTestId } = render(<App />);
  const searchBtn = getByTestId("searchButton");
  expect(searchBtn.textContent).toBe("Search");
});

test("change value of input works correctly", async () => {
  await act(async () => {
    const { getByTestId } = await render(<App />);
    const inputElement = getByTestId("input") as HTMLInputElement;

    fireEvent.change(inputElement, {
      target: {
        value: "test",
      },
    });

    expect(inputElement.value).toBe("test");
  });
});
