import "./App.css";
import axios from "axios";

import { useState, useEffect } from "react";
const airflowAxios = axios.create({
  baseURL: "http://20.106.154.134:8080/api/v1/",
  headers: {
    accept: "application/json",
    // "Content-Type": "application/json",
  },
  auth: {
    username: "airflow",
    password: "airflow",
  },
});
export default function App() {
  const [isClick, setisClick] = useState(false);
  useEffect(() => {
    const handle = async () => {
      const ok = await triggerDag("5_apitest");
      console.log(ok);
    };
    handle();
  }, [isClick]);
  const triggerDag = (id) => {
    return airflowAxios
      .post(`/dags/${id}/dagRuns/`, {
        conf: {
          project: "test",
        },
        dag_run_id: "string89",
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
  return (
    <div className="App">
      <h1>Hello </h1>
      <h2>Test API Airflow</h2>
      <button onClick={() => setisClick(!isClick)}>Trigger</button>
    </div>
  );
}
