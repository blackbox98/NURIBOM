import socketio

sio_client = socketio.Client()
sio_client.connect('http://127.0.0.1:9999')
print('연결됐어') 


while True:
    a = input("di")
    sio_client.emit("message", a)
