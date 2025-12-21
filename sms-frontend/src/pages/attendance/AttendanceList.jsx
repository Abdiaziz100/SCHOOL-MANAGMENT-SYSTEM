import React, { useEffect, useState } from "react";
import { getJSON, postJSON, del } from "../../api";

export default function AttendanceList() {
  const [students, setStudents] = useState([]);
  const [records, setRecords] = useState([]);
  const [date, setDate] = useState("");
  const [student_id, setStudentId] = useState("");
  const [status, setStatus] = useState("present");

  async function load() {
    setStudents(await getJSON("/students"));
    setRecords(await getJSON("/attendance"));
  }

  useEffect(() => { load(); }, []);

  async function submit(e) {
    e.preventDefault();
    await postJSON("/attendance", { student_id, date, status });
    load();
  }

  async function remove(id) {
    if (!window.confirm("Delete attendance record?")) return;
    await del(`/attendance/${id}`);
    load();
  }

  return (
    <div>
      <h2>📋 Attendance</h2>

      <form className="mini-form" onSubmit={submit}>
        <select value={student_id} onChange={(e) => setStudentId(e.target.value)} required>
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
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
        </select>

        <button type="submit">Save</button>
      </form>

      <table className="data-table">
        <thead>
          <tr><th>ID</th><th>Student</th><th>Date</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{students.find((s) => s.id === r.student_id)?.name}</td>
              <td>{r.date}</td>
              <td>{r.status}</td>
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