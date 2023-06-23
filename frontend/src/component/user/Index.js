import { useState, useEffect } from "react"
import UserList from "./List"
import CreateUser from "./Create"

function User() {
    const [users, setUsers] = useState([])
    const [userForm, setUserForm] = useState({
        name: "",
        email: "",
        submit: false
    })

    const getUsers = () => {
        fetch("http://localhost:3001/api/users").then(data => data.json()).then(jsondata => {
            console.log("ddd")
            setUsers(jsondata)

            setUserForm(() => ({
                name: "",
                email: "",
                submit: false,
            }))
        })
    }
    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        if (userForm?.submit == true) {
            getUsers()
        }
    }, [userForm?.submit])

    return (
        <>
            <CreateUser userForm={userForm} setUserForm={setUserForm} />
            <hr />
            <UserList users={users} setUserForm={setUserForm} />
        </>
    )
}

export default User