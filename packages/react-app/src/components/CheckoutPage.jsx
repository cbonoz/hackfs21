import React, { useState, useEffect } from "react";
import Catalog from "react-catalog-view";
import { BASE_URL, CONTENT_KEYS, DEFAULT_PRODUCTS, DEFAULT_STORE, loadCheckoutModal } from "../util/checkout";
import { retrieveFiles } from "../util/stor";
import { withRouter } from "react-router";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { APP_NAME } from "../constants";

function CheckoutPage({ match }) {
  const cid = match.params.cid;
  const [products, setProducts] = useState([]);
  const [name, setName] = useState();
  const [error, setError] = useState();

  const getData = async () => {
    console.log("getData", cid);
    if (error) {
      setError("");
    }
    if (!cid || cid === "demo") {
      setProducts(DEFAULT_PRODUCTS);
      setName(DEFAULT_STORE);
      return;
    }
    try {
      const res = await retrieveFiles(cid);
      setProducts(res.data);
    } catch (e) {
      console.error(e);
      setError(e);
    }
  };

  useEffect(() => {
    getData();
  }, [cid]);

  return (
    <div>
      {error && <p>This page does not exist</p>}
      {name && (
        <h1 className="store-heading">
          <ShoppingCartOutlined />
          &nbsp;
          {name}
        </h1>
      )}
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
        btnTwoHandler={(args, objectData, event) => {
          // 'objectData' returns object data
          // any arguments passed will be before 'event'
          // and 'objectData'
          console.log("handle", args, objectData, event);
          loadCheckoutModal(objectData);
        }}
        skeleton={0}
        // Any non zero number will override default cards
        // and will show that many skeleton cards.
      />

      <p>
        This page was generated with <a href={BASE_URL}>{APP_NAME}</a>.
      </p>
    </div>
  );
}
export default withRouter(CheckoutPage);
