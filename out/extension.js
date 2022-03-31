"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
// Import libraries
const fs = require("fs");
const vscode = require("vscode");
// Runs on extension activation
function activate(context) {
    // Registers 'Display NFP Image' Command
    context.subscriptions.push(vscode.commands.registerCommand('nfp-images.dispNFP', () => {
        let file = vscode.window.activeTextEditor?.document.fileName;
        let fileExt = getFileExt(file);
        if (fileExt === "nfp") {
            const panel = vscode.window.createWebviewPanel('nfpImageView', // Identifies the type of the webview. Used internally
            'NFP Image', // Title of the panel displayed to the user
            vscode.ViewColumn.One, // Editor column to show the new webview panel in.
            {} // Webview options. More on these later.
            );
            let image = parseImage(file);
            panel.webview.html = getWebviewContent(image);
        }
        else {
            vscode.window.showErrorMessage("This file is not in NFP format!");
        }
    }));
}
exports.activate = activate;
// Gets file extension
// Ex. file.TXT => txt
function getFileExt(filename) {
    let extension = filename.split('.').pop();
    extension.toLowerCase();
    return extension;
}
// Parses image into html ids
function parseImage(file) {
    let image = [];
    file = fs.readFileSync(file, 'utf8');
    for (let i = 0; i < file.length; i++) {
        let char = file.charAt(i);
        switch (char) {
            case '\n':
                image.push('newline');
                break;
            case ' ':
                image.push('blank');
                break;
            default:
                image.push(char);
        }
    }
    return image;
}
// Returns HTML content to display.
function getWebviewContent(image) {
    let body = `<div class="container">`;
    for (let i = 0; i < image.length; i++) {
        let left = i * 10;
        body = body + `<div class="pixel" id="${image[i]}" style="top:${left}px;">` + '\n';
    }
    body = body + '</div>';
    let html = `
		<!DOCTYPE html>
		<html lang="en">
			<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>NFP Image</title>
			</head>
			<style>
				.container {
					width: 100%;
					height: 20px;
				}

				.pixel {
					width: 10px;
					height: 20px;
					margin-left: 10px;
				}

				#0 {
					background-color: white;
				}

				#1 {
					background-color: orange;
				}

				#2 {
					background-color: magenta;
				}

				#3 {
					background-color: lightblue;
				}

				#4 {
					background-color: yellow;
				}

				#5 {
					background-color: lime;
				}

				#6 {
					background-color: pink;
				}
				
				#7 {
					background-color: gray;
				}

				#8 {
					background-color: lightgray;
				}

				#9 {
					background-color: cyan;
				}

				#a {
					background-color: purple;
				}

				#b {
					background-color: blue;
				}

				#c {
					background-color: brown;
				}

				#d {
					background-color: green;
				}

				#e {
					background-color: red;
				}

				#f {
					background-color: black;
				}

				#blank {
					
				}

			</style>
			<body>
				${body}
			</body>
		</html>`;
    console.log(html);
    return html;
}
//# sourceMappingURL=extension.js.map