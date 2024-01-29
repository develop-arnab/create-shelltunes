// import { createApi } from 'unsplash-js';
// import * as nodeFetch from 'node-fetch'

const { createApi } = require("unsplash-js");
const nodeFetch = require("node-fetch");

// declare global {
//   var fetch: typeof nodeFetch.default;
//   type RequestInit = nodeFetch.RequestInit;
//   type Response = nodeFetch.Response;
// }
// global.fetch = nodeFetch.default;

const unsplash = createApi({
  accessKey: "T5PtThQSOcKX17F8U7SGGinJEkrErh0czJ1JYfuBwEY",
  fetch: nodeFetch.default
});
const getPhotos = async () => {
const photos = await unsplash.search.getPhotos({query : "tiger"})
const pics = []
const urls = photos.response.results.forEach((result) =>{
pics.push(result.urls)
})
console.log(pics);
}
getPhotos()
