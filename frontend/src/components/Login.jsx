//importing the css file for login
import "./login.css";

//importing the room marker
import { Cancel, Room } from '@material-ui/icons';

//importing useState
import { useState, useRef } from 'react';

//importing axios
import axios from 'axios';


//taking setShowLogin as prop
export default function Login({ setShowLogin, myStorage, setCurrentUser }) {
    //creating a useState to check whether error
    const [error, setError] = useState(false);

    //reacting a refernce for name
    const nameRef = useRef();
    //reacting a reference for password
    const passwordRef = useRef();

    //function to handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();//preventing default action like refreshing of page
        //creating a user object
        const user = {
            username: nameRef.current.value,
            password: passwordRef.current.value,
        };
        try {
            //posting the details to backend
            const res = await axios.post("/users/login", user);
            //setting the item in mystorage in key value pair
            myStorage.setItem("user", res.data.username);
            //setting the login status to false
            setShowLogin(false);
            //setting the current user in current user
            setCurrentUser(res.data.username);
            //setting error
            setError(false);
        } catch (err) {
            //if error occurs
            setError(true);
        }
    };

    return (
        <div className="loginContainer">
            <div className="logo">
                {/* creating logo using material ui */}
                <Room />
                Pin Here
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={nameRef} />
                <input type="password" placeholder="password" ref={passwordRef} />
                <button className="loginBtn">Login</button>
                {error && <span className="failure">Something went wrong!</span>}
            </form>
            {/* making the cancel button clickable */}
            <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
        </div>
    );
}

