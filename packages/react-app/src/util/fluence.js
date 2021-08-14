// https://github.com/fluencelabs/examples/tree/main/aqua-examples/price-oraclehttps://github.com/fluencelabs/examples/tree/main/aqua-examples/price-oracle

// client-peer/index.ts
import { createClient, setLogLevel, FluenceClient } from "@fluencelabs/fluence";
import { krasnodar, Node } from "@fluencelabs/fluence-network-environment";
import { get_price } from "./get_price";

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
