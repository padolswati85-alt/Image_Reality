import React, { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  MapPin,
  Tags,
  Map,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Search,
} from "lucide-react";

const API_BASE = "http://127.0.0.1:8000/admin";

const emptyDestination = {
  name: "",
  description: "",
  image_url: "",
  latitude: "",
  longitude: "",
  crowd_level: "Low",
  taluka_id: "",
  category_ids: [],
};

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [stats, setStats] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [talukas, setTalukas] = useState([]);

  const [search, setSearch] = useState("");
  const [destinationForm, setDestinationForm] = useState(emptyDestination);
  const [editingDestinationId, setEditingDestinationId] = useState(null);

  const [categoryName, setCategoryName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const [talukaName, setTalukaName] = useState("");
  const [editingTalukaId, setEditingTalukaId] = useState(null);

  const [loading, setLoading] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [statsRes, destRes, catRes, talukaRes] = await Promise.all([
        fetch(`${API_BASE}/stats`),
        fetch(`${API_BASE}/destinations`),
        fetch(`${API_BASE}/categories`),
        fetch(`${API_BASE}/talukas`),
      ]);

      setStats(await statsRes.json());
      setDestinations(await destRes.json());
      setCategories(await catRes.json());
      setTalukas(await talukaRes.json());
    } catch (error) {
      console.error(error);
      alert("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const filteredDestinations = useMemo(() => {
    return destinations.filter((d) =>
      d.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [destinations, search]);

  const handleDestinationChange = (e) => {
    const { name, value } = e.target;
    setDestinationForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategorySelection = (categoryId) => {
    setDestinationForm((prev) => {
      const exists = prev.category_ids.includes(categoryId);
      return {
        ...prev,
        category_ids: exists
          ? prev.category_ids.filter((id) => id !== categoryId)
          : [...prev.category_ids, categoryId],
      };
    });
  };

  const resetDestinationForm = () => {
    setDestinationForm(emptyDestination);
    setEditingDestinationId(null);
  };

  const saveDestination = async () => {
    if (!destinationForm.name.trim()) {
      alert("Destination name is required");
      return;
    }

    const payload = {
      ...destinationForm,
      latitude: destinationForm.latitude
        ? Number(destinationForm.latitude)
        : null,
      longitude: destinationForm.longitude
        ? Number(destinationForm.longitude)
        : null,
      taluka_id: destinationForm.taluka_id
        ? Number(destinationForm.taluka_id)
        : null,
      category_ids: destinationForm.category_ids,
    };

    try {
      const url = editingDestinationId
        ? `${API_BASE}/destinations/${editingDestinationId}`
        : `${API_BASE}/destinations`;

      const method = editingDestinationId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Failed to save destination");
      }

      await fetchAll();
      resetDestinationForm();
      alert(editingDestinationId ? "Destination updated" : "Destination added");
    } catch (error) {
      alert(error.message);
    }
  };

  const editDestination = (d) => {
    setEditingDestinationId(d.id);
    setDestinationForm({
      name: d.name || "",
      description: d.description || "",
      image_url: d.image_url || "",
      latitude: d.latitude || "",
      longitude: d.longitude || "",
      crowd_level: d.crowd_level || "Low",
      taluka_id: d.taluka_id || "",
      category_ids: d.categories?.map((c) => c.id) || [],
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteDestination = async (id) => {
    if (!window.confirm("Delete this destination?")) return;

    try {
      const res = await fetch(`${API_BASE}/destinations/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      await fetchAll();
    } catch (error) {
      alert(error.message);
    }
  };

  const saveCategory = async () => {
    if (!categoryName.trim()) return alert("Category name required");

    try {
      const url = editingCategoryId
        ? `${API_BASE}/categories/${editingCategoryId}`
        : `${API_BASE}/categories`;

      const method = editingCategoryId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Category save failed");
      }

      setCategoryName("");
      setEditingCategoryId(null);
      await fetchAll();
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await fetch(`${API_BASE}/categories/${id}`, { method: "DELETE" });
      await fetchAll();
    } catch {
      alert("Category delete failed");
    }
  };

  const saveTaluka = async () => {
    if (!talukaName.trim()) return alert("Taluka name required");

    try {
      const url = editingTalukaId
        ? `${API_BASE}/talukas/${editingTalukaId}`
        : `${API_BASE}/talukas`;

      const method = editingTalukaId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: talukaName }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Taluka save failed");
      }

      setTalukaName("");
      setEditingTalukaId(null);
      await fetchAll();
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteTaluka = async (id) => {
    if (!window.confirm("Delete this taluka?")) return;

    try {
      await fetch(`${API_BASE}/talukas/${id}`, { method: "DELETE" });
      await fetchAll();
    } catch {
      alert("Taluka delete failed");
    }
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "destinations", label: "Destinations", icon: <MapPin size={18} /> },
    { id: "categories", label: "Categories", icon: <Tags size={18} /> },
    { id: "talukas", label: "Talukas", icon: <Map size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eefcff] via-[#fff8dc] to-[#fffaf0] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0077aa] mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mb-8">
          Manage destinations, categories, talukas and crowd levels directly from database.
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-semibold shadow transition ${
                activeTab === tab.id
                  ? "bg-[#0077aa] text-white"
                  : "bg-white text-[#0077aa]"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="bg-white p-5 rounded-2xl shadow mb-6 text-[#0077aa] font-bold">
            Loading admin data...
          </div>
        )}

        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats &&
              Object.entries(stats).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-white rounded-3xl shadow-xl p-6 border border-white"
                >
                  <p className="text-gray-500 capitalize">{key}</p>
                  <h2 className="text-4xl font-extrabold text-[#0077aa] mt-2">
                    {value}
                  </h2>
                </div>
              ))}
          </div>
        )}

        {activeTab === "destinations" && (
          <>
            <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-[#0077aa] mb-5">
                {editingDestinationId ? "Edit Destination" : "Add Destination"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="name"
                  value={destinationForm.name}
                  onChange={handleDestinationChange}
                  placeholder="Destination name"
                  className="border rounded-xl px-4 py-3"
                />

                <input
                  name="image_url"
                  value={destinationForm.image_url}
                  onChange={handleDestinationChange}
                  placeholder="Image URL e.g. /static/images/place.jpg"
                  className="border rounded-xl px-4 py-3"
                />

                <input
                  name="latitude"
                  value={destinationForm.latitude}
                  onChange={handleDestinationChange}
                  placeholder="Latitude"
                  className="border rounded-xl px-4 py-3"
                />

                <input
                  name="longitude"
                  value={destinationForm.longitude}
                  onChange={handleDestinationChange}
                  placeholder="Longitude"
                  className="border rounded-xl px-4 py-3"
                />

                <select
                  name="taluka_id"
                  value={destinationForm.taluka_id}
                  onChange={handleDestinationChange}
                  className="border rounded-xl px-4 py-3"
                >
                  <option value="">Select Taluka</option>
                  {talukas.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>

                <select
                  name="crowd_level"
                  value={destinationForm.crowd_level}
                  onChange={handleDestinationChange}
                  className="border rounded-xl px-4 py-3"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Danger">Danger</option>
                </select>

                <textarea
                  name="description"
                  value={destinationForm.description}
                  onChange={handleDestinationChange}
                  placeholder="Description"
                  className="border rounded-xl px-4 py-3 md:col-span-2"
                  rows="3"
                />
              </div>

              <div className="mt-5">
                <p className="font-semibold mb-3">Select Categories</p>
                <div className="flex flex-wrap gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategorySelection(cat.id)}
                      className={`px-4 py-2 rounded-full border font-semibold ${
                        destinationForm.category_ids.includes(cat.id)
                          ? "bg-[#0077aa] text-white"
                          : "bg-white text-gray-700"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={saveDestination}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full font-bold"
                >
                  <Save size={18} />
                  {editingDestinationId ? "Update" : "Add"}
                </button>

                {editingDestinationId && (
                  <button
                    onClick={resetDestinationForm}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-full font-bold"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                )}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <Search size={20} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search destinations..."
                  className="border rounded-full px-5 py-3 w-full"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                  <thead>
                    <tr className="bg-[#0077aa] text-white">
                      <th className="p-3 text-left">ID</th>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Taluka</th>
                      <th className="p-3 text-left">Crowd</th>
                      <th className="p-3 text-left">Lat</th>
                      <th className="p-3 text-left">Lng</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDestinations.map((d) => (
                      <tr key={d.id} className="border-b hover:bg-blue-50">
                        <td className="p-3">{d.id}</td>
                        <td className="p-3 font-semibold">{d.name}</td>
                        <td className="p-3">{d.taluka?.name || "Nashik"}</td>
                        <td className="p-3">{d.crowd_level}</td>
                        <td className="p-3">{d.latitude}</td>
                        <td className="p-3">{d.longitude}</td>
                        <td className="p-3 flex gap-2">
                          <button
                            onClick={() => editDestination(d)}
                            className="p-2 bg-blue-500 text-white rounded-lg"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => deleteDestination(d.id)}
                            className="p-2 bg-red-500 text-white rounded-lg"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === "categories" && (
          <SimpleManager
            title="Categories"
            value={categoryName}
            setValue={setCategoryName}
            editingId={editingCategoryId}
            setEditingId={setEditingCategoryId}
            data={categories}
            onSave={saveCategory}
            onEdit={(item) => {
              setEditingCategoryId(item.id);
              setCategoryName(item.name);
            }}
            onDelete={deleteCategory}
          />
        )}

        {activeTab === "talukas" && (
          <SimpleManager
            title="Talukas"
            value={talukaName}
            setValue={setTalukaName}
            editingId={editingTalukaId}
            setEditingId={setEditingTalukaId}
            data={talukas}
            onSave={saveTaluka}
            onEdit={(item) => {
              setEditingTalukaId(item.id);
              setTalukaName(item.name);
            }}
            onDelete={deleteTaluka}
          />
        )}
      </div>
    </div>
  );
}

function SimpleManager({
  title,
  value,
  setValue,
  editingId,
  setEditingId,
  data,
  onSave,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-[#0077aa] mb-5">
        Manage {title}
      </h2>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`${title} name`}
          className="border rounded-xl px-4 py-3 flex-1"
        />

        <button
          onClick={onSave}
          className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold"
        >
          {editingId ? "Update" : "Add"}
        </button>

        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setValue("");
            }}
            className="px-6 py-3 bg-gray-500 text-white rounded-xl font-bold"
          >
            Cancel
          </button>
        )}
      </div>

      <div className="space-y-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border p-4 rounded-xl hover:bg-blue-50"
          >
            <div>
              <p className="font-bold">{item.name}</p>
              <p className="text-sm text-gray-500">ID: {item.id}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(item)}
                className="p-2 bg-blue-500 text-white rounded-lg"
              >
                <Edit size={16} />
              </button>

              <button
                onClick={() => onDelete(item.id)}
                className="p-2 bg-red-500 text-white rounded-lg"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}