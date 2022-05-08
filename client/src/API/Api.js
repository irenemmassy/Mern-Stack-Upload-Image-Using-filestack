import axios from "axios";

const URL = process.env.REACT_APP_SERVER_URL;

export const getData = async ({ setGetDataLoading, setResult }) => {
  try {
    let res = await axios.get(`${URL}/all`);
    setGetDataLoading(false);
    setResult(res.data);
  } catch (error) {
    alert(error.response.data.msg);
    setGetDataLoading(false);
  }
};

export const postData = async ({
  setpostDataLoading,
  setPostDatas,
  title,
  image,
}) => {
  try {
    const datas = { title, image: image.filesUploaded[0].url };
    setpostDataLoading(true);
    let res = await axios.post(`${URL}/`, datas);
    if (res) {
      setpostDataLoading(false);
      setPostDatas(res.data);
    }
  } catch (error) {
    alert(error.response.data.msg);
    setpostDataLoading(false);
  }
};
