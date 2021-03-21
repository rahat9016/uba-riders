import React, { useContext,  useState} from 'react';
import { useForm} from 'react-hook-form';
import './login.css'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../firebaseConfig/firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';


    const Login = () => {
        let history = useHistory();
        let location = useLocation();
        let { from } = location.state || { from: { pathname: "/" } };

        const [userData,setUserData] = useContext(UserContext)
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }
        const {
            register,
        } = useForm();
        const [newUser, setNewUser] = useState(false)
        const [loggedInUser, setLoggedInUSer] = useState({
            isSignIn: false,
            name: '',
            email: '',
            password: '',
            error: '',
            success: false

        })
        //Google Sign In Event Handler
        const googleSignInEventHandler = () => {
            const googleProvider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(googleProvider)
                .then(res => {
                    setLoggedInUSer(res.user)
                    setUserData(res.user)
                    history.replace(from);
                })
                .catch(error => {
                    console.log(error)
                });
        }
        //Facebook Sign In Event Handler
        const facebookSignInEventHandler = () => {
            var facebookProvider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(facebookProvider)
                .then(res => {
                    setLoggedInUSer(res.user)
                    setUserData(res.user)
                    history.replace(from);
                })
                .catch(error => {
                    console.log(error)
                });
        }
        const handleChange = (event) => {
            // console.log(event.target.name, event.target.value)
            let isvalidForm = true
            if (event.target.name === 'email') {
                isvalidForm = /\S+@\S+\.\S+/.test(event.target.value)
                // console.log(isValidEmail)
            }
            if (event.target.name === 'password') {
                const isValidPass = event.target.value.length > 6
                const passHasNumber = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{6,}$/.test(event.target.value)
                isvalidForm = (isValidPass && passHasNumber)
            }
            if (event.target.name === "confirmPassword") {
                isvalidForm = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{6,}$/.test(event.target.value)
            }
            if (isvalidForm) {
                const newUserInfo = {...loggedInUser}
                newUserInfo[event.target.name] = event.target.value
                setLoggedInUSer(newUserInfo)
            }
        }
        const handleSubmit = (event) => {
            
                if (newUser && loggedInUser.email && loggedInUser.password) {
                    firebase.auth().createUserWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
                        .then(res => {
                            const newUserInfo = {
                                ...loggedInUser
                            }
                            newUserInfo.error = '';
                            newUserInfo.success = true
                            setLoggedInUSer(newUserInfo)
                            updatedUserName(loggedInUser.name)
                            
                        }).catch(error => {
                            const newUserInfo = {
                                ...loggedInUser
                            }
                            newUserInfo.error = error.message
                            newUserInfo.success = false
                            setLoggedInUSer(newUserInfo)
                        });
                }
            
            if (!newUser && loggedInUser.email && loggedInUser.password) {
                firebase.auth().signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
                    .then(res => {
                        const newUserInfo = {...loggedInUser}
                        newUserInfo.error = '';
                        newUserInfo.success = true
                        setLoggedInUSer(newUserInfo)
                        setLoggedInUSer(res.user)
                        setUserData(newUserInfo)
                        setUserData(res.user)
                        history.replace(from);
                    }).catch(error => {
                        const newUserInfo = {...loggedInUser}
                        newUserInfo.error = error.message
                        newUserInfo.success = false
                        console.log(error.message)
                        setLoggedInUSer(newUserInfo)
                    });
            }
            event.preventDefault()
        }
        const updatedUserName = name=>{
            var user = firebase.auth().currentUser;
            user.updateProfile({
            displayName: name
            }).then(function() {
                console.log("user created successfully ")
            }).catch(function(error) {
                console.log(error)
            });
        }
    return (
    //<!Login Page>//
    <div className = "login-box" >
    <form className="form" onSubmit = {handleSubmit}>
    <h1>{ newUser ? 'Create an account' : 'Login'}</h1>
         { newUser && < input type = 'name' name = "name"onBlur ={handleChange} placeholder = "Name" ref = { register({ required: true })}/>}

        <input type = 'email' name = "email"onBlur = { handleChange}placeholder = "User Or Email"required ref= {register({required: true})}/> 

        

        <input type = "password" name = "password" onBlur = {handleChange}placeholder = "Password"required ref = {register({required: true})}/> 
        
        {newUser && <input type = "password" name="confirmPassword" placeholder = "Confirm Password"ref ={register({required: true})}/>}

        <button type = "submit"className = "loginBtn">{newUser ? 'Sign Up' : 'Login'} </button> 
        <p style = {{color: "red", textAlign: 'center'}}>{loggedInUser.error}</p> 
        
        {loggedInUser.success && < p style = {{color: 'green', textAlign: 'center'}}> User{ newUser ? 'Created' : 'Logged In'} Success</p>}

        <p style = {{textAlign: "center"}}>{ newUser ? 'Already have an Account' : "Don't have an account"} ? <button style = {{background: 'none',border: 'none',outline: 'none',color: 'orange',textDecoration:'underline'}}onClick = {() => setNewUser(!newUser)}> 

        {newUser ? 'Sign In' : 'Create an account'} </button></p>

    </form>
            <button className=" googleSignInBtn"  onClick={googleSignInEventHandler} ><FontAwesomeIcon icon={faGoogle} /> Continue With Google </button>
            <button className="faceBookSignInBtn" onClick={facebookSignInEventHandler}><FontAwesomeIcon icon={faFacebook}/> Continue With Facebook </button> 
    </div>
        );
    };

export default Login;