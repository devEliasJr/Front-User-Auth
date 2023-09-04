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
