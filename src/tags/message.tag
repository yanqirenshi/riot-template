<message>
    <article class="message">
        <div class="message-header">
            <a onclick={onClick}>
                <i class="fa fa-times-circle delete-button" aria-hidden="true"></i>
            </a>
            {message.title}
        </div>
        <div class="message-body">
            {message.contents}
        </div>
    </article>

    <script>
     this.message = this.opts.message;
     this.onClick = function (e) {
         STORE.dispatch(ACTIONS.closeMessage(this.message));
         this.update();
     }.bind(this);
    </script>

    <style>
     message article.message {
         width:333px;
         margin-bottom: 11px;
     }
     message .delete-button {
         font-size: 20px;
         margin-right: 5px;
     }
    </style>
</message>
