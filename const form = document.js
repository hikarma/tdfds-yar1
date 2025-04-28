const form = document.getElementById('registrationForm');
const dangerousPattern = /(<|>|"|\'|;|--|\/\*|\*\/|SELECT|DROP|INSERT|DELETE|UPDATE|WHERE|OR\s+1=1|=|script)/i;

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const comment = document.getElementById('comment').value.trim();
  const agree = document.getElementById('agree').checked;

  document.querySelectorAll('.error').forEach(el => el.textContent = '');

  let hasError = false;

  function checkDangerous(value, fieldId, fieldName) {
    if (dangerousPattern.test(value)) {
      document.getElementById(fieldId).textContent = `Ошибка: ${fieldName} содержит недопустимые символы.`;
      hasError = true;
    }
  }

  checkDangerous(username, 'usernameError', 'Имя пользователя');
  checkDangerous(email, 'emailError', 'Email');
  checkDangerous(comment, 'commentError', 'Комментарий');

  if (!email.includes('@')) {
    document.getElementById('emailError').textContent = 'Неверный формат email.';
    hasError = true;
  }

  if (password.length < 6) {
    document.getElementById('passwordError').textContent = 'Пароль должен содержать минимум 6 символов.';
    hasError = true;
  }

  if (password !== confirmPassword) {
    document.getElementById('confirmError').textContent = 'Пароли не совпадают.';
    hasError = true;
  }

  if (!agree) {
    document.getElementById('agreeError').textContent = 'Вы должны согласиться с условиями.';
    hasError = true;
  }

  if (!hasError) {
    alert('Регистрация прошла успешно!');
    form.reset();
  }
});
