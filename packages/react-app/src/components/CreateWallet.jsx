import React, { useState, useEffect } from "react";

import { Button, Input } from "antd";
import { initWallet } from "../util/pillar";

// Verify wallet
export default function CreateWallet(props) {
  const [result, setResult] = useState();
  const [eth, setEth] = useState();
  const [passphrase, setPassphrase] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const onCreate = async () => {
    setLoading(true);
    try {
      const res = await initWallet();
      setResult(res);
      if (res.items) {
        setEth(res.items[0].balance.toBigInt().toString());
      } else {
        alert("Could not detect metamask accounts");
      }
    } catch (e) {
      console.error("error creating wallet", e);
      alert("Error creating wallet: " + e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Need help connecting your wallet? No problem.</h1>
      {/* <h1>Don't have a wallet? No problem.</h1> */}
      {/* <p>Generate a crytocurrency wallet to accept payments for your checkout page. </p> */}
      <p>
        Use Pillar and etherspot to verify that your account is ready to send and receive payments from a Checkout page.
      </p>
      {/* 
      <Input
        addonBefore={"Specify Passphrase"}
        placeholder="Your wallet passphrase"
        value={passphrase}
        onChange={e => setPassphrase(e.target.value)}
      /> */}
      <br />
      <br />

      <Button loading={loading} onClick={onCreate}>
        Verify Wallet
      </Button>
      <br />
      <br />
      <hr />

      {/* {result && <p>{JSON.stringify(result, null, "\t")}</p>} */}

      {eth && (
        <div>
          <p className='green-text'>Account ready</p>
          <h3>Eth balance (wei): {eth}</h3>
        </div>
      )}
    </div>
  );
}
