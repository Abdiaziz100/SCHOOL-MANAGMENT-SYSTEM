import React, { useEffect, useState } from 'react';
import { getJSON } from '../../api';

export default function TeacherAttendanceList() {
  const [teachers, setTeachers] = useState([]);
  const [records, setRecords] = useState([]);
  const [date, setDate] = useState('');
  const [teacher_id, setTeacherId] = useState('');
  const [status, setStatus] = useState('present');

  async function load() {
    setTeachers(await getJSON('/teachers'));
    setRecords([
      { id: 1, teacher_id: 1, date: '2024-01-15', status: 'present' },
      { id: 2, teacher_id: 2, date: '2024-01-15', status: 'absent' }
    ]);
  }

  useEffect(() => { load(); }, []);

  function submit(e) {
    e.preventDefault();
    const newRecord = {
      id: Date.now(),
      teacher_id: parseInt(teacher_id),
      date: date,
      status: status
    };
    setRecords([...records, newRecord]);
    setDate('');
    setTeacherId('');
    setStatus('present');
  }

  function remove(id) {
    if (!window.confirm("Delete attendance record?")) return;
    setRecords(records.filter(r => r.id !== id));
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