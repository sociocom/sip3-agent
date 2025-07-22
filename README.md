# SIP3-agent

![スクリーンショット](screenshot.png)

SIP3 辞書を活用して医療文書を解析する AI エージェントです。  
ローカル LLM で動作します。  
エージェントライブラリとして、PydanticAIを使用しています。

以下の3つのサーバーを使います。

- `sip3-dictionary-api`:
  SIP3辞書APIで、カルテ文書を解析します。ローカルでサーバーを立ち上げたい場合は、[Github](https://github.com/sociocom/sip3-dictionary-api)
  のREADMEにしたがってインストールしてサーバーを立ち上げてください。ローカルの場合、ポート番号は`7070`です。
  FastAPI-MCPライブラリを用いてMCPサーバー化されているので、通常のREST APIとMCPのどちらも利用できます。
- `LM Studio`: エージェントが使用するLLMのサーバーです。ポート番号は`1234`です。
- `AIエージェント`: LLMの指示や外部ツールを利用して、質問の回答を生成します。ポート番号は`4111`です。
    - `http://localhost:4111/chat` でエージェントに指示を送ります。

## SIP3辞書サーバーのインストールと実行

- [sip3-dictionary-api](https://github.com/sociocom/sip3-dictionary-api)をインストールしてサーバーを立ち上げます。
  オンライン環境では、`https://nlp.sociocom.jp/sip3/api/` が利用できます。

## LM Studio のインストールと実行

- [LM Studio](https://lmstudio.ai/)をダウンロード、インストールします。
- LM Studio を立ち上げ、左サイドバーの検索タブ（discover）から、LLM を検索してダウンロードします。
  例えば、`Qwen2.5-14B-Instruct-1M-GGUF`をダウンロードします。Mac の場合、MLX 版（`Qwen2.5-14B-Instruct-MLX-8bit`
  など）をダウンロードします。
- 左サイドバーの Develop タブへ移動し、`Status Stopped`となっていたら、`Status Start`に変更して LLM サーバーを立ち上げます。
- 画面上部の`Select a Model to load`から、ダウンロードした LLM を指定して読み込みます。

## AIエージェントのインストールと実行

`python 3.12+`を準備します。  
必要なライブラリをインストールします。

```
pip install fastapi uvicorn python-dotenv pydantic-ai[mcp]
```

オンライン環境の場合は`.env.example`、
オフライン環境で全てローカルで実行する場合は`.env.example.local`ファイルをコピーして、
`.env`ファイルを作成します。

`.env`ファイルに環境変数を設定します。

- `SIP3DICT_API_URL`: SIP3辞書APIのURLを指定します。基本的にはデフォルトのままで大丈夫です。
- `LLM`: `qwen2.5-14b-instruct-1m`や`qwen2.5-14b-instruct-mlx`などのLLMを指定します。`LLM`で指定したモデルは、`LM Studio`
  でロードしておく必要があります。

以下のコマンドで、AIエージェントを立ち上げます。

```
cd app
uvicorn main:app --port 4111
```

ブラウザで`http://localhost:4111/` へアクセスして、メッセージが表示されれば動作しています。

## テスト

サンプルのカルテと質問をエージェントへ送り、回答を取得します。

```
python test.py

> {'response': 'HbA1cの値は「9.1％」です。'}
```

## MCPサーバーの呼び出し

SIP3-dictionary APIのMCPサーバーをツールとして呼び出しています。
