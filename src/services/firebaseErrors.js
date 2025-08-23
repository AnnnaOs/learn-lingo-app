export const getErrorMessage = (code) => {
  const errorMessages = {
    'auth/email-already-in-use': 'Email already in use',
    'auth/invalid-email': 'Invalid email address',
    'auth/weak-password': 'Password should be at least 6 characters',

    'auth/user-not-found': 'User not found',
    'auth/wrong-password': 'Wrong password',
    'auth/invalid-credential': 'Invalid email or password',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',

    'auth/popup-closed-by-user': 'Popup was closed before completing the sign in',
    'auth/cancelled-popup-request': 'Only one popup request is allowed at one time',
    'auth/popup-blocked': 'Popup blocked by the browser',
    'auth/operation-not-allowed': 'This authentication method is not allowed',
    'auth/network-request-failed': 'Network error. Check your internet connection',
  };

  return errorMessages[code] || 'Authentication error. Please try again.';
};