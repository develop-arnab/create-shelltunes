 import {BASE_URL} from '../js/constants.js'

 export const getMultipleFiles = async () => {
    console.log("HEROKU : ", BASE_URL)
    try {
      const { data } = await axios.get(
        BASE_URL + "getMultipleFiles"
      );

      return data;
    } catch (error) {
      console.log("MUltiple Files Data Erro", error);
      throw error;
    }                               
  };

 export  const getIconsAnimFiles = async () => {
    try {
      const { data } = await axios.get(
        BASE_URL + "getMultipleFiles"
      );
      return data;
    } catch (error) {
      console.log("MUltiple Files Data Erro", error);
      throw error;
    }
  };

  export const getFilesByTitle = async (title) => {
    try {
      const {data} = await axios.get(
        BASE_URL + `getSearchedFiles?title=${title}`
      );
      console.log("RETURNED SEARCHED FILES", data)
      return data;
    } catch (error) {
      // console.log(error);
      throw error
    }
  };

  export const retrieveCanvasState = async () => {
    try {
      const data = await axios.get(
        BASE_URL + `retrieveCanvas`
      );
      console.log("RETURNED SEARCHED FILES", data);
      return data.data[0].objects.data;
    } catch (error) {
      // console.log(error);
      throw error
    }
  };

  export const saveCanvasState = async (canvas, image) => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"), // Include your access token or any other headers
        "Content-Type": "application/json" // Set the content type if needed
      };

      const postData = {
        canvas: canvas,
        thumbnail: image
      };

      const { data } = await axios.post(BASE_URL + "saveCanvas", postData, {
        headers
      });
      console.log("Saved Canvas", data)
      return data;
    } catch (error) {
      // console.log(error);
      throw error
    }
  };

  export const saveSelectedAnimation = async (fileName) => {
    try {
      const {data} = await axios.post(
        BASE_URL + `saveSelectedAnim?fileName=${fileName}`
      );
      console.log("Saved Animation", data)
      return data;
    } catch (error) {
      // console.log(error);
      throw error
    }
  };

