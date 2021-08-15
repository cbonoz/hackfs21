// https://github.com/fluencelabs/examples/tree/main/aqua-examples/price-oraclehttps://github.com/fluencelabs/examples/tree/main/aqua-examples/price-oracle

// client-peer/index.ts
import { createClient, setLogLevel, FluenceClient } from "@fluencelabs/fluence";
import { krasnodar, Node } from "@fluencelabs/fluence-network-environment";
import { get_price } from "./get_price";
import crypto from "libp2p-crypto";
import ipns from "ipns";
import { base58btc } from "multiformats/bases/base58";
import uint8ArrayFromString from "uint8arrays/from-string";
import uint8ArrayConcat from "uint8arrays/concat";

interface NodeServicePair {
  node: string;
  service_id: string;
}

// (node, service) tuples, json-style, for price getter services
let getter_topo: Array<NodeServicePair>;

// and a mean service
let mean_topo: NodeServicePair;

getter_topo = Array(
  { node: "12D3KooWCMr9mU894i8JXAFqpgoFtx6qnV1LFPSfVc3Y34N4h4LS", service_id: "c315073d-4311-4db3-be57-8f154f032d28" },
  { node: "12D3KooWFEwNWcHqi9rtsmDhsYcDbRUCDXH84RC4FW6UfsFWaoHi", service_id: "25f9123a-f386-4cb2-9c1e-bb7c247c9c09" },
);
mean_topo = {
  node: "12D3KooWCMr9mU894i8JXAFqpgoFtx6qnV1LFPSfVc3Y34N4h4LS",
  service_id: "dd47389f-25d9-4870-a2a9-909359e73580",
};

let fluence;

export const getEthPrice = async () => {
  // create the Fluence client for the Krasnodar testnet
  if (!fluence) {
    fluence = await createClient(krasnodar[2]);
  }
  console.log("created a fluence client %s with relay %s", fluence.selfPeerId, fluence.relayPeerId);
  //   const network_result = 10;

  // call the get_price function -- sequential processing
  const network_result = await get_price(
    fluence,
    "ethereum",
    "usd",
    "12D3KooWFEwNWcHqi9rtsmDhsYcDbRUCDXH84RC4FW6UfsFWaoHi",
    "25f9123a-f386-4cb2-9c1e-bb7c247c9c09",
    "b2790307-055e-41ca-9640-3c41856d464b",
  );
  console.log("seq result: ", network_result);
  return network_result;
};

/** @type {{ id: string, publicKey: string }} */
let ipfsId;
/** @type {import('libp2p-crypto').keys.supportedKeys.rsa.RsaPrivateKey} */
let rsa;

// TODO
export const publish = async cid => {
  //github.com/ipfs/js-ipns/blob/d7c8e51c1505b1d75ef800d65c8896a3fe66d6d5/test/index.spec.js
  cid = uint8ArrayFromString(cid);

  rsa = await crypto.keys.generateKeyPair("RSA", 2048);

  ipfsId = {
    id: "QmQ73f8hbM4hKwRYBqeUsPtiwfE2x6WPv9WnzaYt4nYcXf",
    publicKey:
      "CAASpgIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDUOR0AJ2/yO0S/JIkKmYV/QdHzQXi1nrTCCXtEbUDVW5mXZfNf9bKeNDfW3UIIOwVzV6/sRhJqq/8sQAhmzURj1q2onCKgSLzjdePSLtykolQeQGSD+JO7rcxOLx+sTdIyJiclP/tkK2gfo2nrI6pjFTKNzR8VSoJx7gfiqY1N9LBgDsD4WjaOM2pBgzgVUlXpk27Aqvcd+htSWi6JuIZaBhPY/IzEvXwntGH9k7F8VkT6nUBilhqFFSWnz8cNKToCHjyhoozKfqN89S7EGMiNvG4cX4Dc/nVXlZRTAi4PNNewutimujROy2/tNEquC2uAlcAzhRAcLL/ujhEjJYP1AgMBAAE=",
  };

  const sequence = 0;
  const validity = 1000000;

  const entry = await ipns.create(rsa, cid, sequence, validity);

  await ipns.embedPublicKey(rsa.public, entry);

  const marshalledData = ipns.marshal(entry);

  const keyBytes = base58btc.decode(`z${ipfsId.id}`);
  const key = uint8ArrayConcat([uint8ArrayFromString("/ipns/"), keyBytes]);

  await ipns.validator.validate(marshalledData, key);
  //   return key;
  const dec = new TextDecoder("utf-8");
  const keyValue = dec.decode(entry.value);
  //   const signature = dec.decode(entry.signature);
  return {
    key: keyValue,
    validity,
    ttl: entry.ttl,
    signature: entry.signature,
    sequence: entry.sequence,
  };

  // https://github.com/gkbrk/rust-ipfs-api/blob/master/src/ipns.rs
};
