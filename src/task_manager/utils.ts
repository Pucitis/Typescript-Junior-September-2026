import { Task } from "./types.js";
import { Priority, Status } from "./enums.js";

// Generic function to log any array of items.
// T stands for the item type, and the label is optional (the ? after its name)
export function logAll<T>(items: T[], label?: string): void {
    if (label) {
        console.log(`\n --- ${label} ---`)
    }
    if (items.length === 0) {
        console.log(" No items to log")
        return
    }
    items.forEach((item, index) => {
        console.log(`[${index + 1}]`, item)
    })
}

// let testArray: string[] = ["hELLO", "One", "Threee"];
// logAll(testArray, "Test Array")






// The goal: one findBy that works for ANY array and ANY key of its items.
// K extends keyof T limits key to real property names of T,
// and value must have the same type as that property (T[K]).
// It returns the first matching item, or undefined if nothing matches.

export function findBy<T, K extends keyof T>(items: T[], key: K, value: T[K]): T | undefined {
    return items.find(item => item[key] === value)
}



let testTasks: Task[] = [
    { id: 1, title: "Documentation", priority: Priority.Low, status: Status.Open, date: "2026-09-24" },
    { id: 2, title: "Fix Bugs", priority: Priority.High, status: Status.InProcess, date: "2026-09-20" }
]

// console.log(findBy(testTasks, "id", 2))
// console.log(findBy(testTasks, "status", Status.Open))
// console.log(findBy(testTasks, "id", true))


// Format an ISO date string into something more readable (day, short month, year)

export function formatDate(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleDateString("lv-LV", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    })
}

// console.log(formatDate("2026-09-24T16:23:46.109Z"))
// console.log(new Date().toISOString())


// Type guard: checks that an unknown value really looks like a Task before we trust it.
// The return type "value is Task" tells TS to treat the value as a Task
// inside an if that calls this function.
// (This is a simple check: it only looks for the priority and status properties.)

export function isTask(value: unknown): value is Task {
    return (
        typeof value === "object" &&
        value !== null &&
        "priority" in value &&
        "status" in value
    )
}

console.log(isTask({ test: "Hello" }))
console.log(isTask({ priority: "High", status: "Open" }))
console.log(isTask({ priority: "High" }))

