import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
// import { joinRoom } from "../store/features/socketSlice";
import { useEffect, useState } from "react";
import axios from "axios";
interface attackType {
  name: string;
  status: string;
  sentFrom: string;
  sentTo: string;
  _id: string;
  timeToHit: number;
}

const Defence = () => {
  const { user, status, error } = useSelector((state: RootState) => state.user);
  const [attacks, setAttacks] = useState([]);
  const location = user?.location;

  const dispatch = useDispatch<AppDispatch>();



  const handleInterception = (_id: string) => {
    axios.get(`http://localhost:3000/defence/interception/${_id}`);

  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios
        .get(`http://localhost:3000/defence/defence/${location}`)
        .then((res) => {
          setAttacks(res.data);
        });
    }, 3000);
    console.log(attacks);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Organization {user?.name}</h1>
      <div>
        <h2>Available Ammo</h2>
        {user &&
          user.resources?.map((r) => (
            <span key={r.name}>
              {r.name} x {r.amount}
            </span>
          ))}
      </div>
      <div>
        <h2>Attacks</h2>
        <p>rocket | status | time</p>
        {attacks.map((a: attackType) => (
          <p key={a._id}>
            {a.name} | {a.status} |{a.timeToHit}
            {a.status === "launched" && (
              <button onClick={() => handleInterception(a._id)}>X</button>
            )}{" "}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Defence;
