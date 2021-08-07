import React, { useState, useEffect } from "react";

import { Input, Button, Steps, Layout } from "antd";
import { FileDropzone } from "./FileDropzone";
import { storeFiles } from "../util/stor";
import { getCheckoutUrl } from "../util/checkout";

const { Header, Footer, Sider, Content } = Layout;

const { Step } = Steps;

const LAST_STEP = 3;
function Upload({ isLoggedIn }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState({ userName: "cbono", title: "LiveStream Broadcast from 5/29", eth: 0.01 });
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("isLoggedIn", isLoggedIn);
    if (isLoggedIn && currentStep === 0) updateStep(1);
  }, [isLoggedIn]);

  const updateStep = async offset => {
    const nextStep = currentStep + offset;

    if (nextStep === LAST_STEP) {
      if (!files) {
        alert("Please specify at least one file");
        return;
      }

      // https://docs.web3.storage/how-tos/store/#preparing-files-for-upload
      // TODO: add metadata
      const cid = await storeFiles(files);
      const data = { cid, url: getCheckoutUrl(cid) };
      setResult(data);
    }

    setCurrentStep(nextStep);
  };

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

      case 1:
        return (
          <div>
            <FileDropzone files={files} setFiles={setFiles} />
          </div>
        );

      case 2: // done
        return (
          <div className="complete-section">
            <h2 className="sell-header">Complete!</h2>

            {Object.keys(result).map(k => {
              return (
                <li>
                  {k}: {JSON.stringify(result[k]).replaceAll('"', "")}
                </li>
              );
            })}
            <h3>Listing information</h3>
            {Object.keys(info).map(k => {
              return (
                <li key={k}>
                  {k}: {JSON.stringify(info[k]).replaceAll('"', "")}
                </li>
              );
            })}

            {result.url && (
              <a href={result.url} target="_blank">
                Click here to view page.
              </a>
            )}
          </div>
        );
    }
  };

  return (
    <div className="content">
      <h1>Create a new listing.</h1>
      <Header>
        <Steps current={currentStep}>
          <Step title="Login" description="Authenticate." />
          <Step title="Information" description="What page are you creating" />
          <Step title="Upload" description="Add files and assets." />
          <Step title="Done" description="View your checkout page." />
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
        &nbsp;
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
