process.stdin.resume();
process.stdin.setEncoding("ascii");
var __input_stdin = "";
var __input_stdin_array = "";
var __input_currentline = 0;
var arr = [];
var stack = [];
var maxDays = 0;

process.stdin.on("data", function (input) {

	/* if(input == '/\r\n'){
		processData();
		process.exit();
	} */
	
    __input_stdin += input;
});

process.stdin.on("end", function () {
   processData(__input_stdin);
});


function processData() {
    //Enter your code here
	__input_stdin_array = __input_stdin.split("\n");
	//__input_currentline++;
	
	arr = __input_stdin_array[1].split(' ').map(Number);
	
	for (var i in arr) {
		var days = 0;
		while (stack && stack[stack.length - 1] &&  (arr[i] <= stack[stack.length - 1].value)) {
			days = Math.max(days, (stack.pop()).days);
		}
		
		if (stack.length == 0) days = 0;
		else days++;
		
		maxDays = Math.max(maxDays, days);
		
		stack.push({value: (arr[i] * 1) , days : days});
	}
	process.stdout.write(""+maxDays+"\n");
} 
