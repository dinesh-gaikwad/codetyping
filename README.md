# CodeType Offline

A fully offline coding typing practice app.

## Run
Double-click `index.html` and open it in Chrome, Edge, Firefox, or another modern browser.

No server, Python, Node.js, database, API, or internet connection is required.

## Features
- Python, JavaScript, Java, C++, SQL snippets
- Random challenges
- 1/2/5/10 minute timers
- WPM and accuracy
- Error tracking
- Streak/progress display
- Live keyboard feedback
- Light/dark theme
- Local personal-best storage
- Paste/copy/cut disabled during typing
- Responsive layout

## Offline storage
Statistics and theme are stored in browser localStorage on the current device/browser.

## Add challenges
Open `data.js` and add another object to `CHALLENGES`:
```js
{lang:"python",title:"My Challenge",code:`print("Hello")`}
```
