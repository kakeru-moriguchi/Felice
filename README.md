# Felice ウェブサイト

Next.js App Router / TypeScript 製の美容サロン Felice サイトです。Vercel にデプロイできます。

## 構成とデザイン

- `/` HOME：ファーストビュー、Feliceについて、選ばれる理由、メニュー、セラピスト、店舗情報、ブログ、予約導線
- `/therapist` セラピスト紹介
- `/shop` 店舗情報
- `/blog` ブログ一覧、`/blog/[slug]` 記事詳細
- `/contact` お問い合わせ
- `/legal` 特定商取引法に基づく表記

ブラウン・アイボリー・グレージュを使い、写真と文章の非対称配置、細い罫線と控えめなタイポグラフィで構成。スマートフォンではナビゲーションを折りたたみ、予約とLINE相談を画面下部に固定しています。

## 開発

```bash
npm install
cp .env.example .env.local
npm run dev
```

`http://localhost:3000` で確認できます。`npm run build` で本番ビルドを確認してください。

## 更新する場所

- 店舗情報・外部リンク・画像パス・メニュー名：`lib/site.ts`
- HOME の紹介文とセクション：`app/page.tsx`
- セラピストの文章：`app/therapist/page.tsx`（現段階の文章は仮原稿）
- 特商法表記：`app/legal/page.tsx`
- 色・余白・表示：`app/globals.css`

既存サイトの店舗情報には「大塚駅徒歩1分」と「北口徒歩2分」の表記が混在していました。新サイトでは依頼内容に合わせて徒歩1分とし、都電荒川線は徒歩2分と記載しています。営業時間・定休日は最新の指定（11:00〜23:30／不定休）を採用しています。

## 写真の差し替え

現在のファーストビュー画像はAI制作の仮イメージです。人物・店内の正式写真は未掲載のため、各写真枠に `PHOTO COMING SOON` と表示されます。差し替え時は `public/images/` に以下のファイルを入れるだけで表示されます。画像パスは `lib/site.ts` に一元化しています。正式なファーストビュー写真へ交換した後は、`components/Photo.tsx` の「仮イメージ写真」注記を外してください。

| ファイル | 用途 | 推奨サイズ | 比率 |
| --- | --- | ---: | --- |
| `hero.webp` | ファーストビュー | 1800×1200px 以上 | 3:2 |
| `room.jpg` | 店内 | 1200×900px 以上 | 4:3 |
| `treatment.jpg` | 施術 | 1200×900px 以上 | 4:3 |
| `therapist.jpg` | セラピスト | 900×1200px 以上 | 3:4 |
| `menu.jpg` | メニュー | 900×1200px 以上 | 3:4 |
| `exterior.jpg` | 店舗外観 | 1200×900px 以上 | 4:3 |

WebP または AVIF への変換を推奨します。適切なファイル名・パスに変更してください。`Photo` コンポーネントの `label` は画像alt相当の代替テキストとして使用します。仮写真のラベルやセラピストページの注記は正式写真・原稿を入れた後に削除してください。

## microCMS の設定

1. microCMSでサービスを作成し、リスト形式のAPIを `blogs` というエンドポイントで作成します。
2. フィールドを設定します：`title`（テキスト）、`slug`（テキスト、ユニーク推奨）、`content`（リッチエディタ）、`eyecatch`（画像）、`category`（テキスト）、`description`（テキスト）。公開日は標準の `publishedAt` を利用します。
3. `.env.local` またはVercelの環境変数に `MICROCMS_SERVICE_DOMAIN`（`xxx.microcms.io` の `xxx`）、`MICROCMS_API_KEY` を設定します。APIキーはサーバーでのみ利用し、`NEXT_PUBLIC_` を付けません。
4. microCMSから記事を公開すると、最大5分程度で一覧・詳細に反映されます。

未設定時と取得失敗時は `lib/blog.ts` の仮記事3件を表示します。正式運用時には仮記事の公開日・文章を差し替えるか、必要に応じてフォールバック表示をオフにしてください。スタッフ・制作者の双方にmicroCMSの編集権限を付与して運用します。

## お問い合わせメール

Resendで送信元ドメインを認証し、以下を環境変数に設定します。

- `RESEND_API_KEY`：ResendのAPIキー
- `CONTACT_FROM_EMAIL`：認証済みドメインの送信元アドレス
- `CONTACT_TO_EMAIL`：店舗の受信先メールアドレス
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY`：Cloudflare Turnstileのサイトキー・秘密キー（本番公開時に設定を推奨）

フォームは必須項目・メール形式・電話番号・文字数をブラウザとサーバーで検証し、ハニーポットとTurnstileに対応します。二重送信は送信中のボタン無効化で防止します。APIキー未設定時は送信せず、公式LINEへの案内を表示します。Vercelでは全環境変数をプロジェクト設定に登録してください。

## SEO・公開前確認

各ページのメタ情報、OGP、構造化データ、favicon、robots.txt、sitemap.xmlを設定済みです。OGP画像には現在の仮ファーストビュー画像を使用しています。公開時には `NEXT_PUBLIC_SITE_URL` を実ドメインに設定し、正式写真が確定した後にOGP画像も交換してください。写真、プロフィール原稿、営業時間・アクセス、メール送信、microCMSの記事を公開前に確認してください。

