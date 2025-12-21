import React, { useEffect, useState } from 'react';
import { getJSON } from '../../api';

export default function FeesList() {
  const [students, setStudents] = useState([]);
  const [fees, setFees] = useState([]);
  const [form, setForm] = useState({ student_id: '', amount: '', type: 'tuition', status: 'pending' });

  async function load() {
    setStudents(await getJSON('/students'));
    // Mock fees data
    setFees([
      { id: 1, student_id: 1, amount: 500, type: 'tuition', status: 'paid', date: '2024-01-15' },
      { id: 2, student_id: 2, amount: 300, type: 'library', status: 'pending', date: '2024-01-20' }
    ]);
  }

  useEffect(() => { load(); }, []);

  function submit(e) {
    e.preventDefault();
    const newId = fees.length > 0 ? Math.max(...fees.map(f => f.id)) + 1 : 1;
    const newFee = {
      id: newId,
      student_id: parseInt(form.student_id),
      amount: parseFloat(form.amount),
      type: form.type,
      status: form.status,
      date: new Date().toISOString().split('T')[0]
    };
    setFees([...fees, newFee]);
    setForm({ student_id: '', amount: '', type: 'tuition', status: 'pending' });
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
          <tr><th>ID</th><th>Student</th><th>Amount</th><th>Type</th><th>Status</th><th>Date</th></tr>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}