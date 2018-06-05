<menu-bar>
    <aside class="menu">
        <p class="menu-label">
            RT
        </p>
        <ul class="menu-list">
            <li each={page, key in opts.pages}>
                <a class="{page.active ? 'is-active' : ''}"
                   href={'#' + key}>
                    {page.label}
                </a>
            </li>
        </ul>
    </aside>

    <div class="move-page-menu hide">
    </div>

    <style>
     menu-bar .move-page-menu {
         background: #e6cde3;
         position: fixed;
         left: 55px;
         top: 0px;
         width: 222px;
         height: 100vh;
     }
     menu-bar .move-page-menu.hide {
         display: none;
     }
     menu-bar > aside.menu {
         height: 100vh;
         width: 55px;
         padding: 11px 0px 11px 11px;
         position: fixed;
         left: 0px;
         top: 0px;
         background: #eebbcb;
     }

     menu-bar .menu-label, menu-bar .menu-list a {
         padding: 0;
         width: 33px;
         height: 33px;
         text-align: center;
         margin-top: 8px;
         border-radius: 3px;
         background: none;
         color: #ffffff;
         font-weight: bold;

         padding-top: 7px;
         font-size: 14px;

     }
     menu-bar .menu-list a {
     }
     menu-bar .menu-list a.is-active {
         width: 44px;
         padding-right: 11px;
         border-radius: 3px 0px 0px 3px;
         background: #ffffff;
         color: #333333;
     }
    </style>
</menu-bar>
