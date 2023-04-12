from multiprocessing import Process, Pipe
import procA
import procB


if __name__ == '__main__':
    a_pipe, b_pipe = Pipe()
    p0=Process(target=procA.sendTest, args=(a_pipe,))
    p0.start()
    p1 = Process(target = procB.receiveTest, args=(b_pipe, ))
    p1.start()

    p0.join()
    p1.join()

