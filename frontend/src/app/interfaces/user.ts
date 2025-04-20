import { WritableSignal } from "@angular/core"

export interface User {
    email: WritableSignal<String>,
    photo?: WritableSignal<String>,
    username: WritableSignal<String>,
    password: WritableSignal<String>,
    confirmPassword: WritableSignal<String>
}
