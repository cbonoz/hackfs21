import React, { useState, useEffect } from "react";

import { Input, Button, Steps, Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;

const { Step } = Steps;

const LAST_STEP = 3;
function Upload(props) {
  const isLoggedIn = true; // TODO
  const [currentStep, setCurrentStep] = useState(0);
  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState({ userName: "cbono", title: "LiveStream Broadcast from 5/29", eth: 0.01 });
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);

  const getBody = () => {
    switch (currentStep) {
      case 0: // confirm login
        return (
          <div>
            <h2 className="sell-header">Login</h2>
            <p>
              In order to create a listing, you must login with your metamask or wallet account. Click 'connect' in the
              top right to begin.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="content">
      <h1>List new stream in marketplace</h1>
      <Header>
        <Steps current={currentStep}>
          <Step title="Login" description="Authenticate." />
          <Step title="Information" description="What are you listing?" />
          <Step title="Upload" description="Add streams for sale." />
          <Step title="Done" description="View your listing." />
        </Steps>
      </Header>
      <Content>
        <div className="sell-area">{getBody()}</div>
      </Content>
      <Footer>
        {(currentStep !== 0 || (currentStep !== 1 && !isLoggedIn)) && (
          <Button disabled={loading} type="primary" onClick={() => updateStep(-1)}>
            Previous
          </Button>
        )}
        {currentStep < LAST_STEP && (
          <Button disabled={loading} loading={loading} type="primary" onClick={() => updateStep(1)}>
            {currentStep === LAST_STEP - 1 ? "Done" : "Next"}
          </Button>
        )}
      </Footer>
    </div>
  );
}

export default Upload;
