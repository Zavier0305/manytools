export const GITIGNORE_TEMPLATES: Record<string, string> = {
  Node: "node_modules/\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\n.pnp/\n.pnp.js\ndist/\nbuild/\n.env\n.env.local\n",
  Python: "__pycache__/\n*.py[cod]\n*.egg-info/\n.venv/\nvenv/\n.pytest_cache/\ndist/\nbuild/\n.env\n",
  Java: "*.class\n*.jar\n*.war\ntarget/\n.gradle/\nbuild/\nout/\n",
  macOS: ".DS_Store\n.AppleDouble\n.LSOverride\nIcon\r\n",
  Windows: "Thumbs.db\nehthumbs.db\nDesktop.ini\n$RECYCLE.BIN/\n",
  VSCode: ".vscode/*\n!.vscode/extensions.json\n*.code-workspace\n",
  Go: "*.exe\n*.exe~\n*.dll\n*.so\n*.dylib\n*.test\nvendor/\n",
  Rust: "/target/\nCargo.lock\n",
};
