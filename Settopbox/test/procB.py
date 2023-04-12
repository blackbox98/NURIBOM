
import repeatRecv

def receiveTest(pipe):
    for i in range(1,1000):
        repeatRecv.rerecv(pipe.recv())
def receive(pipe):
    print(pipe)