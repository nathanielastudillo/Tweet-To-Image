figma.showUI(__html__);

async function main(msg: { tweetText: any; }) {

  // wait for fonts
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  console.log(msg.tweetText);

  // eventually need to handle the case where msg is a long string of comma separated tweets 
  // might make more sense to handle this in the UI and let users paste multiple tweets into multiple text boxes 

   // *** START FUNCTION ***
  // create frame with black background
  const frame = figma.createFrame();
  frame.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }]

  // set frame layout to center text
  frame.layoutMode = 'VERTICAL';
  frame.primaryAxisAlignItems = 'CENTER'
  frame.counterAxisAlignItems = 'CENTER'

  // resize to counter the resize apparently triggered by setting layoutMode
  frame.resize(1080, 1080);
  
  //create white text and center
  const text = figma.createText();
  text.characters = msg.tweetText;
  text.fontSize = 64;
  text.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
  //add text as child of parent via. frame.appendChild()
  frame.appendChild(text);
  // *** END FUNCTION ***

  figma.closePlugin()
}

figma.ui.onmessage = msg => {
  main(msg)
} 

