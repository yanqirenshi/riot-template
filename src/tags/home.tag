<home>
    <toolbar title={this.title} />
    <sample-output store={this.store} actions={this.actions}/>
    <hr/>
    <title-form store={this.store} />

    <todo-app tasks={this.state.tasks} actions={this.actions} />

    <script>
     var opts = this.opts;
     this.store = opts.store;
     this.actions = opts.actions;

     /* タグのマウント時にアクションを実行しデータを取得する。*/
     this.on('mount', function () {
         this.store.dispatch(this.actions.loadTasks());
     }.bind(this));

     /* ストア変更時の処理 */
     this.store.subscribe(function () {
         this.state = this.store.getState();
         this.update();
     }.bind(this));

     /* Title */
     this.title = this.store.getState().title;
    </script>
</home>
