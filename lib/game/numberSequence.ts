export interface SequencePuzzle {
  sequence: number[];
  answer: number;
  choices: number[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateSequencePuzzle(): SequencePuzzle {
  const type = Math.floor(Math.random() * 3);
  const start = 1 + Math.floor(Math.random() * 10);
  let sequence: number[];
  let answer: number;

  if (type === 0) {
    const step = 1 + Math.floor(Math.random() * 9);
    sequence = Array.from({ length: 5 }, (_, i) => start + i * step);
    answer = start + 5 * step;
  } else if (type === 1) {
    const ratio = 2 + Math.floor(Math.random() * 2);
    sequence = Array.from({ length: 5 }, (_, i) => start * Math.pow(ratio, i));
    answer = start * Math.pow(ratio, 5);
  } else {
    sequence = [start];
    let diff = 1 + Math.floor(Math.random() * 3);
    for (let i = 1; i < 5; i++) {
      sequence.push(sequence[i - 1] + diff);
      diff += 1;
    }
    answer = sequence[4] + diff;
  }

  const wrongChoices = new Set<number>();
  while (wrongChoices.size < 3) {
    const offset = Math.floor(Math.random() * 10) - 5;
    const candidate = answer + (offset === 0 ? 1 : offset);
    if (candidate !== answer) wrongChoices.add(candidate);
  }

  return { sequence, answer, choices: shuffle([answer, ...wrongChoices]) };
}
