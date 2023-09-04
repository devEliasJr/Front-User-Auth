import fetchApi from "./useApi";
import { useState, useEffect } from "react";

export const useGetUsers = () => {
  const [users, setUsers] = useState<IUserProps[]>();

  const getUsers = async () => {
    const token = localStorage.getItem("ED_acess_token");
    try {
      const apiResponse = await fetchApi.get("/users/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(apiResponse.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return { getUsersFromData: users };
};

export const useCreateUser = ({ data }: any) => {
  const createUser = async () => {
    try {
      const apiResponse = await fetchApi.post("/users", { data });
      return apiResponse.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return createUser;
};
