<task-list>
    <ul>
        <li each={task in this.opts.tasks} class="box">
            {task.name}
        </li>
    </ul>

    <style scoped>
     :scope
     ul {
         overflow:hidden;
         padding:20px;
     }
     li {
         float:left;
         margin-right:20px;
     }
    </style>
</task-list>
