import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState();

    useEffect(() => {
        const fetchUsers = async() => {
            const response = await fetch('http://localhost:5000/users', {
                method: 'GET',
                headers: {
                    'Authorization': `bearer ${JSON.parse(sessionStorage?.jwt ?? "{}")}`
                }
            });
            const data = await response.json();
            setUsers(data.user);
        }
        if(!sessionStorage.jwt){
            navigate("/login");
        }else{
            fetchUsers();
        }
    }, []);

    return(
        <div>
            <h1>Welcome to Dashboard</h1>
            {users && users.map(user => {
                return <h4>{user.name}</h4>
            })}
        </div>
    )
};

export default Dashboard;
