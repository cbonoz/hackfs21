import { PageHeader } from "antd";
import React from "react";

import checkoutLogo from "../assets/logo.png";
import { APP_DESC } from "../constants";

// displays a page header

export default function Header({ logo, subTitle }) {
  const title = (
    <span>
      <img src={logo || checkoutLogo} className="header-logo" />
    </span>
  );
  return (
    <a href="#" target="_blank" rel="noopener noreferrer">
      <PageHeader title={title} subTitle={subTitle || APP_DESC} style={{ cursor: "pointer" }} />
    </a>
  );
}
