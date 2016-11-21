<task-list>
    <ul>
        <li each={task in this.opts.tasks}>
            {task.name}
        </li>
    </ul>

    <script>
     console.log(this.opts);
    </script>
</task-list>
