import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const feedbackFormStateKey = 'feedback-form-state';

const saveStateToLocalStorage = () => {
  const feedbackFormState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(feedbackFormStateKey, JSON.stringify(feedbackFormState));
};

const loadStateFromLocalStorage = () => {
  const feedbackFormState = JSON.parse(localStorage.getItem(feedbackFormStateKey));
  if (feedbackFormState) {
    emailInput.value = feedbackFormState.email || '';
    messageInput.value = feedbackFormState.message || '';
  }
};

const resetForm = () => {
  localStorage.removeItem(feedbackFormStateKey);
  emailInput.value = '';
  messageInput.value = '';
  console.log('Form submitted with data:', {
    email: emailInput.value,
    message: messageInput.value,
  });
};

loadStateFromLocalStorage();

const throttledSaveStateToLocalStorage = throttle(saveStateToLocalStorage, 500);
form.addEventListener('input', throttledSaveStateToLocalStorage);
form.addEventListener('submit', (event) => {
  event.preventDefault();
  resetForm();
});
