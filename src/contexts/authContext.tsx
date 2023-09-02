import { createContext, useContext, useState, useEffect } from "react";
import fetchApi from "../hooks/useApi";
import jwtDecode from "jwt-decode";

const AuthContext = createContext({} as IAuthContext);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState<IUserProps | undefined>(undefined);
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const persistUser = async () => {
    const token = localStorage.getItem("ED_acess_token");

    if (token) {
      const { id } = jwtDecode(token) as IJWTProps;

      setAuthenticated(true);

      try {
        const apiResponse = await fetchApi.get(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(apiResponse.data);
        setAuthenticated(true);
      } catch (error) {
        localStorage.removeItem("ED_acess_token");
      }
    }
  };

  useEffect(() => {
    persistUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    setError(null);
    try {
      const apiResponse = await fetchApi.post("/users/auth", {
        email,
        password,
      });

      const data = apiResponse.data;

      setUser(data.user);
      setAuthenticated(true);
      localStorage.setItem("ED_acess_token", data.acess_token);

      return { code: 200, message: "Login successful" };
    } catch (error) {
      return setError("Credenciais Invalidas");
    }
  };

  const signOut = () => {
    setUser(undefined);
    localStorage.removeItem("ED_acess_token");
  };

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, user, authenticated, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}
