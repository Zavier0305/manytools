export interface ParsedUserAgent {
  browser: string;
  browserVersion: string;
  os: string;
  engine: string;
  deviceType: string;
}

export function parseUserAgent(ua: string): ParsedUserAgent {
  let browser = "不明";
  let browserVersion = "";

  if (/Edg\//.test(ua)) {
    browser = "Microsoft Edge";
    browserVersion = ua.match(/Edg\/([\d.]+)/)?.[1] ?? "";
  } else if (/OPR\//.test(ua)) {
    browser = "Opera";
    browserVersion = ua.match(/OPR\/([\d.]+)/)?.[1] ?? "";
  } else if (/Chrome\//.test(ua) && !/Chromium/.test(ua)) {
    browser = "Google Chrome";
    browserVersion = ua.match(/Chrome\/([\d.]+)/)?.[1] ?? "";
  } else if (/Firefox\//.test(ua)) {
    browser = "Firefox";
    browserVersion = ua.match(/Firefox\/([\d.]+)/)?.[1] ?? "";
  } else if (/Safari\//.test(ua) && /Version\//.test(ua)) {
    browser = "Safari";
    browserVersion = ua.match(/Version\/([\d.]+)/)?.[1] ?? "";
  }

  let os = "不明";
  if (/Windows NT 10/.test(ua)) os = "Windows 10/11";
  else if (/Windows NT/.test(ua)) os = "Windows";
  else if (/Mac OS X/.test(ua)) os = "macOS";
  else if (/Android/.test(ua)) os = `Android ${ua.match(/Android ([\d.]+)/)?.[1] ?? ""}`.trim();
  else if (/iPhone|iPad|iPod/.test(ua)) os = "iOS";
  else if (/Linux/.test(ua)) os = "Linux";

  let engine = "不明";
  if (/AppleWebKit/.test(ua)) engine = "WebKit";
  if (/Gecko\//.test(ua)) engine = "Gecko";

  const deviceType = /Mobi|Android|iPhone/.test(ua) ? "モバイル" : /iPad|Tablet/.test(ua) ? "タブレット" : "デスクトップ";

  return { browser, browserVersion, os, engine, deviceType };
}
