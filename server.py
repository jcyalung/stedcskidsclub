from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import kidsclub
import uvicorn 
import random

import datetime as dt

app = FastAPI()
origins = ['*']
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

students = kidsclub.get_students()
today = dt.date.today().strftime("%B")[0:3] + dt.date.today().strftime("%d") + "students"
students_today = []

@app.get("/current-students")
def current_students():
    students_today.sort(key=lambda student: student[0])
    return students_today

@app.get("/add-student")
def invalid_student():
    return({"message": "Please enter a valid student name"})

@app.get("/get-students")
def get_students():
    all_students = []
    counter = 1
    for student in students:
        all_students.append({"id": counter, "name": student[1] + " " + student[0]})
        counter += 1
    return all_students

@app.get("/add-student/{current}")
def student(current: str = ''):
    for kidsclub_student in students_today:
        if current == kidsclub_student[1] + " " + kidsclub_student[0]:
            return({"message": "Student is already checked in"})
        
    for current_student in students:
        curr = current_student[1] + " " + current_student[0]
        if curr == current:
            ct = dt.datetime.now()
            students_today.append([current_student[0], current_student[1], ct.strftime("%I:%M %p")])
            return({"message": "Student found", "name":curr, "time in":ct.strftime("%I:%M %p")})
            
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

# save a document of all students
@app.get("/save-document")
def save_document():
    kidsclub.save_document(today, students_today)
    return({"message": "Document saved"})

if __name__ == "__main__":
    uvicorn.run("server:app", port=8000, reload=True)