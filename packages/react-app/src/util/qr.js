import axios from "axios";
import { getCheckoutUrl } from "./checkout";

const QR_CODE_URL = "https://api.qr-code-generator.com/v1/create/";

export const createQRUrl = cid => {
  const url = getCheckoutUrl(cid);
  return createQRImage(url);
};

export const createQRImage = url => {
  const body = {
    frame_name: "no-frame",
    qr_code_text: url,
    image_format: "SVG",
    qr_code_logo: "scan-me-square",
  };
  return axios.post(QR_CODE_URL, body);
};
