import React, { useState } from "react";
import { fetchlogin } from "../store/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

const login = () => {
  const [username, setUserName] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const { user, status, error } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const handleForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchlogin({ username, password }));
  };
  React.useEffect(() => {

    if (status === "succeeded") {

      user?.isIdf ? navigate("/defence") : navigate("/attack"); // ניווט לדף הראשי אחרי הצלחה
    }
  }, [status]);

  return (
    <div>
      <form onSubmit={handleForm}>
        <input
          type="text"
          placeholder="please insert userName"
          onChange={(e) => {
            setUserName(e.currentTarget.value);
          }}
        />
        <input
          type="password"
          placeholder="please insert password here"
          onChange={(e) => {
            setpassword(e.currentTarget.value);
          }}
        />
        <input type="submit" placeholder="submit" />
      </form>
      <div>
        {user ? (
          <p>coneccted successfuly </p>
        ) : error ? (
          <p>failed</p>
        ) : (
          <p> </p>
        )}
      </div>
    </div>
  );
};

export default login;
