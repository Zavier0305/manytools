export function createSolvedPuzzle(size: number): number[] {
  return Array.from({ length: size * size - 1 }, (_, i) => i + 1).concat(0);
}

export function shufflePuzzle(size: number, moves = 200): number[] {
  const tiles = createSolvedPuzzle(size);
  let blank = tiles.indexOf(0);
  for (let i = 0; i < moves; i++) {
    const neighbors = getNeighbors(blank, size);
    const target = neighbors[Math.floor(Math.random() * neighbors.length)];
    [tiles[blank], tiles[target]] = [tiles[target], tiles[blank]];
    blank = target;
  }
  return tiles;
}

function getNeighbors(index: number, size: number): number[] {
  const row = Math.floor(index / size);
  const col = index % size;
  const neighbors: number[] = [];
  if (row > 0) neighbors.push(index - size);
  if (row < size - 1) neighbors.push(index + size);
  if (col > 0) neighbors.push(index - 1);
  if (col < size - 1) neighbors.push(index + 1);
  return neighbors;
}

export function canSlide(index: number, blankIndex: number, size: number): boolean {
  return getNeighbors(blankIndex, size).includes(index);
}

export function isSolved(tiles: number[]): boolean {
  const solved = createSolvedPuzzle(Math.sqrt(tiles.length));
  return tiles.every((t, i) => t === solved[i]);
}
