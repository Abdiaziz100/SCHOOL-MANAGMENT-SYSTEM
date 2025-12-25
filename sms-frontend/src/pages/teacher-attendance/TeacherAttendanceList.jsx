import React, { useEffect, useState } from 'react';
import { getJSON, postJSON, del } from '../../api';

export default function TeacherAttendanceList() {
  const [teachers, setTeachers] = useState([]);
  const [records, setRecords] = useState([]);
  const [date, setDate] = useState('');
  const [teacher_id, setTeacherId] = useState('');
  const [status, setStatus] = useState('present');

  async function load() {
    setTeachers(await getJSON('/teachers'));
    setRecords(await getJSON('/teacher-attendance'));
  }

  useEffect(() => { load(); }, []);

  async function submit(e) {
    e.preventDefault();
    await postJSON('/teacher-attendance', {
      teacher_id: parseInt(teacher_id),
      date: date,
      status: status
    });
    setDate('');
    setTeacherId('');
    setStatus('present');
    load();
  }

  async function remove(id) {
    if (!window.confirm("Delete attendance record?")) return;
    await del(`/teacher-attendance/${id}`);
    load();
  }

  return (
    <div>
      <h2>👨🏫 Teacher Attendance</h2>

      <form className="mini-form" onSubmit={submit}>
        <select value={teacher_id} onChange={(e) => setTeacherId(e.target.value)} required>
          <option value="">Select Teacher</option>
          {teachers.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="late">Late</option>
        </select>

        <button type="submit">Save</button>
      </form>

      <table className="data-table">
        <thead>
          <tr><th>ID</th><th>Teacher</th><th>Date</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{teachers.find((t) => t.id === r.teacher_id)?.name}</td>
              <td>{r.date}</td>
              <td>
                <span className={`status ${r.status}`}>{r.status}</span>
              </td>
              <td>
                <button className="action-btn delete" onClick={() => remove(r.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}