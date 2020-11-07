import axios from "axios";

function request(options) {
  return axios(options).then(res => {
    if (res.data.state === 1) {
      return res.data;
    }
    return Promise.reject("error");
  });
}

export default request;
