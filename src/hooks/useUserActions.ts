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

export const getUser = async (id: string) => {
  const token = localStorage.getItem("ED_acess_token");

  const apiResponse = await fetchApi.get<IUserProps>(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return apiResponse.data;
};

export const editUser = async (id: string, userData: any) => {
  const token = localStorage.getItem("ED_acess_token");

  const apiResponse = await fetchApi.put<IUserProps>(`/users/${id}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return apiResponse.data;
};

export const createUser = async (userData: any) => {
  try {
    const res = await fetchApi.post("/users/", userData);
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        throw new Error("Internal Server Error, try again later");
      }
      throw new Error(error.response?.data.message);
    }
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await fetchApi.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
  }
};
