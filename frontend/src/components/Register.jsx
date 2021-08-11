//importing the css file for register
import "./register.css";

//importing the room marker
import { Cancel, Room } from '@material-ui/icons';

//importing useState
import { useState, useRef } from 'react';

//importing axios
import axios from 'axios';


//taking setShowRegister as prop
export default function Register({ setShowRegister }) {
    //creating a usestate to check whether success 
    const [success, setSuccess] = useState(false);

    //creating a useState to check whether error
    const [error, setError] = useState(false);

    //reacting a refernce for name
    const nameRef = useRef();
    //reacting a reference for email
    const emailRef = useRef();
    //reacting a reference for password
    const passwordRef = useRef();

    //function to handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();//preventing default action like refreshing of page
        //creating a newUser object
        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        try {
            //posting the details to backend
            await axios.post("/users/register", newUser);
            //setting error
            setError(false);
            //setting success
            setSuccess(true);
        } catch (err) {
            //if error occurs
            setError(true);
        }
    };

    return (
        <div className="registerContainer">
            <div className="logo">
                {/* creating logo using material ui */}
                <Room />
                Pin Here
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" ref={nameRef} />
                <input type="text" placeholder="email" ref={emailRef} />
                <input type="password" placeholder="password" ref={passwordRef} />
                <button className="registerBtn">Register</button>
                {success && (
                    <span className="success">Succecssful.You can login now!</span>
                )}
                {error &&
                    <span className="failure">Something went wrong!</span>
                }
            </form>
            {/* making the cancel button clickable */}
            <Cancel className="registerCancel" onClick={() => setShowRegister(false)} />
        </div>
    );
}

