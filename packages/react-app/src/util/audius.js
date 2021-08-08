import axios from "axios";

// https://audiusproject.github.io/api-docs/#get-playlist
export const getTracks = pid => {
  const url = `https://audius-disco.dfw-x01.us.supercache.org/v1/playlists/${pid}/tracks?app_name=EXAMPLEAPP`;
  return axios.get(url);
};
