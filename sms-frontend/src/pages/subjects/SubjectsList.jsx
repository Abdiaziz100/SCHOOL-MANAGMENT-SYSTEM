import React, { useEffect, useState } from 'react';
import { getJSON, postJSON, putJSON, del } from '../../api';

export default function SubjectsList() {
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({ id: '', name: '', code: '', description: '' });

  async function load() {
    setSubjects(await getJSON('/subjects'));
  }

  useEffect(() => { load(); }, []);

  async function submit(e) {
    e.preventDefault();
    const payload = { name: form.name, code: form.code, description: form.description };

    if (form.id) {
      await putJSON(`/subjects/${form.id}`, payload);
    } else {
      await postJSON('/subjects', payload);
    }
    setForm({ id: '', name: '', code: '', description: '' });
    load();
  }

  function edit(s) {
    setForm({ id: s.id, name: s.name, code: s.code, description: s.description || '' });
  }

  async function remove(id) {
    if (!window.confirm("Delete this subject?")) return;
    await del(`/subjects/${id}`);
    load();
  }

  return (
    <div>
      <h2>📚 Subjects</h2>

      <form className="mini-form" onSubmit={submit}>
        <input
          placeholder="Subject Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Subject Code"
          value={form.code}
          onChange={e => setForm({ ...form, code: e.target.value })}
          required
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit">{form.id ? 'Update' : 'Save'}</button>
        <button type="button" onClick={() => setForm({ id: '', name: '', code: '', description: '' })}>Reset</button>
      </form>

      <table className="data-table">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Code</th><th>Description</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {subjects.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.code}</td>
              <td>{s.description}</td>
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