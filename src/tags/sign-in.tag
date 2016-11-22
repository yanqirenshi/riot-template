<sign-in>
    <div class="sign-in-form">
        <h1>Sign In</h1>

        <div>
            <img src="#" title="twitter">
            <img src="#" title="Google">
            <img src="#" title="Facebook">
            <img src="#" title="Github">
        </div>

        <div>
            <input type="text" name="email"
                   placeholder="Email"
                   onchange={onChange} />
            <br/>
            <input type="text" name="email"
                   placeholder="Password"
                   onchange={onChange} />
            <br/>
            <button onclick={onClick}>Sign In</button>
        </div>
    </div>

    <style>
     .sign-in-form {
         width: 222px;
         margin-left: auto;
         margin-right: auto;
     }
    </style>

    <script>
     var store = this.opts.store;
     onClick (a,b,c) {}
     onChange (a,b,c) {}
    </script>
</sign-in>
