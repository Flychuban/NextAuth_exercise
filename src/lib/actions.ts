import { executeAction } from "./executeAction"
import { userSchema } from "./zod_schema"
import db from "./db"
const signUp = async (formData: FormData) => {
    return executeAction({
        actionFn: async () => {
            const email = formData.get("email")
            const password = formData.get("password")
            const validateData = userSchema.parse({email, password})
            await db.user.create({
                data: {
                    email: validateData.email.toLowerCase(),
                    password: validateData.password
                }
            })
        },
    })
}

export { signUp }