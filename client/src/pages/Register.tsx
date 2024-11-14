import React, { useState } from "react";
import { fetchRegister } from "../store/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isIdf, setIsIdf] = useState(false);
  const [location, setLocation] = useState<string | null>(null);
  const [name, setName] = useState("");
  const { user, status, error } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchRegister({ username, password, isIdf, location, name }));
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.currentTarget.value;
    setName(selectedName);
    setIsIdf(selectedName === "IDF");
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.currentTarget.value);
    setName("IDF - " + e.currentTarget.value);
  };
  React.useEffect(() => {
    if (status === "succeeded") {
      navigate("/"); // ניווט לדף הראשי אחרי הצלחה
    }
  }, [status]);
  return (
    <div className={styles.container} >
      <form onSubmit={handleForm}>
        <input className={styles.input}
          type="text"
          placeholder="Please insert username"
          onChange={(e) => setUserName(e.currentTarget.value)}
        />
        <input  className={styles.input}
          type="password"
          placeholder="Please insert password here"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <select onChange={handleSelect} className={styles.select}>
          <option value="someOption">-</option>
          <option value="IDF">IDF</option>
          <option value="Hezbollah">Hezbollah</option>
          <option value="Hamas">Hamas</option>
          <option value="IRGC">IRGC</option>
          <option value="Houthis">Houthis</option>
        </select>
        {isIdf && (
          <select onChange={handleLocationChange} className={styles.select}>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="Center">Center</option>
            <option value="West Bank">West Bank</option>
          </select>
        )}
        <input type="submit" value="Submit"  className={styles.submit}/>
      </form>
      <div>
        {status === "loading" && <p>Loading...</p>}
        {status === "succeeded" && user && (
          <p>User registered successfully! {`${isIdf} ${location} ${name}`}</p>
        )}
        {status === "failed" && error && <p>Registration failed: </p>}
      </div>
    </div>
  );
};

export default Register;
