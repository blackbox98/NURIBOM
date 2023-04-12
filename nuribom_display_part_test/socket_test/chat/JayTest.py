from flask import Flask, jsonify, render_template
from subprocess import call
from flask_socketio import SocketIO, send
from flask_cors import CORS, cross_origin
from multiprocessing import Process
import time

app = Flask(__name__)

app.secret_key = "ajrqnfla303"

# socket_io = SocketIO(app)
socket_io = SocketIO(app, cors_allowed_origins="*")
CORS(app)

@app.route('/')
def hello_world():
    return "누리봄 테스트 페이지"

@socket_io.on("connection")
@cross_origin()
def request():
    print("연결만됐어")
    return "any value"


@socket_io.on("message")
@cross_origin()
def request(command):
    print(command)
    to_client = dict()
    if command == 'picture' or command == 'video':
        to_client['message'] = command +'_nuri05050509'
        print(command +'_nuri05050509')
    else:
        to_client['message'] = command
        print(command)
    send(to_client, broadcast=True)
    
    return "any value"


def run():
    socket_io.run(app, debug=True, port=9999)

if __name__ == '__main__':
    # runsocket = Process(target=run)
    # runsocket.start()
    # time.sleep(5)
    # with app.app_context():
    #     sendorder("음악")
    # runsocket.join()
    run()

# @socket_io.on("message")
# @cross_origin()
# def request(page):
#     print("page : "+ page)
#     to_client = dict()
#     to_client['message'] = page
#     send(to_client, broadcast=True)
#     return "any value"