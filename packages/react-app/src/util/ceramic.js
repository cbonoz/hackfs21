import CeramicClient from "@ceramicnetwork/http-client";
import { ThreeIdConnect, EthereumAuthProvider } from "@3id/connect";
import KeyDidResolver from "key-did-resolver";
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";
import { TileDocument } from "@ceramicnetwork/stream-tile";

import { DID } from "dids";

// https://developers.ceramic.network/run/nodes/community-nodes/
const TEST_API_URL = "https://gateway-clay.ceramic.network";
const ceramic = new CeramicClient(TEST_API_URL);

// https://developers.ceramic.network/build/javascript/http/

const resolver = { ...KeyDidResolver.getResolver(), ...ThreeIdResolver.getResolver(ceramic) };
const did = new DID({ resolver });

ceramic.did = did;

const threeIdConnect = new ThreeIdConnect();

export const initCeramic = async address => {
  console.log("initCeramic", address);
  // https://developers.ceramic.network/authentication/3id-did/3id-connect/#installation
  const authProvider = new EthereumAuthProvider(window.ethereum, address);
  await threeIdConnect.connect(authProvider);

  const provider = await threeIdConnect.getDidProvider();
  ceramic.did.setProvider(provider);

  await ceramic.did.authenticate();
};

// TODO: add stream query methods for storing storefront metadata with IPFS resources.
// https://developers.ceramic.network/build/javascript/quick-start/

export const createStream = async data => {
  // data: JSON payload data
  const doc = await TileDocument.create(ceramic, data);

  const streamId = doc.id.toString();
  console.log("create", streamId, doc.content);
  return streamId;
};

export const loadStream = async streamId => {
  // Stream id: identifier for the stream (using cid or stream identifier).

  const doc = await TileDocument.load(ceramic, streamId);

  console.log(doc.content);
  return doc.content;
};

// TODO: update stream.
