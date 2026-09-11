# 害鳥駆除ランキングNAVI

害鳥駆除業者の比較・ランキングサイト。HTML / CSS / JavaScript のみで構成された静的サイトで、ビルドツールや外部ライブラリへの依存はありません。

---

## 1. ディレクトリ構成

```
control-ranking/
├── index.html                      # 主力ページ：害鳥駆除業者おすすめランキング10選
├── companies/
│   ├── rescue-samurai.html         # 1位 害鳥レスキュー侍の詳細レビュー
│   ├── fujinaga.html               # 2位 株式会社フジナガの詳細レビュー
│   └── hatotaisaku.html            # 3位 日本鳩対策センターの詳細レビュー
├── columns/
│   ├── hiyou-souba.html            # 費用相場（情報収集フェーズの流入獲得）
│   └── erabikata.html              # 業者の選び方（比較検討フェーズの流入獲得）
├── areas/
│   ├── tokyo.html                  # 東京エリア（ローカル検索の流入獲得）
│   └── kanagawa.html               # 神奈川エリア（横浜・川崎・相模原）
├── assets/
│   ├── css/style.css               # デザインシステム一式
│   └── js/main.js                  # 目次自動生成・追従CTA・ナビ等
├── sitemap.xml
├── robots.txt
└── README.md
```

## 2. 公開前に必ず差し替える項目

| 対象 | 現在の値 | 作業内容 |
| --- | --- | --- |
| 独自ドメイン | `https://bird-control-ranking.jp` | 全ファイルを一括置換（canonical / OGP / JSON-LD / sitemap.xml / robots.txt に出現） |
| サイト名 | `害鳥駆除ランキングNAVI` | 変更する場合はヘッダー・フッター・OGP・JSON-LD を合わせて更新 |
| 運営者情報 | 未設定 | 特定商取引法・景表法対応のため、運営会社ページとプライバシーポリシーページの追加を推奨 |
| OGP画像 | 未設定 | 1200×630px の画像を用意し、`<meta property="og:image">` を各ページに追加 |
| favicon | 未設定 | `favicon.ico` / `apple-touch-icon.png` を追加 |
| 画像 | 未設定（現在はテキストのみ） | 施工事例の Before/After、各社ロゴを追加すると滞在時間とCVRが上がる |

PowerShell での一括置換例:

```powershell
Get-ChildItem -Recurse -Include *.html,*.xml,*.txt |
  ForEach-Object {
    (Get-Content $_.FullName -Raw) -replace 'https://bird-control-ranking\.jp', 'https://YOUR-DOMAIN.jp' |
      Set-Content $_.FullName -NoNewline
  }
```

## 3. SEO設計

### 狙っているキーワード

| ページ | 主軸キーワード | 補助キーワード |
| --- | --- | --- |
| `index.html` | 害鳥駆除 おすすめ / 害鳥駆除 業者 ランキング | 鳩駆除 業者 比較、鳥害対策 業者、ハト 駆除 業者 おすすめ |
| `columns/hiyou-souba.html` | 害鳥駆除 費用 相場 | 鳩駆除 費用、防鳥ネット 価格、ハト 駆除 いくら |
| `columns/erabikata.html` | 害鳥駆除 業者 選び方 | 鳩駆除 業者 悪質、鳥害対策 失敗 |
| `areas/tokyo.html` | 害鳥駆除 東京 / 鳩駆除 東京 | 東京 鳥害対策 業者、23区 ハト 駆除 |
| `areas/kanagawa.html` | 害鳥駆除 神奈川 / 鳩駆除 横浜 | 神奈川 鳥害対策 業者、川崎 ハト 駆除 |
| `companies/*.html` | 各社名 + 評判 / 口コミ / 料金 | 指名検索の刈り取り |

### 実装済みの技術的SEO

- 構造化データ（JSON-LD）
  - `Article` / `WebSite` / `Organization`（全ページ）
  - `BreadcrumbList`（全ページ）
  - `ItemList`（ランキングページ、東京ページ）
  - `FAQPage`（index / rescue-samurai / hiyou-souba）
  - `HowTo`（erabikata）
  - `LocalBusiness`（rescue-samurai：住所・電話・営業時間・対応エリア）
