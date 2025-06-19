import os
from typing import Any

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from pydantic_ai import Agent, RunContext
from pydantic_ai.models.openai import OpenAIModel
from pydantic_ai.providers.openai import OpenAIProvider

from sip3_dict_tool import call_sip3_dict

load_dotenv()
lms_provider = OpenAIProvider(base_url="http://localhost:1234/v1/")
lms_model = OpenAIModel(model_name=os.environ["LLM"], provider=lms_provider)

agent = Agent(
    lms_model,
    deps_type=str,
    output_type=str,
    system_prompt=(
        "あなたはカルテに書かれた内容について回答するアシスタントです。",
        "`get_sip3_dict` ツールを使ってカルテに含まれる用語を取得して、その結果を使用してください。",
        "質問に対する回答だけを簡潔に出力してください。",
    ),
)
app = FastAPI()


class Sip3Dict(BaseModel):
    record: str = Field(description="カルテ")
    dict_info: list[dict[str, Any]] = Field(description="カルテに含まれる用語")


class ChatRequest(BaseModel):
    prompt: str


@app.post("/chat")
def chat(req: ChatRequest):
    result = agent.run_sync(req.prompt)
    return {"response": result.output}


@app.get("/")
def health_check():
    return {"sip3_agent": "working"}


@agent.tool
async def get_sip3_dict(ctx: RunContext[str], record: str) -> Sip3Dict:
    """sip3辞書を用いてカルテに含まれる用語を取得します。

    Args:
        ctx: コンテキスト
        record: ユーザーから入力されたカルテ
    """

    dict_info = call_sip3_dict(record)  # 辞書情報を入れると、質問に回答しなくなるので、いったん無視する。
    return Sip3Dict(record=record, dict_info=[])
