import React, {useState} from "react";
import "./login.scss";


interface LoginFormProps {
    apiLogin?: (credential: any) => Promise<string>;
    // apiLogin: (username: string, password: string) => Promise<void>;
}

async function apiLogin(credential: any) {
    console.log(credential);
    return "OK";
}


export function LoginForm(props: LoginFormProps) {
    const [userinfo, setUserinfo] = useState<Userinfo | null>(null);
    const [form, setForm] = useState({});

    // useEffect(() => {
    //     fetchUserinfo(setUserinfo)
    // }, []);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setForm({...form, [event.target.name]: event.target.value});
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        (props.apiLogin || apiLogin)(form);
    }

    if (userinfo) {
        return <div className="zenux-dashboard login-form">
            <h2>User logged-in:</h2>
            <form action="#">
                <input type="text" placeholder="Username" value={userinfo.username} disabled={true}/>
                <input type="password" placeholder="Password" value="*****" disabled={true}/>
                <input type="submit" value="Login" disabled={true}/>
            </form>
        </div>
    }
    return <div className="zenux-dashboard login-form">
        <h2>Login</h2>
        <form action="#" onSubmit={handleSubmit}>
            <input name="username" placeholder="username" required onChange={handleChange}
                   type="text"/>
            <input name="password" placeholder="Password" required onChange={handleChange}
                   type="password"/>
            <input type="submit" value="Login"/>
        </form>
    </div>
}


export function LoginPage(props: LoginFormProps) {
    return <div className="zenux-dashboard login-page">
        <div className="form1">
            <LoginForm {...props}/>
        </div>
    </div>
}

interface Userinfo {
    email: string,
    groups: string[],
    nickname: string,
    username: string,
}
