import React, { useState } from "react";
import { Button, Input } from "antd";
import { createQRImageFromId } from "../util/qr";
import { getCheckoutUrl } from "../util/checkout";

function Generate(props) {
  const [cid, setCid] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const getQr = async () => {
    if (!cid) {
      alert("cid is required");
      return;
    }
    setLoading(true);

    try {
      const res = await createQRImageFromId(cid);
      setData(res);
    } catch (e) {
      alert("Error getting img", e);
    }
    setLoading(false);
  };

  const url = getCheckoutUrl(cid);

  return (
    <div>
      <Input value={cid} onChange={e => setCid(e.target.value)} prefix={"Enter CID"} />
      <br />

      <Button onClick={getQr} disabled={!cid || loading} loading={loading}>
        Generate!
      </Button>

      <hr />
      {data && (
        <div>
          <br />
          <h1>Your checkout page is ready!</h1>
          <a href={url} target="_blank">
            {url}
          </a>
          <br />
          <img src={data} />
        </div>
      )}
    </div>
  );
}

export default Generate;
