/**
 * Randomly reorders an array
 * @param array
 */
export function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Calculates the difference in percentage between 2 numbers
 * @param n1
 * @param n2
 * @returns
 */
export function deltaPercent(n1: number, n2: number): number {
  const delta = n1 - n2;
  const avg = (n1 + n2) / 2;
  return (delta / avg) * 100;
}

/**
 * Calcuates the combination of k elements from a set of n elements
 * @param n
 * @param k
 */
export function combination(n: number, k: number, callback: (comb: any[]) => boolean) {
  const c: any[] = [];
  const combine = (start: number, index: number) => {
    let stop = false;

    if (index === k) {
      stop = callback(c);
    }

    // Stop at the first combinations which is ok
    if (!stop) {
      for (let i = start; i < n; i++) {
        if (index < k) {
          c[index] = i;
          combine(i + 1, index + 1);
        }
      }
    }
  };
  combine(0, 0);
}
