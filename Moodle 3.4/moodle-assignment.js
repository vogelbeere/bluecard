
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function dismiss(el){
  el.parentNode.style.display='none';
  document.getElementById('bc_overlay').style.display='none';
  addJello();
};
function countItems(listClass){
    var ul = document.getElementsByClassName(listClass)[0];
    var i=0, itemCount =0;
    while(ul.getElementsByTagName('li') [i++]) itemCount++;
   return itemCount;
};


/* MOODLE ASSIGNMENT BLUE CARD */
    var checkBlueCard = '<p class="bcsteps bluecardadded bounce-top"><strong>Assignment submitted</strong><br/>You can check that your blue card has been added by clicking on the comments link below. If you forgot to add it when you submitted, you can <a id="forgotmabluecard" href="#" title="Adds a comment of \'Blue Card\' to request your tutor to use the dyslexia marking scheme" accesskey="b">add it now</a>.</p>';
    var MoodleAssignBlueCardButton =  '<p class="bcsteps" id="mabcinstructions">Step 1. Add your Blue card. <input type="button" id="mabluecard" value="Add Blue Card" class="bluecard bounce-top" title="Adds a comment of \'Blue Card\' to request your tutor to use the dyslexia marking scheme" accesskey="b"/> <a href="http://www.brookes.ac.uk/students/wellbeing/dyslexia-spld/support/blue-marking-cards/"  target="_blank" title="What is the Blue Card scheme?" accesskey="?">What\'s this?</a><br/>&nbsp;<br/>Step 2. Click the add submission button below to submit your assignment</p>';
if (!document.getElementsByClassName('submissionstatustable')[0]) {
   /* do nothing */
} else {
    var request = new XMLHttpRequest();
    request.open("GET", "/local/obu_indicators/get.php?name=dyslexia_indicator", false);
    request.send(null);
    if (request.responseText == "Y") {
           var statusCell = document.getElementsByClassName('c1')[0];
           if(statusCell.innerText.search('No attempt') > -1) {
                var assignTable = document.getElementsByClassName('submissionstatustable')[0];
                assignTable.insertAdjacentHTML('beforebegin', MoodleAssignBlueCardButton);
            }
/* submissionstatussubmitted */
           if (!document.getElementsByClassName('submissionstatussubmitted ')[0]) {
                /* do nothing */
           } else {
                  var assignTable = document.getElementsByClassName('submissionstatustable')[0];
                assignTable.insertAdjacentHTML('beforebegin', checkBlueCard);
            }
        }
}
/* EVENT LISTENER FOR MOODLE ASSIGNMENT BLUE CARD BUTTON */
if (!document.getElementById('mabluecard')) {
   /* do nothing */
} else {
    document.getElementById("mabluecard").addEventListener('click', function () {  
         addBlueCard();
    });
}
if (!document.getElementById('forgotmabluecard')) {
   /* do nothing */
} else {
    document.getElementById("forgotmabluecard").addEventListener('click', function () {  
         addBlueCard();
    });
}

/* flag the Blue Card submission in the Grading Table */
if (!document.getElementsByClassName('gradingtable')[0]) {
   /* do nothing */ 
} else {
    var showmapopup = getCookie("mapopup");
    if(showmapopup != 'no') {
        document.getElementById("matutormsg").style.display = 'block';
        document.getElementById('bc_overlay').style.display='block';
    }
    var table = document.getElementsByClassName('gradingtable')[0];
    table.insertAdjacentHTML('beforebegin', ' <div class="addjello" style="background-color: #ccccff; width: 40%; margin: 0 auto; padding: 3px; text-align: center;"><p><button id="downloadbluecardcsv" class="bluebutton" onclick="exportTableToCSV(\'submissions.csv\')">Download list of all submissions including blue card submissions</button><br/><strong>Note:</strong> Comments <em><strong>could</strong></em> mean a <strong>Blue Card</strong> submission.</p><p>Please check comments and if there is a Blue Card, please apply the <a href="http://www.brookes.ac.uk/staff/academic/dyslexia-spld-service/marking-work/" target="_blank">Dyslexia/SpLD marking guidelines</a> accordingly.</p>');
     var tbody = table.getElementsByTagName('tbody')[0];
     var comments = tbody.getElementsByClassName('c10');
     for (var i=0, len=comments.length; i<len; i++){
         var commentText = comments[i].innerText;
         if (commentText.search('Comments') > -1){
           
            if (commentText.search('0') > -1){
                       // do nothing
             } else {
                  var container = comments[i].getElementsByClassName('commentscontainer')[0];
                  container.insertAdjacentHTML('afterend', '<div class="bluemsg">Student has added comments, please review.</div>'); 
             }
        }
    }
}

