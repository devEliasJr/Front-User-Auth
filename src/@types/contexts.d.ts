interface IThemeContext {
  themeName: "light" | "dark";
  toggleTheme: () => void;
}

interface IUserProps {
  id: string;
  name: string;
  email: string;
}

interface IJWTProps {
  id: string;
  iat: number;
  exp: number;
}

interface IAuthContext {
  signIn: (name, email) => Promisse<void>;
  signOut: () => void;
  user: IUserProps | undefined;
  authenticated: boolean;
  error: string | null;
  loadingDashboard: boolean;
}
