import React, { useEffect, useState } from "react";
import { getJSON, postJSON, putJSON, del } from "../../api";

export default function ClassesList() {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", teacher_id: "" });

  async function load() {
    setClasses(await getJSON("/classes"));
    setTeachers(await getJSON("/teachers"));
  }

  useEffect(() => {
    load();
  }, []);

  async function submit(e) {
    e.preventDefault();
    const payload = {
      name: form.name,
      teacher_id: form.teacher_id || null,
    };

    if (form.id) {
      await putJSON(`/classes/${form.id}`, payload);
    } else {
      await postJSON("/classes", payload);
    }

    setForm({ id: "", name: "", teacher_id: "" });
    load();
  }

  function edit(c) {
    setForm({ id: c.id, name: c.name, teacher_id: c.teacher_id || "" });
  }

  async function remove(id) {
    if (!window.confirm("Delete this class?")) return;
    await del(`/classes/${id}`);
    load();
  }

  return (
    <div>
      <h2>🏢 Classes</h2>

      <form className="mini-form" onSubmit={submit}>
        <input
          placeholder="Class Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <select
          value={form.teacher_id}
          onChange={(e) =>
            setForm({ ...form, teacher_id: e.target.value })
          }
        >
          <option value="">-- No Teacher --</option>
          {teachers.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <button type="submit">Save</button>
        <button type="button" onClick={() => setForm({ id: "", name: "", teacher_id: "" })}>
          Reset
        </button>
      </form>

      <table className="data-table">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Teacher</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {classes.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{teachers.find((t) => t.id === c.teacher_id)?.name || ""}</td>
              <td>
                <button className="action-btn edit" onClick={() => edit(c)}>Edit</button>
                <button className="action-btn delete" onClick={() => remove(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}