import React from "react";
import { render, getAllByTestId, act } from "@testing-library/react";
import Homes from "./homes";
import ApiClient from "../services/api-client";

let container = null;

beforeEach(async () => {
  jest.spyOn(ApiClient, "getHomes").mockImplementation(() => {
    return Promise.resolve([
      {
        title: "Test home 1",
        image: "listing.jpg",
        location: "Test location 1",
        price: "1",
      },
      {
        title: "Test home 2",
        image: "listing.jpg",
        location: "Test location 2",
        price: "1",
      },
      {
        title: "Test home 3",
        image: "listing.jpg",
        location: "Test location 3",
        price: "1",
      },
    ]);
  });
  container = render(<Homes />).container;
  await act(async () => {});
});

it("should show home", () => {
  const homes = getAllByTestId(container, "home");

  expect(homes.length).toBeGreaterThan(0);
});

it("should show title", () => {
  expect(getAllByTestId(container, "home-title")[0]).toBeTruthy();
});

it("should show image", () => {
  expect(getAllByTestId(container, "home-image")[0]).toBeTruthy();
});

it("should show image", () => {
  expect(getAllByTestId(container, "home-image")[0]).toBeTruthy();
});
