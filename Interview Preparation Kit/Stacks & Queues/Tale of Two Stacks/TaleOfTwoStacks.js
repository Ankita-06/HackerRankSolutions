function processData(input) {
    //Enter your code here
    var inputs = input.split('\n')
    var cmd;
    var inQueue = [],
        outQueue = []
    var len;

    function inQueueToOutQueue() {
        if (outQueue.length === 0) {
            len = inQueue.length;
            while (len-- > 0) {
                outQueue.push(inQueue.pop())
            }
        }
    }

    for (var i = 1, max = inputs[0]; i <= max; i++) {
        cmd = inputs[i].split(' ');
        switch (cmd[0]) {
            case '1':
                inQueue.push(cmd[1]);
                break;
            case '2':
                inQueueToOutQueue();
                outQueue.pop()
                break;
            case '3':
                inQueueToOutQueue();
                console.log(outQueue[outQueue.length - 1])
                break;
            default:
        }
    }
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
