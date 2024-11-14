import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchlogin } from "../store/features/userSlice";

const Defence = () => {
  const { user, status, error } = useSelector((state: RootState) => state.user);
  const [currentUser, setcurrentUser] = useState(user);
  const [location, setLocation] = useState("");
  const id = user?._id;
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (rocketName: string) => {
    axios.post(`http://localhost:3000/attack/attack/${id}`, {
      name: rocketName,
      location: location,

    });

    if (user) {
        dispatch(fetchlogin({ username: user.username, password : user.password }));
        setcurrentUser(user);
    }

  };
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.currentTarget.value);
  };

  return (
    <div>
      <h1>Organization {currentUser?.name}</h1>
      <div>
        <h2>Available Ammo</h2>
        {currentUser &&
          currentUser.resources?.map((r) => (
            <button key={r.name} onClick={() => handleClick(r.name)}>
              {r.name} x {r.amount}
            </button>
          ))}

        <select onChange={handleLocationChange}>
            <option value="">-</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="Center">Center</option>
          <option value="West Bank">West Bank</option>
        </select>
      </div>
    </div>
  );
};

export default Defence;
