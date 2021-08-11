//importing the css file for register
import "./register.css";

//importing the room marker
import { Room } from '@material-ui/icons';

export default function Register (){
    return (
        <div className="registerContainer">
            <div className="logo">
                {/* creating logo using material ui */}
                <Room/>
                Pin Here
            </div>
            <form>
                <input type="text" placeholder="username" />
                <input type="text" placeholder="email" />
                <input type="password" placeholder="password" />
                <button className="registerBtn">Register</button>
            </form>
        </div>
    );
}

