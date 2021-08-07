import axios from "axios";
import { getCheckoutUrl } from "./checkout";

// const QR_CODE_URL = "https://api.qr-code-generator.com/v1/create/";
const QR_CODE_URL = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";

export const createQRImageFromId = async cid => {
  const url = getCheckoutUrl(cid);
  return await createQRImage(url);
};

export const createQRImage = async url => {
  const qrUrl = `${QR_CODE_URL}${url}`;
  const imageBlob = await axios.get(qrUrl, { responseType: "blob" });
  return URL.createObjectURL(imageBlob.data);
};
