const isEnabled = localStorage.getItem('logger') === 'true';

export default {
  ...console,
  info(...args) {
    if (isEnabled) {
      console.info(...args);
    }
  },
  isEnabled,
};
