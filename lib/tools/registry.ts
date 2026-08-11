import type { CategoryDefinition, ToolDefinition } from "./types";

export const CATEGORIES: CategoryDefinition[] = [
  {
    id: "text",
    name: "テキスト処理",
    description: "文字数カウントや大文字小文字変換など、文章の編集・整形に役立つツール",
    section: "tools",
  },
  {
    id: "encode",
    name: "エンコード/デコード",
    description: "Base64やURLエンコードなど、データ形式の変換・生成ツール",
    section: "tools",
  },
  {
    id: "calc",
    name: "数値・計算",
    description: "電卓やBMI計算など、日常のちょっとした計算に使えるツール",
    section: "tools",
  },
  {
    id: "unit",
    name: "単位変換",
    description: "長さ・重さ・温度など、単位を相互変換するツール",
    section: "tools",
  },
  {
    id: "datetime",
    name: "日付・時間",
    description: "タイムスタンプ変換やタイマーなど、日付・時間に関するツール",
    section: "tools",
  },
  {
    id: "color",
    name: "色・デザイン",
    description: "カラーコード変換やパレット生成など、デザイン作業に役立つツール",
    section: "tools",
  },
  {
    id: "dev",
    name: "開発者ツール",
    description: "JSON整形やMarkdownプレビューなど、開発者向けのツール",
    section: "tools",
  },
  {
    id: "life",
    name: "生活・お金",
    description: "カロリー計算や時給計算など、暮らしに役立つ簡易計算ツール",
    section: "tools",
  },
  {
    id: "midgame",
    name: "ミドルゲーム",
    description: "2048やスネークゲームなど、少し遊び込めるブラウザゲーム",
    section: "games",
  },
  {
    id: "random",
    name: "ミニゲーム・ランダム",
    description: "サイコロやくじ引きなど、ランダム性を使った手軽なミニゲーム・ツール",
    section: "games",
  },
];

