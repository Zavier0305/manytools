// Minimal recursive-descent parser for +, -, *, /, (), decimals, and unary minus.
export function evaluateExpression(expr: string): number {
  const tokens = expr.match(/\d+(\.\d+)?|[+\-*/()]/g);
  if (!tokens || tokens.join("") !== expr.replace(/\s+/g, "")) {
    throw new Error("式を解析できませんでした");
  }
  let pos = 0;

  function peek() {
    return tokens![pos];
  }
  function next() {
    return tokens![pos++];
  }

  function parseExpr(): number {
    let value = parseTerm();
    while (peek() === "+" || peek() === "-") {
      const op = next();
      const rhs = parseTerm();
      value = op === "+" ? value + rhs : value - rhs;
    }
    return value;
  }

  function parseTerm(): number {
    let value = parseFactor();
    while (peek() === "*" || peek() === "/") {
      const op = next();
      const rhs = parseFactor();
      if (op === "/" && rhs === 0) throw new Error("0で割ることはできません");
      value = op === "*" ? value * rhs : value / rhs;
    }
    return value;
  }

  function parseFactor(): number {
    if (peek() === "-") {
      next();
      return -parseFactor();
    }
    if (peek() === "(") {
      next();
      const value = parseExpr();
      if (next() !== ")") throw new Error("括弧が閉じられていません");
      return value;
    }
    const token = next();
    if (token === undefined || /[+\-*/()]/.test(token)) {
      throw new Error("式が不正です");
    }
    return parseFloat(token);
  }

  const result = parseExpr();
  if (pos !== tokens.length) throw new Error("式を解析できませんでした");
  return result;
}
