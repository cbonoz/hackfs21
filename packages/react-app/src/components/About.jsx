import React, { useEffect, useState } from "react";
import { Steps } from "antd";
import { Row, Col } from "antd";
import { Typography, Divider } from "antd";

const { Title, Paragraph, Text, Link } = Typography;

import logo from "./../assets/h1.png";
import { CheckCircleTwoTone } from "@ant-design/icons";

const { Step } = Steps;

const REASONS = [
  "No subscription or credit card fees required",
  "Use table side or as your own showcase with free hosting",
  "Accept cryptocurrency as payment",
];

function About(props) {
  return (
    <div className="content about-page">
      <Row>
        <Col span={12}>
          <br />
          <Title>CheckoutFS</Title>
          <hr />
          <h3>Create instant checkout experiences on IPFS.</h3>
          <br />

          {REASONS.map((r, i) => {
            return (
              <div key={i}>
                <CheckCircleTwoTone twoToneColor="#52c41a" />
                &nbsp;
                {r}
              </div>
            );
          })}
        </Col>
        <Col span={12}>
          <img src={logo} />
        </Col>
      </Row>

      <p></p>
      {/* <img src={logo} className="hero-logo" /> */}
      {/* <Steps current={3} size="large" className="header-steps">
        <Step title="Stream" description="Stream from ContentStream or using your favorite existing platform." />
        <Step
          title="List"
          description="Use ContentStream to list and sell rights and access to your previous Streams."
        />
        <Step title="Earn" description="Get paid for your new and existing content." />
      </Steps> */}
    </div>
  );
}

export default About;
