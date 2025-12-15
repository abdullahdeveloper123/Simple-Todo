        let saveBtn = document.getElementById('addBtn')
        let savedTasks = JSON.parse(localStorage.getItem('tasks')) || []
        let currentFilter = 'all'

        function handleSave() {
            let input = document.getElementById("taskInput")
            let task = input.value.trim()

            if (!task) return

            let taskData = {
                task: task,
                date: new Date().getDate(),
                done: false
            }

            savedTasks.push(taskData)
            localStorage.setItem('tasks', JSON.stringify(savedTasks))

            input.value = ''
            renderTasks()
        }

        function getFilteredTasks() {
            if (currentFilter === 'active') {
                return savedTasks.filter(t => !t.done)
            }

            if (currentFilter === 'completed') {
                return savedTasks.filter(t => t.done)
            }

            return savedTasks
        }

        function renderTasks() {
            let card = document.getElementById('card')
            let ul = document.getElementById('taskList')
            let emptyMsg = document.getElementById('emptyMsg')

            // ---- EMPTY STATE ----
            if (savedTasks.length < 1) {
                if (!emptyMsg) {
                    let h1 = document.createElement('h1')
                    h1.id = 'emptyMsg'
                    h1.classList.add('m-auto')
                    h1.textContent = 'You have no tasks to do!'
                    card.append(h1)
                }
            } else {
                if (emptyMsg) emptyMsg.remove()
            }

            ul.innerHTML = ''

            let tasksToRender = getFilteredTasks()

            tasksToRender.forEach((t) => {
                const checkBox = document.createElement('input')
                checkBox.type = 'checkbox'
                checkBox.classList.add('checkbox')
                checkBox.checked = t.done

                const li = document.createElement('li')
                li.className = 'task'
                if (t.done) li.classList.add('completed')

                const left = document.createElement('div')
                left.className = 'task-left'

                const span = document.createElement('span')
                span.textContent = t.task

                const btn = document.createElement('button')
                btn.textContent = '✕'
                btn.classList.add('delete')

                // ---- EVENTS ----

                checkBox.addEventListener('change', () => {
                    t.done = checkBox.checked
                    localStorage.setItem('tasks', JSON.stringify(savedTasks))
                    li.classList.toggle('completed', t.done)
                    renderTasks()
                })

                btn.addEventListener('click', () => {
                    let realIndex = savedTasks.indexOf(t)
                    savedTasks.splice(realIndex, 1)
                    localStorage.setItem('tasks', JSON.stringify(savedTasks))
                    renderTasks()
                })

                left.appendChild(span)
                li.append(checkBox, left, btn)
                ul.appendChild(li)
            })

            // ---- COUNTS ----
            document.getElementById('total').textContent = savedTasks.length
            document.getElementById('activeCount').textContent = savedTasks.filter(t => !t.done).length
            document.getElementById('completedCount').textContent = savedTasks.filter(t => t.done).length
        }

        saveBtn.addEventListener('click', handleSave)

        // ---- TAB SWITCHING ----
        document.getElementById('allTab').addEventListener('click', () => {
            currentFilter = 'all'
            document.getElementById('allTab').classList.add("active")
            document.getElementById('activeTab').classList.remove("active")
            document.getElementById('completedTab').classList.remove("active")
            renderTasks()
        })

        document.getElementById('activeTab').addEventListener('click', () => {
            currentFilter = 'active'
            document.getElementById('allTab').classList.remove("active")
            document.getElementById('activeTab').classList.add("active")
            document.getElementById('completedTab').classList.remove("active")
            renderTasks()
        })

        document.getElementById('completedTab').addEventListener('click', () => {
            currentFilter = 'completed'
            document.getElementById('allTab').classList.remove("active")
            document.getElementById('activeTab').classList.remove("active")
            document.getElementById('completedTab').classList.add("active")
            renderTasks()
        })

        renderTasks()