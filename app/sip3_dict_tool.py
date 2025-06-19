import os
from typing import Any
import urllib.parse

import requests
from pydantic import BaseModel, Field
from pydantic_ai import Agent, RunContext


def call_sip3_dict(text: str):
    url = os.getenv("SIP3DICT_API_URL")
    if not url:
        raise ValueError("SIP3DICT_API_URL is not set in environment variables.")

    encoded_text = urllib.parse.quote(text)
    url = f"{url}?text={encoded_text}"

    headers = {
        "Content-Type": "application/json"
    }

    try:
        response = requests.get(url, headers=headers)
        if response.ok:
            return response.json()
        else:
            print("Error:", response.status_code, response.reason)
            return []
    except requests.RequestException as e:
        print("Request error:", e)
        return []
