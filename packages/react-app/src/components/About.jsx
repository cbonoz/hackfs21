import React, { useEffect, useState } from "react";
import { Steps } from "antd";
import logo from "./../assets/logo_sq.png";

const { Step } = Steps;

function About(props) {
  return (
    <div className="content">
      <img src={logo} className="hero-logo" />
      <Steps current={3} size="large" className="header-steps">
        <Step title="Stream" description="Stream from ContentStream or using your favorite existing platform." />
        <Step
          title="List"
          description="Use ContentStream to list and sell rights and access to your previous Streams."
        />
        <Step title="Earn" description="Get paid for your new and existing content." />
      </Steps>
      <hr />
    </div>
  );
}

export default About;
