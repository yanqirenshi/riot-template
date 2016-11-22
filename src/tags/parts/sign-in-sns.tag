<sign-in-sns>
    <a style={this.style.a}>
        <span class="icon" style={this.style.span}>
            <i class={this.cls} style={this.style.i} />
        </span>
    </a>

    <script>
     var data = {
         twitter:  {color: '#1da1f2', cls: 'fa-twitter-square'} ,
         google:   {color: '#dd4d42', cls: 'fa-google-plus-square'} ,
         facebook: {color: '#3b5998', cls: 'fa-facebook-square'} ,
         github:   {color: '#000000', cls: 'fa-github-square'}
     }

     var target = data[this.opts.type];
     this.cls = 'fa ' + target.cls;
     this.style = {
         a: 'display:block; float:left;',
         span: 'width:55px; height:55px;',
         i: 'color:' + target.color + ';font-size:55px;'
     }
    </script>

</sign-in-sns>
