import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import store from "../../../Redux/Store";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [isLoggedIn, setIsLoggedIn] = useState(store.getState().authReducer.user?.token?.length > 0);
    const [email, setEmail] = useState(store.getState().authReducer.user?.email);

    useEffect(() => {
        return store.subscribe(() => {
            setIsLoggedIn(store.getState().authReducer.user?.token?.length > 0)
            setEmail(store.getState().authReducer.user?.email);
        });
    }, [])
    return (
        <div className="AuthMenu flex-row">
            {
                isLoggedIn
                    ?
                    <>Hello {email} <CustomLink to="logout">Logout</CustomLink></>
                    :
                    <>Hello Guest  <CustomLink to="login">Login</CustomLink> <CustomLink to="register">Register</CustomLink></>
            }



        </div>
    );
}

export default AuthMenu;
