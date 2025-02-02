export const fetcher = (url: string) =>
  fetch(url, {
    credentials: "include", // Include cookies for authenticated requests
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((error) => {
        const err = new Error("An error occurred while fetching the data.");
        // Attach extra info to the error object.
        throw { ...err, ...error };
      });
    }
    return res.json();
  });
