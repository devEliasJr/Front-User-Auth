import { AxiosError } from "axios";
import fetchApi from "./useApi";

export const getUsers = async () => {
  const token = localStorage.getItem("ED_acess_token");

  try {
    const apiResponse = await fetchApi.get<IUserProps[]>("/users/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return apiResponse.data;
  } catch (error) {
    throw new Error("Server communication error, please try again later!");
  }
};

export const createUser = async (userData: any) => {
  try {
    const res = await fetchApi.post("/users/", userData);
    return res;
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
};


export const deleteUser = async (id: string) => {
  const response = await fetchApi.delete(`/users/${id}`)
  return response.data
}
