<toolbar>
    <nav class="nav">
        <div class="nav-left">
            <h3 class="title is-3">{this.title}</h3>
        </div>

        <div class="nav-center">
            <button class="button">Func1</button>
            <button class="button">Func2</button>
            <button class="button">Func3</button>
        </div>

        <div class="nav-right menu">
            <a class="nav-item" href="#">
                Link1
            </a>
            <a class="nav-item" href="#">
                Link2
            </a>
            <a class="nav-item" href="#">
                Link3
            </a>
        </div>
    </nav>

    <script>
     if (this.opts.title)
         this.title = this.opts.title;
     else
         this.title = "No Title";
    </script>

    <style scoped>
     :scope
     h3.is-3 { padding:10px; }
     div.nav-center { padding:10px; }
     div.nav-center > .button { margin-right:8px; }
    </style>
</toolbar>
