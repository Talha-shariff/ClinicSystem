import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../utils/api";
import useAuthGuard from "../utils/authGuard";

export default function DoctorsPage() {
  useAuthGuard();
  const [doctors, setDoctors] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", specialization: "", gender: "", location: "", availability: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchDoctors = async () => {
    try {
      const res = await API.get("/doctors");
      setDoctors(res.data || []);
    } catch (err) { console.error(err); }
  };

  const submit = async (e: any) => {
    e.preventDefault();
    const payload = { ...form, availability: form.availability.split(",").map(s => s.trim()) };
    try {
      if (editingId) {
        await API.patch(`/doctors/${editingId}`, payload);
        setEditingId(null);
      } else {
        await API.post(`/doctors`, payload);
      }
      setForm({ name: "", specialization: "", gender: "", location: "", availability: "" });
      fetchDoctors();
    } catch (err) { console.error(err); }
  };

  const handleEdit = (d: any) => {
    setForm({ name: d.name, specialization: d.specialization, gender: d.gender, location: d.location, availability: d.availability.join(", ") });
    setEditingId(d.id);
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!confirm("Delete this doctor?")) return;
    try { await API.delete(`/doctors/${id}`); fetchDoctors(); } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchDoctors(); }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Manage Doctors</h2>

        <form onSubmit={submit} className="bg-white p-4 rounded shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input required placeholder="Name" className="border p-2" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
            <input required placeholder="Specialization" className="border p-2" value={form.specialization} onChange={(e) => setForm({...form, specialization: e.target.value})} />
            <select required className="border p-2" value={form.gender} onChange={(e) => setForm({...form, gender: e.target.value})}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input required placeholder="Location" className="border p-2" value={form.location} onChange={(e) => setForm({...form, location: e.target.value})} />
            <input placeholder="Availability (comma-separated)" className="border p-2 md:col-span-2" value={form.availability} onChange={(e) => setForm({...form, availability: e.target.value})} />
          </div>
          <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">{editingId ? "Update" : "Add Doctor"}</button>
        </form>

        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Specialization</th>
              <th className="border p-2">Gender</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Availability</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc.id}>
                <td className="border p-2">{doc.name}</td>
                <td className="border p-2">{doc.specialization}</td>
                <td className="border p-2">{doc.gender}</td>
                <td className="border p-2">{doc.location}</td>
                <td className="border p-2">{doc.availability?.join(", ")}</td>
                <td className="border p-2">
                  <button onClick={() => handleEdit(doc)} className="bg-yellow-400 text-white px-2 py-1 rounded mr-2">Edit</button>
                  <button onClick={() => handleDelete(doc.id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
