import { AuthContainer } from "../_components/AuthContainer"
import { FormRegister } from "./_components/FormRegister"

const PageRegister = () => {
    return (
        <AuthContainer type="REGISTER" title="Create new account" description="Wellcome back! please enter your details" >
            <FormRegister />
        </AuthContainer>
    )
}

export default PageRegister