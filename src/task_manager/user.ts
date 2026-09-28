import { User, ID } from './types.js'

// Stores users in memory and links tasks to them
export class UserManager {

    private users: User[] = [];
    private nextId: number = 1;

    addUser(name: string, email: string): User {
        const newUser: User = {
            id: this.nextId++,
            name,
            email,
            taskIds: []
        }
        this.users.push(newUser);
        return newUser
    }

    findUserById(id:ID): User | undefined{
        return this.users.find(u => u.id === id)
    }

    getAllUsers():User[]{
        return [...this.users]
    }

    // Adds a task id to the user's list; returns false if the user does not exist
    assignTask(userId: ID, taskId: ID): boolean{
        const user = this.findUserById(userId)
        if(!user) return false
        user.taskIds.push(taskId)
        return true
    }
}