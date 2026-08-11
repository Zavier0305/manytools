"use client";

import { useMemo, useState } from "react";
import CopyButton from "@/components/ui/CopyButton";

export default function ReadmeGenerator() {
  const [name, setName] = useState("my-project");
  const [description, setDescription] = useState("プロジェクトの簡単な説明をここに書きます。");
  const [install, setInstall] = useState("npm install");
  const [usage, setUsage] = useState("npm run dev");
  const [license, setLicense] = useState("MIT");

  const output = useMemo(
    () =>
      `# ${name}\n\n${description}\n\n## インストール\n\n\`\`\`bash\n${install}\n\`\`\`\n\n## 使い方\n\n\`\`\`bash\n${usage}\n\`\`\`\n\n## ライセンス\n\n${license}\n`,
    [name, description, install, usage, license]
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="tool-label">プロジェクト名</label>
          <input type="text" className="tool-input" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">ライセンス</label>
          <input type="text" className="tool-input" value={license} onChange={(e) => setLicense(e.target.value)} />
        </div>
      </div>
      <div>
        <label className="tool-label">説明</label>
        <textarea className="tool-textarea min-h-[4rem]" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="tool-label">インストールコマンド</label>
          <input type="text" className="tool-input font-mono" value={install} onChange={(e) => setInstall(e.target.value)} />
        </div>
        <div>
          <label className="tool-label">実行コマンド</label>
          <input type="text" className="tool-input font-mono" value={usage} onChange={(e) => setUsage(e.target.value)} />
        </div>
      </div>
      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="tool-label mb-0">README.md</label>
          <CopyButton getText={() => output} />
        </div>
        <textarea className="tool-textarea min-h-[16rem]" value={output} readOnly />
      </div>
    </div>
  );
}
