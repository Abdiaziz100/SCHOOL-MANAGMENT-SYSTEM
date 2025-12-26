import React, { useState, useEffect } from 'react';
import { getJSON, postJSON, putJSON, del } from '../../api';

export default function Timetable() {
  const [schedules, setSchedules] = useState([]);
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({
    id: '', class_id: '', teacher_id: '', subject_id: '', 
    day: '', start_time: '', end_time: '', room: ''
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00'
  ];

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      setClasses(await getJSON('/classes'));
      setTeachers(await getJSON('/teachers'));
      setSubjects(await getJSON('/subjects'));
      setSchedules(await getJSON('/schedules') || []);
    } catch (error) {
      console.error('Error loading data:', error);
      setSchedules([]);
    }
  }

  async function submit(e) {
    e.preventDefault();
    const payload = {
      class_id: parseInt(form.class_id),
      teacher_id: parseInt(form.teacher_id),
      subject_id: parseInt(form.subject_id),
      day: form.day,
      start_time: form.start_time,
      end_time: form.end_time,
      room: form.room
    };

    try {
      if (form.id) {
        await putJSON(`/schedules/${form.id}`, payload);
      } else {
        await postJSON('/schedules', payload);
      }
      setForm({ id: '', class_id: '', teacher_id: '', subject_id: '', day: '', start_time: '', end_time: '', room: '' });
      load();
    } catch (error) {
      console.error('Error saving schedule:', error);
    }
  }

  function edit(schedule) {
    setForm({
      id: schedule.id,
      class_id: schedule.class_id,
      teacher_id: schedule.teacher_id,
      subject_id: schedule.subject_id,
      day: schedule.day,
      start_time: schedule.start_time,
      end_time: schedule.end_time,
      room: schedule.room
    });
  }

  async function remove(id) {
    if (!window.confirm("Delete this schedule?")) return;
    try {
      await del(`/schedules/${id}`);
      load();
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  }

  const getScheduleForSlot = (day, time) => {
    return schedules.find(s => s.day === day && s.start_time === time);
  };

  return (
    <div>
      <h2>📅 Timetable</h2>

      <form className="mini-form" onSubmit={submit}>
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
          value={form.subject_id}
          onChange={e => setForm({ ...form, subject_id: e.target.value })}
          required
        >
          <option value="">Select Subject</option>
          {subjects.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <select
          value={form.day}
          onChange={e => setForm({ ...form, day: e.target.value })}
          required
        >
          <option value="">Select Day</option>
          {days.map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>

        <select
          value={form.start_time}
          onChange={e => setForm({ ...form, start_time: e.target.value })}
          required
        >
          <option value="">Start Time</option>
          {timeSlots.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>

        <select
          value={form.end_time}
          onChange={e => setForm({ ...form, end_time: e.target.value })}
          required
        >
          <option value="">End Time</option>
          {timeSlots.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>

        <input
          placeholder="Room Number"
          value={form.room}
          onChange={e => setForm({ ...form, room: e.target.value })}
          required
        />

        <button type="submit">{form.id ? 'Update' : 'Add'} Schedule</button>
        <button type="button" onClick={() => setForm({ id: '', class_id: '', teacher_id: '', subject_id: '', day: '', start_time: '', end_time: '', room: '' })}>
          Reset
        </button>
      </form>

      <div className="timetable-grid">
        <div className="timetable-header">
          <div className="time-slot">Time</div>
          {days.map(day => (
            <div key={day} className="day-header">{day}</div>
          ))}
        </div>

        {timeSlots.map(time => (
          <div key={time} className="timetable-row">
            <div className="time-slot">{time}</div>
            {days.map(day => {
              const schedule = getScheduleForSlot(day, time);
              return (
                <div key={`${day}-${time}`} className="schedule-cell">
                  {schedule ? (
                    <div className="schedule-item">
                      <div className="subject-name">
                        {subjects.find(s => s.id === schedule.subject_id)?.name}
                      </div>
                      <div className="teacher-name">
                        {teachers.find(t => t.id === schedule.teacher_id)?.name}
                      </div>
                      <div className="room-info">Room: {schedule.room}</div>
                      <div className="schedule-actions">
                        <button className="edit-btn" onClick={() => edit(schedule)}>✏️</button>
                        <button className="delete-btn" onClick={() => remove(schedule.id)}>🗑️</button>
                      </div>
                    </div>
                  ) : (
                    <div className="empty-slot">-</div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}