import React, { useEffect, useState } from 'react';
import { getJSON, postJSON, putJSON, del } from '../../api';

export default function StudentsList() {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({ id: '', name: '', age: '', email: '', class_id: '' });

  async function load() {
    setStudents(await getJSON('/students'));
    setClasses(await getJSON('/classes'));
  }

  useEffect(() => { load(); }, []);

  async function submit(e) {
    e.preventDefault();
    const payload = {
      name: form.name,
      age: form.age || null,
      email: form.email,
      class_id: form.class_id || null
    };

    if (form.id) {
      await putJSON(`/students/${form.id}`, payload);
    } else {
      await postJSON('/students', payload);
    }
    setForm({ id: '', name: '', age: '', email: '', class_id: '' });
    load();
  }

  function edit(s) {
    setForm({ id: s.id, name: s.name, age: s.age || '', email: s.email || '', class_id: s.class_id || '' });
  }

  function resetForm() {
    setForm({ id: '', name: '', age: '', email: '', class_id: '' });
  }

  async function remove(id) {
    if (!window.confirm("Delete this student?")) return;
    await del(`/students/${id}`);
    load();
  }

  return (
    <div>
      <h2>👥 Students</h2>

      <form className="mini-form" onSubmit={submit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={e => setForm({ ...form, age: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <select
          value={form.class_id}
          onChange={e => setForm({ ...form, class_id: e.target.value })}
        >
          <option value="">-- No Class --</option>
          {classes.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <button type="submit">{form.id ? 'Update' : 'Save'}</button>
        <button type="button" onClick={resetForm}>Reset</button>
      </form>

      <table className="data-table">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Age</th><th>Email</th><th>Class</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.age}</td>
              <td>{s.email}</td>
              <td>{classes.find(c => c.id === s.class_id)?.name || ''}</td>
              <td>
                <button className="action-btn edit" onClick={() => edit(s)}>Edit</button>
                <button className="action-btn delete" onClick={() => remove(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}