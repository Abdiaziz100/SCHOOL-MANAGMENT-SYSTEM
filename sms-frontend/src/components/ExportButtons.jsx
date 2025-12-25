import React from 'react';
import { generateReport } from '../utils/export';

export default function ExportButtons({ data, type }) {
  const report = generateReport(data, type);

  return (
    <div className="export-buttons">
      <button onClick={report.csv} className="export-btn csv">
        📊 Export CSV
      </button>
      <button onClick={report.pdf} className="export-btn pdf">
        📄 Export PDF
      </button>
    </div>
  );
}