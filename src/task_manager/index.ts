import { TaskManager } from "./taskManager.js";
import { UserManager } from "./user.js";
import { Priority, Status } from "./enums.js"
import { logAll, formatDate, isTask, findBy } from "./utils.js";

// Create our managers
const taskManager = new TaskManager();
const userManager = new UserManager();

// Create a user, then create a few tasks assigned to them

const bob = userManager.addUser("Bob", "bob@bobmail.com")

const writeDocResult = taskManager.addTask("Write docs", Priority.Low, "expain the API", bob.id)
const fixBugResult = taskManager.addTask("Fix bug", Priority.High, undefined, bob.id)

// Also record the assigned tasks in the user manager

userManager.assignTask(bob.id, writeDocResult.data.id)
userManager.assignTask(bob.id, fixBugResult.data.id)

logAll(taskManager.getAllTasks(), "All Tasks")


// A task gets done, so we change its status to Closed

const completed = taskManager.updateStatus(writeDocResult.data.id, Status.Closed)

console.log(completed.message)

console.log("Summary: ", taskManager.getSummary())
console.log("High priority: ", taskManager.getByPriority(Priority.High))
console.log("Tasks for bob; ", taskManager.getTasksForUser(bob.id))


// Try out the helper functions from utils: formatDate, isTask and findBy

console.log("Formatted date: ", formatDate(fixBugResult.data.date))
console.log(" is a tasks:", isTask(fixBugResult.data))
console.log("findby title: ", findBy(taskManager.getAllTasks(), "title", "Fix bug" ))