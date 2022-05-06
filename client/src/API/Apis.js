import axios from "axios";

const URL = process.env.REACT_APP_SERVER_URL;

export const getDatas = async ({ setResult, setGetDataLoad }) => {
  try {
    setGetDataLoad(true);
    let res = await axios.get(`${URL}/all`);
    setResult(res.data);
    if (res) {
      setGetDataLoad(false);
    }
  } catch (error) {
    alert(error.response.data.msg);
    setGetDataLoad(false);
  }
};

export const postData = async ({
  title,
  image,
  setPostDataLoad,
  setPostDatas,
}) => {
  try {
    const datas = { title, image: image.filesUploaded[0].url };
    setPostDataLoad(true);
    const res = await axios.post(`${URL}/`, datas);
    if (res) {
      setPostDataLoad(false);
      setPostDatas(res.data);
    }
  } catch (error) {
    alert(error.response.data.msg);
    setPostDataLoad(false);
  }
};
