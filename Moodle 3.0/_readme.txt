Many universities have a Blue Card scheme enabling students with specific learning difficulties (SpLDs) to flag their work with a blue card, so the tutor will mark it with due consideration.

We needed a way of making it easier for students to flag their work with a blue card, and I have come up with these scripts, which go into the Additional HTML section in Site Administration in Moodle, and work with the Moodle Assignment functionality and the Turnitin plugin.

First the student clicks the button to add the blue card, which inserts a comment with the words "Blue Card" in the submission comments field. When the form is submitted, the JavaScript looks for a comment in the grading table, and adds a flag in the status column to remind the tutor to review the comments. 

In Moodle Assignments, blue cards are flagged up with "student has added comments, please review". The tutor can then display the comment and see the words "Blue Card" (which are a link to the dyslexia marking guidelines). There is also a custom spreadsheet for tutors to download so they can see which students have flagged their work with a blue card.

In Turnitin, blue card submissions are highlighted in the grading table, and each piece of work that has been flagged with a blue card will have the words Blue Card in the title. 

Tutors also see a popup (which is hidden from students) to remind them to check for blue cards. The popup can be dragged out of the way, or closed.

THIS VERSION WORKS WITH MOODLE 3.0 and Turnitin 1.
