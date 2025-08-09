import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      router.push("/login");
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="font-bold">Clinic Front Desk</div>
      <div className="space-x-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/queue">Queue</Link>
        <Link href="/appointments">Appointments</Link>
        <Link href="/doctors">Doctors</Link>
        <button onClick={logout} className="ml-2 text-sm bg-red-500 px-2 py-1 rounded">Logout</button>
      </div>
    </nav>
  );
}
