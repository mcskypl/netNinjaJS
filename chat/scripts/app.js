// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

// add a new chat
newChatForm.addEventListener('submit', e => {
   e.preventDefault();
   const message = newChatForm.message.value.trim();
   chatroom.addChat(message)
       .then(() => newChatForm.reset())
       .catch(err => console.log(err));
});

// add a new name
newNameForm.addEventListener('submit', e => {
   e.preventDefault();
   const name = newNameForm.name.value.trim();
   chatroom.updateName(name);
   newNameForm.reset();

   // show then hide the update message
    updateMssg.innerText = `Your name was updated to ${name}`;
    setTimeout(() => updateMssg.innerText = '', 3000);
});

// update the chat room
rooms.addEventListener('click', e => {
   if (e.target.tagName === 'BUTTON') {
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
   }
});

// check local storage for a name
const username = localStorage.username ? localStorage.username : 'Stranger';

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

// get chats and render
chatroom.getChats((data) => {
    chatUI.render(data);
});