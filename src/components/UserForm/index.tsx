import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    addUser,
    changeUserData,
    selectUser,
    toggleChangeUser,
    togglePopup,
} from "../Users/userSlice";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useMemo } from "react";

const UserForm = () => {
    const dispatch = useAppDispatch();
    const { popupOpen, changeUser, selctedUserIndex, localUsers } =
        useAppSelector((state) => state.user);
    const currentUser = localUsers[selctedUserIndex];
    useEffect(() => {
        if (currentUser && changeUser) {
            formik.setValues(currentUser);
        } else {
            formik.setValues({ firstName: "", lastName: "" });
        }
    }, [currentUser, changeUser]);
    const formik = useFormik<{ firstName: string; lastName: string }>({
        initialValues: {
            firstName: "",
            lastName: "",
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("Required"),
            lastName: Yup.string().required("Required"),
        }),
        onSubmit: (values) => {
            const data = JSON.parse(JSON.stringify(values, null, 2));
            data.id = uuidv4();
            if (!changeUser) {
                data.index = localUsers.length;
                dispatch(addUser(data));
            } else {
                const newData = {
                    data,
                    index: selctedUserIndex,
                };
                dispatch(changeUserData(newData));
            }
            dispatch(togglePopup());
            dispatch(toggleChangeUser(false));
            dispatch(selectUser(null));
        },
    });

    return (
        <>
            <div
                id="default-modal"
                onClick={(e) => {
                    const target = e.target as HTMLDivElement;
                    if (target.id === "default-modal") {
                        dispatch(togglePopup());
                        dispatch(toggleChangeUser(false));
                    }
                }}
                aria-hidden="true"
                className={`${
                    popupOpen ? "block" : "hidden"
                } bg-gray-600 bg-opacity-20 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
            >
                <div
                    className="relative mx-auto top-1/2 p-4 w-full max-w-2xl max-h-full"
                    style={{ transform: "translateY(-50%)" }}
                >
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {changeUser
                                    ? "Change User Data"
                                    : "Add New User"}
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="default-modal"
                                onClick={() => {
                                    dispatch(togglePopup());
                                    dispatch(selectUser(null));
                                }}
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <div className="p-4 md:p-5 space-y-4">
                            <form
                                onSubmit={formik.handleSubmit}
                                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                            >
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="username"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        placeholder="First Name"
                                        onChange={formik.handleChange}
                                        value={formik.values.firstName}
                                    />
                                    {formik.errors.firstName &&
                                    formik.touched.firstName ? (
                                        <div className="text-red-600">
                                            {formik.errors.firstName}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="username"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="lastName"
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        onChange={formik.handleChange}
                                        value={formik.values.lastName}
                                    />
                                    {formik.errors.lastName &&
                                    formik.touched.lastName ? (
                                        <div className="text-red-600">
                                            {formik.errors.lastName}
                                        </div>
                                    ) : null}
                                </div>

                                <div className="flex items-center pt-4 rounded-b">
                                    <button
                                        type="submit"
                                        className="bg-indigo-700 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-indigo-900 hover:border-blue-500 rounded"
                                    >
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserForm;
