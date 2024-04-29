FROM python:latest

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY ./cloud_dev/docs/workaround/utils.py /usr/local/lib/python3.12/site-packages/django/contrib/admindocs/
