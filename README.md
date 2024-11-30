# Commently React app

![commently](public/logo-color-96.png)

A [React](https://react.dev/) app which would be used for commently browser extension

## Setup

### Build

`npm run build`

The built files are placed in the "dist" directory.

### Setup Chrome extension

1. Goto Chrome's extensions page:
  `chrome://extensions/`
2. Click "Load unpacked" and select the "dist" directory
3. Click on the "Commently" browser extension button to start

### Setup Firefox extension

1. Goto "This Firefox" page:
  `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Addon" button
3. Select `dist/manifest.json` file

## Features

### Phase 1

- Users can add comments to the currently visited webpage
- When the user visits a page again, lists the comments the user have added for this page
- Users can delete comments

### Phase 2

- Users can see the list of pages for which comments are added
- Users can list the comments added to a page without visiting that page
  - If a page cannot be visited anymore(maybe the page does not exist anymore, the website redirects the page to another URL, or any other reasons), the user would not be able to view the comments added to this page without this feature
- Users can define a local workspace where the userdata would be stored, letting users sync across devices/browsers

### Phase 3

- User registration/login
- Sync seamlessly across browsers/devices
- Enable making comments public
