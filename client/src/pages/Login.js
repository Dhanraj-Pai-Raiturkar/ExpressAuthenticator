import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const data = await response.json();
            alert(`Login Successful ${data.user.name}`);
            console.log("response", data);
        } catch (error) {
            console.log("error", error);
            alert("Invalid User");
        }
    }

    return (
        <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="App">
            <form style={{ display: 'flex', flexDirection: 'column', width: '60%', justifyContent: 'space-between' }} onSubmit={handleSubmit}>
                <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                <input type="submit" />
            </form>
        </div>
    );
};

export default Login;