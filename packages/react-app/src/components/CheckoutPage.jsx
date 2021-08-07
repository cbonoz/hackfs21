import React from "react";
import Catalog from "react-catalog-view";
import { CONTENT_KEYS, DEFAULT_PRODUCTS } from "../util/checkout";

function CheckoutPage({ products }) {
  return (
    <Catalog
      data={products || DEFAULT_PRODUCTS}
      // Array of JSON Objects (required)
      contentKeys={CONTENT_KEYS}
      // JSON Object defining the keys that will be
      // used from the data array, keys should match. (required)
      cardSize="sm"
      // Card sizes, sm, md and lg for small, medium  and large
      btnOneText=""
      // Enter text for action button one
      // or pass empty string to hide.
      btnTwoText="Purchase Now"
      // Enter text for action button two
      // or pass empty string to hide.
      btnOneHandler={(args, event, objectData) => {
        // 'objectData' returns object data
        // any arguments passed will be before 'event'
        // and 'objectData'
      }}
      btnTwoHandler={(args, event, row) => {
        // 'objectData' returns object data
        // any arguments passed will be before 'event'
        // and 'objectData'
        loadCheckoutModal(objectData.name || "Test product");
      }}
      skeleton={0}
      // Any non zero number will override default cards
      // and will show that many skeleton cards.
    />
  );
}
export default CheckoutPage;
