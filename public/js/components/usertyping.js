export default {
    name: 'usertyping',


    template: `

    <div>
    <div>{{typist}}</div>
    <!-- other chat components -->
  </div>
    `,

    data() {
        return {
            typing: '',
            message: '',
            typing:  false,
            typist: '',

        }
    },

    watch: {
     new_message(value) {
        value ? socket.emit('typist', this.nickname) : socket.emit('stoptyping');
    },
  },
        methods: {
            handleUserTyping() {}
        },

    }

   