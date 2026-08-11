export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-500 sm:px-6">
        <p>
          ツール箱100は、文字数カウントや単位変換など日常的によく使うツールを100個集めた無料サイトです。入力した内容はすべてブラウザ内で処理され、サーバーには送信されません。
        </p>
        <p className="mt-2">
          計算・金額系ツールは簡易計算を目的としており、正確な税務・金融・医療等の判断には専門家にご相談ください。
        </p>
      </div>
    </footer>
  );
}
