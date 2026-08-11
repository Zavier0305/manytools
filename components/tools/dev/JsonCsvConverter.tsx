"use client";

import TextTransformTool from "@/components/tools/shared/TextTransformTool";
import { csvToJson, jsonToCsv } from "@/lib/dev/jsonCsv";

export default function JsonCsvConverter() {
  return (
    <TextTransformTool
      modes={[
        { id: "json-to-csv", label: "JSON → CSV" },
        { id: "csv-to-json", label: "CSV → JSON" },
      ]}
      transform={(input, mode) => {
        try {
          return mode === "json-to-csv" ? jsonToCsv(input) : csvToJson(input);
        } catch {
          throw new Error(mode === "json-to-csv" ? "有効なJSON配列ではありません" : "CSVを解析できませんでした");
        }
      }}
    />
  );
}
