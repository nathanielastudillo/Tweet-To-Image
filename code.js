"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__);
function main(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        function createTweetFrame(inputText, arr) {
            // *** START FUNCTION ***
            // create frame with black background
            const frame = figma.createFrame();
            frame.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
            // set frame layout to center text
            frame.layoutMode = 'VERTICAL';
            frame.primaryAxisAlignItems = 'CENTER';
            frame.counterAxisAlignItems = 'CENTER';
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
            text.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
            text.resize(900, text.height);
            //add text as child of parent via. frame.appendChild()
            frame.appendChild(text);
            frame.name = 'tweet_img_' + arr;
            // *** END FUNCTION ***
        }
        // wait for fonts
        yield figma.loadFontAsync({ family: "Inter", style: "Regular" });
        console.log(msg.tweetText);
        // split tweetText by tweet
        const tweetArray = msg.tweetText.split('%|%');
        tweetArray.map((x) => x.trim());
        if (tweetArray.length == 1) {
            createTweetFrame(msg.tweetText.trim(), 0);
        }
        else {
            for (let [index, tweet] of tweetArray.entries()) {
                createTweetFrame(tweet, index);
            }
        }
        figma.closePlugin();
    });
}
figma.ui.onmessage = msg => {
    main(msg);
};
