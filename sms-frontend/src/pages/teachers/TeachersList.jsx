import React, { useEffect, useState } from 'react';
import { getJSON, postJSON, putJSON, del } from '../../api';

export default function TeachersList() {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({ id: '', name: '', subject: '' });

  async function load() {
    setTeachers(await getJSON('/teachers'));
  }

  useEffect(() => { load(); }, []);

  async function submit(e) {
    e.preventDefault();
    const payload = { name: form.name, subject: form.subject };

    if (form.id) {
      await putJSON(`/teachers/${form.id}`, payload);
    } else {
      await postJSON('/teachers', payload);
    }
    setForm({ id: '', name: '', subject: '' });
    load();
  }

  function edit(t) {
    setForm({ id: t.id, name: t.name, subject: t.subject });
  }

  async function remove(id) {
    if (!window.confirm("Delete this teacher?")) return;
    await del(`/teachers/${id}`);
    load();
  }

  return (
    <div>
      <h2>👨‍🏫 Teachers</h2>

      <form className="mini-form" onSubmit={submit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          placeholder="Subject"
          value={form.subject}
          onChange={e => setForm({ ...form, subject: e.target.value })}
        />

        <button type="submit">Save</button>
        <button type="button" onClick={() => setForm({ id: '', name: '', subject: '' })}>Reset</button>
      </form>

      <table className="data-table">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Subject</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {teachers.map(t => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.name}</td>
              <td>{t.subject}</td>
              <td>
                <button className="action-btn edit" onClick={() => edit(t)}>Edit</button>
                <button className="action-btn delete" onClick={() => remove(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}