function addJello() {
   if (!document.getElementsByClassName('gradingtable')[0]) {
   /* do nothing */ 
   } else {
       var divAddJello = document.getElementsByClassName('addjello')[0];
       divAddJello.className += ' jello';
       var table = document.getElementsByClassName('gradingtable')[0];
       var tbody = table.getElementsByTagName('tbody')[0];
       var comments = tbody.getElementsByClassName('c10');
       for (var i=0, len=comments.length; i<len; i++){
             if (comments[i].innerText.search('Comments') > -1){
                comments[i].className += ' jello';
            }
        }
    }
}

function addBlueCard() {
            var popup = document.getElementById("mapopup");
         popup.classList.toggle("show");
        var commentbox = document.getElementsByClassName('comment-area')[0];
        var textarea = commentbox.getElementsByTagName('textarea')[0];
        if (!textarea.value) {
            textarea.value = ('<a href="http://www.brookes.ac.uk/staff/academic/dyslexia-spld-service/marking-work/" target="_blank" style="background-color: #99ccff; font-weight:bold;">Blue Card</a>'); 
         } else if  (textarea.value == 'Add a comment...') {
               textarea.value = ('<a href="http://www.brookes.ac.uk/staff/academic/dyslexia-spld-service/marking-work/" target="_blank" style="background-color: #99ccff; font-weight:bold;">Blue Card</a>'); 
       } else {
            textarea.value = ('<a href="http://www.brookes.ac.uk/staff/academic/dyslexia-spld-service/marking-work/" target="_blank" style="background-color: #99ccff; font-weight:bold;">Blue Card</a>: ' + textarea.value);
         }
    /* save the comment */
    var commentLink = document.getElementsByClassName("comment-link")[0];
    var linkImg = commentLink.getElementsByTagName("img")[0];
    if(linkImg.src.search('collapsed') > -1) {
          commentLink.click();
     }
    var saveLink = document.getElementsByClassName("fd")[0].getElementsByTagName("a")[0];
     saveLink.click();
    /* alert the user that something has happened */
         var x = document.getElementById("mapopup");
         if (x.style.display === 'none') {
                   x.style.display = 'block';
         } else {
             x.style.display = 'none';
         }
}
function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;
    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});
    // Download link
    downloadLink = document.createElement("a");
    // File name
    downloadLink.download = filename;
    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);
    // Hide download link
    downloadLink.style.display = "none";
    // Add the link to DOM
    document.body.appendChild(downloadLink);
    // Click download link
    downloadLink.click();
}
function exportTableToCSV(filename) {
    var csv = [];
    var explanation = 'If the word *Comment* appears in the *Submission comments* or the *Feedback comments* column: the student MAY have added a blue card to their assignment \n \n';
    csv.push(explanation);
    var rows = document.querySelectorAll("table tr");
    
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        
        for (var j = 0; j < cols.length; j++) {
            if (cols[j].innerText.search('Comments') > -1){
                row.push('"'+ cols[j].innerText + ' (likely to be a Blue Card, please check)"');
            } else {
             row.push('"'+ cols[j].innerText + '"');
            }
        }
        csv.push(row.join(","));        
    }
    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}