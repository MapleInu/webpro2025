// 生成した Prisma Client をインポートする。
// インポート元は `prisma/schema.prisma` で設定した output のパスじゃ
import { PrismaClient } from "./generated/prisma/client";
const prisma = new PrismaClient({
  // この設定で、PrismaがどんなSQL文を実行したかコンソールに表示されるようになるぞ
  log: ['query'],
});

// データベースを操作するメインの処理を定義する
async function main() {
  console.log("Prisma Client を初期化しました。");

  // データベースから全てのユーザーを取得して表示する
  let users = await prisma.user.findMany();
  console.log("Before ユーザー一覧:", users);

  // 新しいユーザーを追加する
  const newUser = await prisma.user.create({
    data: {
      name: `新しいユーザー ${new Date().toISOString()}`,
    },
  });
  console.log("新しいユーザーを追加しました:", newUser);

  // もう一度、全てのユーザーを取得して表示する
  users = await prisma.user.findMany();
  console.log("After ユーザー一覧:", users);
}

// main 関数を実行する
main()
  .catch(e => {
    // もしエラーが起きたら、内容を表示する
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // 処理が終わったら、必ずデータベースとの接続を切断する
    await prisma.$disconnect();
    console.log("Prisma Client を切断しました。");
  });