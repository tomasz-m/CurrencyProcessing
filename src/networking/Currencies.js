export const getCurrencies = date =>
  new Promise((resolve, reject) => {
    if (!date) {
      date = "latest";
    }
    fetch(`https://api.exchangeratesapi.io/${date}?base=SEK`).then(response => {
      if (response.status !== 200) {
        reject();
      }
      resolve(response.json());
    });
  });
