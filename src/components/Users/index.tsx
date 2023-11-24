import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { FC, useEffect, useRef } from "react";

import "./index.css";
import UserItem from "../UserITem";
import UserForm from "../UserForm";
import { toggleChangeUser, togglePopup } from "./userSlice";

const User: FC = () => {
    const { localUsers } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const isMounted = useRef(false);

    useEffect(() => {
        if (isMounted.current) {
            const json = JSON.stringify(localUsers);
            localStorage.setItem("users", json);
        }
        isMounted.current = true;
    }, [localUsers]);

    return (
        <>
            <div className="user bg-gray-900 min-h-screen p-10">
                <div className="container mx-auto px-48">
                    <h1 className="text-white text-center fs-2 font-bold text-4xl">
                        User Control
                    </h1>
                    <div className="user_wrapper bg-slate-600 p-5 mx-auto mt-10 rounded-xl shadow-md shadow-indigo-700">
                        <ul className="my-4 space-y-3">
                            {localUsers.map((el: any, index: number) => (
                                <UserItem user={el} key={el.id} index={index} />
                            ))}
                        </ul>

                        <button
                            onClick={() => {
                                dispatch(togglePopup());
                                dispatch(toggleChangeUser(false));
                            }}
                            className="bg-indigo-700 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-indigo-900 hover:border-blue-500 rounded"
                        >
                            Add User
                        </button>
                    </div>
                </div>
            </div>
            <UserForm />
        </>
    );
};

export default User;
