FROM python:3.12

# RUN apt update && apt install -y make gcc g++ git

# RUN pip install --upgrade pip
# COPY requirements.txt .
# RUN pip install --no-cache-dir -r  requirements.txt
RUN pip install fastapi uvicorn python-dotenv pydantic-ai

WORKDIR /sip3_agent
COPY . .
WORKDIR /sip3_agent/app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "4111"]
#CMD ["hypercorn", "main:app", "--bind", "0.0.0.0:8080",\
#"--access-logfile", "-",\
#"--error-logfile", "-",\
#"--access-logformat", "\"%(h)s %(t)s %(r)s %(s)s %(f)s\"",\
#"--workers", "1"]
