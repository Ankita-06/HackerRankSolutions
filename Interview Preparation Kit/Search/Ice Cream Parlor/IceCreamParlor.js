'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the whatFlavors function below.
function whatFlavors(cost, money) {
  // Solution starts here
  var dict1={};

  var len=cost.length;

  for(var i=0; i<len; i++) {

    if (cost[i]<money) {
      if(dict1[cost[i]] !== undefined)
      {
       if(Array.isArray(dict1[cost[i]]))
       {
         dict1[cost[i]].push(i);
       }
       else
       {
         dict1[cost[i]] = [dict1[cost[i]]];
         dict1[cost[i]].push(i);
       }
     }
     else
       dict1[cost[i]] = i;
    }
  }

  cost.sort(function(a,b) {return a-b});

  for(var j=0; j<len; j++){
    var left=0;
    var right=len-1;
    if(cost[j]<money){
      var ser=money-cost[j];
      while(left<=right){
        var mid=Math.floor((left+right)/2);

        if(ser===cost[mid]){
          var val1=cost[j];
          var val2=cost[mid];
          break;
        }
        if(ser<cost[mid]){
          right = mid-1;
        }
        else{
          left = mid+1;
        }
      }
      if(val1 !== undefined && val2 !== undefined ){
        break;
      }
    }
  }


  var index1;
  var index2;
  if (val1===val2) {
     index1 = dict1[val1][0];
     index2 = dict1[val2][1];
  }
  else{
     index1 = dict1[val1];
     index2 = dict1[val2];
  }

  if (index2 > index1) {  
    console.log(index1+1, index2+1);
  }
  else{
    console.log(index2+1, index1+1);
  }
  // Solution ends here
}

function main() {
    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const money = parseInt(readLine(), 10);

        const n = parseInt(readLine(), 10);

        const cost = readLine().split(' ').map(costTemp => parseInt(costTemp, 10));

        whatFlavors(cost, money);
    }
}
