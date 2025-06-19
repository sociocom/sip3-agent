import requests

prompt = """## 質問
以下のカルテからHbA1cの値を抽出してください。

```
＃１．左結石性腎盂腎炎（５ｍｍ）
２０１０／８／２　１０ｍｍ結石に対してＴＵＬ（術後敗血症性ショック）

＃２．ＤＭ（ＨｂＡ１ｃ：９．１％）

【既往歴】
なし

【アレルギー】
そば、ナッツ類
```
"""


def test():
    url = "http://127.0.0.1:4111/chat"
    payload = {
        "prompt": prompt,
    }
    response = requests.post(url, json=payload)

    if response.ok:
        print(response.json())
    else:
        print(response.text)


if __name__ == "__main__":
    test()
