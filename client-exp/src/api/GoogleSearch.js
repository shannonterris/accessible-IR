import * as Secret from "./apiKeys";

function test(search) {
  // Test for searching for images using the custom search google api
  // Returns the image link for 10 images

  // If you wanted the second page it would just be start=11
  // Maybe best way to do it would be to build an array of Promises and do a Promise.all()? like do 5 pages of urls and wait for them all to return
  //  na,  11, 21, 31, 41, 51
  const url = `https://customsearch.googleapis.com/customsearch/v1?cx=${Secret.CX_ID}&q=${search}&searchType=image&key=${Secret.API_KEY}`;
  // const urlPage2 = `https://customsearch.googleapis.com/customsearch/v1?cx=${Secret.CX_ID}&q=${search}&searchType=image&key=${Secret.API_KEY}&start=11`;
  // const urlPage3 = `https://customsearch.googleapis.com/customsearch/v1?cx=${Secret.CX_ID}&q=${search}&searchType=image&key=${Secret.API_KEY}&start=21`;
  // const urls = [url, urlPage2, urlPage3];
  const urls = [url];
  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
  };

  const promises = urls.map((url) =>
    fetch(url, { headers })
      .then((res) => res.json())
      .then((json) => json.items)
  );
  return Promise.all(promises).then((results) => {
    const arrayResults = results.flat();
    return arrayResults.map((item) => ({
      src: item.link,
      thumbnail: item.link,
      thumbnailWidth: item.image.thumbnailWidth,
      thumbnailHeight: item.image.thumbnailHeight,
    }));
  });
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
