<home>
    <toolbar />
    <sample-output store={this.opts.store} />
    <hr/>
    <title-form store={this.opts.store} />

    <div>
        <h2>Ajax</h2>
        <button onclick={doRequest}>Request</button>
        <div class="results">
        </div>
    </div>

    <script>
     var store = this.opts.store;

     doRequest () {
         console.log('Do Request');
     }
    </script>
</home>
