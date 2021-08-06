import { PageHeader } from "antd";
import React from "react";

import logo from "../assets/logo.png";
import { APP_DESC } from "../constants";

// displays a page header

export default function Header() {
  const title = (
    <span>
      <img src={logo} className="header-logo" />
    </span>
  );
  return (
    <a href="https://github.com/austintgriffith/scaffold-eth" target="_blank" rel="noopener noreferrer">
      <PageHeader title={title} subTitle={APP_DESC} style={{ cursor: "pointer" }} />
    </a>
  );
}
