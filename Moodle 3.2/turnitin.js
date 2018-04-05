
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
                    document.getElementById('fitem_id_agreement').insertAdjacentHTML('afterend', reminder);
                    var d = document.getElementsByClassName("dndupload-arrow")[0];
                    d.className += " accessible";
               }
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

/* highlight blue card in TURNITIN submission inbox table */
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

/*when student has submitted, you sometimes get an option to resubmit */
if (!document.getElementById('post_29_submission_form')) {
   /* do nothing */
} else {
   var table = document.getElementById('inboxTable');
     var tbody = table.getElementsByTagName('tbody')[0];
     var cells = tbody.getElementsByTagName('td');
     for (var i=0, len=cells.length; i<len; i++){
         if (cells[i].innerText.search('Blue Card') > -1){
   document.getElementById('tiibluecard').style.display = 'none';
    var resubmitform = document.getElementById('post_29_submission_form');
    resubmitform.insertAdjacentHTML('beforebegin', '<p class="bcsteps bounce-top"><strong>Submission successfully uploaded to Turnitin.</strong> Only use the form below if you need to resubmit.</p><br/><hr/><br/><h3>Resubmit</h3> ');
        }
    }
}
