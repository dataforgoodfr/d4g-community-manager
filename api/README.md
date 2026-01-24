## Setup
Depending on your setup you can use pip3/python3 or pip/python etc.

1. pip3 install "uvicorn[standard]"
2. cd api
3. python3 -m uvicorn api.main:api --reload

## Testing

You can test using the paths specified under routes, for example

```curl -X GET http://localhost:8000/```
