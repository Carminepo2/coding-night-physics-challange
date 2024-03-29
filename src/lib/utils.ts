export function debounce(func: (...args: any[]) => any, wait: number) {
  let timeout: number;
  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
