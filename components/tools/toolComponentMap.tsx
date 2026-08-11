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
import HtmlTagStripper from "@/components/tools/text/HtmlTagStripper";
import PunctuationRemover from "@/components/tools/text/PunctuationRemover";
import DigitRemover from "@/components/tools/text/DigitRemover";
import EmojiRemover from "@/components/tools/text/EmojiRemover";
import LeetspeakConverter from "@/components/tools/text/LeetspeakConverter";
import UpsideDownText from "@/components/tools/text/UpsideDownText";
import WhitespaceVisualizer from "@/components/tools/text/WhitespaceVisualizer";
import MorseCodeTool from "@/components/tools/text/MorseCodeTool";
import NatoPhoneticTool from "@/components/tools/text/NatoPhoneticTool";
import TabSpaceConverter from "@/components/tools/text/TabSpaceConverter";
import PalindromeChecker from "@/components/tools/text/PalindromeChecker";
import AnagramChecker from "@/components/tools/text/AnagramChecker";
import ReadingTimeEstimator from "@/components/tools/text/ReadingTimeEstimator";
import SingleStatCounter from "@/components/tools/text/SingleStatCounter";
import ListExtractor from "@/components/tools/text/ListExtractor";
import StringPaddingTool from "@/components/tools/text/StringPaddingTool";
import TextRepeater from "@/components/tools/text/TextRepeater";

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
import Base32Tool from "@/components/tools/encode/Base32Tool";
import Base58Tool from "@/components/tools/encode/Base58Tool";
import Base85Tool from "@/components/tools/encode/Base85Tool";
import CaesarCipherTool from "@/components/tools/encode/CaesarCipherTool";
import VigenereCipherTool from "@/components/tools/encode/VigenereCipherTool";
import HashGenerator from "@/components/tools/encode/HashGenerator";
import PunycodeTool from "@/components/tools/encode/PunycodeTool";
import CsvEscapeTool from "@/components/tools/encode/CsvEscapeTool";
import DataUrlEncoder from "@/components/tools/encode/DataUrlEncoder";
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
import QuadraticEquationCalculator from "@/components/tools/calc/QuadraticEquationCalculator";
import PermutationCombinationCalculator from "@/components/tools/calc/PermutationCombinationCalculator";
import Matrix2x2Calculator from "@/components/tools/calc/Matrix2x2Calculator";
import RomanNumeralConverter from "@/components/tools/calc/RomanNumeralConverter";
import LeapYearChecker from "@/components/tools/calc/LeapYearChecker";
import GpaCalculator from "@/components/tools/calc/GpaCalculator";
import UnitPriceComparator from "@/components/tools/calc/UnitPriceComparator";
import BodyFatCalculator from "@/components/tools/calc/BodyFatCalculator";
import IdealWeightCalculator from "@/components/tools/calc/IdealWeightCalculator";
import PetAgeCalculator from "@/components/tools/calc/PetAgeCalculator";
import RunningPaceCalculator from "@/components/tools/calc/RunningPaceCalculator";
import CaloriesBurnedCalculator from "@/components/tools/calc/CaloriesBurnedCalculator";
import WaterIntakeCalculator from "@/components/tools/calc/WaterIntakeCalculator";
import PrimeChecker from "@/components/tools/calc/PrimeChecker";
import FactorialCalculator from "@/components/tools/calc/FactorialCalculator";
import LogarithmCalculator from "@/components/tools/calc/LogarithmCalculator";
import TrigCalculator from "@/components/tools/calc/TrigCalculator";
import DistanceCalculator from "@/components/tools/calc/DistanceCalculator";
import AgeGapCalculator from "@/components/tools/calc/AgeGapCalculator";
import SimpleInterestCalculator from "@/components/tools/calc/SimpleInterestCalculator";
import TileFlooringCalculator from "@/components/tools/calc/TileFlooringCalculator";
import PaintCoverageCalculator from "@/components/tools/calc/PaintCoverageCalculator";

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
import EtoCalculator from "@/components/tools/datetime/EtoCalculator";
import ZodiacSignChecker from "@/components/tools/datetime/ZodiacSignChecker";
import EraYearConverter from "@/components/tools/datetime/EraYearConverter";
import IsoWeekNumberCalculator from "@/components/tools/datetime/IsoWeekNumberCalculator";
import NextLeapYearCalculator from "@/components/tools/datetime/NextLeapYearCalculator";
import BusinessDaysCalculator from "@/components/tools/datetime/BusinessDaysCalculator";
import TimezoneDiffCalculator from "@/components/tools/datetime/TimezoneDiffCalculator";

