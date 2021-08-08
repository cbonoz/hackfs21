import React, { useState } from "react";
import { Button, Input } from "antd";

function SearchMusic(props) {
  const [cid, setCid] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const goToPage = async () => {
    if (!cid) {
      alert("cid is required");
      return;
    }

    window.location.href = `/music/${cid}`;
  };

  return (
    <div>
      <h1>Enter your Audius playlist ID to generate a product page</h1>
      <Input value={cid} onChange={e => setCid(e.target.value)} prefix={"Enter CID"} />
      <br />
      <br />

      <Button onClick={goToPage} disabled={!cid || loading} loading={loading}>
        Generate!
      </Button>
    </div>
  );
}

export default SearchMusic;
