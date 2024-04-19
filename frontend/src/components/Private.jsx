import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
export default function Private(props){

    const loggedData=useContext(UserContext);

    console.log(loggedData);
    return (
        loggedData.loggedUser!==null?
        <props.Component/>
        :
        <Navigate to="/login"/>
    )

}