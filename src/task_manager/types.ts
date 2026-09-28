// Shared types and interfaces for the task manager


import { Priority, Status } from "./enums.js";

export type ID = number | string;

export interface Task {
    id: ID,
    title: string,
    description?: string,
    priority: Priority,
    status: Status;
    assignedTo?: ID,
    date: string
}

export interface User {
    id: ID,
    name: string,
    email: string,
    taskIds: ID[]
}

// A function that decides if a task matches (true) or not (false)
export type TaskFilter = ( task:Task) => boolean;

// Generic result returned by the managers: the data, plus a success flag and a message
export interface ApiResponse<T> {
    data: T,
    success: boolean,
    message: string
}