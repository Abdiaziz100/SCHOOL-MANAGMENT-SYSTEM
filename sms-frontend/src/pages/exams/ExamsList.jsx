import React, { useEffect, useState } from 'react';
import { getJSON } from '../../api';

export default function ExamsList() {
  const [exams, setExams] = useState([]);
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({ name: '', class_id: '', date: '', duration: '', total_marks: '' });

  async function load() {
    setClasses(await getJSON('/classes'));
    // Mock exams data
    setExams([
      { id: 1, name: 'Mid Term Math', class_id: 1, date: '2024-02-15', duration: 120, total_marks: 100 },
      { id: 2, name: 'Final English', class_id: 2, date: '2024-03-20', duration: 180, total_marks: 150 }
    ]);
  }

  useEffect(() => { load(); }, []);

  function submit(e) {
    e.preventDefault();
    const newExam = {
      id: Date.now(),
      name: form.name,
      class_id: parseInt(form.class_id),
      date: form.date,
      duration: parseInt(form.duration),
      total_marks: parseInt(form.total_marks)
    };
    setExams([...exams, newExam]);
    setForm({ name: '', class_id: '', date: '', duration: '', total_marks: '' });
  }

  return (
    <div>
      <h2>📝 Exams</h2>

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
        <button type="submit">Save</button>
      </form>

      <table className="data-table">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Class</th><th>Date</th><th>Duration</th><th>Total Marks</th></tr>
        </thead>
        <tbody>
          {exams.map(e => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.name}</td>
              <td>{classes.find(c => c.id === e.class_id)?.name || 'Unknown'}</td>
              <td>{e.date}</td>
              <td>{e.duration} min</td>
              <td>{e.total_marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}