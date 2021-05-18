import * as Secret from "./apiKeys";

function test(search) {
  // Test for searching for images using the custom search google api
  // Returns the image link for 10 images

  // If you wanted the second page it would just be start=11
  // Maybe best way to do it would be to build an array of Promises and do a Promise.all()? like do 5 pages of urls and wait for them all to return
  //  na,  11, 21, 31, 41, 51
  const url = `https://customsearch.googleapis.com/customsearch/v1?cx=${Secret.CX_ID}&q=${search}&searchType=image&key=${Secret.API_KEY}`;
  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
  };
  return fetch(url, { headers })
    .then((res) => res.json())
    .then((res) =>
      res.items.map((item) => ({
        image: item.link,
      }))
    );
}

export function googleSearch(search, setImages) {
  test(search)
    .then((result) => {
      console.log(result);
      setImages(result);
    })
    .catch((e) => {
      // handle error
    });
}
