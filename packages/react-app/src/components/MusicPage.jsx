import React, { useState, useEffect } from "react";
import Catalog from "react-catalog-view";
import {
  BASE_URL,
  CONTENT_KEYS,
  createProduct,
  DEFAULT_PRODUCTS,
  DEFAULT_STORE,
  loadCheckoutModal,
} from "../util/checkout";
import { retrieveFiles } from "../util/stor";
import { withRouter } from "react-router";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { APP_NAME } from "../constants";
import { getTracks } from "../util/audius";

function MusicPage({ match }) {
  const playlistId = match.params.playlistId;
  const [products, setProducts] = useState([]);
  const [data, setData] = useState();
  const [name, setName] = useState();
  const [error, setError] = useState();

  const getData = async () => {
    console.log("getData", playlistId);
    if (error) {
      setError("");
    }

    try {
      const res = await getTracks(playlistId);
      const trackData = res.data.data;
      setName(playlistId);
      const tracks = trackData.map((x, i) =>
        createProduct(i, x.artwork["150x150"], x.title, x.description, 0.01, "Eth"),
      );
      setProducts(tracks);
    } catch (e) {
      console.error(e);
      setError(e);
    }
  };

  useEffect(() => {
    getData();
  }, [playlistId]);

  return (
    <div>
      {error && <p>{error.toString()}</p>}
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
export default withRouter(MusicPage);
