import React from "react";
import { Address } from "..";
const { utils } = require("ethers");

const tryToDisplay = thing => {
  if (thing && thing.toNumber) {
    try {
      return thing.toNumber();
    } catch (e) {
      return "Ξ" + utils.formatUnits(thing, "ether");
    }
  }
  if (thing && thing.indexOf && thing.indexOf("0x") === 0 && thing.length === 42) {
    return <Address address={thing} fontSize={22} />;
  }
  return JSON.stringify(thing);
};

export function toObject(obj) {
  return JSON.stringify(
    obj,
    (key, value) => (typeof value === "bigint" ? value.toString() : value), // return everything else unchanged
    "\t",
  );
}

export default tryToDisplay;
