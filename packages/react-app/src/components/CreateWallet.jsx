import React, { useState } from "react";

import { Button, Input } from "antd";
// import { createWallet } from "../util/bgo";

export default function CreateWallet(props) {
  const [result, setResult] = useState();
  const [passphrase, setPassphrase] = useState();
  const [loading, setLoading] = useState(false);
  const onCreate = async () => {
    if (!passphrase) {
      alert("Passphrase is required for creating a new wallet.");
      return;
    }

    setLoading(true);
    try {
      //   const res = await creaAteWallet(passphrase);
      //   setResult(res);
    } catch (e) {
      console.error("error creating wallet", e);
      alert("Error creating wallet: " + e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Don't have a wallet? No problem.</h1>
      <p>Generate a crytocurrency wallet to accept payments for your checkout page. </p>

      <Input
        addonBefore={"Specify Passphrase"}
        placeholder="Your wallet passphrase"
        value={passphrase}
        onChange={e => setPassphrase(e.target.value)}
      />
      <br />
      <br />

      <Button loading={loading} onClick={onCreate}>
        Create Wallet
      </Button>
      <br />
      <br />
      <hr />
      {result && JSON.stringify(result)}
    </div>
  );
}
