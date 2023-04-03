import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

export const Register = ({
    signUp,
    setUsers
}) => {

    const { setLoggedStatus } = useContext(AppContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [description, setDescription] = useState('');

    const signUpHandler = async () => {
        let newUser = {
            email,
            username: email.split("@")[0],
            profilePicture: "https://i.pinimg.com/564x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg",
            coverImage: "https://i.ibb.co/NLMtRJH/cover-Image.jpg",
            description,
            theme: "default",
            authored: [],
            saved: [],
            liked: [],
            following: []
        }
        let userId = await signUp(email, password, newUser, setLoggedStatus);
        setUsers(oldUsers => [...oldUsers, { ...newUser, userId }])
    }

    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate("/login")
    }

    return (
        <div>
            <div>
                <label htmlFor="email">Email:</label>
                <input placeholder="Email..." id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <label htmlFor="password">Password:</label>
                <input placeholder="Password..." id="password" type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
                <label htmlFor="confirm">Confirm Password:</label>
                <input placeholder="Password..." id="confirm" type='password' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                <label htmlFor="description">Tell us about yourself!</label>
                <textarea name="description" id="description" cols="30" rows="6" onChange={(e) => setDescription(e.target.value)} value={description} ></textarea>
            </div>
            <div style={{ margin: '20px' }}>
                <button onClick={signUpHandler}>Register</button>
                <p>Already have an account?</p>
                <button onClick={navigateToLogin}>Click here to login!</button>
            </div>
        </div>
    );

}