// Color
import ColorConverter from "@/components/tools/color/ColorConverter";
import ColorPaletteGenerator from "@/components/tools/color/ColorPaletteGenerator";
import GradientGenerator from "@/components/tools/color/GradientGenerator";
import ContrastChecker from "@/components/tools/color/ContrastChecker";
import RandomColorGenerator from "@/components/tools/color/RandomColorGenerator";
import BoxShadowGenerator from "@/components/tools/color/BoxShadowGenerator";
import BorderRadiusGenerator from "@/components/tools/color/BorderRadiusGenerator";
import NearestColorNameFinder from "@/components/tools/color/NearestColorNameFinder";
import PaletteReference from "@/components/tools/color/PaletteReference";
import ColorBlendCalculator from "@/components/tools/color/ColorBlendCalculator";
import ColorLightenDarken from "@/components/tools/color/ColorLightenDarken";
import ComplementaryTriadGenerator from "@/components/tools/color/ComplementaryTriadGenerator";
import CssFilterGenerator from "@/components/tools/color/CssFilterGenerator";

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
import GitignoreGenerator from "@/components/tools/dev/GitignoreGenerator";
import ReadmeGenerator from "@/components/tools/dev/ReadmeGenerator";
import LookupTable from "@/components/tools/dev/LookupTable";
import HttpHeaderParser from "@/components/tools/dev/HttpHeaderParser";
import MetaTagGenerator from "@/components/tools/dev/MetaTagGenerator";
import LoremPicsumGenerator from "@/components/tools/dev/LoremPicsumGenerator";
import JsonDiffTool from "@/components/tools/dev/JsonDiffTool";
import CsvTablePreview from "@/components/tools/dev/CsvTablePreview";
import YamlFormatter from "@/components/tools/dev/YamlFormatter";
import EnvFileFormatter from "@/components/tools/dev/EnvFileFormatter";
import Base64ImagePreviewer from "@/components/tools/dev/Base64ImagePreviewer";
import CssVariableGenerator from "@/components/tools/dev/CssVariableGenerator";
import CssSpecificityCalculator from "@/components/tools/dev/CssSpecificityCalculator";
import UrlParser from "@/components/tools/dev/UrlParser";
import DummyDataGenerator from "@/components/tools/dev/DummyDataGenerator";

// Random/game
import DiceRoller from "@/components/tools/random/DiceRoller";
import CoinFlip from "@/components/tools/random/CoinFlip";
import JankenGame from "@/components/tools/random/JankenGame";
import LotteryPicker from "@/components/tools/random/LotteryPicker";
import RandomNumberGenerator from "@/components/tools/random/RandomNumberGenerator";
import RandomStringGenerator from "@/components/tools/random/RandomStringGenerator";
import PasswordStrengthChecker from "@/components/tools/random/PasswordStrengthChecker";
import RoulettePicker from "@/components/tools/random/RoulettePicker";

// Midgames
import Game2048 from "@/components/tools/game/Game2048";
import SnakeGame from "@/components/tools/game/SnakeGame";
import BreakoutGame from "@/components/tools/game/BreakoutGame";
import MemoryGame from "@/components/tools/game/MemoryGame";
import TypingGame from "@/components/tools/game/TypingGame";
import ReversiGame from "@/components/tools/game/ReversiGame";
import WhackAMoleGame from "@/components/tools/game/WhackAMoleGame";
import MeteorDodgeGame from "@/components/tools/game/MeteorDodgeGame";
import QuizGame from "@/components/tools/game/QuizGame";
import WordScrambleGame from "@/components/tools/game/WordScrambleGame";
import HangmanGame from "@/components/tools/game/HangmanGame";
import TicTacToeGame from "@/components/tools/game/TicTacToeGame";
import ConnectFourGame from "@/components/tools/game/ConnectFourGame";
import ReactionTimeTest from "@/components/tools/game/ReactionTimeTest";
import NumberMemoryTest from "@/components/tools/game/NumberMemoryTest";
import SimonGame from "@/components/tools/game/SimonGame";
import MazeGame from "@/components/tools/game/MazeGame";
import JumpDodgeGame from "@/components/tools/game/JumpDodgeGame";
import SlidePuzzleGame from "@/components/tools/game/SlidePuzzleGame";
import MinesweeperGame from "@/components/tools/game/MinesweeperGame";
import CpsTestGame from "@/components/tools/game/CpsTestGame";
import HighLowGame from "@/components/tools/game/HighLowGame";
import SlotMachineGame from "@/components/tools/game/SlotMachineGame";
import RouletteNumberGame from "@/components/tools/game/RouletteNumberGame";
import BlackjackGame from "@/components/tools/game/BlackjackGame";
import RpslsGame from "@/components/tools/game/RpslsGame";
import BubbleClickGame from "@/components/tools/game/BubbleClickGame";
import TimingBarGame from "@/components/tools/game/TimingBarGame";
import NumberSequenceGame from "@/components/tools/game/NumberSequenceGame";
import PongGame from "@/components/tools/game/PongGame";

