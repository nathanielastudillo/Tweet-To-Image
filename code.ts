figma.showUI(__html__, { width: 450, height: 400});

async function main(msg: { tweetText: any; }) {

  function createTweetFrame(inputText: string, arr: number) {
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
    frame.paddingLeft = 40;
    frame.paddingRight = 40;
    frame.paddingTop = 40;
    frame.paddingBottom = 40;

    //create white text and center + set width
    const text = figma.createText();
    text.characters = inputText;
    text.fontSize = 64;
    //text.textAutoResize = 'HEIGHT';
    text.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]
    text.resize(900, text.height)
    //add text as child of parent via. frame.appendChild()
    frame.appendChild(text);
    frame.name = 'tweet_img_' + arr
    // *** END FUNCTION ***
  }

  // wait for fonts
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  console.log(msg.tweetText);

  // split tweetText by tweet
  const tweetArray = msg.tweetText.split('%|%')
  tweetArray.map((x: string) => x.trim())

  if (tweetArray.length == 1) {
    createTweetFrame(msg.tweetText.trim(), 0)
  } else {
    for (let [index, tweet] of tweetArray.entries()) {
      createTweetFrame(tweet, index)
    }
  }

  figma.closePlugin()
}

figma.ui.onmessage = msg => {
  main(msg)
}