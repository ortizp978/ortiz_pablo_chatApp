export default {

   

    name: 'TheChatMessageComponent',
    props: ['message'],

    template: `
    <article class="chat-messages" :class="{ 'other-messages' : matchedID }">
        <h2>{{ message.name }}:</h2>
        <p>{{ message.content }}</p>
    </article>
    `,

    data()  {
        return {
            message: 'hello from the template',
            // every timean incoming message arrives, check against the user Id to see if this is ours.
            //If it Is, apply a CSS class to indicate that it's ours.
            //If is Isn't, apply a different CSS class to make that obvious.
            matchedID: this.$parent.socketID == this.message.id
        }
    }
}