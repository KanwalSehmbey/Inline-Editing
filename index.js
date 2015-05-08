(function() {
    var req;
    var result = {};
       
  window.onload = function() {
       req = new XMLHttpRequest();
       req.open("GET", "students.php", true);
       req.onreadystatechange = processResponse;
       req.send(null);
  
    };  
    function processResponse() { 
        if (req.readyState === 4 && req.status === 200) {
            var tbody = document.getElementById("content");  //TABLE IS CREATED TO DISPLAY RECORDS FROM DB
            var res = req.responseText;
            result = JSON.parse(res);
                for (var i = 0; i < result.length; i++) {
                    var tr = document.createElement("tr");
                    var td = document.createElement("td");
                    var txtNode = document.createTextNode(result[i][0]);       
                    td.appendChild(txtNode);
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.setAttribute("id","name"+i);
                    txtNode = document.createTextNode(result[i][1]);
                    td.appendChild(txtNode);
                    tr.appendChild(td);
                    td = document.createElement("td"); 
                    td.setAttribute("id","age"+i);
                    txtNode = document.createTextNode(result[i][2]);
                    td.appendChild(txtNode);
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.setAttribute("id","major"+i);
                    txtNode = document.createTextNode(result[i][3]);
                    td.appendChild(txtNode);
                    tr.appendChild(td);
                    td = document.createElement("td");
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.setAttribute("class","errmsg");
                    tr.appendChild(td);
                    tbody.appendChild(tr);   
                    
                    tr.onmouseover = function(){        //THIS EVENT WILL HIGHLIGHT THE ROW
                       this.setAttribute("class","highlight");                    
                       var img = this.childNodes[4];
                       img.setAttribute("class","actions");
                    };
                    
                    tr.onmouseout = function(){     
                        this.className = "";
                        var img = this.childNodes[4];
                        if (img.className !== "edit"){
                            img.className = "";
                        }
                        if (img.className === "edit"){
                            this.className = "editR";
                        }
                    };
    
                    tr.childNodes[4].onclick = function(){
                        if (this.className === "actions"){
                        this.setAttribute("class","edit");
                        var pn = this.parentNode; 
                        pn.className = "editR";
                        pn.onmouseover = null;
                        var sName = pn.childNodes[1].innerHTML;
                        var sAge = pn.childNodes[2].innerHTML;
                        var sMajor = pn.childNodes[3].innerHTML;
                        var inputVal = '<input type="text" id = "NAME" name="name" value="'+ sName +'">';
                        pn.childNodes[1].innerHTML = inputVal;
                        var inputAge = '<input type="text" id = "AGE" name="age" value="'+ sAge +'">';
                        pn.childNodes[2].innerHTML = inputAge;
                        var inputMj = '<select id = "major"><option value ="1">Computer Science</option>\n\
                            <option value ="2">Electrical Engineering</option>\n\
                            <option value ="3">MBA</option>\n\
                            <option value ="4">Physics</option></select>';
                        pn.childNodes[3].innerHTML = inputMj;
                        selectValue(sMajor);
                        }
                        else if (this.className === "edit"){
                            var flag = false;
                            var pnd = this.parentNode; 
                            var age = document.getElementById("AGE").value; 
                            if (age < 15 || age > 50){
                                flag = true;
                                pnd.childNodes[5].className = "errmsg";
                                pnd.childNodes[5].innerHTML = "Age is Invalid";
                            }
                            if (!flag){
                            var name = document.getElementById("NAME").value;        
                            var major = document.getElementById("major");
                            major = major.options[major.selectedIndex].text; 
                            var content = "sid=" + encodeURIComponent(pnd.childNodes[0].innerHTML) 
                            + "&name=" + encodeURIComponent(name) 
                            + "&age=" + encodeURIComponent(age)
                            + "&major=" + encodeURIComponent(major);
                            req.open("POST", "update.php", true);
                            req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                            req.onreadystatechange = function() {
                            if (req.readyState === 4 && req.status === 200) {
                                    //alert("successful");
                            }
                            };
                            req.send(content);
                            this.className = "";
                            pnd.className = "";
                            pnd.childNodes[1].innerHTML = name;
                            pnd.childNodes[2].innerHTML = age;
                            pnd.childNodes[3].innerHTML = major;
                            pnd.childNodes[5].innerHTML = "";
                            pnd.onmouseover = function(){        
                                this.setAttribute("class","highlight");                    
                                var img = this.childNodes[4];
                                img.setAttribute("class","actions");
                                };
                            }    
                        }    
                    };
                }
            }
        }  
        
        function selectValue(majorValue){
            var select = document.getElementById("major");
            for(var i = 0;i < select.options.length;i++){
            if(select.options[i].text === majorValue ){
                select.options[i].selected = true;
                }
            }
        }        
} ());
    