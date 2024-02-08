from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from kidsclub import csv
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

# test to see if the server is running
@app.get("/")
def root():
    return({ "message": "hello world" })

# get all students who have checked in today
@app.get("/current-students")
def current_students():
    students_today.sort(key=lambda student: student[0])
    return students_today

# get all students from database, json format
@app.get("/get-students")
def get_students():
    all_students = []
    counter = 1
    for student in students:
        all_students.append({"id": counter, "name": student[1] + " " + student[0]})
        counter += 1
    return all_students

# placeholder endpoint for adding student
@app.get("/add-student")
def invalid_student():
    return({"message": "Please enter a valid student name"})


# add student to the list of students who have checked in today
@app.get("/add-student/{current}")
def student(current : str = ''):
    for kidsclub_student in students_today:
        if current == kidsclub_student[1] + " " + kidsclub_student[0]:
            return({"message": "Student is already checked in", "name": current, "time in": kidsclub_student[2], "time out": ""})
        
    for current_student in students:
        curr = current_student[1] + " " + current_student[0]
        if curr == current:
            ct = dt.datetime.now()
            students_today.append([current_student[0], current_student[1], ct.strftime("%I:%M %p")])
            return({"message": "Student found", "name":curr, "time in":ct.strftime("%I:%M %p"), "time out": ""})
            
    return({"message": "Student not found"})

@app.get("/sign-out/{student}")
def sign_out(student : str):
    for kidsclub_student in students_today:
        if student == kidsclub_student[1] + " " + kidsclub_student[0]:
            kidsclub_student.append(dt.datetime.now().strftime("%I:%M %p"))
            return({"message": "Student signed out", "name": student, "time in": kidsclub_student[2], "time out": kidsclub_student[3]})
    return({"message": "Student has not signed in yet", "name": student, "time in": "", "time out": ""})

# random digit generator, testing purposes
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

@app.get('/test')
def test():
    for i in range(40):
        student(students[i][1] + " " + students[i][0])
        sign_out(students[i][1] + " " + students[i][0])
    return(students_today)

@app.get("/save-data")
def data_document():
    file_name = dt.date.today().strftime("%B")[0:3] + dt.date.today().strftime("%d") + "log"
    with open(file_name + ".csv", "w") as file:
        out = csv.writer(file)
        out.writerow(["Last Name", "First Name", "Time In", "Time Out"])
        for student in students_today:
            out.writerow(student)
    file.close()
    
    return({"message": "Data saved"})

if __name__ == "__main__":
    uvicorn.run("server:app", port=8000, reload=True)