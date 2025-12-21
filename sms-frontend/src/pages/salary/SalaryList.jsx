import React, { useEffect, useState } from 'react';
import { getJSON } from '../../api';

export default function SalaryList() {
  const [teachers, setTeachers] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [form, setForm] = useState({ teacher_id: '', amount: '', month: '', year: '', status: 'pending' });

  async function load() {
    setTeachers(await getJSON('/teachers'));
    setSalaries([
      { id: 1, teacher_id: 1, amount: 3000, month: 'January', year: 2024, status: 'paid' },
      { id: 2, teacher_id: 2, amount: 2800, month: 'January', year: 2024, status: 'pending' }
    ]);
  }

  useEffect(() => { load(); }, []);

  function submit(e) {
    e.preventDefault();
    const newId = salaries.length > 0 ? Math.max(...salaries.map(s => s.id)) + 1 : 1;
    const newSalary = {
      id: newId,
      teacher_id: parseInt(form.teacher_id),
      amount: parseFloat(form.amount),
      month: form.month,
      year: parseInt(form.year),
      status: form.status
    };
    setSalaries([...salaries, newSalary]);
    setForm({ teacher_id: '', amount: '', month: '', year: '', status: 'pending' });
  }

  return (
    <div>
      <h2>💵 Salary Payment</h2>

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
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={e => setForm({ ...form, amount: e.target.value })}
          required
        />
        <select
          value={form.month}
          onChange={e => setForm({ ...form, month: e.target.value })}
          required
        >
          <option value="">Select Month</option>
          {['January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Year"
          value={form.year}
          onChange={e => setForm({ ...form, year: e.target.value })}
          required
        />
        <select
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
        <button type="submit">Save</button>
      </form>

      <table className="data-table">
        <thead>
          <tr><th>ID</th><th>Teacher</th><th>Amount</th><th>Month</th><th>Year</th><th>Status</th></tr>
        </thead>
        <tbody>
          {salaries.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{teachers.find(t => t.id === s.teacher_id)?.name || 'Unknown'}</td>
              <td>${s.amount}</td>
              <td>{s.month}</td>
              <td>{s.year}</td>
              <td>
                <span className={`status ${s.status}`}>{s.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}