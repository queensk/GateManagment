FROM python:3.10-slim-buster

WORKDIR /app

COPY . /app

RUN pip install --upgrade pip &&\
	pip install --trusted-host pypi.python.org -r requirements.txt

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0"]