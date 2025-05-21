# SIP3-agent

![スクリーンショット](screenshot.png)

SIP3 辞書を活用して医療文書を解析する AI エージェントです。  
現在は、SIP3 辞書 API で文書を解析してから質問に回答するという処理に固定されています。  
ローカル LLM で動作します。

構成は以下です。

- src/mastra: AI エージェント構築ライブラリ
- sip3dict-chat: チャット画面の UI ライブラリ。assistant-ui 使用

以下の4つのサーバーがあります。

- sip3-dictionary-api: SIP3辞書APIで、カルテ文書を解析します。ローカルでサーバーを立ち上げたい場合は、[Github](https://github.com/sociocom/sip3-dictionary-api)のREADMEにしたがってインストールしてサーバーを立ち上げてください。ローカルの場合、ポート番号は7070です。
- LM Studio: エージェントが使用するLLMのサーバーです。ポート番号は1234です。
- AIエージェント: LLMの指示や外部ツールを利用して、質問の回答を生成します。ポート番号は4111です。
  - `http://localhost:4111:swagger-ui`でエージェントのAPIを確認できます。
- チャットUI（オプショナル）: AIエージェントをブラウザから利用するためのユーザーインターフェースです。エージェントのみを外部から使用する場合には不要です。ポート番号は3000です。
  - `http://localhost:3000`でチャット画面が確認できます。

## SIP3辞書サーバーのインストールと実行

- [sip3-dictionary-api](https://github.com/sociocom/sip3-dictionary-api)をインストールしてサーバーを立ち上げます。
  オンライン環境では、`https://nlp.sociocom.jp/sip3/api/`が利用できます。

## LM Studio のインストールと実行

- [LM Studio](https://lmstudio.ai/)をダウンロード、インストールします。
- LM Studio を立ち上げ、左サイドバーの検索タブ（discover）から、LLM を検索してダウンロードします。
  例えば、`Qwen2.5-14B-Instruct-1M-GGUF`をダウンロードします。Mac の場合、MLX 版（`Qwen2.5-14B-Instruct-MLX-8bit`など）をダウンロードします。
- 左サイドバーの Develop タブへ移動し、`Status Stopped`となっていたら、`Status Start`に変更して LLM サーバーを立ち上げます。
- 画面上部の`Select a Model to load`から、ダウンロードした LLM を指定して読み込みます。

## AIエージェントのインストールと実行

`npm`をインストールしていない場合は、あらかじめインストールします。
ルートディレクトリで、以下を実行します。

```
npm install
```

npm 11.3.0 で動作確認しています。

`.env.example`ファイルをコピーして、`.env`ファイルを作成します。

`.env`ファイルに環境変数を設定します。  
 現在、OpenAI は使用していないため、`OPENAI_API_KEY`は設定不要です。

- `SIP3DICT_API_URL`: ローカルでsip3-dictionary-apiを立ち上げるときは、デフォルトのままで大丈夫です。
- `LLM`: `qwen2.5-14b-instruct-1m`や`qwen2.5-14b-instruct-mlx`などのLLMを指定します。`LLM`で指定したモデルは、LM Studio でロードしておく必要があります。

以下のコマンドで、AI エージェントを立ち上げます。

```
npm run dev
```

ブラウザで、`http://localhost:4111:swagger-ui`へアクセスすると、API一覧の画面が表示されます。

## チャットUIのインストールと実行

`cd sip3dict-chat`でディレクトリを移動します。
以下のコマンドでインストールします。

```
npm install
npm run build
```

以下で実行します。

```
npm run start
```

ブラウザで、`http://localhost:3000`へアクセスすると、チャット画面が表示されます。
