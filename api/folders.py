"""
This file should only be run ONCE, on a computer that will be set up.
This file is responsible for setting up the necessary
directories and files for the program to run.
"""
import os

# this variable should be the path name to the api folder.
# ex. ~/stedcskidsclub/api 
CURRENT_DIR = "Users/jcyalung/stedcskidsclub/"
school_months = ["September", "October", "November", "December", "January", "February", "March", "April", "May", "June"]

# this will create the Logs folder with all the appropriate months.
def create_logs_folder():
    os.mkdir(CURRENT_DIR + "Logs")
    for month in school_months:
        os.mkdir(CURRENT_DIR + "Logs/" + month)
    
# this will create the signInSheets folder with the appropriate months.
def create_sign_in_sheets_folder():
    os.mkdir(CURRENT_DIR + "signInSheets")
    for month in school_months:
        os.mkdir(CURRENT_DIR + "signInSheets/" + month)

if __name__ == "__main__":
    create_logs_folder()
    create_sign_in_sheets_folder()
    print("Folders created successfully")