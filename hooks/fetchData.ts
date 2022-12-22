import axios, { AxiosResponse } from "axios";
import lscache from "lscache";
import { SwapiResponse } from "../types/TypesStarwars";

export async function fetchData<T>(url: string): Promise<T> {
  // Kolla om vi har data i cachen först
  const cacheKey = "api:" + url;
  const cachedData = lscache.get(cacheKey);
  if (cachedData) {
    return cachedData as T; // Kasta om cachedData till typen T
  }

  return axios.get<T>(url).then((response: AxiosResponse<T>) => {
    const data: T = response.data;

    // Spara i cachen
    lscache.set(cacheKey, data, 60); // Spara i 60 minuter

    return data;
  });
}
