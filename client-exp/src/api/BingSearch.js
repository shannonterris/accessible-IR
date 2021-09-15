import * as Secret from "./apiKeys";

function fetchSearch(search) {
  const host = "https://api.bing.microsoft.com";
  const path = "/v7.0/images/search";
  const searchURI = encodeURIComponent(search)
  const url = host + path + "?q=" + searchURI;
  const headers = {
    accept: "application/json",
    'Ocp-Apim-Subscription-Key' : Secret.API_KEY,
    "Content-Type": "application/json",
  };

 return fetch(url, { headers })
      .then((res) => res.json())
      .then((json) => json.value)
      .then((items) => {
        return items.map((item) => ({
            src: item.webSearchUrl,
            thumbnail: item.thumbnailUrl,
            thumbnailWidth: item.thumbnail.width,
            thumbnailHeight: item.thumbnail.height,
        }));
      })
}

export function bingSearch(search, setImages) {
  fetchSearch(search)
    .then((result) => {
      console.log(result);
      setImages(result);
    })
    .catch((e) => {
      // handle error
    });
}
