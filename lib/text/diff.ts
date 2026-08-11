export type DiffOp = { type: "same" | "add" | "remove"; line: string };

export function diffLines(a: string, b: string): DiffOp[] {
  const linesA = a.replace(/\r\n/g, "\n").split("\n");
  const linesB = b.replace(/\r\n/g, "\n").split("\n");
  const n = linesA.length;
  const m = linesB.length;

  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] =
        linesA[i] === linesB[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const ops: DiffOp[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (linesA[i] === linesB[j]) {
      ops.push({ type: "same", line: linesA[i] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      ops.push({ type: "remove", line: linesA[i] });
      i++;
    } else {
      ops.push({ type: "add", line: linesB[j] });
      j++;
    }
  }
  while (i < n) {
    ops.push({ type: "remove", line: linesA[i] });
    i++;
  }
  while (j < m) {
    ops.push({ type: "add", line: linesB[j] });
    j++;
  }
  return ops;
}
