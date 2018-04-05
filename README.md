Many universities have a Blue Card scheme enabling students with specific learning difficulties (SpLDs) to flag their work with a blue card, so the tutor will mark it with due consideration.

We needed a way of making it easier for students to flag their work with a blue card, and I have come up with these scripts, which go into the Additional HTML section in Site Administration in Moodle, and work with the Moodle Assignment functionality and the Turnitin plugin.

First the student clicks the button to add the blue card, which inserts a comment with the words "Blue Card" in the submission comments field. When the form is submitted, the JavaScript looks for a comment in the grading table, and adds a flag in the status column to remind the tutor to review the comments. 

In Moodle Assignments, blue cards are flagged up with "student has added comments, please review". The tutor can then display the comment and see the words "Blue Card" (which are a link to the dyslexia marking guidelines). There is also a custom spreadsheet for tutors to download so they can see which students have flagged their work with a blue card.

In Turnitin 1, blue card submissions are highlighted in the grading table, and each piece of work that has been flagged with a blue card will have the words Blue Card in the title. 

In Turnitin 2, because the submissions table loads after the rest of the DOM, I had to insert a button for tutors to highlight blue card submissions.

Tutors also see a popup (which is hidden from students) to remind them to check for blue cards. The popup can be dragged out of the way, or closed. Once it has been closed, a cookie is set so that the tutor does not see the popup again.

The functionality is available for Moodle 3.0, 3.2, and 3.4 (each in a separate folder).

Please note that I have created separate .js files for Turnitin and Moodle Assignments in case you are only using one of them; but if you are using both, you can ignore the separate .js files and just use `additional.html`.

NB: code is supplied 'as is' without any commitment to it being fit for purpose and is also supplied without any commitment to maintenance or support.
