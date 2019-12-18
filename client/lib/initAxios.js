import axios from 'axios';
import cookie from "cookie";

function parseCookies(req, options = {}) {
  return cookie.parse(
    req ? req.headers.cookie || "" : document.cookie,
    options
  );
}

const getToken = () => parseCookies(null).token;

export default function() {

  if (typeof window === 'undefined') {
    return axios;
  }

  axios.defaults.headers.Authorization = `Bearer ${getToken()}`;

  return axios;
};