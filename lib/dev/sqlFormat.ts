const MAJOR_KEYWORDS = [
  "SELECT",
  "FROM",
  "WHERE",
  "GROUP BY",
  "ORDER BY",
  "HAVING",
  "LIMIT",
  "INSERT INTO",
  "VALUES",
  "UPDATE",
  "SET",
  "DELETE FROM",
  "INNER JOIN",
  "LEFT JOIN",
  "RIGHT JOIN",
  "JOIN",
  "UNION ALL",
  "UNION",
];

export function formatSql(input: string): string {
  let sql = input.replace(/\s+/g, " ").trim();
  for (const keyword of MAJOR_KEYWORDS) {
    const re = new RegExp(`\\s*\\b${keyword.replace(" ", "\\s+")}\\b\\s*`, "gi");
    sql = sql.replace(re, `\n${keyword} `);
  }
  sql = sql.replace(/\s*,\s*/g, ",\n  ");
  sql = sql.replace(/\s+AND\s+/gi, "\n  AND ");
  sql = sql.replace(/\s+OR\s+/gi, "\n  OR ");
  return sql
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
}
