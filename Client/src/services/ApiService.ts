import axios from "axios";

const BASE_URL = "https://localhost:44351/";

const handleResponse = (response: any) => {
  if (response.data.status !== "OK") {
    return response.data;
  }
  return response;
};

export const getHeaderInfo = async function () {
  return {
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export const get = async function (url: any) {
  let header = await getHeaderInfo();
  try {
    let resp = await axios.get(BASE_URL + url, { ...header });
    return handleResponse(resp);
  } catch (err: any) {
    throw handleResponse(err.response);
  }
};

export const post = async function (url: string, body: any) {
  let header = await getHeaderInfo();
  try {
    let resp = await axios.post(BASE_URL + url, body, header);
    return handleResponse(resp);
  } catch (err: any) {
    return handleResponse(err.response);
  }
};

export const put = async function (url: any, body: any) {
  let header = await getHeaderInfo();

  try {
    let resp = await axios.put(BASE_URL + url, body, header);

    return handleResponse(resp);
  } catch (err: any) {
    throw handleResponse(err.response);
  }
};

export const deleteApi = async function (url: any) {
  let header = await getHeaderInfo();
  try {
    let resp = await axios.delete(BASE_URL + url, { ...header });
    return handleResponse(resp);
  } catch (err: any) {
    throw handleResponse(err.response);
  }
};
