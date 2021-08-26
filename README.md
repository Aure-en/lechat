# Lechat
* [View Live](https://lechat.vercel.app)
* [View Back Repository](https://github.com/Aure-en/lechat_api)

Ever wanted to chat with new people, or send funny pictures to your friends? Lechat is a chat website that allows you send prettily formatted messages in public servers or private conversations. Built with Node.js, Express, React and MongoDB, it allows you to create or join rooms where you can share thoughts with users around the world.

## Features
*	User authentification with username / email. JWT are used for authentification, and bcryptjs for password encryption.
*	Personalized user profiles with avatars.
*	Friendship system between users.
*	Server creation and server organization in different categories and channels.
*	Server exploration for users to find a place to hang out at.
*	Messages sent privately to another user, or publicly in a server channel.
*	Editable messages formatted through a rich text editor.
*	Small files and images attachment to messages.
*	Infinite scroll to load previous messages.
*	Indicators to differentiate read from unread messages.
*	Light and dark mode.
*	Responsive.

## Preview
### Server Navigation

<img src="https://firebasestorage.googleapis.com/v0/b/aurelie-nguyen.appspot.com/o/lechat%2Fscreen-capture.gif?alt=media&token=dd99c572-ab6c-470f-be10-1dd80813fd87" gif width='600px' alt="Navigationg between server channels" />

### Friendship
<img src="https://firebasestorage.googleapis.com/v0/b/aurelie-nguyen.appspot.com/o/lechat%2Fscreen-capture%20(1).gif?alt=media&token=9bfbb2e9-8fd3-4fb9-b795-55283033adb8" gif width='600px' alt="Adding a new friend and sending them a message" />

### Chat Features
<img src="https://firebasestorage.googleapis.com/v0/b/aurelie-nguyen.appspot.com/o/lechat%2Fscreen-capture%20(2).gif?alt=media&token=beb00301-ecea-4fb6-ac16-6527e0734551" gif width='600px' alt="Trying out rich text editor features in chat" />

## Installation

### Requirements
*	Node.js
*	[Lechat API](https://github.com/Aure-en/lechat_api)
* Serve

### Clone the repository
```
$ git clone git@github.com:Aure-en/lechat.git
$ cd lechat
$ npm install
```

### Set up environment variables
Create a .env file in the root directory and set the following variables

```
REACT_APP_SERVER=your server url
REACT_APP_SAMPLE=id of the sample account if you add any.
```

### Start

```
$ npm run build
$ serve -s build
```

## Dependencies
*	React
*	React Router
*	Socket.io
*	Styled-components
*	View more in the [package.json](https://github.com/Aure-en/lechat/blob/master/package.json)

#### Design Inspiration
[1](https://discord.com/) – [2](https://dribbble.com/shots/14598880-Chat-dashboard) – [3](https://dribbble.com/shots/11369220-sign-up-dark) 
