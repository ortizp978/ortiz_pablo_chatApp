// imports will always go at the top
import ChatMsg from './components/ChatMessage.js';
import User from './components/User.js';
import usertyping from './components/usertyping.js';

const socket = io();

//utility functions for socket
function setUserID ({ sID }) {

    //save our unique ID generated by Socket on the server side - this is how we track individual connections to the chat service
    vm.socketID = sID;

}

function showNewMessage( { message }) {
    //debugger;
    vm.messages.push(message);
}

function handleUserTyping(user) {
  console.log('somebody is typing something');
  vm.typing = user;

  if (user.id != vm.socketID) {
    vm.typist = user.name + ' is typing...';
  } 
  else {
    vm.typist = ' ';
  }  
}

  const { createApp } = Vue

  const vm = createApp({
    data() {
      return {
        socketID: '',
        message: '',
        messages: [],
        User: [],
        typing: '',
        nickname: '',
        typist: ''
      }
    }, 

    methods: {
        dispatchMessage() {
            socket.emit('chat_message', {
                content: this.message,
                name: this.nickname || 'anonymous',
                id: this.socketID
            })

            this.message = "";
        },

        catchTextFocus() {
          // emit a custom typing event and broadcast it to the server
          console.log('focused');
          socket.emit('user_typing', {
            name: this.nickname || 'anonymous',
            id: this.socketID
          })
        }
    },

    components: {
        newmsg: ChatMsg,
        User: User,
        usertyping: usertyping
    }

  }).mount('#app')

socket.addEventListener('connected', setUserID);
socket.addEventListener('new_message', showNewMessage);
socket.addEventListener('typing', handleUserTyping);