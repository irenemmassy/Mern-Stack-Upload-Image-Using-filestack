import React, { useEffect, useState } from "react";
import { PickerOverlay } from "filestack-react";
import { Loading } from "./Components/LoadingFile";
import { getDatas, postData } from "./API/Apis";
import GetDatasComponent from "./Components/GetDatasComponent";

const App = () => {
  const [isPickerOverlayVisible, setIsPickerOverlayVisible] = useState(false);
  const [result, setResult] = useState([]);
  const [getDataLoad, setGetDataLoad] = useState(true);
  const [postDataLoad, setPostDataLoad] = useState(false);
  const [postDatas, setPostDatas] = useState();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  // post submit button
  const submitHandle = (e) => {
    e.preventDefault();
    !image
      ? alert("Image Required")
      : title.length < 3
      ? alert("Title is too short")
      : postData({ title, image, setPostDataLoad, setPostDatas });
  };

  // useffect
  useEffect(() => {
    getDatas({ setGetDataLoad, setResult });
    if (postDatas) {
      setImage();
      setTitle("");
      getDatas({ setGetDataLoad, setResult });
    }
  }, [postDatas]);

  return (
    <div className="flex-colo bg-blue-50 sm:px-0 px-4">
      <form
        onSubmit={submitHandle}
        className="flex-colo bg-blue-100 shadow-md rounded lg:w-2/5 md:w-4/5 w-full py-12 px-4"
      >
        {image ? (
          <img
            src={image && image.filesUploaded[0].url}
            alt="uploadimage"
            className="w-full h-56 object-cover"
          />
        ) : (
          <button
            type="button"
            className="w-full h-56 border-4 border-dashed border-blue-800 text-blue-800 text-lg font-bold"
            onClick={() =>
              isPickerOverlayVisible
                ? setIsPickerOverlayVisible(false)
                : setIsPickerOverlayVisible(true)
            }
          >
            Choose Image
          </button>
        )}

        {/* title */}
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Image title"
          className="w-full my-8 bg-white py-4 px-2 rounded border border-blue-600 text-blue-500 font-semibold"
        />
        {/* submit button */}
        <button
          type="submit"
          className="w-full bg-blue-800 py-4 rounded text-white font-bold"
        >
          {postDataLoad ? "Loading....." : "SUBMIT"}
        </button>
        {/* image */}
        <div className="relative mt-4">
          {isPickerOverlayVisible && (
            <PickerOverlay
              apikey={process.env.REACT_APP_FILESTACK_API_KEY}
              onSuccess={(res) => {
                setImage(res);
                setIsPickerOverlayVisible(false);
              }}
              onError={(res) => alert(res)}
              pickerOptions={{
                maxFiles: 1,
                accept: ["image/*"],
                errorsTimeout: 2000,
                maxSize: 1 * 1000 * 1000,
              }}
            />
          )}
        </div>
      </form>
      {getDataLoad && <Loading />}
      <GetDatasComponent result={result} />
    </div>
  );
};

export default App;
