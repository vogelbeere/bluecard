/* included as a separate file in case you only want to do Moodle assignements blue card and not Turnitin */

function dismiss(el){
  el.parentNode.style.display='none';
  document.getElementById('bc_overlay').style.display='none';
  addJello();
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
        var assignTable = document.getElementsByClassName('submissionstatustable')[0];
        assignTable.insertAdjacentHTML('beforebegin', MoodleAssignBlueCardButton);
        }
}
/* if it is the tutor's view and there is a blue card comment */
  if (!document.getElementsByClassName('submissionstatussubmitted')[0]) {
   /* do nothing */
} else {
          if (!document.getElementById('mabcinstructions')) {
             /* do nothing */
          } else {
               var bluecardinst =  document.getElementById("mabcinstructions");
               bluecardinst.style.display = 'none';
               bluecardinst.insertAdjacentHTML('beforebegin', checkBlueCard);
          }
     var commentLink = document.getElementsByClassName("comment-link")[0];
      var linkImg = commentLink.getElementsByTagName("img")[0];
    if(linkImg.src.search('collapsed') > -1) {
          commentLink.click();
     }
        document.getElementsByClassName('comment-link')[0].insertAdjacentHTML('afterend', '<p class="bluemsg"><strong>Message for tutors</strong>: Student has added comments, please review. If there is a <strong>Blue Card</strong>, please apply the <a href="http://www.brookes.ac.uk/staff/academic/dyslexia-spld-service/marking-work/" target="_blank">Dyslexia/SpLD marking guidelines</a> when marking their work.</p>');   
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
if (!document.getElementsByClassName('resettable')[0]) {
   /* do nothing */
} else {
   var parentdiv = document.getElementsByClassName('resettable')[0];
   var resetLink = parentdiv.getElementsByTagName('a')[0];
   resetLink.click();
}
/* flag the Blue Card submission in the Grading Table */
if (!document.getElementsByClassName('gradingtable')[0]) {
   /* do nothing */ 
} else {
   document.getElementById("block-region-side-post").style.display = 'none'; /* delete in Moodle 3.2 */
   document.getElementById("region-bs-main-and-pre").style.width = '100%'; /* delete in Moodle 3.2 */
   document.getElementById("region-main").style.width = '84%'; /* delete in Moodle 3.2 */
   document.getElementById("block-region-side-pre").style.width = '15%'; /* delete in Moodle 3.2 */
    document.getElementById("matutormsg").style.display = 'block';
     document.getElementById('bc_overlay').style.display='block';
    var table = document.getElementsByClassName('gradingtable')[0];
    table.insertAdjacentHTML('beforebegin', ' <div class="addjello" style="background-color: #ccccff; width: 40%; margin: 0 auto; padding: 3px; text-align: center;"><p><button id="downloadbluecardcsv" class="bluebutton" onclick="exportTableToCSV(\'submissions.csv\')">Download list of all submissions including blue card submissions</button><br/><strong>Note:</strong> Comments could mean a Blue Card submission.</p><p>Please check comments and if there is a Blue Card, please apply the <a href="http://www.brookes.ac.uk/staff/academic/dyslexia-spld-service/marking-work/" target="_blank">Dyslexia/SpLD marking guidelines</a> accordingly.</p>');
     var tbody = table.getElementsByTagName('tbody')[0];
     var comments = tbody.getElementsByClassName('c10');
         for (var i=0, len=comments.length; i<len; i++){
             if (comments[i].innerText.search('Comments') > -1){
            // thisRow = comments[i].closest('tr');
            thisRow = comments[i].parentNode; 
            thisRow.style.backgroundColor = '#ffffcc';
            nameLink = thisRow.getElementsByTagName("a")[1]; 
            nameLink.insertAdjacentHTML('afterend', ' <div style="background-color: #99bbff; cursor: pointer">Student has added comments, please review</div>');
            var bluemsg = document.getElementsByClassName('bluemsg')[0];
            bluemsg.style.display = 'none';
             }
        }
    }

function addJello() {
   if (!document.getElementsByClassName('gradingtable')[0]) {
   /* do nothing */ 
   } else {
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