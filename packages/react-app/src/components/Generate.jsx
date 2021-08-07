import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import { createQRUrl } from "../util/qr";
import { Button } from "react-bootstrap";

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
      const res = await createQRUrl(cid);
      setData(res.data);
    } catch (e) {
      alert("Error getting img", e);
    }
    setLoading(false);
  };

  return (
    <div>
      <Input value={cid} onChange={e => setCid(e.target.value)} prefix={"Enter CID"} />
      <br />

      <Button onClick={getQr} disabled={!cid || loading} loading={loading}>
        Generate!
      </Button>

      <hr />
      {data && JSON.stringify(data || {})}
    </div>
  );
}

export default Generate;
