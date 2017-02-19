<global-menu>
    <nav>
        <menu-item-add-activity visible={visible.add}></menu-item-add-activity>
        <menu-item-snapshot visible={visible.snapshot}></menu-item-snapshot>
        <menu-item-restore visible={visible.restore}></menu-item-restore>

        <menu-item-link to="/"
                        icon="fa-home"
                        visible={visible.home}></menu-item-link>

        <menu-group-gtd></menu-group-gtd>
        <menu-group-project></menu-group-project>
        <menu-group-business></menu-group-business>
        <menu-group-database></menu-group-database>
        <menu-group-system></menu-group-system>
        <menu-group-account></menu-group-account>
    </nav>

    <script>
     var mode = this.opts.mode;

     this.visible = {
         // web site functions
         add: false,
         snapshot: false,
         restore: false,
         // link 2 other web site
         home: true,
         datamodel: true,
         database: true,
         setting: true,
         'sign-out': true,
         account: true
     }

     if (mode=='home') {
         this.visible.add = true;
         this.visible.home = false;
     };

     if (mode=='gtd') {
         this.visible.add = true;
     };

     if (mode=='database') {
         this.visible.database = false;
         this.visible.snapshot = true;
         this.visible.restore = true;
     };

     if (mode=='datamodel') {
         this.visible.datamodel = false;
     };

    </script>

    <style>
     global-menu {
         z-index: 111;
         position: fixed;
         bottom: 11px;
         right: 11px;
     }
    </style>
</global-menu>
