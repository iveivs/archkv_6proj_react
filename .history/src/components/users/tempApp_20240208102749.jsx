import React, { useState, useEffect } from "react";
import "./index.scss";
import { Success } from "./Success";
import { Users } from "./Users/index";

// Тут список пользователей: https://reqres.in/api/users
// приложение для приглашения людей из списка пользователей
// 
function TempAppUsers() {
    const [users, setUsers] = useState([]);
    const [invates, setInvates] = useState([]);
    const [success, setSuccess] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        fetch("https://reqres.in/api/users")
            .then((res) => res.json())
            .then((jsonData) => {
                setUsers(jsonData.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    
    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value);
    };
// 
    const onClickInvate = (id) => {
        if (invates.includes(id)) {
            setInvates((prev) => prev.filter((_id) => _id !== id));
        } else {
            setInvates((prev) => [...prev, id]);
        }
    };

    const onClickSendInvates = () => {
        setSuccess(true);
    };

    return (
        <div className="tempapp">
            {success ? (
                <Success count={invates.length} />
            ) : (
                <Users
                    onChangeSearchValue={onChangeSearchValue}
                    onClickSendInvates={onClickSendInvates}
                    searchValue={searchValue}
                    items={users}
                    isLoading={isLoading}
                    invates={invates}
                    onClickInvate={onClickInvate}
                />
            )}

        </div>
    );
}

export default TempAppUsers;