// Life/money
import CalorieCalculator from "@/components/tools/life/CalorieCalculator";
import SavingsGoalSimulator from "@/components/tools/life/SavingsGoalSimulator";
import DiscountCalculator from "@/components/tools/life/DiscountCalculator";
import HourlyWageCalculator from "@/components/tools/life/HourlyWageCalculator";
import WorkHoursCalculator from "@/components/tools/life/WorkHoursCalculator";
import ElectricityCostCalculator from "@/components/tools/life/ElectricityCostCalculator";
import GasolineCostCalculator from "@/components/tools/life/GasolineCostCalculator";
import MortgageDownPaymentCalculator from "@/components/tools/life/MortgageDownPaymentCalculator";
import MovingCostEstimator from "@/components/tools/life/MovingCostEstimator";
import SubscriptionTotalCalculator from "@/components/tools/life/SubscriptionTotalCalculator";
import UtilityBillTotalCalculator from "@/components/tools/life/UtilityBillTotalCalculator";
import RetirementSavingsSimulator from "@/components/tools/life/RetirementSavingsSimulator";
import HouseholdBudgetCalculator from "@/components/tools/life/HouseholdBudgetCalculator";
import ShippingCostEstimator from "@/components/tools/life/ShippingCostEstimator";

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
  "html-tag-stripper": HtmlTagStripper,
  "punctuation-remover": PunctuationRemover,
  "digit-remover": DigitRemover,
  "emoji-remover": EmojiRemover,
  "leetspeak-converter": LeetspeakConverter,
  "upside-down-text": UpsideDownText,
  "whitespace-visualizer": WhitespaceVisualizer,
  "morse-code-tool": MorseCodeTool,
  "nato-phonetic-tool": NatoPhoneticTool,
  "tab-space-converter": TabSpaceConverter,
  "palindrome-checker": PalindromeChecker,
  "anagram-checker": AnagramChecker,
  "reading-time-estimator": ReadingTimeEstimator,
  "single-stat-counter": SingleStatCounter,
  "list-extractor": ListExtractor,
  "string-padding-tool": StringPaddingTool,
  "text-repeater": TextRepeater,

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
  "base32-tool": Base32Tool,
  "base58-tool": Base58Tool,
  "base85-tool": Base85Tool,
  "caesar-cipher-tool": CaesarCipherTool,
  "vigenere-cipher-tool": VigenereCipherTool,
  "hash-generator": HashGenerator,
  "punycode-tool": PunycodeTool,
  "csv-escape-tool": CsvEscapeTool,
  "data-url-encoder": DataUrlEncoder,

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
  "quadratic-equation-calculator": QuadraticEquationCalculator,
  "permutation-combination-calculator": PermutationCombinationCalculator,
  "matrix-2x2-calculator": Matrix2x2Calculator,
  "roman-numeral-converter": RomanNumeralConverter,
  "leap-year-checker": LeapYearChecker,
  "gpa-calculator": GpaCalculator,
  "unit-price-comparator": UnitPriceComparator,
  "body-fat-calculator": BodyFatCalculator,
  "ideal-weight-calculator": IdealWeightCalculator,
  "pet-age-calculator": PetAgeCalculator,
  "running-pace-calculator": RunningPaceCalculator,
  "calories-burned-calculator": CaloriesBurnedCalculator,
  "water-intake-calculator": WaterIntakeCalculator,
  "prime-checker": PrimeChecker,
  "factorial-calculator": FactorialCalculator,
  "logarithm-calculator": LogarithmCalculator,
  "trig-calculator": TrigCalculator,
  "distance-calculator": DistanceCalculator,
  "age-gap-calculator": AgeGapCalculator,
  "simple-interest-calculator": SimpleInterestCalculator,
  "tile-flooring-calculator": TileFlooringCalculator,
  "paint-coverage-calculator": PaintCoverageCalculator,

  "unit-converter": UnitConverter,

  "timestamp-converter": TimestampConverter,
  "date-diff-calculator": DateDiffCalculator,
  "weekday-calculator": WeekdayCalculator,
  "countdown-timer": CountdownTimer,
  stopwatch: Stopwatch,
  "pomodoro-timer": PomodoroTimer,
  "world-clock": WorldClock,
  "eto-calculator": EtoCalculator,
  "zodiac-sign-checker": ZodiacSignChecker,
  "era-year-converter": EraYearConverter,
  "iso-week-number-calculator": IsoWeekNumberCalculator,
  "next-leap-year-calculator": NextLeapYearCalculator,
  "business-days-calculator": BusinessDaysCalculator,
  "timezone-diff-calculator": TimezoneDiffCalculator,

  "color-converter": ColorConverter,
  "color-palette-generator": ColorPaletteGenerator,
  "gradient-generator": GradientGenerator,
  "contrast-checker": ContrastChecker,
  "random-color-generator": RandomColorGenerator,
  "box-shadow-generator": BoxShadowGenerator,
  "border-radius-generator": BorderRadiusGenerator,
  "nearest-color-name-finder": NearestColorNameFinder,
  "palette-reference": PaletteReference,
  "color-blend-calculator": ColorBlendCalculator,
  "color-lighten-darken": ColorLightenDarken,
  "complementary-triad-generator": ComplementaryTriadGenerator,
  "css-filter-generator": CssFilterGenerator,

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
  "gitignore-generator": GitignoreGenerator,
  "readme-generator": ReadmeGenerator,
  "lookup-table": LookupTable,
  "http-header-parser": HttpHeaderParser,
  "meta-tag-generator": MetaTagGenerator,
  "lorem-picsum-generator": LoremPicsumGenerator,
  "json-diff-tool": JsonDiffTool,
  "csv-table-preview": CsvTablePreview,
  "yaml-formatter": YamlFormatter,
  "env-file-formatter": EnvFileFormatter,
  "base64-image-previewer": Base64ImagePreviewer,
  "css-variable-generator": CssVariableGenerator,
  "css-specificity-calculator": CssSpecificityCalculator,
  "url-parser": UrlParser,
  "dummy-data-generator": DummyDataGenerator,

  "dice-roller": DiceRoller,
  "coin-flip": CoinFlip,
  "janken-game": JankenGame,
  "lottery-picker": LotteryPicker,
  "random-number-generator": RandomNumberGenerator,
  "random-string-generator": RandomStringGenerator,
  "password-strength-checker": PasswordStrengthChecker,
  "roulette-picker": RoulettePicker,

  "game-2048": Game2048,
  "game-snake": SnakeGame,
  "game-breakout": BreakoutGame,
  "game-memory": MemoryGame,
  "game-typing": TypingGame,
  "game-reversi": ReversiGame,
  "game-whackamole": WhackAMoleGame,
  "game-meteor-dodge": MeteorDodgeGame,
  "quiz-game": QuizGame,
  "word-scramble-game": WordScrambleGame,
  "hangman-game": HangmanGame,
  "tictactoe-game": TicTacToeGame,
  "connect-four-game": ConnectFourGame,
  "reaction-time-test": ReactionTimeTest,
  "number-memory-test": NumberMemoryTest,
  "simon-game": SimonGame,
  "maze-game": MazeGame,
  "jump-dodge-game": JumpDodgeGame,
  "slide-puzzle-game": SlidePuzzleGame,
  "minesweeper-game": MinesweeperGame,
  "cps-test-game": CpsTestGame,
  "high-low-game": HighLowGame,
  "slot-machine-game": SlotMachineGame,
  "roulette-number-game": RouletteNumberGame,
  "blackjack-game": BlackjackGame,
  "rpsls-game": RpslsGame,
  "bubble-click-game": BubbleClickGame,
  "timing-bar-game": TimingBarGame,
  "number-sequence-game": NumberSequenceGame,
  "pong-game": PongGame,

  "calorie-calculator": CalorieCalculator,
  "savings-goal-simulator": SavingsGoalSimulator,
  "discount-calculator": DiscountCalculator,
  "hourly-wage-calculator": HourlyWageCalculator,
  "work-hours-calculator": WorkHoursCalculator,
  "electricity-cost-calculator": ElectricityCostCalculator,
  "gasoline-cost-calculator": GasolineCostCalculator,
  "mortgage-down-payment-calculator": MortgageDownPaymentCalculator,
  "moving-cost-estimator": MovingCostEstimator,
  "subscription-total-calculator": SubscriptionTotalCalculator,
  "utility-bill-total-calculator": UtilityBillTotalCalculator,
  "retirement-savings-simulator": RetirementSavingsSimulator,
  "household-budget-calculator": HouseholdBudgetCalculator,
  "shipping-cost-estimator": ShippingCostEstimator,
};
