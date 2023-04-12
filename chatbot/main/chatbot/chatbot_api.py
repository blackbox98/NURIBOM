import hashlib
import hmac
import base64
import time
import requests
import json


class ChatbotMessageSender:

    # chatbot api gateway url
    ep_path = 'https://6oujinx9yd.apigw.ntruss.com/custom/v1/8315/26df54608e2354ec16233b885a4c68fe167a27103c6f1848e4ec68cfa02a6647'
    # chatbot custom secret key
    secret_key = 'SXRPZUVSR2ZobHBQTGNpTFJWREtlQkt1dllUQUN3QkQ='

    def req_message_send(self, order):

        timestamp = self.get_timestamp()
        request_body = {
            'version': 'v2',
            'userId': 'U47b00b58c90f8e47428af8b7bddcda3d1111111',
            'timestamp': timestamp,
            'bubbles': [
                {
                    'type': 'text',
                    'data': {
                        'description': order
                    }
                }
            ],
            'event': 'send'
        }

        ## Request body
        encode_request_body = json.dumps(request_body).encode('UTF-8')

        ## make signature
        signature = self.make_signature(self.secret_key, encode_request_body)

        ## headers
        custom_headers = {
            'Content-Type': 'application/json;UTF-8',
            'X-NCP-CHATBOT_SIGNATURE': signature
        }
        ## POST Request
        response = requests.post(headers=custom_headers, url=self.ep_path, data=encode_request_body)
        result = "request fail"
        if(response.status_code):
            jsonObject = json.loads(response.text)
            jsonArray = jsonObject.get("bubbles")
            result = jsonArray[0].get("data").get("description")

        return result

    

    @staticmethod
    def get_timestamp():
        timestamp = int(time.time() * 1000)
        return timestamp

    @staticmethod
    def make_signature(secret_key, request_body):

        secret_key_bytes = bytes(secret_key, 'UTF-8')

        signing_key = base64.b64encode(hmac.new(secret_key_bytes, request_body, digestmod=hashlib.sha256).digest())

        return signing_key


if __name__ == '__main__':
    res = ChatbotMessageSender().req_message_send("그래")
    print(res)