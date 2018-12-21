/*

Form Generator Tool

DONE:
Automatically generate a standard form
Format the date in the form heading
Automatically create a Sheet and connect Form to collect responses
Grab the form published URL
Send me an email with links to the Form and Sheet

TO DO:

Create dedicated folder
Move the form and responses sheet to the new folder
Add questions and headings to form
Format the form
Send form responses automatically to the Natural Language API to guage sentiment
Programatically send a single test response to the form to test  
Create a summary report based on the responses, including charts etc.
Create draft email replies based on form responses for easy replying
Daily drafts waiting alert
Confirm emails sent alert


[18-12-21 13:49:53:461 EST] Published URL: 
https://docs.google.com/forms/d/e/1FAIpQLSdGLfZOzMbockAUG1xDI1KzCqT9T6GWYnx9pzOrPfM-oR15mg/viewform

[18-12-21 13:49:53:509 EST] Editor URL: 
https://docs.google.com/forms/d/1pGduiYDLmfudlc1w9wABEJRFq6GmefJBlJxiUj1s8_4/edit

[18-12-21 13:49:55:133 EST] Responses Sheet:
https://docs.google.com/a/benlcollins.com/spreadsheets/d/1L9OimdUc7CWIgY65GTPzH5IN5PUzYpE7OIOU_Ger6d0/edit

 */


function moveToNewFolder(sheetFile,formFile) {

  var d = new Date();
  var formattedDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' +  d.getFullYear();
  var folderTitle = 'Product Feedback Form ' + formattedDate;
  var folder = DriveApp.createFolder(folderTitle);

  Logger.log(folder.getId()); // 12IUUconC3BfqL1XAvtbFlUDbumvEH8l1
  
  folder.addFile(sheetFile);
  folder.addFile(formFile);
  
  var rootFolder = DriveApp.getRootFolder();

  rootFolder.removeFile(sheetFile);
  rootFolder.removeFile(formFile);
  
}



function generateNewForm() {

  var d = new Date();
  var formattedDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' +  d.getFullYear();
  var formTitle = 'Product Feedback Form ' + formattedDate;
  

  /*
  Create Form
  */
  
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
  
  // Get the published URL
  var publishedLink = form.getPublishedUrl();
  //var publishedLink = 'https://docs.google.com/forms/d/e/1FAIpQLScPcpJgYxS-S2dCX7SLKzYJ6wUU9vA1aNrBP716WLvFJlZ_TQ/viewform'; // for testing
  Logger.log('Published URL: ' + publishedLink);
  
  // Get the editor url
  var editorLink = form.getEditUrl();
  //var editorLink = 'https://docs.google.com/forms/d/13MAthvSOUDBEtgPFnovIIskFehIsIr9cgdfLaPZyTNY/edit'; // for testing
  Logger.log('Editor URL: ' + editorLink);
  
  /*
  Create responses Sheet
  */
  // create new sheet
  var ssNew = SpreadsheetApp.create(formTitle + ' (Responses)');

  // link to the form
  //var form = FormApp.openByUrl(editorLink); // for testing
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ssNew.getId());

  // Get the Sheet responses link
  var responsesLink = ssNew.getUrl();
  //var responsesLink = 'TBC';
  Logger.log('Responses: ' + responsesLink);
  
  /*
  addFile method expects a file object from Drive app
  */
  // get sheet File
  var sheetId = ssNew.getId();
  var sheetFile = DriveApp.getFileById(sheetId);
  
  // get form File
  var formId = form.getId();
  var formFile = DriveApp.getFileById(formId);
  
  var folder = moveToNewFolder(sheetFile,formFile);
  
  /*
  Email relevant links to owner
  */
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

























