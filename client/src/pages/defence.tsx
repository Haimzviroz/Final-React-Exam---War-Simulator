import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import styles from "./defence.module.css";
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
  const { user } = useSelector((state: RootState) => state.user);
  const [attacks, setAttacks] = useState([]);
  const location = user?.location;

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
    <div className={styles.container}>
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
        <table className={styles.table}>
          <tr>
            <th>Rocket</th>
            <th>Time to Hit</th>
            <th>status</th>
          </tr>

          {attacks.map((a: attackType) => (
            <tr key={a._id}>
              <td>{a.name}</td>
              <td>{a.timeToHit}</td>
              <td >{a.status} <button onClick={() => handleInterception(a._id)}>x</button></td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Defence;
