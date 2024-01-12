import axios from "axios";
const proxy = "http://localhost:8800";

const postFormData = async (endpoint, body) => {
  let headers = {
    "Content-Type": `multipart/form-data`,
  };

  const url = `${proxy}${endpoint}`;
  console.log(url, "url");
  return await axios
    .post(encodeURI(url), body, { headers })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      return {};
    });
};

export { postFormData };
