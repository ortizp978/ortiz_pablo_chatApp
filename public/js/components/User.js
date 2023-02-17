export default {
    name: 'User',
    props: ['user'],

    template: `
    <div v-if="!joined" class="parent-container"></div>
    <div class="name-container"></div>
    <input type="text" class="user-name" v-model="currentUser" placeholder="Your name first">

    <div class="welcome-note" v-if="joined">
    <h2>Welcome {{ currentUser }}!</h2></div>

    <button class="join-button" v-on:click="join">Join</button>
    `,

    data() {
        return {
          joined: false,
          currentUser: '',
        }
    },

    methods: {
        join() {
            this.joined = true;
            console.log(this.currentUser);
            this.$emit('joined', this.currentUser);
        },
}
}