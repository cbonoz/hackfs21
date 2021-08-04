import axios from "axios";

const QR_CODE_URL = "https://api.qr-code-generator.com/v1/create/";

export const createQRImage = (url) => {
  const body = {
    frame_name: "no-frame",
    qr_code_text: url,
    image_format: "SVG",
    qr_code_logo: "scan-me-square",
  };
  const url = QR_CODE_URL;
  return axios.post(url, body);
};
