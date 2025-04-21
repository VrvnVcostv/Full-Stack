import { WritableSignal } from "@angular/core"

export interface UserForm {
    email: WritableSignal<string>,
    photo: WritableSignal<string>,
    username: WritableSignal<string>,
    password: WritableSignal<string>,
    confirmPassword: WritableSignal<string>
}
