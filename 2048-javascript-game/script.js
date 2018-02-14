let right = left = topl = bottom = cnt = 0;
let getFirst = false;
let stopGame = false;
let getTextcontent = "";
let currentValue = tempValue = 0;
let selected = [];
let limit = 2048;
let id = centerKey = percent = 0;
let x = 0;
let totalTime = 60;

function showTime(){
	let getTime = setInterval(function(){
       x++;
       
       if(x>totalTime){
       	clearInterval(getTime);
       	stopGame = true;
       	document.getElementById("warning").innerHTML = "Ohh no! Your time is over ";
        document.getElementById("status").innerHTML = "FAILED";
        document.getElementById("playbutton").style.display = "block";
        percent = (currentValue*100)/2048;
        document.getElementById("percent").innerHTML = "Possibility of win "+percent.toFixed(2)+"%";
       }else{
       	document.getElementById("showTime").innerHTML = "Your time left "+(totalTime-x)+"seconds";
       }

	},1000);
}
showTime();

document.onkeyup = function(e){
	id = centerKey;
	if(e.which == 37){
      getCell(id-1);
      //document.getElementById("cnt").innerHTML
	}else if(e.which == 38){
		getCell(id-3);
		//document.getElementById("cnt").innerHTML
	}else if(e.which == 39){
		getCell(id+1);
		//document.getElementById("cnt").innerHTML
	}else if(e.which == 40){
		getCell(id+3);
		//document.getElementById("cnt").innerHTML
	}else if(e.which>=49 && e.which <=57){
		let keyValue = e.which - 48;
		getCell(keyValue); 
	}else if(e.which == 13){
		load_page();
	}
}



function load_page(){
   location.reload();
   document.getElementById("playbutton").style.display = "none";
}


function getCell(param)
{
	id = Number(param);
	let dom = document.getElementById(param);
	if(stopGame){
        return;
	}
	if(getFirst){

       for(j=0 ; j<selected.length ; j++){
       	  if(selected[j] == id){
            getTextcontent = dom.textContent ;
            tempValue = currentValue + id;
            if(tempValue > limit){

            	if(cnt == selected.length){
            		stopGame = true;
            	    document.getElementById("warning").innerHTML = "Ohh no! You crossed "+limit+"!";
            	    document.getElementById("status").innerHTML = "FAILED";
            	    document.getElementById("playbutton").style.display = "block";
            	    percent = (currentValue*100)/2048;
            	    document.getElementById("percent").innerHTML = "Possibility of win "+percent.toFixed(2)+"%";
            	    return;
            	}
            	cnt++;
            	//document.getElementById("cnt").innerHTML = cnt ;
            	continue;
            }else if(currentValue == limit){
                document.getElementById("success").innerHTML = "Congratulations! You made it";
                return;
            }else{
            	currentValue = tempValue ;
            	dom.innerHTML = currentValue ;
            	centerKey = id;
                for(i=1 ; i<=9 ; i++){
			      document.getElementById(i).style.background = "#ffa64d";
		        }
		        selected = [];
		        document.getElementById(id).style.background = "#ff661a";
                changeColor(id);
            }
            break;
       	  }
       }

	}else{
	  document.getElementById(id).style.background = "#ff661a";
      changeColor(id);
      getFirst = true ;
      getTextcontent = document.getElementById(param).textContent ;
      currentValue = currentValue + id;
      centerKey = id;
	}

	let score = document.getElementById("currentScore");
	score.innerHTML = "Your Current Score is "+currentValue;
}




function changeColor(id){
	  right = id+1;
	  let color = "#ff8c1a";
      if(right == 4 || right == 7 || right == 10){
      	right = id ;
      }else{
        document.getElementById(right).style.background = color;
        selected.push(right);
      }
      left = id -1;
      if(left == 0 || left == 3 || left == 6){
      	left = id ;
      }else{
        document.getElementById(left).style.background = color;
        selected.push(left);
      }
      topl = id -3; 
      if(topl <= 0){
      	topl = id ;
      }else{
        document.getElementById(topl).style.background = color;
        selected.push(topl);
      }
      bottom = id +3;
      if(bottom >= 10){
      	bottom = id ;
      }else{
        document.getElementById(bottom).style.background = color;
        selected.push(bottom);
      }
}