import csv
import json

def get_students():
    students = []
    with open('students.csv', mode = 'r') as csv_file:
        students_file = csv.reader(csv_file)
        for student in students_file:
            students.append([student[0], student[1], student[2]])
    return students

"""
with open('students.csv', mode = 'r') as csv_file:
    students_file = csv.reader(csv_file)
    students = []
    for student in students_file:
        students.append(student[1] + " " + student[0] + f" ({student[2]})")
    json.dump({'result': students}, fp=open('students.json', 'w'))
"""