import React, { useEffect, useState } from "react";
import { getJSON, postJSON, del } from "../../api";

export default function GradesList() {
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [form, setForm] = useState({ student_id: "", subject: "", score: "" });

  async function load() {
    setStudents(await getJSON("/students"));
    setGrades(await getJSON("/grades"));
  }

  useEffect(() => { load(); }, []);

  async function submit(e) {
    e.preventDefault();
    await postJSON("/grades", {
      student_id: form.student_id,
      subject: form.subject,
      score: form.score,
    });
    setForm({ student_id: "", subject: "", score: "" });
    load();
  }

  async function remove(id) {
    if (!window.confirm("Delete grade?")) return;
    await del(`/grades/${id}`);
    load();
  }

  return (
    <div>
      <h2>📊 Grades</h2>

      <form className="mini-form" onSubmit={submit}>
        <select
          value={form.student_id}
          onChange={(e) => setForm({ ...form, student_id: e.target.value })}
          required
        >
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <input
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Score"
          value={form.score}
          onChange={(e) => setForm({ ...form, score: e.target.value })}
          required
        />

        <button type="submit">Save</button>
      </form>

      <table className="data-table">
        <thead>
          <tr><th>ID</th><th>Student</th><th>Subject</th><th>Score</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {grades.map((g) => (
            <tr key={g.id}>
              <td>{g.id}</td>
              <td>{students.find((s) => s.id === g.student_id)?.name || ""}</td>
              <td>{g.subject}</td>
              <td>{g.score}</td>
              <td>
                <button className="action-btn delete" onClick={() => remove(g.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}