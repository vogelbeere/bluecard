
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
    var TurnitinBlueCardButton =  '<input type="button" class="bluecard bounce-top" id="tiibluecard" value="Add Blue Card" title="Adds the text \'Blue Card\' at the start of your assignment title" accesskey="b"/> <a href="http://www.brookes.ac.uk/students/wellbeing/dyslexia-spld/support/blue-marking-cards/" target="_blank" title="What is the Blue Card scheme?" accesskey="?">What\'s this?</a><br/>';
    var reminder = '<div class="fitem"><div class="fitemtitle"></div><div class="felement bcsteps">Have you added your Blue Card?</div></div>';

/* TURNITIN 1 BLUE CARD */
if (!document.getElementById('turnitintool_style')) {
   /* do nothing */
} else {
    var request = new XMLHttpRequest();
    request.open("GET", "/local/obu_indicators/get.php?name=dyslexia_indicator", false);
    request.send(null);
    if (request.responseText == "Y") {
          if (!document.getElementById('introduction')) {
               document.getElementById('turnitintool_style').insertAdjacentHTML('beforebegin', TurnitinBlueCardButton);
                if (!document.getElementById('fitem_id_agreement')) {
                } else {
                    document.getElementsByClassName('col-md-9')[0].insertAdjacentHTML('afterend', reminder);
                    var d = document.getElementsByClassName("dndupload-arrow")[0];
                    d.className += " accessible";
               }
          }
    }
}

/* TURNITIN 2 BLUE CARD */
if (!document.getElementsByClassName('mod_turnitintooltwo')[0]) {
   /* do nothing */
} else {
    var request = new XMLHttpRequest();
    request.open("GET", "/local/obu_indicators/get.php?name=dyslexia_indicator", false);
    request.send(null);
    if (request.responseText == "Y") {
               document.getElementsByClassName('upload_box')[0].style.display = 'none';
               var submission_form = document.getElementsByClassName('js_hide')[1];
                submission_form.style.display = 'block';
                submission_form.classList.add('highlighted');
                submission_form.classList.remove("js_hide");
               document.getElementsByClassName('fcontainer')[0].insertAdjacentHTML('beforebegin', TurnitinBlueCardButton);
                if (!document.getElementById('fitem_id_agreement')) {
                } else {
                    document.getElementsByClassName('col-md-9')[0].insertAdjacentHTML('afterend', reminder);
                    var d = document.getElementsByClassName("dndupload-arrow")[0];
                    d.className += " accessible";
               }
          }
}
/* EVENT LISTENER FOR TURNITIN BLUE CARD BUTTON */
if (!document.getElementById('tiibluecard')) {
   /* do nothing */
} else {
    document.getElementById("tiibluecard").addEventListener('click', function () {  
        var title = document.getElementById('id_submissiontitle');
        title.removeAttribute('onchange');
        if (!title.value) {
            title.value = ('Blue Card: '); 
         } else {
            title.value = ('Blue Card: ' + title.value);
         }
         var x = document.getElementById("tiipopup");
         if (x.style.display === 'none') {
                 x.style.display = 'block';
         } else {
             x.style.display = 'none';
         }
    });
}

/* hide export functionality in intro tab */
if ((!document.getElementById('introduction')) || (countItems('nav-tabs') <= 2)) {
   /* do nothing */
} else {
     document.getElementsByClassName("c5")[0].style.display='none';
     document.getElementsByClassName("c5")[1].style.display='none';
};

/* display bouncy message to alert tutors re blue card */
var TurnitinBlueCardInbox = '<div class="bcsteps"><h3>Important message for markers</h3>Submissions highlighted in blue are from students with a <strong>Blue Card</strong>. <br/>Please follow the <a href="http://www.brookes.ac.uk/staff/academic/dyslexia-spld-service/marking-work/" target="_blank">Dyslexia/SpLD marking guidelines</a> when marking their work.</div>';

var showtiipopup = getCookie("tiipopup");

if ((!document.getElementById('inboxTable')) || (countItems('nav-tabs') <= 2 || showtiipopup == 'no')) {
    /* do nothing */
  } else {
         document.getElementById("tiitutormsg").style.display = 'block';
         document.getElementById('bc_overlay').style.display='block';
         document.getElementById("turnitintool_style").insertAdjacentHTML('beforebegin', TurnitinBlueCardInbox);
  };

/* highlight blue card in TURNITIN 1 submission inbox table */
if (!document.getElementById('inboxTable')) {
   /* do nothing */
} else {
     var table = document.getElementById('inboxTable');
     var tbody = table.getElementsByTagName('tbody')[0];
     var cells = tbody.getElementsByTagName('td');
     for (var i=0, len=cells.length; i<len; i++){
         if (cells[i].innerText.search('Blue Card') > -1){
             var tr =  cells[i].parentNode;
             tr.style.backgroundColor = '#b7dbff';
             cells[i].getElementsByTagName('a')[0].insertAdjacentHTML('afterend', ' &nbsp; &nbsp; &nbsp; &nbsp; <a href="http://www.brookes.ac.uk/staff/academic/dyslexia-spld-service/marking-work/" class="bc-info" target="_blank" title="What is the Blue Card scheme?">Blue Card</a>');
        }
   }
}

/* highlight blue card in TURNITIN 2 submission inbox table */
var highlightButton =  '<input type="button" class="bluecard bounce-top" id="highlight" value="Highlight Blue Card submissions" title="Highlight submissions with a Blue Card" accesskey="b" onclick="highlightBlueCard()" /> <a href="http://www.brookes.ac.uk/staff/academic/dyslexia-spld-service/marking-work/" target="_blank" title="What is the Blue Card scheme?" accesskey="?">What\'s this?</a><br/>';
if (!document.getElementsByClassName('partDetails')[0]) {
   /* do nothing */
} else {
   document.getElementsByClassName('partDetails')[0].insertAdjacentHTML('afterend', highlightButton);
}

function highlightBlueCard() {
     var table = document.getElementsByClassName('submissionsDataTable')[0];
     var tbody = table.getElementsByTagName('tbody')[0];
     var cells = tbody.getElementsByTagName('td');
     for (var i=0, len=cells.length; i<len; i++){
         if (cells[i].innerText.search('Blue Card') > -1){
             var tr =  cells[i].parentNode;
             tr.classList.remove('odd');
             tr.classList.remove('even');
             tr.style.backgroundColor = '#b7dbff';
             cells[i].getElementsByClassName('submission_title')[0].insertAdjacentHTML('afterend', ' &nbsp; &nbsp; &nbsp; &nbsp; <a href="http://www.brookes.ac.uk/staff/academic/dyslexia-spld-service/marking-work/" class="bc-info" target="_blank" title="What is the Blue Card scheme?">Blue Card</a>');
        }
   }
}
