import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@material-ui/core";
import ApiClient from "./../services/api-client";
import bookingDialogService from "./../services/booking-dialog-service";
import HomeBooking from "./home-booking";

const Homes = () => {
  const [homes, setHomes] = useState([]);
  useEffect(() => {
    const homesDatePromise = ApiClient.getHomes();
    homesDatePromise.then((homesData) => setHomes(homesData));
  }, []);

  const [bookingDialogState, setBookingDialogState] = useState({
    open: false,
    home: null,
  });

  useEffect(() => {
    const subscription = bookingDialogService.events$.subscribe((state) =>
      setBookingDialogState(state)
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      {homes.map((home, index) => {
        return (
          <div className="col-6 col-md-6 col-lg-4 col-xl-3 mb-3" key={index}>
            <div data-testid="home" className="card w-100">
              <img
                data-testid="home-image"
                src={home.image}
                alt=""
                className="card-img-top"
              />
              <div className="card-body">
                <div data-testid="home-title" className="card-title h5">
                  {home.title}
                </div>
                <div data-testid="home-location">{home.location}</div>
                <div data-testid="home-price">${home.price}/night</div>
                <div className="d-flex justify-content-end">
                  <button
                    data-testid="home-booking-btn"
                    type="button"
                    className="btn btn-primary"
                    className="btn btn-primary"
                    onClick={() => bookingDialogService.open(home)}
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <Dialog
        maxWidth="xs"
        fullWidth={true}
        open={bookingDialogState.open}
        onClose={() => bookingDialogService.close()}
      >
        <DialogContent>
          Dialog!
          <HomeBooking home={bookingDialogState.home} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Homes;
