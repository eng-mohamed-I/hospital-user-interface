import React from "react";
import { Carousel } from "primereact/carousel";
import { Card } from "primereact/card";
//================================================================
export default function AvailableDatesSlider({ availableDates }) {
  const responsiveOptions = [
    { breakpoint: "1024px", numVisible: 3, numScroll: 1 },
    { breakpoint: "768px", numVisible: 2, numScroll: 1 },
    { breakpoint: "560px", numVisible: 1, numScroll: 1 },
  ];

  const dateTemplate = (slot) => {
    return (
      <Card className="shadow-2 mb-3 text-center">
        <h5 className="text-primary">{slot.day}</h5>
        <p className="mb-1">
          <strong>Open:</strong> {slot.openTime}
        </p>
        <p className="mb-0">
          <strong>Close:</strong> {slot.closeTime}
        </p>
      </Card>
    );
  };

  return (
    <div className="container my-4">
      <h5 className="mb-3 text-primary">Available Dates</h5>
      <Carousel
        value={availableDates}
        itemTemplate={dateTemplate}
        numVisible={3}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        circular
        autoplayInterval={5000}
      />
    </div>
  );
}
