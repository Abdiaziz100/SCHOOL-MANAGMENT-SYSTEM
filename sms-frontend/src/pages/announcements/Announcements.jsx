import React, { useState, useEffect } from 'react';
import { getJSON, postJSON, putJSON, del } from '../../api';
import SearchBar from '../../components/SearchBar';

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState({
    id: '', title: '', content: '', priority: 'normal', target_audience: 'all'
  });

  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      setAnnouncements(await getJSON('/announcements') || []);
    } catch (error) {
      console.error('Error loading announcements:', error);
      setAnnouncements([]);
    }
  }

  async function submit(e) {
    e.preventDefault();
    const payload = {
      title: form.title,
      content: form.content,
      priority: form.priority,
      target_audience: form.target_audience,
      date_created: new Date().toISOString().split('T')[0]
    };

    try {
      if (form.id) {
        await putJSON(`/announcements/${form.id}`, payload);
      } else {
        await postJSON('/announcements', payload);
      }
      setForm({ id: '', title: '', content: '', priority: 'normal', target_audience: 'all' });
      load();
    } catch (error) {
      console.error('Error saving announcement:', error);
    }
  }

  function edit(announcement) {
    setForm({
      id: announcement.id,
      title: announcement.title,
      content: announcement.content,
      priority: announcement.priority,
      target_audience: announcement.target_audience
    });
  }

  async function remove(id) {
    if (!window.confirm("Delete this announcement?")) return;
    try {
      await del(`/announcements/${id}`);
      load();
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  }

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      default: return 'priority-normal';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div>
      <h2>📢 Announcements</h2>

      <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        placeholder="Search announcements..." 
      />

      <form className="mini-form" onSubmit={submit}>
        <input
          placeholder="Announcement Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />

        <textarea
          placeholder="Announcement Content"
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
          rows="4"
          required
        />

        <select
          value={form.priority}
          onChange={e => setForm({ ...form, priority: e.target.value })}
        >
          <option value="normal">Normal Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <select
          value={form.target_audience}
          onChange={e => setForm({ ...form, target_audience: e.target.value })}
        >
          <option value="all">All</option>
          <option value="students">Students</option>
          <option value="teachers">Teachers</option>
          <option value="parents">Parents</option>
        </select>

        <button type="submit">{form.id ? 'Update' : 'Post'} Announcement</button>
        <button type="button" onClick={() => setForm({ id: '', title: '', content: '', priority: 'normal', target_audience: 'all' })}>
          Reset
        </button>
      </form>

      <div className="announcements-list">
        {filteredAnnouncements.map(announcement => (
          <div key={announcement.id} className={`announcement-card ${getPriorityClass(announcement.priority)}`}>
            <div className="announcement-header">
              <h3 className="announcement-title">{announcement.title}</h3>
              <div className="announcement-meta">
                <span className="priority-badge">{announcement.priority}</span>
                <span className="audience-badge">{announcement.target_audience}</span>
                <span className="date-badge">{formatDate(announcement.date_created)}</span>
              </div>
            </div>
            
            <div className="announcement-content">
              {announcement.content}
            </div>
            
            <div className="announcement-actions">
              <button className="action-btn edit" onClick={() => edit(announcement)}>
                Edit
              </button>
              <button className="action-btn delete" onClick={() => remove(announcement.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
        
        {filteredAnnouncements.length === 0 && (
          <div className="no-announcements">
            <p>No announcements found.</p>
          </div>
        )}
      </div>
    </div>
  );
}