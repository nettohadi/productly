import { JwtPayload, jwtDecode } from "jwt-decode";
import { useRef } from "react";

type AuthToken = { user: JwtPayload; token: string } | null;

const useAuthToken = (): AuthToken => {
  const jwt = useRef<AuthToken>(null);

  if (jwt.current) {
    return jwt.current;
  } else {
    const token = localStorage.getItem("productly");
    if (!token) {
      return null;
    } else {
      try {
        const decodedUser = jwtDecode(token);

        return { user: decodedUser, token };
      } catch {
        return null;
      }
    }
  }
};

export default useAuthToken;
