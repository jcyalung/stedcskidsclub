from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn 
import random
import kidsclub
import datetime as dt

app = FastAPI()
students = kidsclub.get_students()
origins = ['*']
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.get("/student")
def invalid_student():
    return({"message": "Please enter a valid student name"})

@app.get("/student/{current}")
def student(current: str = ''):
    for current_student in students:
        curr = current_student[1] + " " + current_student[0]
        print(current)
        if curr == current:
            ct = dt.datetime.now()
            return({"message": "Student found", "name":curr, "time in":ct.strftime("%H:%M")})
            
    return({"message": "Student not found"})

@app.get("/")
def root():
    return({ "message": "hello world" })

@app.get("/random-digit/{num}")
def random_digit(num: int):
    if num and num < 0:
        return ({"message": "you need to send valid times"})
    val = random.uniform(0, num)
    return({"Digit": int(val)})

if __name__ == "__main__":
    uvicorn.run("server:app", port=8000, reload=True)