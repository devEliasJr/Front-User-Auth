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

export const createUser = async ({ data }: any) => {
  try {
    const apiResponse = await fetchApi.post("/users", { data });
    return apiResponse.data;
  } catch (error: any) {
    const responseData = error.data;

    if (responseData.status === "error") {
      const errorMessage = responseData.message;
      console.log("Mensagem de erro da API:", errorMessage);
    }
    throw new Error(responseData);
  }
};
