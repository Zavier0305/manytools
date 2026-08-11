import type { ComponentType } from "react";

// Text
import TextCounter from "@/components/tools/text/TextCounter";
import CaseConverter from "@/components/tools/text/CaseConverter";
import WidthConverter from "@/components/tools/text/WidthConverter";
import KanaConverter from "@/components/tools/text/KanaConverter";
import WhitespaceCleaner from "@/components/tools/text/WhitespaceCleaner";
import LineSorter from "@/components/tools/text/LineSorter";
import LineDedup from "@/components/tools/text/LineDedup";
import LineNumberer from "@/components/tools/text/LineNumberer";
import TextReverser from "@/components/tools/text/TextReverser";
import DiffChecker from "@/components/tools/text/DiffChecker";
import RegexTester from "@/components/tools/text/RegexTester";
import LoremGenerator from "@/components/tools/text/LoremGenerator";
import SlugGenerator from "@/components/tools/text/SlugGenerator";
import CharFrequency from "@/components/tools/text/CharFrequency";

// Encode/decode
import Base64Tool from "@/components/tools/encode/Base64Tool";
import UrlEncodeTool from "@/components/tools/encode/UrlEncodeTool";
import HtmlEntityTool from "@/components/tools/encode/HtmlEntityTool";
import HexTool from "@/components/tools/encode/HexTool";
import BinaryTool from "@/components/tools/encode/BinaryTool";
import Rot13Tool from "@/components/tools/encode/Rot13Tool";
import JwtDecoder from "@/components/tools/encode/JwtDecoder";
import UuidGenerator from "@/components/tools/encode/UuidGenerator";
import QrGenerator from "@/components/tools/encode/QrGenerator";
import WifiQrGenerator from "@/components/tools/encode/WifiQrGenerator";
import PasswordGenerator from "@/components/tools/encode/PasswordGenerator";
import LinebreakConverter from "@/components/tools/encode/LinebreakConverter";

// Calc
import BaseNumberConverter from "@/components/tools/calc/BaseNumberConverter";
import Calculator from "@/components/tools/calc/Calculator";
import SqrtPowCalculator from "@/components/tools/calc/SqrtPowCalculator";
import BmiCalculator from "@/components/tools/calc/BmiCalculator";
import AgeCalculator from "@/components/tools/calc/AgeCalculator";
import PercentageCalculator from "@/components/tools/calc/PercentageCalculator";
import WarikanCalculator from "@/components/tools/calc/WarikanCalculator";
import TaxCalculator from "@/components/tools/calc/TaxCalculator";
import GcdLcmCalculator from "@/components/tools/calc/GcdLcmCalculator";
import PrimeFactorization from "@/components/tools/calc/PrimeFactorization";
import CircleCalculator from "@/components/tools/calc/CircleCalculator";
import TriangleCalculator from "@/components/tools/calc/TriangleCalculator";
import CompoundInterestCalculator from "@/components/tools/calc/CompoundInterestCalculator";
import LoanCalculator from "@/components/tools/calc/LoanCalculator";
import ExchangeCalculator from "@/components/tools/calc/ExchangeCalculator";
import TipCalculator from "@/components/tools/calc/TipCalculator";
import StatsCalculator from "@/components/tools/calc/StatsCalculator";
import FractionCalculator from "@/components/tools/calc/FractionCalculator";

// Unit
import UnitConverter from "@/components/tools/unit/UnitConverter";

// Date/time
import TimestampConverter from "@/components/tools/datetime/TimestampConverter";
import DateDiffCalculator from "@/components/tools/datetime/DateDiffCalculator";
import WeekdayCalculator from "@/components/tools/datetime/WeekdayCalculator";
import CountdownTimer from "@/components/tools/datetime/CountdownTimer";
import Stopwatch from "@/components/tools/datetime/Stopwatch";
import PomodoroTimer from "@/components/tools/datetime/PomodoroTimer";
import WorldClock from "@/components/tools/datetime/WorldClock";

// Color
import ColorConverter from "@/components/tools/color/ColorConverter";
import ColorPaletteGenerator from "@/components/tools/color/ColorPaletteGenerator";
import GradientGenerator from "@/components/tools/color/GradientGenerator";
import ContrastChecker from "@/components/tools/color/ContrastChecker";
import RandomColorGenerator from "@/components/tools/color/RandomColorGenerator";
import BoxShadowGenerator from "@/components/tools/color/BoxShadowGenerator";
import BorderRadiusGenerator from "@/components/tools/color/BorderRadiusGenerator";

// Dev
import JsonFormatter from "@/components/tools/dev/JsonFormatter";
import JsonCsvConverter from "@/components/tools/dev/JsonCsvConverter";
import JsonYamlConverter from "@/components/tools/dev/JsonYamlConverter";
import CssMinifier from "@/components/tools/dev/CssMinifier";
import HtmlMinifier from "@/components/tools/dev/HtmlMinifier";
import JsMinifier from "@/components/tools/dev/JsMinifier";
import CronExplainer from "@/components/tools/dev/CronExplainer";
import MarkdownPreview from "@/components/tools/dev/MarkdownPreview";
import UserAgentParser from "@/components/tools/dev/UserAgentParser";
import UnicodeCodepointViewer from "@/components/tools/dev/UnicodeCodepointViewer";
import XmlFormatter from "@/components/tools/dev/XmlFormatter";
import SqlFormatter from "@/components/tools/dev/SqlFormatter";

