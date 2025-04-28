table.row.add([
  record.type === 'income' ? 'Доход' : 'Расход',
  record.amount + ' ₽',
  record.category,
  record.date,
  record.description || '',
  `<button onclick="editRecord(${index})">✏</button> <button onclick="deleteRecord(${index})">🗑</button>`
]);
