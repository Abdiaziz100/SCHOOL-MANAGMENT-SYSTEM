import React, { useEffect, useState } from 'react';
import { getJSON, postJSON, del } from '../../api';

export default function FeesList() {
  const [students, setStudents] = useState([]);
  const [fees, setFees] = useState([]);
  const [form, setForm] = useState({ student_id: '', amount: '', type: 'tuition', status: 'pending' });

  async function load() {
    setStudents(await getJSON('/students'));
    setFees(await getJSON('/fees'));
  }

  useEffect(() => { load(); }, []);

  async function submit(e) {
    e.preventDefault();
    await postJSON('/fees', {
      student_id: parseInt(form.student_id),
      amount: parseFloat(form.amount),
      type: form.type,
      status: form.status
    });
    setForm({ student_id: '', amount: '', type: 'tuition', status: 'pending' });
    load();
  }

  async function remove(id) {
    if (!window.confirm("Delete this fee record?")) return;
    await del(`/fees/${id}`);
    load();
  }

  return (
    <div>
      <h2>💰 Fees Management</h2>

      <form className="mini-form" onSubmit={submit}>
        <select
          value={form.student_id}
          onChange={e => setForm({ ...form, student_id: e.target.value })}
          required
        >
          <option value="">Select Student</option>
          {students.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={e => setForm({ ...form, amount: e.target.value })}
          required
        />
        <select
          value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })}
        >
          <option value="tuition">Tuition</option>
          <option value="library">Library</option>
          <option value="transport">Transport</option>
          <option value="exam">Exam</option>
        </select>
        <select
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
        </select>
        <button type="submit">Save</button>
      </form>

      <table className="data-table">
        <thead>
          <tr><th>ID</th><th>Student</th><th>Amount</th><th>Type</th><th>Status</th><th>Date</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {fees.map(f => (
            <tr key={f.id}>
              <td>{f.id}</td>
              <td>{students.find(s => s.id === f.student_id)?.name || 'Unknown'}</td>
              <td>${f.amount}</td>
              <td>{f.type}</td>
              <td>
                <span className={`status ${f.status}`}>{f.status}</span>
              </td>
              <td>{f.date}</td>
              <td>
                <button className="action-btn delete" onClick={() => remove(f.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}