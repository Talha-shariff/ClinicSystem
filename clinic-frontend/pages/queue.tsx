import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../utils/api";
import useAuthGuard from "../utils/authGuard";

export default function QueuePage() {
  useAuthGuard();
  const [queue, setQueue] = useState<any[]>([]);

  const fetchQueue = async () => {
    try {
      const res = await API.get("/queue");
      setQueue(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await API.patch(`/queue/${id}/status`, { status });
      fetchQueue();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQueue();
    const t = setInterval(fetchQueue, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Queue Management</h2>

        <div className="mb-6">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formEl = e.target as any;
              const name = formEl.name.value;
              const contact = formEl.contact.value;

              try {
                const patientRes = await API.post("/patients", { name, contact, isWalkIn: true });
                await API.post("/queue", { patientId: patientRes.data.id });
                formEl.reset();
                fetchQueue();
              } catch (err) {
                console.error(err);
              }
            }}
            className="bg-white p-4 rounded shadow-md flex flex-col md:flex-row gap-4"
          >
            <input name="name" placeholder="Patient Name" className="border p-2 w-full md:w-1/3" required />
            <input name="contact" placeholder="Contact" className="border p-2 w-full md:w-1/3" required />
            <button className="bg-green-600 text-white px-4 py-2 rounded">Add to Queue</button>
          </form>
        </div>

        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Queue No.</th>
              <th className="p-2 border">Patient</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {queue.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.queueNumber}</td>
                <td className="border p-2">{item.patient?.name}</td>
                <td className="border p-2">{item.status}</td>
                <td className="border p-2 space-x-2">
                  <button onClick={() => updateStatus(item.id, "Waiting")} className="bg-yellow-400 text-white px-2 py-1 rounded">Waiting</button>
                  <button onClick={() => updateStatus(item.id, "With Doctor")} className="bg-blue-500 text-white px-2 py-1 rounded">With Doctor</button>
                  <button onClick={() => updateStatus(item.id, "Completed")} className="bg-green-500 text-white px-2 py-1 rounded">Completed</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
