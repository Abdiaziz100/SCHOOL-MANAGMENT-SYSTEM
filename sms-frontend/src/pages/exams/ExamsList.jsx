import React, { useEffect, useState } from 'react';
import { getJSON, postJSON, putJSON, del } from '../../api';
import SearchBar from '../../components/SearchBar';

export default function ExamsList() {
  const [exams, setExams] = useState([]);
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState({ id: '', name: '', class_id: '', date: '', duration: '', total_marks: '' });

  const filteredExams = exams.filter(exam => 
    exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classes.find(c => c.id === exam.class_id)?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function load() {
    setClasses(await getJSON('/classes'));
    setExams(await getJSON('/exams'));
  }

  useEffect(() => { load(); }, []);

  async function submit(e) {
    e.preventDefault();
    const payload = {
      name: form.name,
      class_id: parseInt(form.class_id),
      date: form.date,
      duration: parseInt(form.duration),
      total_marks: parseInt(form.total_marks)
    };

    if (form.id) {
      await putJSON(`/exams/${form.id}`, payload);
    } else {
      await postJSON('/exams', payload);
    }
    setForm({ id: '', name: '', class_id: '', date: '', duration: '', total_marks: '' });
    load();
  }

  function edit(e) {
    setForm({ id: e.id, name: e.name, class_id: e.class_id, date: e.date, duration: e.duration, total_marks: e.total_marks });
  }

  async function remove(id) {
    if (!window.confirm("Delete this exam?")) return;
    await del(`/exams/${id}`);
    load();
  }

  return (
    <div>
      <h2>📝 Exams</h2>
      
      <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        placeholder="Search exams or classes..." 
      />

      <form className="mini-form" onSubmit={submit}>
        <input
          placeholder="Exam Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <select
          value={form.class_id}
          onChange={e => setForm({ ...form, class_id: e.target.value })}
          required
        >
          <option value="">Select Class</option>
          {classes.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <input
          type="date"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Duration (minutes)"
          value={form.duration}
          onChange={e => setForm({ ...form, duration: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Total Marks"
          value={form.total_marks}
          onChange={e => setForm({ ...form, total_marks: e.target.value })}
          required
        />
        <button type="submit">{form.id ? 'Update' : 'Save'}</button>
        <button type="button" onClick={() => setForm({ id: '', name: '', class_id: '', date: '', duration: '', total_marks: '' })}>Reset</button>
      </form>

      <table className="data-table">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Class</th><th>Date</th><th>Duration</th><th>Total Marks</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {filteredExams.map(e => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.name}</td>
              <td>{classes.find(c => c.id === e.class_id)?.name || 'Unknown'}</td>
              <td>{e.date}</td>
              <td>{e.duration} min</td>
              <td>{e.total_marks}</td>
              <td>
                <button className="action-btn edit" onClick={() => edit(e)}>Edit</button>
                <button className="action-btn delete" onClick={() => remove(e.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}