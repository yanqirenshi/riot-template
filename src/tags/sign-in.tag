<sign-in>
    <div class="sign-in-form">
        <h1 class="title is-1">Sign In</h1>

        <div class="sns-signin">
            <sign-in-sns type="twitter"/>
            <sign-in-sns type="google"/>
            <sign-in-sns type="facebook"/>
            <sign-in-sns type="github"/>
        </div>

        <div class="email-signin">
            <h2 class="title is-4">or Mail</h2>
            <input type="text" name="email" class="input"
                   placeholder="Email"
                   onchange={onChange} />
            <br/>
            <input type="password" name="email" class="input"
                   placeholder="Password"
                   onchange={onChange} />
            <br/>
            <button class="button is-primary"
                    onclick={onClick}>Sign In</button>
        </div>
    </div>

    <style scoped>
     :scope
     h1 {
         text-align: center;
         font-weight: bold;
     }
     .sns-signin {
         overflow:hidden;
         padding: 22px 0px 0px 0px;
     }
     .sign-in-form {
         margin-top: 22vh;
         width:222px;
         margin-left: auto;
         margin-right: auto;
     }
     .email-signin {
         text-align: right;
         margin-top: 22px;
     }
     .email-signin > h2 {
         text-align: center;
         margin-bottom: 8px;
     }
     .email-signin > * { margin-top: 8px; }
    </style>

    <script>
     var store = this.opts.store;
     onClick (a,b,c) {}
     onChange (a,b,c) {}
    </script>
</sign-in>
