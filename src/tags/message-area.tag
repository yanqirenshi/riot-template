<message-area>

    <section>
        <message each={messages}
                 message={this}></message>
    </section>

    <script>
     this.getMessages = function () {
         var out = [];
         var messages = STORE.state().messages.active;
         var keys = Object.keys(messages);
         for (var i in keys) {
             var kye = keys[i];
             out.push(messages[kye])
         }
         return out;
     }.bind(this);

     this.messages = this.getMessages();

     STORE.subscribe(function (action) {
         if (action.type=='CLOSE-MESSAGE' ||
             action.type=='PUT-MESSAGE') {
             this.messages = this.getMessages();
             this.update();
             return;
         }
     }.bind(this));
    </script>

    <style>
     message-area {
         position: fixed;
         right: 22px;
         top: 22px;
     }
    </style>

</message-area>
