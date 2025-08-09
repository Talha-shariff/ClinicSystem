import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../utils/api";
import useAuthGuard from "../utils/authGuard";

export default function AppointmentsPage() {
  useAuthGuard();
  const [doctors, setDoctors] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [selected, setSelected] = useState({ doctorId: 0, timeSlot: "", patientName: "" });

  const fetchDoctors = async () => {
    try {
      const res = await API.get("/doctors");
      setDoctors(res.data || []);
    } catch (err) { console.error(err); }
  };

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments");
      setAppointments(res.data || []);
    } catch (err) { console.error(err); }
  };

  const handleBook = async () => {
    if (!selected.patientName || !selected.doctorId || !selected.timeSlot) return alert("fill all fields");
    try {
      await API.post("/appointments", {
        doctorId: selected.doctorId,
        timeSlot: selected.timeSlot,
        patientName: selected.patientName,
      });
      setSelected({ doctorId: 0, timeSlot: "", patientName: "" });
      fetchAppointments();
    } catch (err) { console.error(err); }
  };

  const handleCancel = async (id: number) => {
    if (!confirm("Cancel this appointment?")) return;
    try {
      await API.delete(`/appointments/${id}`);
      fetchAppointments();
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Appointment Management</h2>

        <div className="mb-6 bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Book Appointment</h3>
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <input placeholder="Patient Name" value={selected.patientName}
              onChange={(e) => setSelected({ ...selected, patientName: e.target.value })}
              className="border p-2 w-full md:w-1/3" />
            <select className="border p-2 w-full md:w-1/4"
              value={selected.doctorId} onChange={(e) => setSelected({ ...selected, doctorId: Number(e.target.value), timeSlot: "" })}>
              <option value={0}>Select Doctor</option>
              {doctors.map((d) => <option key={d.id} value={d.id}>{d.name} ({d.specialization})</option>)}
            </select>

            <select className="border p-2 w-full md:w-1/4"
              value={selected.timeSlot} onChange={(e) => setSelected({ ...selected, timeSlot: e.target.value })}>
              <option value="">Select Time Slot</option>
              {doctors.find(d => d.id === selected.doctorId)?.availability?.map((slot: string, i: number) => (
                <option key={i} value={slot}>{slot}</option>
              ))}
            </select>

            <button onClick={handleBook} className="bg-blue-600 text-white px-4 py-2 rounded">Book</button>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2">All Appointments</h3>
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Patient</th>
              <th className="border p-2">Doctor</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app) => (
              <tr key={app.id}>
                <td className="border p-2">{app.patient?.name}</td>
                <td className="border p-2">{app.doctor?.name}</td>
                <td className="border p-2">{app.timeSlot}</td>
                <td className="border p-2">{app.status}</td>
                <td className="border p-2">
                  <button onClick={() => handleCancel(app.id)} className="bg-red-500 text-white px-2 py-1 rounded">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
