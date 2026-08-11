function base64UrlDecode(segment: string): string {
  const padded = segment.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(segment.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function decodeJwt(token: string): { header: string; payload: string } {
  const parts = token.trim().split(".");
  if (parts.length < 2) {
    throw new Error("有効なJWT形式ではありません(header.payload.signature)");
  }
  try {
    const header = JSON.stringify(JSON.parse(base64UrlDecode(parts[0])), null, 2);
    const payload = JSON.stringify(JSON.parse(base64UrlDecode(parts[1])), null, 2);
    return { header, payload };
  } catch {
    throw new Error("JWTのデコードに失敗しました");
  }
}
