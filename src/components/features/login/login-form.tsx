import LoginInput from "./login-input";
import { useAuthContext } from "../../../context/auth-context";
import { login } from "../../../services/api/login";
import { useMemoContext } from "../../../context/memo-context";


export default function LoginForm() {

    const { error, accessToken, setAccessToken, setIsAuthenticated, isAuthenticated } = useAuthContext();
    const { setCategories } = useMemoContext();


    const onSubmit = async (formData: FormData) => {
        const accessToken = formData.get("access_token") as string;
        try {
            const response = await login(accessToken);
            if (response.status === 200) {
                setAccessToken(accessToken)
                setIsAuthenticated(true)
                const data = await response.json();
                setCategories(data)
            }

        } catch (e) {
            console.log(e)
        }

    }

    return (
        <form className="flex block items-center space-x-5 md:w-3/10" action={onSubmit}>
            <LoginInput labelText="access token" id="access_token" />
            <div className="self-end">
                <button id="login" disabled={Boolean(error.isError) || !accessToken || isAuthenticated} className="btn">LOGIN</button>
            </div>
        </form >
    )

}