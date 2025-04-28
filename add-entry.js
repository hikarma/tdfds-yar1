document.getElementById("financial-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const record = {
    amount: parseFloat(document.getElementById("amount").value),
    type: document.getElementById("type").value,
    category: document.getElementById("category").value,
    date: document.getElementById("date").value,
    description: document.getElementById("description").value
  };

  let data = JSON.parse(localStorage.getItem("financialData")) || [];
  data.push(record);
  localStorage.setItem("financialData", JSON.stringify(data));

  alert("Запись успешно добавлена!");
  this.reset();
});
