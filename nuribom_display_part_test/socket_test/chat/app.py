from flask import Flask, jsonify, render_template
from subprocess import call
from flask_socketio import SocketIO, send
from flask_cors import CORS, cross_origin


app = Flask(__name__)
app.secret_key = "mysecret"

# socket_io = SocketIO(app)
socket_io = SocketIO(app, cors_allowed_origins="*")
CORS(app)

@app.route('/')
def hello_world():
    return "Hello Gaemigo Project Home Page!!"

@app.route('/chat')
@cross_origin()
def chatting():
    return render_template('chat.html')


@socket_io.on("message")
@cross_origin()
def request(message):
    print("message : "+ message)
    to_client = dict()
    if message == 'new_connect':
        to_client['message'] = "새로운 유저가 난입하였다!!"
        to_client['type'] = 'connect'
    else:
        to_client['message'] = message
        to_client['type'] = 'normal'
    # emit("response", {'data': message['data'], 'username': session['username']}, broadcast=True)
    send(to_client, broadcast=True)
    return 'Any Value'

@socket_io.on("connect")
@cross_origin()
def connect_req():
    print("들어왔어")
    return 'Any Value'

if __name__ == '__main__':
    socket_io.run(app, debug=True, port=9999)