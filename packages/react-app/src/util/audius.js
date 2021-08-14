import axios from "axios";
import { APP_NAME } from "../constants";

const BASE_URL = `https://discovery-c.mainnet.audius.radar.tech/v1`;

// https://audiusproject.github.io/api-docs/#get-playlist
export const getTracks = pid => {
  const url = `${BASE_URL}/playlists/${pid}/tracks?app_name=${APP_NAME}`;
  return axios.get(url);
};

export const getPlaylist = pid => {
  const url = `${BASE_URL}/playlists/${pid}?app_name=${APP_NAME}`;
  return axios.get(url);
};
