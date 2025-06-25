// Node.jsの標準ライブラリであるhttpモジュールをインポートする
// 'node:' プレフィックスは、Node.jsのコアモジュールであることを明示するためのものじゃ
import { createServer } from 'node:http';
import { URL } from 'node:url';

// 環境変数 PORT が設定されていればその値を、なければ 8888 をポート番号として使用する
const PORT = process.env.PORT || 8888;

// httpサーバーを作成する
const server = createServer((req, res) => {
  // リクエストURLをパースして、URLオブジェクトを取得する
  const url = new URL(req.url, `http://${req.headers.host}`);

  // レスポンスのヘッダーに、文字コードがUTF-8のHTMLであることを設定する
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  // URLのパス名に応じて処理を分岐させる
  if (url.pathname === '/') {
    // ルートパス "/" にアクセスされた場合
    console.log('ルートパスへのアクセスがありました。');
    res.writeHead(200); // ステータスコード 200 (OK) を返す
    res.end('こんにちは！');
  } else if (url.pathname === '/ask') {
    // "/ask" パスにアクセスされた場合
    console.log('/ask へのアクセスがありました。');
    // クエリパラメータ 'q' を取得する
    const question = url.searchParams.get('q');
    res.writeHead(200);
    res.end(`Your question is '${question}'`);
  } else {
    // それ以外のパスにアクセスされた場合
    console.log('未定義のパスへのアクセスがありました。');
    res.writeHead(404); // ステータスコード 404 (Not Found) を返す
    res.end('ページが見つかりません');
  }
});

// 指定したポートでサーバーを起動し、リクエストを待ち受ける
server.listen(PORT, () => {
  console.log(`サーバーがポート ${PORT} で起動しました: http://localhost:${PORT}`);
});