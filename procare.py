import requests
import json
import http.client

if __name__ == "__main__": 
    url = "https://example.procareconnect.com/api/v1/authorize"
    user = 'temp'
    password = 'name'
    payload = json.dumps({
    "grant_type": "client_credentials",
    "client_id": "{{user}}",
    "client_secret": "{{password}}"
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text)

    

"""
This file is for handling data input from Procare's API.
"""

def find_student(id: str) -> list:
    """
    This function will take in a student's id and return a list of the student's information.
    """
