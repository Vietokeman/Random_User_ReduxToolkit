import { ApiResponse } from "./Types";

const API_DOMAIN = "https://randomuser.me/api/";

export const get = async (path: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(API_DOMAIN + path);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const result: ApiResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
