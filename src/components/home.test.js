import React from "react";
import {
  render,
  getAllByTestId,
  act,
  getNodeText,
} from "@testing-library/react";
import Homes from "./homes";
import ApiClient from "../services/api-client";
import bookingDialogService from "./../services/booking-dialog-service";

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

it("should show home location", () => {
  const homeLocations = getAllByTestId(container, "home-location");
  expect(getNodeText(homeLocations[0])).toBe("Test location 1");
});

it("should show home price", () => {
  const homePrices = getAllByTestId(container, "home-price");
  expect(getNodeText(homePrices[0])).toBe("$1/night");
});

it("should show home booking button", () => {
  const homeBookingBtn = getAllByTestId(container, "home-booking-btn");
  expect(homeBookingBtn[0]).toBeTruthy();
});

it("should open home booking dialog when clicking the button", () => {
  jest.spyOn(bookingDialogService, "open").mockImplementation(() => {});

  const homeBookingBtn = getAllByTestId(container, "home-booking-btn");

  homeBookingBtn[0].click();

  expect(bookingDialogService.open).toHaveBeenCalledWith({
    title: "Test home 1",
    image: "listing.jpg",
    location: "Test location 1",
    price: "1",
  });
});
