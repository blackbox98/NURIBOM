import total
from multiprocessing import Process, Pipe
a_pipe = Pipe()
total.main(a_pipe,True, False)