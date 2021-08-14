import faker from "faker";
import { NETWORKS, TARGET_NETWORK } from "../constants";
import { loadStream } from "./ceramic";

export const BASE_URL = window.location.origin;
export const DEFAULT_NAME = "Checkout Product Gate";
export const DEFAULT_STORE = "My Demo Store";
export const DEFAULT_PRODUCTS = [
  {
    id: 1,
    title: "Canvas",
    description: "High quality canvas shoes.",
    price: "20",
    discounted: "15",
    currency: "$",
    image: faker.image.fashion(),
  },
  {
    id: 2,
    title: "Sport shoes",
    description: "Sporty shoes, durable at affordable ranges.",
    price: "25",
    currency: "$",
    discounted: "15",
    image: faker.image.fashion(),
  },
  {
    id: 3,
    title: "Heels",
    description: "Fashionable trendy heels.",
    currency: "$",
    price: "30",
    image: faker.image.fashion(),
  },
];

export const CONTENT_KEYS = {
  imgKey: "image",
  cardTitleKey: "title",
  cardDescriptionKey: "description",
  priceKey: "price",
  discountedPriceKey: "discounted",
  priceCurrencyKey: "currency",
  discountCurrencyKey: "currency",
};

export const createProduct = (id, imgUrl, title, description, price, currency) => {
  return {
    id,
    [CONTENT_KEYS.imgKey]: imgUrl,
    [CONTENT_KEYS.cardTitleKey]: title,
    [CONTENT_KEYS.cardDescriptionKey]: description,
    [CONTENT_KEYS.priceCurrencyKey]: currency || "Eth",
    [CONTENT_KEYS.priceKey]: price || 0.01,
  };
};

export const mapFilesToProducts = async files => {
  console.log("files", files);

  const infoFile = files.filter(x => x.name.startsWith("info_"))[0];
  if (!infoFile) {
    return [];
  }
  const streamId = infoFile.name.split(".")[0].split("_")[1];
  const data = await loadStream(streamId);

  console.log("mapFiles", data);
  // Attach metadata to products.

  const productFiles = files.filter(x => !x.name.startsWith("info_"));

  const products = productFiles.map((x, i) => {
    const info = data[x.name];
    return createProduct(
      i,
      URL.createObjectURL(x),
      info[CONTENT_KEYS.cardTitleKey],
      info[CONTENT_KEYS.cardDescriptionKey],
      info[CONTENT_KEYS.priceKey],
    );
  });

  return { products, data };
};

const NETWORK_MAP = {
  [NETWORKS.mainnet.name]: 1,
  [NETWORKS.rinkeby.name]: 4,
};

export const loadCheckoutModal = ({ title }) => {
  if (!window.unlockProtocol) {
    alert("Cannot open modal - unlock not initialized: ");
    return;
  }

  window.unlockProtocolConfig = {
    network: NETWORK_MAP[TARGET_NETWORK.name] || 4, // Network ID (1 is for mainnet, 4 for rinkeby... etc)
    locks: {
      "0x3f587bFA738F98a35D5c9Bd6eB5a71eFD3301459": {
        name: title,
        network: 4,
        // if no name is used, the default from the contract is used
      }, // you can add as many locks as you want.
    },
    icon: "",
    callToAction: {
      default: "Purchase playlist " + title + "?",
      expired: "This is what is shown when the user had a key which is now expired",
      pending: "Transaction in progress!",
      confirmed: "This is the message shown when the user has a confirmed key",
      noWallet: "Your wallet is currently not connected",
    },
    referrer: "0xreferrer", // Address of the referrer who will earn UDT governance tokens if the transaction is eligible.
  };
  window.unlockProtocol && window.unlockProtocol.loadCheckoutModal(/* optional configuration*/);
};

export const getCheckoutUrl = cid => `${BASE_URL}/pages/${cid}`;
