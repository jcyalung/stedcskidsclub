# Kids Club Sign-in Sheet Generator
This program aims to generate a sign out sheet for students who check in to Kids Club for the day.<br> 
The program will use `python-docx` to generate word documents and Procare's [API](https://api-docs.procareconnect.com/#intro) <br>
to fetch a list of students who checked in to extended care.
# Initial set-up
For this program, we will be utilizing a third-party Python library called [python-docx](https://python-docx.readthedocs.io/en/latest/). <br>
This library allows us to generate Microsoft Word documents from python scripts, which is the goal for this program.
We will also use React.JS to create a frontend for the program.

- To install uvicorn, run the command `pip install uvicorn`.
- To install FastAPI, run the command `pip install fastapi`.
- To install python-docx, run the command `pip install python-docx`.


If you do not have pip, install or upgrade [python](https://www.python.org/downloads/) to the latest version.

