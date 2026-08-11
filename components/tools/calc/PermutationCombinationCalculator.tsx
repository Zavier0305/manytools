"use client";

import { useMemo, useState } from "react";
import NumberField from "@/components/ui/NumberField";
import ResultCard from "@/components/ui/ResultCard";
import { combinations, permutations } from "@/lib/calc/mathUtils";

export default function PermutationCombinationCalculator() {
  const [n, setN] = useState("10");
  const [r, setR] = useState("3");

  const result = useMemo(() => {
    const nv = parseInt(n, 10);
    const rv = parseInt(r, 10);
    if (!Number.isInteger(nv) || !Number.isInteger(rv) || nv < 0 || rv < 0) return null;
    return { p: permutations(nv, rv), c: combinations(nv, rv) };
  }, [n, r]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <NumberField label="n(全体の個数)" value={n} onChange={setN} />
        <NumberField label="r(選ぶ個数)" value={r} onChange={setR} />
      </div>
      {result && (
        <ResultCard
          items={[
            { label: `順列 ${n}P${r}`, value: result.p.toLocaleString() },
            { label: `組み合わせ ${n}C${r}`, value: result.c.toLocaleString() },
          ]}
        />
      )}
    </div>
  );
}