- canonical URL、OGP、Twitter Card、`max-image-preview:large`
- 見出し階層（h1 は各ページ1つ、h2 → h3 の順序を維持）
- パンくずリスト（HTML + 構造化データ）
- 内部リンク：ランキング ⇄ 各社詳細 ⇄ コラム ⇄ エリアの相互リンク網
- 目次を JS で自動生成（h2/h3 に自動で id を付与するため、記事を書き足しても目次は自動追従）
- 外部リンクは `target="_blank"` + `rel="noopener"` を JS で強制付与
- 外部ライブラリ・Webフォント不使用（LCP / CLS に有利）
- `sitemap.xml` / `robots.txt`

### 公開後に実施する作業

1. Google Search Console にサイトを登録し、`sitemap.xml` を送信
2. リッチリザルトテストで FAQ / パンくず / ItemList の検証
3. PageSpeed Insights で LCP・CLS を確認（画像追加後は特に）
4. Google アナリティクス（GA4）の設置と、CTAクリックのイベント計測設定

## 4. スマートフォン対応

モバイルファーストで最適化してあります。ブレークポイントは4段階です。

| 幅 | 対象 | 主な変化 |
| --- | --- | --- |
| 961px〜 | PC | サイドバー付き2カラム |
| 〜960px | タブレット | 1カラム化、追従CTA表示 |
| 〜900px | タブレット小 | ハンバーガーメニューに切替、ヘッダー56px |
| 〜640px | スマホ | 余白・文字サイズを圧縮、仕様表をカード型に組み替え |
| 〜400px | 小型スマホ（iPhone SE等） | さらに余白圧縮、ボタン文字を縮小 |

### モバイル特有の実装

- **仕様テーブルのカード化** — `table.spec` は640px以下で `display: block` によりカード型へ組み替わり、横スクロールなしで読めます。項目名が見出し、値が本文として縦に積まれます。
- **比較テーブルの1列目固定** — `table.compare` は横スクロールを維持しつつ、`position: sticky` で1列目（比較項目名）を固定。横に流しても「今どの項目を見ているか」を見失いません。スクロール可能なときだけ「← 横にスクロールできます →」のヒントをJSが自動挿入し、不要になれば自動で削除します。
- **画面端までのブリード** — 横スクロールする比較表のみ、`:has(table.compare)` を使って画面端まで広げ、表示領域を確保しています。
- **追従CTA** — 500px以上スクロールすると画面下部に固定表示。フッターに到達すると自動で退避してコンテンツを隠しません。`env(safe-area-inset-bottom)` によりiPhoneのホームインジケーターを避けます。
- **タップターゲット** — ボタンは `min-height: 50px`（小ボタンは42px）を確保し、Googleのモバイルユーザビリティ基準を満たします。
- **ハンバーガーメニュー** — メニュー外タップ、Escapeキー、リンク選択、PC幅への復帰のいずれでも閉じます。画面高を超える場合は内部スクロール（`100dvh` 対応）。
- **横向き対応** — 高さ480px以下の横向き画面では追従CTAを非表示にし、ヘッダーの固定も解除して表示領域を確保します。
- **`viewport-fit=cover`** — 全ページに設定済み。ノッチ端末でも背景が端まで描画されます。
- **`@media (hover: none)`** — タッチデバイスではホバー時の浮き上がりアニメーションを無効化し、代わりに `:active` でタップフィードバックを返します。
- **`prefers-reduced-motion`** — 視差効果を減らす設定の端末では、スムーススクロールとアニメーションを無効化します。

### 確認方法

Chrome DevTools のデバイスツールバー（Ctrl+Shift+M）で以下の幅を確認してください。

- 320px（iPhone SE 第1世代）
- 375px（iPhone SE 第2/3世代）
- 390px（iPhone 14）
- 430px（iPhone 15 Pro Max）
- 768px（iPad 縦）

公開後は Google Search Console の「ページエクスペリエンス」と PageSpeed Insights のモバイルスコアで実測してください。

## 5. 害鳥レスキュー侍との相互効果（被リンク設計）

このサイトは、レスキュー侍側の SEO を押し上げる設計にしてあります。

### 本サイト → rescue-samurai.com（実装済み）

- **do-follow の文脈リンクを全ページに配置**（`nofollow` を意図的に付けていません）
  - アンカーテキストは `害鳥レスキュー侍` / `公式サイトで無料相談する` など自然な形に分散
