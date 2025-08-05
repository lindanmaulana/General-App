import { FormLogin } from "@/app/dashboard/(auth)/login/_components/FormLogin"
import { Metadata } from "next"
import { AuthContainer } from "../_components/AuthContainer"

export const metadata: Metadata = {
    title: "Auth | Login"
}
const LoginPage = () => {
    return (
        <AuthContainer title="Wellcome back" description="Welcome back! Please enter your details" type="LOGIN">
            <FormLogin />
        </AuthContainer>
    )
}

export default LoginPage