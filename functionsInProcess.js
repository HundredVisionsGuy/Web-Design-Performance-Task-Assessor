//Link to testing site - https://trinket.io/library/trinkets/fede3dd9c0
//The code probably won't run by itself


//checks the line to see if there is an attribute in the end tag
function checkClosingTagAttrb(line,lineNum){
  //first check to see if there is and end tag
  if (line.search("</") == -1){
    return "There is no Closing Tag in line "+lineNum+". ";
  }
  else{
    //send the line to function to bring back an array of items in end tags
    var ends = getEndTags(line);
    for (var i = 0; i < ends.length;i++){
      //if there is an =" then there is more likely an attribute in the end tag
      if (line.search("=\"") == -1){
        return "";
      }
      else{
        return "There is an Attribute in the Closing Tag in line "+lineNum+". ";
      }
    }
  }
}//end function checkClosingTagAttrb

//separate the content inside of end tags
function getEndTags(line){
  var inTags = [];
  //while there is still and end tag keep adding to the array
  while (line.search("</") != -1 && line.search(">") != -1 ) {
      //separate the first part then the second part to get the middle
      var parts = line.split("</");
      var secParts = parts[1].split(">");
      var line = secParts[1];
      var mid = secParts[0];
      inTags.push(mid);
    }
    return mid;
}

//gets the files for review
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    var rawText = "";
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                console.log(allText);
                rawText = allText;
            }
        }
    }
    rawFile.send(null);
    return rawText;
}






//Functions below this were used to get it to run in HTML
var text = readTextFile("test.html");
var errorLog = "";


function runProgram(t) {
  loopText(t);

}

//loop through all the lines of code (accepts the string of all the code)
function loopText(t){
  var lines = t.split('\n');
  for(var i = 0;i < lines.length;i++){
      document.getElementById("one").textContent += lines[i];
      //document.getElementById("one").innerHTML += "<br>";"
      errorLog += checkClosingTagAttrb(lines[i],i+1);
  }
  document.getElementById("error").textContent = errorLog;
}
