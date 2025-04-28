// Загрузка данных
window.onload = () => {
  let u = localStorage.getItem("username"),
      e = localStorage.getItem("email"),
      a = localStorage.getItem("avatar"),
      d = localStorage.getItem("darkMode");

  if (u) document.getElementById("username").value = u;
  if (e) document.getElementById("email").value = e;
  if (a) document.getElementById("avatar").src = a;
  if (d === "true") {
    document.body.classList.add("dark");
    document.getElementById("darkToggle").checked = true;
  }
};

// Сохранение данных
function save() {
  localStorage.setItem("username", document.getElementById("username").value);
  localStorage.setItem("email", document.getElementById("email").value);
  alert("Данные сохранены!");
}

// Аватар
document.getElementById("avatarInput").addEventListener("change", function () {
  const reader = new FileReader();
  reader.onload = e => {
    document.getElementById("avatar").src = e.target.result;
    localStorage.setItem("avatar", e.target.result);
  };
  reader.readAsDataURL(this.files[0]);
});

// Тёмная тема
document.getElementById("darkToggle").addEventListener("change", function () {
  document.body.classList.toggle("dark", this.checked);
  localStorage.setItem("darkMode", this.checked);
});

// Вкладки
function showTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelectorAll('.tabs button').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(tabId).classList.add('active');
  event.target.classList.add('active');
}
