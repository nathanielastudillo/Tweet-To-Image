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
        // wait for fonts
        yield figma.loadFontAsync({ family: "Inter", style: "Regular" });
        console.log(msg.tweetText);
        // eventually need to handle the case where msg is a long string of comma separated tweets 
        // might make more sense to handle this in the UI and let users paste multiple tweets into multiple text boxes 
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
        //create white text and center
        const text = figma.createText();
        text.characters = msg.tweetText;
        text.fontSize = 64;
        text.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
        //add text as child of parent via. frame.appendChild()
        frame.appendChild(text);
        // *** END FUNCTION ***
        figma.closePlugin();
    });
}
figma.ui.onmessage = msg => {
    main(msg);
};
