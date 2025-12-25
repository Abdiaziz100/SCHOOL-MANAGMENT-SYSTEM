// Export utilities for amazing data management
export function exportToCSV(data, filename) {
  if (!data.length) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();
  window.URL.revokeObjectURL(url);
}

export function exportToPDF(data, filename, title) {
  // Simple PDF export using print functionality
  const printWindow = window.open('', '_blank');
  const tableHTML = `
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #2563eb; text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #2563eb; color: white; }
          tr:nth-child(even) { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <table>
          <thead>
            <tr>${Object.keys(data[0] || {}).map(key => `<th>${key}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${data.map(row => 
              `<tr>${Object.values(row).map(value => `<td>${value || ''}</td>`).join('')}</tr>`
            ).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `;
  
  printWindow.document.write(tableHTML);
  printWindow.document.close();
  printWindow.print();
}

export function generateReport(data, type) {
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `${type}_report_${timestamp}`;
  
  return {
    csv: () => exportToCSV(data, filename),
    pdf: () => exportToPDF(data, filename, `${type} Report`)
  };
}