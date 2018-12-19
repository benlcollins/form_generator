/*

Form Generator Tool

DONE:
Automatically generate a standard form
Format the date in the form heading

TO DO:

Add questions and headings to form
Format the form
Automatically create a Sheet and connect Form to collect responses
Grab the form published URL
Send me an email with links to the Form and Sheet
Send form responses automatically to the Natural Language API to guage sentiment
Programatically send a single test response to the form to test  
Create a summary report based on the responses, including charts etc.
Create draft email replies based on form responses for easy replying
Daily drafts waiting alert
Confirm emails sent alert


[18-12-19 14:28:09:388 EST] Published URL: 
https://docs.google.com/forms/d/e/1FAIpQLScPcpJgYxS-S2dCX7SLKzYJ6wUU9vA1aNrBP716WLvFJlZ_TQ/viewform

[18-12-19 14:28:09:439 EST] Editor URL: 
https://docs.google.com/forms/d/13MAthvSOUDBEtgPFnovIIskFehIsIr9cgdfLaPZyTNY/edit

 */


function generateNewForm() {

  var d = new Date();
  var formattedDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' +  d.getFullYear();
  var formTitle = 'Product Feedback Form ' + formattedDate;
  
  /*
  var form = FormApp.create(formTitle);
  
  // add item
  var item = form.addCheckboxItem();
  item.setTitle('What condiments would you like on your hot dog?');
  item.setChoices([
    item.createChoice('Ketchup'),
    item.createChoice('Mustard'),
    item.createChoice('Relish')
  ]);
  
  form.addMultipleChoiceItem()
    .setTitle('Do you prefer cats or dogs?')
    .setChoiceValues(['Cats','Dogs'])
    .showOtherOption(true);
  
  form.addPageBreakItem()
    .setTitle('Getting to know you');
  
  form.addDateItem()
    .setTitle('When were you born?');
  
  form.addGridItem()
    .setTitle('Rate your interests')
    .setRows(['Cars', 'Computers', 'Celebrities'])
    .setColumns(['Boring', 'So-so', 'Interesting']);
  
  // log the published URL
  var publishedLink = form.getPublishedUrl();
  Logger.log('Published URL: ' + publishedLink);
  
  // Log the editor url
  var editorLink = form.getEditUrl();
  Logger.log('Editor URL: ' + editorLink);
  */

  // for testing
  var publishedLink = 'https://docs.google.com/forms/d/e/1FAIpQLScPcpJgYxS-S2dCX7SLKzYJ6wUU9vA1aNrBP716WLvFJlZ_TQ/viewform';
  var editorLink = 'https://docs.google.com/forms/d/13MAthvSOUDBEtgPFnovIIskFehIsIr9cgdfLaPZyTNY/edit';

  var responsesLink = 'TBC';

  emailLinks(formTitle,publishedLink,editorLink,responsesLink);

  
}


// function to email the urls to me
function emailLinks(formTitle,publishedLink,editorLink,reponsesLink) {

  var htmlBody = 
        'Here are the links for the new Form:<br><br>' +
          'Published Form URL: ' + publishedLink + '<br><br>' +
            'Form Editor URL: ' + editorLink + '<br><br>' +
              'Responses Sheet URL: ' + reponsesLink;
  
  GmailApp.sendEmail(
    'ben@benlcollins.com',
    'URLs for Form: ' + formTitle,
    '',
    {
      htmlBody: htmlBody
    }
  );

}

























