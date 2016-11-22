<title-form>
    <form onsubmit={changeTitle}>
        <input type="text" name="newTitle">
        <input type="submit" value="change title">
        <input type="button"
               onclick={onClick}
               value="change title">
    </form>

    <script>
     var actions = require('../../redux/actions.js');
     onClick () {
         this.opts.store.dispatch(
             actions.changeTitle('New Title')
         );
     }
    </script>

    <style scoped>
        :scope
     form { padding: 8px 22px 8px 22px; }
    </style>
</title-form>