// Random/game
import DiceRoller from "@/components/tools/random/DiceRoller";
import CoinFlip from "@/components/tools/random/CoinFlip";
import JankenGame from "@/components/tools/random/JankenGame";
import LotteryPicker from "@/components/tools/random/LotteryPicker";
import RandomNumberGenerator from "@/components/tools/random/RandomNumberGenerator";
import RandomStringGenerator from "@/components/tools/random/RandomStringGenerator";
import PasswordStrengthChecker from "@/components/tools/random/PasswordStrengthChecker";
import RoulettePicker from "@/components/tools/random/RoulettePicker";

// Life/money
import CalorieCalculator from "@/components/tools/life/CalorieCalculator";
import SavingsGoalSimulator from "@/components/tools/life/SavingsGoalSimulator";
import DiscountCalculator from "@/components/tools/life/DiscountCalculator";
import HourlyWageCalculator from "@/components/tools/life/HourlyWageCalculator";
import WorkHoursCalculator from "@/components/tools/life/WorkHoursCalculator";
import ElectricityCostCalculator from "@/components/tools/life/ElectricityCostCalculator";
import GasolineCostCalculator from "@/components/tools/life/GasolineCostCalculator";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TOOL_COMPONENT_MAP: Record<string, ComponentType<any>> = {
  "text-counter": TextCounter,
  "case-converter": CaseConverter,
  "width-converter": WidthConverter,
  "kana-converter": KanaConverter,
  "whitespace-cleaner": WhitespaceCleaner,
  "line-sorter": LineSorter,
  "line-dedup": LineDedup,
  "line-numberer": LineNumberer,
  "text-reverser": TextReverser,
  "diff-checker": DiffChecker,
  "regex-tester": RegexTester,
  "lorem-generator": LoremGenerator,
  "slug-generator": SlugGenerator,
  "char-frequency": CharFrequency,

  "base64-tool": Base64Tool,
  "url-encode-tool": UrlEncodeTool,
  "html-entity-tool": HtmlEntityTool,
  "hex-tool": HexTool,
  "binary-tool": BinaryTool,
  "rot13-tool": Rot13Tool,
  "jwt-decoder": JwtDecoder,
  "uuid-generator": UuidGenerator,
  "qr-generator": QrGenerator,
  "wifi-qr-generator": WifiQrGenerator,
  "password-generator": PasswordGenerator,
  "linebreak-converter": LinebreakConverter,

  "base-number-converter": BaseNumberConverter,
  calculator: Calculator,
  "sqrt-pow-calculator": SqrtPowCalculator,
  "bmi-calculator": BmiCalculator,
  "age-calculator": AgeCalculator,
  "percentage-calculator": PercentageCalculator,
  "warikan-calculator": WarikanCalculator,
  "tax-calculator": TaxCalculator,
  "gcd-lcm-calculator": GcdLcmCalculator,
  "prime-factorization": PrimeFactorization,
  "circle-calculator": CircleCalculator,
  "triangle-calculator": TriangleCalculator,
  "compound-interest-calculator": CompoundInterestCalculator,
  "loan-calculator": LoanCalculator,
  "exchange-calculator": ExchangeCalculator,
  "tip-calculator": TipCalculator,
  "stats-calculator": StatsCalculator,
  "fraction-calculator": FractionCalculator,

  "unit-converter": UnitConverter,

  "timestamp-converter": TimestampConverter,
  "date-diff-calculator": DateDiffCalculator,
  "weekday-calculator": WeekdayCalculator,
  "countdown-timer": CountdownTimer,
  stopwatch: Stopwatch,
  "pomodoro-timer": PomodoroTimer,
  "world-clock": WorldClock,

  "color-converter": ColorConverter,
  "color-palette-generator": ColorPaletteGenerator,
  "gradient-generator": GradientGenerator,
  "contrast-checker": ContrastChecker,
  "random-color-generator": RandomColorGenerator,
  "box-shadow-generator": BoxShadowGenerator,
  "border-radius-generator": BorderRadiusGenerator,

  "json-formatter": JsonFormatter,
  "json-csv-converter": JsonCsvConverter,
  "json-yaml-converter": JsonYamlConverter,
  "css-minifier": CssMinifier,
  "html-minifier": HtmlMinifier,
  "js-minifier": JsMinifier,
  "cron-explainer": CronExplainer,
  "markdown-preview": MarkdownPreview,
  "user-agent-parser": UserAgentParser,
  "unicode-codepoint-viewer": UnicodeCodepointViewer,
  "xml-formatter": XmlFormatter,
  "sql-formatter": SqlFormatter,

  "dice-roller": DiceRoller,
  "coin-flip": CoinFlip,
  "janken-game": JankenGame,
  "lottery-picker": LotteryPicker,
  "random-number-generator": RandomNumberGenerator,
  "random-string-generator": RandomStringGenerator,
  "password-strength-checker": PasswordStrengthChecker,
  "roulette-picker": RoulettePicker,

  "calorie-calculator": CalorieCalculator,
  "savings-goal-simulator": SavingsGoalSimulator,
  "discount-calculator": DiscountCalculator,
  "hourly-wage-calculator": HourlyWageCalculator,
  "work-hours-calculator": WorkHoursCalculator,
  "electricity-cost-calculator": ElectricityCostCalculator,
  "gasoline-cost-calculator": GasolineCostCalculator,
};
