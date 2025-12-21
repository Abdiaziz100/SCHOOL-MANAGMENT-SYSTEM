import React, { useEffect, useState } from 'react';
import { getJSON } from '../../api';

export default function AssignmentsList() {
  const [assignments, setAssignments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({ teacher_id: '', class_id: '', subject: '', title: '', due_date: '' });

  async function load() {
    setTeachers(await getJSON('/teachers'));
    setClasses(await getJSON('/classes'));
    setAssignments([
      { id: 1, teacher_id: 1, class_id: 1, subject: 'Math', title: 'Algebra Problems', due_date: '2024-02-20' },
      { id: 2, teacher_id: 2, class_id: 2, subject: 'English', title: 'Essay Writing', due_date: '2024-02-25' }
    ]);
  }

  useEffect(() => { load(); }, []);

  function submit(e) {
    e.preventDefault();
    const newAssignment = {
      id: Date.now(),
      teacher_id: parseInt(form.teacher_id),
      class_id: parseInt(form.class_id),
      subject: form.subject,
      title: form.title,
      due_date: form.due_date
    };
    setAssignments([...assignments, newAssignment]);
    setForm({ teacher_id: '', class_id: '', subject: '', title: '', due_date: '' });
  }

  return (
    <div>
      <h2>📋 Student Assignments</h2>

      <form className="mini-form" onSubmit={submit}>
        <select
          value={form.teacher_id}
          onChange={e => setForm({ ...form, teacher_id: e.target.value })}
          required
        >
          <option value="">Select Teacher</option>
          {teachers.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
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
          placeholder="Subject"
          value={form.subject}
          onChange={e => setForm({ ...form, subject: e.target.value })}
          required
        />
        <input
          placeholder="Assignment Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="date"
          value={form.due_date}
          onChange={e => setForm({ ...form, due_date: e.target.value })}
          required
        />
        <button type="submit">Save</button>
      </form>

      <table className="data-table">
        <thead>
          <tr><th>ID</th><th>Teacher</th><th>Class</th><th>Subject</th><th>Title</th><th>Due Date</th></tr>
        </thead>
        <tbody>
          {assignments.map(a => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{teachers.find(t => t.id === a.teacher_id)?.name || 'Unknown'}</td>
              <td>{classes.find(c => c.id === a.class_id)?.name || 'Unknown'}</td>
              <td>{a.subject}</td>
              <td>{a.title}</td>
              <td>{a.due_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}