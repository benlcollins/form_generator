/*

Form Generator Tool

TO DO:
Automatically generate a standard form
Add options
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


 */


function generateNewForm() {
  
  var form = FormApp.create('Product Feedback Form' + new Date());
  
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
  Logger.log('Published URL: ' + form.getPublishedUrl());
  
  // Log the editor url
  Logger.log('Editor URL: ' + form.getEditUrl());
  
}