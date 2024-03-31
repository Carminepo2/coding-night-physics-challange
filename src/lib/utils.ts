export function debounce(func: (...args: any[]) => any, wait: number) {
  let timeout: number;
  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle(func: (...args: any[]) => any, wait: number) {
  let timeout: number;
  return function (...args: any[]) {
    if (!timeout) {
      timeout = setTimeout(() => {
        func(...args);
        timeout = 0;
      }, wait);
    }
  };
}

export async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export function now() {
  return new Date().getTime();
}
