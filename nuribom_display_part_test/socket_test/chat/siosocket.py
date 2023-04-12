import socketio
import time


print('연결됐어') 


def sendorder(command):
    sio_client = socketio.Client()
    sio_client.connect('http://127.0.0.1:9999')
    to_client = dict()
    to_client['message'] = command
    sio_client.emit('message',command)
    print(sio_client)
    print("여기왔다고")

if __name__ == '__main__':
    time.sleep(3)
    sendorder("music")
        