- **専用の詳細レビューページ**（`companies/rescue-samurai.html`）を用意
  - 会社概要、料金、工法、施工事例、口コミ、FAQ を網羅した約6,000字のページ
  - `LocalBusiness` 構造化データで NAP（名称・住所・電話）を記述し、サイテーション効果を付与
- **電話番号 `050-8896-4221` を全ページに掲載**（NAP の一貫性 → ローカルSEOの評価向上）
- 東京エリアページで「新宿区に本社」という地域文脈を補強

### rescue-samurai.com → 本サイト（先方サイト側で実施を推奨）

相互リンクの効果を最大化するには、レスキュー侍側にも以下を追加してください。

1. **「メディア掲載」セクションの新設**
   トップページ下部または会社概要ページに設置し、本サイトへリンク。
   ```html
   <section class="media">
     <h2>メディア掲載</h2>
     <ul>
       <li>
         <a href="https://YOUR-DOMAIN.jp/companies/rescue-samurai.html">
           害鳥駆除ランキングNAVI「害鳥駆除業者おすすめランキング10選」で第1位に選出されました
         </a>
       </li>
     </ul>
   </section>
   ```

2. **第三者評価バッジの掲載**
   「害鳥駆除業者おすすめランキング 第1位」といったバッジ画像を、リンク付きでファーストビュー付近に配置。CVR向上と被リンク獲得を同時に狙えます。

3. **記事コンテンツ側からの相互言及**
   レスキュー侍側にコラムを追加する場合、費用相場や業者選びの解説では本サイトの該当ページへリンクすると、双方のトピック関連性が強まります。

### 注意点

- **相互リンクは「読者にとって有益な文脈」で行うこと。** 相互リンク専用ページを作って大量に相互リンクするのは Google のリンクスパムポリシーに抵触します。本サイトのように、比較・評価という文脈の中で自然に張られたリンクは問題ありません。
- **ランキング1位が広告主である場合、その事実の開示が必要です。** 本サイトでは全ページ最上部の `.pr-bar` と、フッターの `.footer-disclaimer` で明示しています。削除しないでください（景品表示法のステルスマーケティング規制対応）。
- `index.html` の「ランキングの評価基準」セクションは、順位の恣意性を否定する根拠として機能します。E-E-A-T の観点でも重要なので残してください。

## 6. コンテンツの拡張プラン

トピッククラスタを厚くするほど、主力ページ（`index.html`）の評価が上がります。優先度順に記載します。

### 優先度：高

- `areas/saitama.html`、`areas/chiba.html` — レスキュー侍の対応県を追加（`kanagawa.html` は作成済み）
- `columns/hato-taisaku.html` — 鳩対策の総合ガイド（検索ボリュームが最大）
- `columns/choju-hogoho.html` — 鳥獣保護管理法の詳細解説（法令系は権威性の獲得に有効）

### 優先度：中

- `columns/mukudori.html`、`columns/karasu.html`、`columns/koumori.html` — 鳥種別ガイド
- `columns/mansion-hato.html` — マンション・賃貸のケース別解説
- `columns/solar-panel.html` — ソーラーパネルの鳥害（競合が少なく獲得しやすい）
- 運営会社ページ、プライバシーポリシー、お問い合わせページ（E-E-A-T 強化）

### 優先度：低

- `areas/` を市区町村単位まで細分化（例：`areas/tokyo/setagaya.html`）
  - ただし内容が薄いページを量産すると低品質判定を受けるため、各ページに固有の情報（その地域の被害傾向・施工事例）を必ず含めること

新規ページを作る際は、既存ページの `<head>`・ヘッダー・フッター・サイドバーをそのままコピーし、本文と JSON-LD だけを差し替えれば同じデザインになります。記事本文を包む要素に `data-toc-source` 属性を付けておけば、目次は自動生成されます。

## 7. ローカルでの確認方法

```powershell
# Python がある場合
python -m http.server 8000

# Node.js がある場合
npx serve .
```

ブラウザで `http://localhost:8000` を開いてください。`file://` で直接開いても表示はできますが、構造化データの検証などは HTTP 経由での確認を推奨します。

## 8. 免責

掲載している各社の料金・保証・対応エリア等の情報は、2026年9月時点の各社公式サイトの公開情報に基づいています。実際の運用開始前に、必ず最新情報を確認して更新してください。特に「最長半永久保証」「3,000円〜」といった訴求は、掲載企業の表示内容と齟齬が生じないよう定期的な確認が必要です。
