import { ApiError } from './request-helper';

// To streamline the management of error handling message in one place
export function getUserFacingMessage(error: unknown): string {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 401:
        return 'You need to log in to continue.';
      case 404:
        return 'This memo could not be found.';
      case 500:
        return 'Server error. Please try again shortly.';
      default:
        return error.message || 'Something went wrong.';
    }
  }
  if (error instanceof Error) {
    return error.message || 'Unexpected error occurred.';
  }
  return 'Unexpected error occurred.';
}

// Factory function to use in catch blocks to trigger the display of error message when handled
export function showError(
  setError: (msg: string) => void,
  dismissTimerRef: { current: number | null },
  duration = 3000
) {
  return (err: unknown) => {
    if (dismissTimerRef.current) {
      clearTimeout(dismissTimerRef.current);
    }
    const message = getUserFacingMessage(err);
    setError(message);
    dismissTimerRef.current = window.setTimeout(() => {
      setError('');
    }, duration);
  };
}
