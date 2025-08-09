import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useAuthGuard() {
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.push("/login");
    }
  }, []);
}
