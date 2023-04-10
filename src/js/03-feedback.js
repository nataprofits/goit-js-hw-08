import throttle from 'lodash.throttle';

// Находим форму и поля ввода для email и сообщения
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input');
const messageInput = form.querySelector('textarea');
const feedbackFormStateKey = 'feedback-form-state';

// // Создаем ключ для хранения состояния формы в локальном хранилище.
// const saveStateToLocalStorage = () => {
//   const feedbackFormState = {
//     email: emailInput.value,
//     message: messageInput.value,
//   };
//   localStorage.setItem(feedbackFormStateKey, JSON.stringify(feedbackFormState));
// };

// Создаем ключ для хранения состояния формы в локальном хранилище.
const saveStateToLocalStorage = () => {
  const formData = new FormData(form);
  const feedbackFormState = {
    email: formData.get('email'),
    message: formData.get('message'),
  };
  localStorage.setItem(feedbackFormStateKey, JSON.stringify(feedbackFormState));
};

// Создаем функции для сохранения, загрузки и сброса состояния формы.
const loadStateFromLocalStorage = () => {
  const feedbackFormState = JSON.parse(localStorage.getItem(feedbackFormStateKey));
  if (feedbackFormState) {
    emailInput.value = feedbackFormState.email || '';
    messageInput.value = feedbackFormState.message || '';
  }
};
const resetForm = () => {
  localStorage.removeItem(feedbackFormStateKey);
  
  console.log( {
    email: emailInput.value,
    message: messageInput.value,
  });
  form.reset();
};

loadStateFromLocalStorage();

// При каждом изменении значений в полях формы, сохраняем их состояние в локальное хранилище c задержкой в 500мс
const throttledSaveStateToLocalStorage = throttle(saveStateToLocalStorage, 500);
form.addEventListener('input', throttledSaveStateToLocalStorage);
form.addEventListener('submit', (event) => {
  event.preventDefault();
  resetForm();
});
