import { BASE_URL } from "./base-url";

export const getHotelsData = async ({ id, page = 1 }) => {
  let url = "";

  if (typeof id === "number") {
    url = `${BASE_URL}/hotel-prices?ids=${id}`;
  } else {
    url = `${BASE_URL}/hotels?page=${page}`;
  }

  try {
    const data = await fetch(url);
    const result = await data.json();
    return result;
  } catch (err) {
    console.error(err);
  }
};