export const ALL_TOOLS: ToolDefinition[] = [
  // --- テキスト処理 (20) ---
  { slug: "char-count", name: "文字数・単語数カウント", description: "入力した文章の文字数・単語数・行数をリアルタイムで表示します。", category: "text", componentKey: "text-counter", keywords: ["文字数", "文字カウント", "word count"] },
  { slug: "uppercase", name: "大文字変換", description: "英字をすべて大文字に変換します。", category: "text", componentKey: "case-converter", config: { mode: "upper" }, keywords: ["uppercase", "大文字"] },
  { slug: "lowercase", name: "小文字変換", description: "英字をすべて小文字に変換します。", category: "text", componentKey: "case-converter", config: { mode: "lower" }, keywords: ["lowercase", "小文字"] },
  { slug: "titlecase", name: "タイトルケース変換", description: "各単語の先頭を大文字にするタイトルケースに変換します。", category: "text", componentKey: "case-converter", config: { mode: "title" }, keywords: ["title case"] },
  { slug: "camelcase", name: "キャメルケース変換", description: "文字列をcamelCase形式に変換します。", category: "text", componentKey: "case-converter", config: { mode: "camel" }, keywords: ["camelCase", "プログラミング"] },
  { slug: "snakecase", name: "スネークケース変換", description: "文字列をsnake_case形式に変換します。", category: "text", componentKey: "case-converter", config: { mode: "snake" }, keywords: ["snake_case"] },
  { slug: "kebabcase", name: "ケバブケース変換", description: "文字列をkebab-case形式に変換します。", category: "text", componentKey: "case-converter", config: { mode: "kebab" }, keywords: ["kebab-case"] },
  { slug: "pascalcase", name: "パスカルケース変換", description: "文字列をPascalCase形式に変換します。", category: "text", componentKey: "case-converter", config: { mode: "pascal" }, keywords: ["PascalCase"] },
  { slug: "fullwidth-halfwidth", name: "全角⇔半角変換", description: "英数字・記号の全角と半角を相互に変換します。", category: "text", componentKey: "width-converter", keywords: ["全角", "半角"] },
  { slug: "hiragana-katakana", name: "ひらがな⇔カタカナ変換", description: "ひらがなとカタカナを相互に変換します。", category: "text", componentKey: "kana-converter", keywords: ["ひらがな", "カタカナ"] },
  { slug: "whitespace-cleanup", name: "空白・改行整形", description: "余分な空白や連続する改行をまとめて削除・整形します。", category: "text", componentKey: "whitespace-cleaner", keywords: ["trim", "空白削除"] },
  { slug: "line-sort", name: "行の並び替え", description: "複数行のテキストを昇順・降順・ランダムに並び替えます。", category: "text", componentKey: "line-sorter", keywords: ["sort", "ソート"] },
  { slug: "line-dedup", name: "重複行削除", description: "テキスト内の重複した行を削除します。", category: "text", componentKey: "line-dedup", keywords: ["重複削除", "unique"] },
  { slug: "line-numbering", name: "行番号付与", description: "各行の先頭に連番の行番号を付けます。", category: "text", componentKey: "line-numberer", keywords: ["行番号"] },
  { slug: "text-reverse", name: "文字列反転", description: "文字列を逆順に並び替えます。", category: "text", componentKey: "text-reverser", keywords: ["reverse", "反転"] },
  { slug: "text-diff", name: "テキスト差分比較", description: "2つのテキストを行単位で比較し、差分をハイライト表示します。", category: "text", componentKey: "diff-checker", keywords: ["diff", "差分"] },
  { slug: "regex-tester", name: "正規表現テスター", description: "正規表現パターンをテキストに適用し、マッチ結果を確認できます。", category: "text", componentKey: "regex-tester", keywords: ["regex", "正規表現"] },
  { slug: "lorem-ipsum", name: "ダミーテキスト生成", description: "デザインや原稿確認用のダミーテキスト(日本語/Lorem Ipsum)を生成します。", category: "text", componentKey: "lorem-generator", keywords: ["lorem ipsum", "ダミー"] },
  { slug: "slug-generator", name: "スラッグ生成", description: "文字列をURLスラッグ(半角英数とハイフン)に変換します。", category: "text", componentKey: "slug-generator", keywords: ["slug", "url"] },
  { slug: "char-frequency", name: "文字出現頻度カウント", description: "テキスト内に出現する文字の頻度を集計します。", category: "text", componentKey: "char-frequency", keywords: ["頻度", "集計"] },

  // --- エンコード/デコード (12) ---
  { slug: "base64", name: "Base64エンコード/デコード", description: "テキストをBase64形式に変換・復元します。", category: "encode", componentKey: "base64-tool", keywords: ["base64"] },
  { slug: "url-encode", name: "URLエンコード/デコード", description: "テキストをURLエンコード・デコードします。", category: "encode", componentKey: "url-encode-tool", keywords: ["url encode", "percent encoding"] },
  { slug: "html-entity", name: "HTMLエンティティエンコード/デコード", description: "特殊文字をHTMLエンティティに変換・復元します。", category: "encode", componentKey: "html-entity-tool", keywords: ["html entity"] },
  { slug: "hex-encode", name: "16進数(Hex)エンコード/デコード", description: "テキストと16進数表現を相互に変換します。", category: "encode", componentKey: "hex-tool", keywords: ["hex", "16進数"] },
  { slug: "binary-text", name: "2進数(Binary)テキスト変換", description: "テキストと2進数表現を相互に変換します。", category: "encode", componentKey: "binary-tool", keywords: ["binary", "2進数"] },
  { slug: "rot13", name: "ROT13変換", description: "アルファベットを13文字分シフトするROT13で変換します。", category: "encode", componentKey: "rot13-tool", keywords: ["rot13"] },
  { slug: "jwt-decode", name: "JWTデコーダー", description: "JWTトークンのヘッダーとペイロードをデコードして表示します。", category: "encode", componentKey: "jwt-decoder", keywords: ["jwt", "json web token"] },
  { slug: "uuid-generator", name: "UUID生成", description: "ランダムなUUID(v4)を生成します。", category: "encode", componentKey: "uuid-generator", keywords: ["uuid", "guid"] },
  { slug: "qrcode-generator", name: "QRコード生成", description: "テキストやURLからQRコード画像を生成します。", category: "encode", componentKey: "qr-generator", keywords: ["qr code", "qrコード"] },
  { slug: "wifi-qrcode", name: "Wi-Fi QRコード生成", description: "Wi-Fi接続情報を読み取るとすぐに接続できるQRコードを生成します。", category: "encode", componentKey: "wifi-qr-generator", keywords: ["wifi", "qr"] },
  { slug: "password-generator", name: "パスワード生成", description: "条件を指定してランダムなパスワードを生成します。", category: "encode", componentKey: "password-generator", keywords: ["password", "パスワード"] },
  { slug: "linebreak-convert", name: "改行コード変換", description: "LF・CRLF・CRの改行コードを相互に変換します。", category: "encode", componentKey: "linebreak-converter", keywords: ["改行コード", "lf", "crlf"] },

  // --- 数値・計算 (18) ---
  { slug: "base-convert", name: "進数変換", description: "2進数・8進数・10進数・16進数を相互に変換します。", category: "calc", componentKey: "base-number-converter", keywords: ["進数変換"] },
  { slug: "calculator", name: "電卓", description: "四則演算ができるシンプルな電卓です。", category: "calc", componentKey: "calculator", keywords: ["電卓", "計算"] },
  { slug: "sqrt-pow", name: "平方根・累乗計算機", description: "平方根・n乗・累乗根を計算します。", category: "calc", componentKey: "sqrt-pow-calculator", keywords: ["平方根", "累乗"] },
  { slug: "bmi", name: "BMI計算機", description: "身長と体重からBMIと判定区分を計算します。", category: "calc", componentKey: "bmi-calculator", keywords: ["bmi", "肥満度"] },
  { slug: "age-calculator", name: "年齢計算機", description: "生年月日から現在の年齢を計算します。", category: "calc", componentKey: "age-calculator", keywords: ["年齢計算"] },
  { slug: "percentage", name: "パーセンテージ計算機", description: "割合・増減率などパーセンテージに関する計算をまとめて行えます。", category: "calc", componentKey: "percentage-calculator", keywords: ["割合", "パーセント"] },
  { slug: "warikan", name: "割り勘計算機", description: "合計金額を人数で割り勘計算します。", category: "calc", componentKey: "warikan-calculator", keywords: ["割り勘"] },
  { slug: "tax-calculator", name: "消費税計算機", description: "税抜き・税込み価格と消費税額を計算します。", category: "calc", componentKey: "tax-calculator", keywords: ["消費税", "税込"] },
  { slug: "gcd-lcm", name: "最大公約数・最小公倍数", description: "2つ以上の整数の最大公約数と最小公倍数を計算します。", category: "calc", componentKey: "gcd-lcm-calculator", keywords: ["gcd", "lcm"] },
  { slug: "prime-factorization", name: "素因数分解", description: "整数を入力して素因数分解します。", category: "calc", componentKey: "prime-factorization", keywords: ["素因数分解"] },
  { slug: "circle-calculator", name: "円の面積・円周計算機", description: "半径から円の面積と円周を計算します。", category: "calc", componentKey: "circle-calculator", keywords: ["円の面積"] },
  { slug: "triangle-area", name: "三角形の面積計算機", description: "底辺と高さ、または3辺の長さから三角形の面積を計算します。", category: "calc", componentKey: "triangle-calculator", keywords: ["三角形の面積"] },
  { slug: "compound-interest", name: "複利計算機", description: "元本・利率・期間から複利の将来価値を計算します。", category: "calc", componentKey: "compound-interest-calculator", keywords: ["複利"] },
  { slug: "loan-calculator", name: "ローン返済計算機", description: "借入額・金利・返済期間から毎月の返済額を計算します。", category: "calc", componentKey: "loan-calculator", keywords: ["ローン", "返済"] },
  { slug: "exchange-calculator", name: "為替電卓", description: "手動で設定した為替レートで通貨換算します。", category: "calc", componentKey: "exchange-calculator", keywords: ["為替", "通貨換算"] },
  { slug: "tip-calculator", name: "チップ計算機", description: "会計金額とチップ率から支払額・チップ額を計算します。", category: "calc", componentKey: "tip-calculator", keywords: ["チップ"] },
  { slug: "stats-calculator", name: "統計計算機", description: "数値リストの平均・中央値・分散・標準偏差を計算します。", category: "calc", componentKey: "stats-calculator", keywords: ["平均", "標準偏差"] },
  { slug: "fraction-calculator", name: "分数計算機", description: "分数の加減乗除を計算し、既約分数で表示します。", category: "calc", componentKey: "fraction-calculator", keywords: ["分数"] },

  // --- 単位変換 (9) ---
  { slug: "unit-length", name: "長さ単位変換", description: "メートル・フィート・マイルなど長さの単位を変換します。", category: "unit", componentKey: "unit-converter", config: { unit: "length" }, keywords: ["長さ", "メートル"] },
  { slug: "unit-weight", name: "重さ単位変換", description: "キログラム・ポンドなど重さの単位を変換します。", category: "unit", componentKey: "unit-converter", config: { unit: "weight" }, keywords: ["重さ", "キログラム"] },
  { slug: "unit-temperature", name: "温度単位変換", description: "摂氏・華氏・ケルビンを相互に変換します。", category: "unit", componentKey: "unit-converter", config: { unit: "temperature" }, keywords: ["温度", "摂氏", "華氏"] },
  { slug: "unit-area", name: "面積単位変換", description: "平方メートル・坪・エーカーなど面積の単位を変換します。", category: "unit", componentKey: "unit-converter", config: { unit: "area" }, keywords: ["面積", "坪"] },
  { slug: "unit-volume", name: "体積単位変換", description: "リットル・ガロンなど体積の単位を変換します。", category: "unit", componentKey: "unit-converter", config: { unit: "volume" }, keywords: ["体積", "リットル"] },
  { slug: "unit-speed", name: "速度単位変換", description: "km/h・m/s・mphなど速度の単位を変換します。", category: "unit", componentKey: "unit-converter", config: { unit: "speed" }, keywords: ["速度"] },
  { slug: "unit-time", name: "時間単位変換", description: "秒・分・時間・日など時間の単位を変換します。", category: "unit", componentKey: "unit-converter", config: { unit: "time" }, keywords: ["時間の単位"] },
  { slug: "unit-data", name: "データ容量単位変換", description: "バイト・KB・MB・GB・TBを相互に変換します。", category: "unit", componentKey: "unit-converter", config: { unit: "data" }, keywords: ["データ容量", "バイト"] },
  { slug: "unit-pressure", name: "圧力単位変換", description: "パスカル・気圧・バールなど圧力の単位を変換します。", category: "unit", componentKey: "unit-converter", config: { unit: "pressure" }, keywords: ["圧力"] },

  // --- 日付・時間 (7) ---
  { slug: "timestamp-converter", name: "タイムスタンプ変換", description: "Unixタイムスタンプと日時を相互に変換します。", category: "datetime", componentKey: "timestamp-converter", keywords: ["unix timestamp", "エポック秒"] },
  { slug: "date-diff", name: "日付差分計算", description: "2つの日付の間の日数・週数・年数を計算します。", category: "datetime", componentKey: "date-diff-calculator", keywords: ["日数計算"] },
  { slug: "weekday-calculator", name: "曜日計算", description: "指定した日付の曜日を調べます。", category: "datetime", componentKey: "weekday-calculator", keywords: ["曜日"] },
  { slug: "countdown-timer", name: "カウントダウンタイマー", description: "指定した秒数からカウントダウンするタイマーです。", category: "datetime", componentKey: "countdown-timer", keywords: ["タイマー"] },
  { slug: "stopwatch", name: "ストップウォッチ", description: "経過時間を計測するストップウォッチです。", category: "datetime", componentKey: "stopwatch", keywords: ["ストップウォッチ"] },
  { slug: "pomodoro-timer", name: "ポモドーロタイマー", description: "作業と休憩を繰り返すポモドーロテクニック用タイマーです。", category: "datetime", componentKey: "pomodoro-timer", keywords: ["ポモドーロ"] },
  { slug: "world-clock", name: "世界時計", description: "世界の主要都市の現在時刻を一覧表示します。", category: "datetime", componentKey: "world-clock", keywords: ["世界時計", "タイムゾーン"] },

  // --- 色・デザイン (7) ---
  { slug: "color-converter", name: "カラーコード変換", description: "HEX・RGB・HSLのカラーコードを相互に変換します。", category: "color", componentKey: "color-converter", keywords: ["hex", "rgb", "hsl"] },
  { slug: "color-palette", name: "カラーパレット生成", description: "基準となる色から調和のとれたカラーパレットを生成します。", category: "color", componentKey: "color-palette-generator", keywords: ["配色", "パレット"] },
  { slug: "gradient-generator", name: "グラデーション生成", description: "2色以上を指定してCSSグラデーションを生成します。", category: "color", componentKey: "gradient-generator", keywords: ["gradient", "css"] },
  { slug: "contrast-checker", name: "コントラスト比チェッカー", description: "2色のコントラスト比を計算し、WCAG基準を満たすか確認します。", category: "color", componentKey: "contrast-checker", keywords: ["contrast", "wcag"] },
  { slug: "random-color", name: "ランダムカラー生成", description: "ランダムな色を生成します。", category: "color", componentKey: "random-color-generator", keywords: ["ランダムカラー"] },
  { slug: "box-shadow-generator", name: "box-shadowジェネレーター", description: "CSSのbox-shadowプロパティをプレビューしながら生成します。", category: "color", componentKey: "box-shadow-generator", keywords: ["box-shadow", "css"] },
  { slug: "border-radius-generator", name: "border-radiusジェネレーター", description: "CSSのborder-radiusプロパティをプレビューしながら生成します。", category: "color", componentKey: "border-radius-generator", keywords: ["border-radius", "css"] },

  // --- 開発者ツール (12) ---
  { slug: "json-formatter", name: "JSON整形・バリデーター", description: "JSONの整形(インデント)・圧縮・妥当性チェックを行います。", category: "dev", componentKey: "json-formatter", keywords: ["json", "整形"] },
  { slug: "json-csv", name: "JSON⇔CSV変換", description: "JSON配列とCSVを相互に変換します。", category: "dev", componentKey: "json-csv-converter", keywords: ["json", "csv"] },
  { slug: "json-yaml", name: "JSON⇔YAML変換", description: "JSONとYAMLを相互に変換します。", category: "dev", componentKey: "json-yaml-converter", keywords: ["json", "yaml"] },
  { slug: "css-minifier", name: "CSS Minifier", description: "CSSコードの不要な空白・改行・コメントを削除して圧縮します。", category: "dev", componentKey: "css-minifier", keywords: ["css", "minify"] },
  { slug: "html-minifier", name: "HTML Minifier", description: "HTMLコードの不要な空白・改行・コメントを削除して圧縮します。", category: "dev", componentKey: "html-minifier", keywords: ["html", "minify"] },
  { slug: "js-minifier", name: "JS Minifier", description: "JavaScriptコードのコメントや余分な空白を削除して圧縮します。", category: "dev", componentKey: "js-minifier", keywords: ["javascript", "minify"] },
  { slug: "cron-explainer", name: "Cron式解説", description: "Cron式を入力すると、その意味を日本語で解説します。", category: "dev", componentKey: "cron-explainer", keywords: ["cron", "crontab"] },
  { slug: "markdown-preview", name: "Markdownプレビュー", description: "Markdownを入力するとリアルタイムでHTMLプレビューを表示します。", category: "dev", componentKey: "markdown-preview", keywords: ["markdown"] },
  { slug: "user-agent-parser", name: "User-Agent解析", description: "User-Agent文字列からブラウザ・OS情報を解析します。", category: "dev", componentKey: "user-agent-parser", keywords: ["user agent"] },
  { slug: "unicode-codepoint", name: "Unicodeコードポイント表示", description: "文字のUnicodeコードポイントとUTF-8バイト列を表示します。", category: "dev", componentKey: "unicode-codepoint-viewer", keywords: ["unicode", "コードポイント"] },
  { slug: "xml-formatter", name: "XML整形", description: "XMLをインデント付きで整形します。", category: "dev", componentKey: "xml-formatter", keywords: ["xml"] },
  { slug: "sql-formatter", name: "SQL整形", description: "SQL文を読みやすく整形します。", category: "dev", componentKey: "sql-formatter", keywords: ["sql"] },

  // --- ランダム・ゲーム (8) ---
  { slug: "dice-roller", name: "サイコロ", description: "指定した個数・面数のサイコロを振ります。", category: "random", componentKey: "dice-roller", keywords: ["サイコロ", "dice"] },
  { slug: "coin-flip", name: "コイントス", description: "コインを投げて表裏をランダムに決めます。", category: "random", componentKey: "coin-flip", keywords: ["コイントス"] },
  { slug: "janken", name: "じゃんけん", description: "コンピューターとじゃんけんで勝負します。", category: "random", componentKey: "janken-game", keywords: ["じゃんけん"] },
  { slug: "lottery-picker", name: "くじ引き(リスト抽選)", description: "リストに入力した候補からランダムに1つ選びます。", category: "random", componentKey: "lottery-picker", keywords: ["抽選", "くじ引き"] },
  { slug: "random-number", name: "乱数生成", description: "指定範囲内のランダムな整数を生成します。", category: "random", componentKey: "random-number-generator", keywords: ["乱数"] },
  { slug: "random-string", name: "ランダム文字列生成", description: "指定した文字種・桁数のランダムな文字列を生成します。", category: "random", componentKey: "random-string-generator", keywords: ["ランダム文字列"] },
  { slug: "password-strength", name: "パスワード強度チェッカー", description: "入力したパスワードの強度を判定します。", category: "random", componentKey: "password-strength-checker", keywords: ["パスワード強度"] },
  { slug: "roulette-picker", name: "順番決めルーレット", description: "リストをランダムな順番に並び替えます。", category: "random", componentKey: "roulette-picker", keywords: ["順番決め", "ルーレット"] },

  // --- 生活・お金 (7) ---
  { slug: "calorie-calculator", name: "カロリー計算機(簡易TDEE)", description: "年齢・性別・活動量から1日の推定消費カロリーを計算します。", category: "life", componentKey: "calorie-calculator", keywords: ["カロリー", "tdee"] },
  { slug: "savings-goal", name: "目標貯金シミュレーター", description: "目標金額までの必要な毎月の貯金額をシミュレーションします。", category: "life", componentKey: "savings-goal-simulator", keywords: ["貯金"] },
  { slug: "discount-calculator", name: "割引計算機", description: "割引率から割引後の価格・割引額を計算します。", category: "life", componentKey: "discount-calculator", keywords: ["割引", "セール"] },
  { slug: "hourly-wage", name: "時給計算機", description: "時給と労働時間から給与を計算します。", category: "life", componentKey: "hourly-wage-calculator", keywords: ["時給"] },
  { slug: "work-hours", name: "労働時間計算機", description: "出勤・退勤時刻と休憩時間から実労働時間を計算します。", category: "life", componentKey: "work-hours-calculator", keywords: ["労働時間", "勤怠"] },
  { slug: "electricity-cost", name: "電気代計算機(簡易)", description: "消費電力と使用時間、電力量単価から電気代の目安を計算します。", category: "life", componentKey: "electricity-cost-calculator", keywords: ["電気代"] },
  { slug: "gasoline-cost", name: "ガソリン代計算機", description: "走行距離・燃費・ガソリン単価から燃料費の目安を計算します。", category: "life", componentKey: "gasoline-cost-calculator", keywords: ["ガソリン代", "燃費"] },

  // --- ミドルゲーム (8) ---
  { slug: "game-2048", name: "2048", description: "数字タイルをスライドさせて合体させ、2048を目指すパズルゲームです。", category: "midgame", componentKey: "game-2048", keywords: ["2048", "パズル"] },
  { slug: "game-snake", name: "スネークゲーム", description: "矢印キーでヘビを操作してエサを食べ、壁や自分の体にぶつからないように長く生き延びます。", category: "midgame", componentKey: "game-snake", keywords: ["スネーク", "snake"] },
  { slug: "game-breakout", name: "ブロック崩し", description: "パドルでボールを跳ね返してブロックを全て崩すアクションゲームです。", category: "midgame", componentKey: "game-breakout", keywords: ["ブロック崩し", "breakout"] },
  { slug: "game-memory", name: "神経衰弱", description: "カードをめくって同じ絵柄のペアを探すカードマッチングゲームです。", category: "midgame", componentKey: "game-memory", keywords: ["神経衰弱", "カードマッチング"] },
  { slug: "game-typing", name: "タイピングゲーム", description: "制限時間内に表示された単語を正確に入力してスコアを競います。", category: "midgame", componentKey: "game-typing", keywords: ["タイピング", "typing"] },
  { slug: "game-reversi", name: "リバーシ・オセロ", description: "8×8の盤面でコンピューターと対戦するリバーシ(オセロ)です。", category: "midgame", componentKey: "game-reversi", keywords: ["リバーシ", "オセロ", "othello"] },
  { slug: "game-whackamole", name: "もぐらたたき", description: "ランダムに出現するモグラを制限時間内にクリックしてスコアを競います。", category: "midgame", componentKey: "game-whackamole", keywords: ["もぐらたたき", "whack-a-mole"] },
  { slug: "game-meteor-dodge", name: "隕石よけ", description: "左右に動く自機を操作して、降り注ぐ隕石を避け続けるオリジナルの避けゲームです。", category: "midgame", componentKey: "game-meteor-dodge", keywords: ["隕石よけ", "アクション", "オリジナル"] },
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return ALL_TOOLS.find((tool) => tool.slug === slug);
}
