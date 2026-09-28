import { createInterface } from "node:readline"
import { TaskManager } from "./taskManager.js"
import { UserManager } from "./user.js"
import { User } from "./types.js"
import { Priority, Status } from "./enums.js"
import { logAll } from "./utils.js"


// One shared instance of each manager; they hold all state in memory
const taskManager = new TaskManager();
const userManager = new UserManager();

// readline lets us read user input from the terminal line by line
const rl = createInterface({ input: process.stdin, output: process.stdout });

// Prints the list of available commands
function printHelp(): void {

    console.log(`
commands:
        add <title>         add a new task, assigend to you (priorty defaults to Medium)
        list                show all tasks
        complete <id>       mark a task as Closed
        delete <id>         remove a task
        summary             show task counts by status
        help                show this list
        exit                quit
        `)
}

// Helper: converts text typed by the user into a number.
// Returns null (and prints an error) when the text is not a number,
// so callers can stop early with `if (id === null) return`.
function parseId(arg:string): number | null{
    const id = Number(arg);
    if (Number.isNaN(id)){
        console.log(`"${arg}" is not a valid task id - expected valueis a number`)
        return null
    }
    return id
}

// Main loop: asks for one command, runs it, then calls itself again.
// rl.question is callback-based, so calling promptLoop again at the end
// is how we "loop" without a while statement.
function promptLoop(currentUser: User): void{

    rl.question("> ", (line:string) => {
        // Split the typed line into words, e.g. "add buy milk" -> ["add", "buy", "milk"]
        // Then array destructuring picks the pieces apart:
        //   command   = first word            -> "add"
        //   ...rest   = "rest syntax": the three dots collect ALL remaining
        //               items into a new array -> ["buy", "milk"]
        // If the user types only "list", command = "list" and rest = [] (empty)
        const [ command, ...rest] = line.trim().split(" ");
        // Join the remaining words back into one string (the task title or id)
        const argument = rest.join( " ");

        // Closing readline ends the program; we return so the loop is not repeated
        if (command === "exit"){
            rl.close();
            return
        }

        // Lookup table: command name -> function that handles it.
        // Easier to extend than a long if/else or switch chain.
        const commandMap: Record<string, (arg: string) => void> = {
            add: (arg) =>{
                const result = taskManager.addTask(arg, Priority.Medium, undefined, currentUser.id)
                userManager.assignTask(currentUser.id, result.data.id)
                console.log(result.message, result.data)
            },

            // Prints every task using the shared logAll helper
            list: () => logAll(taskManager.getAllTasks(), "Tasks"),

            // Setting status to Closed is what "complete" means
            complete: (arg) => {
                const id = parseId(arg);
                if (id === null) return;
                console.log(taskManager.updateStatus(id, Status.Closed).message)
            },
            delete: (arg) => {
                const id = parseId(arg);
                if (id === null) return;
                console.log(taskManager.deleteTask(id).message)
            },

            summary: () => console.log(taskManager.getSummary())
        };

        // Run the matching handler; unknown commands fall back to printHelp.
        // `?? ""` keeps the index a string when command is undefined.
        (commandMap[command ?? ""] ?? printHelp)(argument)


        promptLoop(currentUser);
    })
}


// Runs once at startup: asks for a name, creates the user, then starts the
// command loop. Re-asks (recursively) if the name is empty.
function askName(): void {

    rl.question("What is your name?", (name:string) =>{
        const trimmed = name.trim();
        if (!trimmed){
            console.log("Name cannot be empty")
            askName();
            return;
        }

        const currentUser = userManager.addUser(trimmed, `${trimmed.toLowerCase()}@example.com`);
        console.log(`Hi ${currentUser.name}! Tasks you add will be assigend to you`
        )
        printHelp();
        promptLoop(currentUser);
    })
}


// Program entry point
askName();
