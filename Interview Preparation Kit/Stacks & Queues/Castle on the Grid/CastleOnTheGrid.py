import numbers
import math
from collections import namedtuple,deque
class point(namedtuple("point", "i j")):
    def __eq__(self,o):
        return self.i == o.i and self.j == o.j
    def __ne__(self, o):
        return self.i != o.i or self.j != o.j
    def __lt__(self, o):
        return self.i < o.i or self.j < o.j
    def __gt__(self, o):
        return self.i > o.i or self.j > o.j
    def __le__(self, o):
        return self.i <= o.i or self.j <= o.j
    def __ge__(self, o):
        return self.i >= o.i or self.j >= o.j
    def __rshift__(self,o):
        return self.i >= o.i and self.j >= o.j
    def __lshift__(self,o):
        return self.i <= o.i and self.j <= o.j
    def __hash__(self):
        return hash((self.i, self.j))
    def __repr__(self):
        return 'p(%r, %r)' % self
    def __add__(self,o):
        if isinstance(o, point):
            return point.__new__(point,self.i+o.i,self.j+o.j)
        if isinstance(o, numbers.Number):
            return point.__new__(point,self.i+o,self.j+o)
        return NotImplemented
    def __iadd__(self,o):
        return self.__add__(o)
    def __sub__(self,o):
        if isinstance(o, point):
            return point.__new__(point,self.i-o.i,self.j-o.j)
        if isinstance(o, numbers.Number):
            return point.__new__(point,self.i-o,self.j-o)
        return NotImplemented
    def inbound(self,a,b=None):
        if b is None:
            a,b = point(0,0),a
        im,ix = sorted([a.i,b.i])
        jm,jx = sorted([a.j,b.j])
        return im <= self.i and self.i < ix and jm <= self.j and self.j < jx
    def distance(self,o):
        return abs(self.i-o.i)+abs(self.j-o.j)
        #return math.sqrt((self.i-o.i)**2+(self.j-o.j)**2)
    def __isub__(self,o):
        return self.__sub__(o)
    def __neg__(self):
        return point.__new__(point,-self.i,-self.j)
    def I():
        return point.__new__(point,1,0)
    def J():
        return point.__new__(point,0,1)

class grid(list):
    def __getitem__(self, *args, **kwargs):
        if isinstance(args[0], point):
            return self[args[0].i][args[0].j]
        else:
            return list.__getitem__(self, *args, **kwargs)
    def __setitem__(self, *args, **kwargs):
        if isinstance(args[0], point):
            self[args[0].i][args[0].j] = args[1]
        else:
            return list.__setitem__(self, *args, **kwargs)
    def __repr__(self):
        return "\n".join(["".join(map(lambda x:str(x)[-1],a)) for a in self])

around = (-point.I(),-point.J(),point.J(),point.I())
n = int(input())
b = grid([list(input()) for _ in range(n)])
_ = list(map(int,input().split()))
p = point(_[0],_[1])
f = point(_[2],_[3])
b[p] = "#"
b[f] = "E"
q = deque([(p,0)])



vg = grid([[False for _ in range(len(b[0]))] for _ in range(len(b))])
while len(q):
    
    c,d = q.popleft()

    vg[c] = True
    #print(c,b[c.i][c.j])
    if c == f:
        break
    if b[c] == ".":
        b[c] = "="

    for di in around:
        pt = c
        while True:
            pt += di
            if pt.inbound(point(0,0) ,point(len(b),len(b[0]))) and (b[pt] == "." or b[pt] == "E") :
                q.append((pt,d+1))
                vg[pt] = True
                if b[pt] == ".":
                    b[pt] = d+1
            else:
                break
    
    #print(c,ar)
    #print(q)

#print(b)    
print(d)
