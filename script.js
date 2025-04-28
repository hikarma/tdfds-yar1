const form = $('#financial-form');
const table = $('#recordsTable').DataTable({
  dom: 'Bfrtip',
  buttons: ['copyHtml5', 'excelHtml5', 'csvHtml5', 'pdfHtml5']
});

let financialData = JSON.parse(localStorage.getItem('financialData')) || [];

function refreshTable() {
  table.clear();
  financialData.forEach((record, index) => {
    table.row.add([
      record.type === 'income' ? 'Доход' : 'Расход',
      record.amount + ' ₽',
      record.category,
      record.date,
      record.description || '',
      `<button onclick="editRecord(${index})">✏</button> <button onclick="deleteRecord(${index})">🗑</button>`
    ]);
  });
  table.draw();
}

function updateChart() {
  const income = financialData.filter(r => r.type === 'income').reduce((s, r) => s + r.amount, 0);
  const expense = financialData.filter(r => r.type === 'expense').reduce((s, r) => s + r.amount, 0);
  new Chart(document.getElementById('financialChart'), {
    type: 'pie',
    data: {
      labels: ['Доходы', 'Расходы'],
      datasets: [{
        data: [income, expense],
        backgroundColor: ['#4CAF50', '#FF5722']
      }]
    }
  });
}

form.on('submit', function(e) {
  e.preventDefault();
  const record = {
    amount: parseFloat($('#amount').val()),
    type: $('#type').val(),
    category: $('#category').val(),
    date: $('#date').val(),
    description: $('#description').val()
  };
  financialData.push(record);
  localStorage.setItem('financialData', JSON.stringify(financialData));
  form[0].reset();
  refreshTable();
  updateChart();
});

window.deleteRecord = function(index) {
  if (confirm('Удалить запись?')) {
    financialData.splice(index, 1);
    localStorage.setItem('financialData', JSON.stringify(financialData));
    refreshTable();
    updateChart();
  }
};

window.editRecord = function(index) {
  const r = financialData[index];
  $('#amount').val(r.amount);
  $('#type').val(r.type);
  $('#category').val(r.category);
  $('#date').val(r.date);
  $('#description').val(r.description);
  financialData.splice(index, 1);
  localStorage.setItem('financialData', JSON.stringify(financialData));
  refreshTable();
  updateChart();
};

refreshTable();
updateChart();
