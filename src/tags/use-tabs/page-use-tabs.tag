<page-use-tabs>

    <section-header title="Page02"></section-header>

    <div style="padding-left:55px;">
        <page-tabs core={page_tabs} callback={clickTab}></page-tabs>
    </div>

    <div>
        <page-use-tabs_tab_readme                    class="hide" source={children_source.schedules}></page-use-tabs_tab_readme>
        <page-use-tabs_tab-screen-transition-diagram class="hide"></page-use-tabs_tab-screen-transition-diagram>
        <page-use-tabs_tab-env-config-diagram        class="hide"></page-use-tabs_tab-env-config-diagram>
        <page-use-tabs_tab-e2e-test                  class="hide" source={children_source.structures}></page-use-tabs_tab-e2e-test>
        <page-use-tabs_tab-procedures                class="hide" source={children_source.structures}></page-use-tabs_tab-procedures>
        <page-use-tabs_tab-models                    class="hide" source={children_source.structures}></page-use-tabs_tab-models>
        <page-use-tabs_tab-components                class="hide" source={children_source.structures}></page-use-tabs_tab-components>
        <page-use-tabs_tab-api                       class="hide" source={children_source.structures}></page-use-tabs_tab-api>
        <page-use-tabs_tab-data-store                class="hide" source={children_source.structures}></page-use-tabs_tab-data-store>
        <page-use-tabs_tab-classes                   class="hide" source={children_source.structures}></page-use-tabs_tab-classes>
    </div>

    <script>
     this.children_source = STORE.get('wbs');
     this.on('update', () => {
         this.source = STORE.get('wbs');
     });
     this.on('before-mount', () => {
         this.source = STORE.get('wbs');
     });
     STORE.subscribe((action) => {
         if (action.type=='FETCHED-JSON-WBS-STRUCTURE') {
             this.update();
             return;
         }

     });
    </script>

    <script>
     this.page_tabs = new PageTabs([
         {code: 'readme',     label: 'README',      tag: 'page-use-tabs_tab_readme' },
         {code: 'tab1',       label: '画面遷移図',  tag: 'page-use-tabs_tab-screen-transition-diagram' },
         {code: 'tab2',       label: '環境構成図',  tag: 'page-use-tabs_tab-env-config-diagram' },
         {code: 'tab3',       label: 'E2E テスト',  tag: 'page-use-tabs_tab-e2e-test' },
         {code: 'procedures', label: 'Procedures',  tag: 'page-use-tabs_tab-procedures' },
         {code: 'models',     label: 'Models',      tag: 'page-use-tabs_tab-models' },
         {code: 'components', label: 'Components',  tag: 'page-use-tabs_tab-components' },
         {code: 'api',        label: 'API',         tag: 'page-use-tabs_tab-api' },
         {code: 'data-store', label: 'Data Stores', tag: 'page-use-tabs_tab-data-store' },
         {code: 'classes',    label: 'Classes',     tag: 'page-use-tabs_tab-classes' },
     ]);

     this.on('mount', () => {
         this.page_tabs.switchTab(this.tags)

         ACTIONS.fetchJsonWbsStructure();

     });

     this.clickTab = (e, action, data) => {
         if (this.page_tabs.switchTab(this.tags, data.code))
             this.update();
     };
    </script>

</page-use-tabs>
