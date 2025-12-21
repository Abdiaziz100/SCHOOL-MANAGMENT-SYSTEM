import React, { useEffect, useState } from 'react';
import { getJSON, postJSON, putJSON, del } from '../../api';

export default function SubjectsList() {
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({ id: '', name: '', code: '', credits: '' });

  async function load() {
    // Mock data since backend doesn't have subjects endpoint
    setSubjects([
      { id: 1, name: 'Mathematics', code: 'MATH101', credits: 3 },
      { id: 2, name: 'English', code: 'ENG101', credits: 2 },
      { id: 3, name: 'Science', code: 'SCI101', credits: 4 }
    ]);
  }

  useEffect(() => { load(); }, []);

  function submit(e) {
    e.preventDefault();
    const newSubject = {
      id: Date.now(),
      name: form.name,
      code: form.code,
      credits: parseInt(form.credits)
    };
    setSubjects([...subjects, newSubject]);
    setForm({ id: '', name: '', code: '', credits: '' });
  }

  function edit(s) {
    setForm({ id: s.id, name: s.name, code: s.code, credits: s.credits });
  }

  function remove(id) {
    if (!window.confirm("Delete this subject?")) return;
    setSubjects(subjects.filter(s => s.id !== id));
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
          type="number"
          placeholder="Credits"
          value={form.credits}
          onChange={e => setForm({ ...form, credits: e.target.value })}
          required
        />
        <button type="submit">Save</button>
        <button type="button" onClick={() => setForm({ id: '', name: '', code: '', credits: '' })}>Reset</button>
      </form>

      <table className="data-table">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Code</th><th>Credits</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {subjects.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.code}</td>
              <td>{s.credits}</td>
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