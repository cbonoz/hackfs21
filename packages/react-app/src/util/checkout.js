import faker from "faker";

export const BASE_URL = window.location.origin;
export const DEFAULT_NAME = "Checkout Product Gate";
export const DEFAULT_STORE = 'My Demo Store'
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

export const loadCheckoutModal = ({ title }) => {
  if (!window.unlockProtocol) {
    alert("Cannot open modal - unlock not initialized: ");
    return;
  }

  window.unlockProtocolConfig = {
    network: 1, // Network ID (1 is for mainnet, 4 for rinkeby... etc)
    locks: {
      "0xabc": {
        // 0xabc is the address of a lock.
        name: "One Week",
        network: 1, // you can customize the network for each lock
      },
      "0xdef": {
        name: "One Month",
        network: 100, // lock on the xDai chain
      },
      "0x3f587bFA738F98a35D5c9Bd6eB5a71eFD3301459": {
        name: title,
        network: 1,
        // if no name is used, the default from the contract is used
      }, // you can add as many locks as you want.
    },
    icon: "https://app.unlock-protocol.com/static/images/svg/default.svg",
    callToAction: {
      default: "This content is locked. Pay with cryptocurrency to access it!",
      expired: "This is what is shown when the user had a key which is now expired",
      pending:
        "This is the message shown when the user sent a transaction to purchase a key which has not be confirmed yet",
      confirmed: "This is the message shown when the user has a confirmed key",
      noWallet: "This is the message shown when the user does not have a crypto wallet which is required...",
    },
    referrer: "0xreferrer", // Address of the referrer who will earn UDT governance tokens if the transaction is eligible.
  };
  window.unlockProtocol && window.unlockProtocol.loadCheckoutModal(/* optional configuration*/);
};

export const getCheckoutUrl = cid => `${BASE_URL}/pages/${cid}`;
