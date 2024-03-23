"""
This file handles the backend of the prorgram.
It is responsible for handling the API requests and
sending the appropriate responses.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from kidsclub import csv
import kidsclub
import uvicorn 
import random
import datetime as dt

# backend 
app = FastAPI()
origins = ['*']
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)
# all students
students = kidsclub.get_students()
# today's date
current_date = dt.date.today()

# sign-in sheet filename
today = dt.date.today().strftime("%B")[0:3] + dt.date.today().strftime("%d") + "students"
# all students today
students_today = []
LOGS_PATH = "C:/Users/jcyal/Documents/stedcskidsclub/Logs/"

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
    # first check if the student has already checked in
    for kidsclub_student in students_today:
        if current == kidsclub_student[1] + " " + kidsclub_student[0]:
            return({"message": "Student has already signed in", "name": current, "time in": kidsclub_student[2], "time out": ""})
    
    # if not, check if student exists in database then add them to the list
    for current_student in students:
        curr = current_student[1] + " " + current_student[0]
        if curr == current:
            ct = dt.datetime.now()
            students_today.append([current_student[0], current_student[1], ct.strftime("%I:%M %p"), ""])
            return({"message": "Student signed in", "name":curr, "time in":ct.strftime("%I:%M %p"), "time out": ""})
    
    return({"message": "Student not found"})

# signs out a student 
@app.get("/sign-out/{student}")
def sign_out(student : str):
    # search through all students
    for kidsclub_student in students_today:
        if student == kidsclub_student[1] + " " + kidsclub_student[0]:
            # if there is already a sign out time, do not overwrite the sign-out time
            if(kidsclub_student[3] != ""):
                return({"message": "Student has already signed out", "name": student, "time in": kidsclub_student[2], "time out": kidsclub_student[3]})
            else:
                # otherwise, set sign out time
                kidsclub_student[3] = dt.datetime.now().strftime("%I:%M %p")
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

# generates a spreadsheet for students who've signed in and signed out for the day
@app.get("/save-data")
def data_document():
    file_name = dt.date.today().strftime("%B")[0:3] + dt.date.today().strftime("%d") + "log"
    with open(LOGS_PATH + current_date.strftime("%B") + "/" + file_name + ".csv", "w") as file:
        out = csv.writer(file)
        out.writerow(["Last Name", "First Name", "Time In", "Time Out"])
        for student in students_today:
            out.writerow(student)
    file.close()
    
    return({"message": "Data saved"})

# removes the last signed-in student, used for undo
@app.get("/remove-student")
def remove_student():
    # if there are no students to remove, don't remove anything from the list
    if len(students_today) == 0:
        return({"message": "No students to remove"})
    # otherwise, pop off the last student and return the student who was removed
    removed_student = students_today.pop()
    return({"message": "Removed student", "name": removed_student[1] + " " + removed_student[0], "time in": removed_student[2], "time out": removed_student[3]})

@app.get("/remove-student/{student}")
def remove_student(student: str):
    # if there are no students to remove, don't remove anything from the list
    if len(students_today) == 0:
        return({"message": "No students to remove"})
    for kidsclub_student in students_today:
        if student == kidsclub_student[1] + " " + kidsclub_student[0]:
            students_today.remove(kidsclub_student)
            return({"message": "Removed student", "name": student, "time in": kidsclub_student[2], "time out": kidsclub_student[3]})
    return({"message": "Student not found"})

if __name__ == "__main__":
    uvicorn.run("server:app", port=8000, reload=True)