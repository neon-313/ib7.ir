import requests

def send_sms(code,phone):

    url = "https://api.sms.ir/v1/send/verify"
    headers = {
        "content-type":"application/json",
        "X-API-KEY":"hyXhWv2XL8wBXdJh2g1Ym3bDIKWgiQW4WJGcxEgg3HpiSGdQrL3rY1F7Mjb50yBW"
    }
    data = {
        "mobile": phone,
        "templateId": 585613,
        "parameters": [
        {
            "name": "code",
            "value": code
        },

        ]
    }

    response = requests.post(url=url,json=data,headers=headers)
    print(response.json())