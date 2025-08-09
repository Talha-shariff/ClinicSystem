import Navbar from "../components/Navbar";
import useAuthGuard from "../utils/authGuard";

export default function Dashboard() {
  useAuthGuard();

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Welcome to the Clinic Front Desk System</h1>
        <p className="mt-4 text-gray-700">Use the nav to manage queue, appointments and doctors.</p>
      </div>
    </>
  );
}
