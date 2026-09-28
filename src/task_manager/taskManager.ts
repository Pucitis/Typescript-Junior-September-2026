import { Task, ID, TaskFilter, ApiResponse } from './types.js'

import { Status, Priority } from './enums.js'


// Stores tasks in memory and provides ways to add, change, delete and search them
export class TaskManager {
    // private: only code inside this class can touch these
    private tasks: Task[] = [];
    // Counter used to give every new task a unique id
    private nextId: number = 1;

    addTask(
        title: string,
        priority: Priority,
        description?: string,
        assignedTo?: ID
    ): ApiResponse<Task> {
        // this.nextId++ uses the current id and then increases the counter
        const newTask: Task = {
            id: this.nextId++,
            title,
            priority,
            status: Status.Open,
            date: new Date().toISOString()
        }
        // Optional fields are only set when a value was given
        if (description !== undefined) newTask.description = description
        if (assignedTo !== undefined) newTask.assignedTo = assignedTo
        this.tasks.push(newTask)
        return {
            data: newTask,
            success: true,
            message: "Task added"
        }
    }

    // Changes the status of one task; returns success: false if the id does not exist
    updateStatus(id: ID, newStatus: Status): ApiResponse<Task | null> {
        const task = this.tasks.find(t => t.id === id)

        if (!task) {
            return {
                data: null,
                success: false,
                message: `Task ${id} not found`
            }
        }
        task.status = newStatus
        return {
            data: task,
            success: true,
            message: "Status"
        }
    }

    // Removes a task by id and returns the removed task
    deleteTask(id: ID): ApiResponse<Task | null> {
        const index = this.tasks.findIndex(task => task.id === id);

        if (index === -1) {
            return {
                data: null,
                success: false,
                message: `Task ${id} not found`
            }
        }

        const removed = this.tasks[index] ?? null;

        this.tasks.splice(index, 1);

        return {
            data: removed,
            success: true,
            message: "Task deleted"
        }
    }

    findTaskByID(id: ID): Task | undefined {
        return this.tasks.find(t => t.id === id)
    }
    // Returns a copy ([...]) so outside code cannot change our internal array
    getAllTasks(): Task[] {
        return [...this.tasks];
    }

    // Returns the tasks for which the given filter function returns true
    filterTasks(filterT: TaskFilter): Task[] {
        return this.tasks.filter(filterT);
    }

    // The getBy... methods reuse filterTasks with a small arrow function
    getByStatus(status: Status): Task[] {
        return this.filterTasks(task => task.status === status)
    }

    getByPriority(priority: Priority): Task[] {
        return this.filterTasks(task => task.priority === priority)
    }

    getTasksForUser(userID: ID): Task[] {
        return this.filterTasks(task => task.assignedTo === userID)
    }

    // Generic: the return type follows the key, e.g. key "title" gives a string
    getTaskField<K extends keyof Task>(task: Task, key: K): Task[K] {
        return task[key]
    }

    // Counts tasks per status. Record<string, number> means an object with string keys and number values
    getSummary(): Record<string, number> {
        return {
            total: this.tasks.length,
            open: this.getByStatus(Status.Open).length,
            inProgress: this.getByStatus(Status.InProcess).length,
            done: this.getByStatus(Status.Closed).length,
            canceled: this.getByStatus(Status.Canceled).length
        }
    }
}