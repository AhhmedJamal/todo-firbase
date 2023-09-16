"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  DocumentData,
  doc,
} from "firebase/firestore";
import { propsTask } from "../type/task";
export default function App() {
  const [value, setValue] = useState("");
  const [id, setId] = useState("");
  const [tasks, setTasks] = useState([]);
  const [btn, setBtn] = useState(false);
  const [loading, setLoading] = useState(true);
  const tasksCollectionsRef = collection(db, "todos");
  const ref = useRef<any>();

  // DELETE TASK
  const deleteTask = async (id: string) => {
    Swal.fire({
      confirmButtonColor: "red",
      width: "80%",
      title: `Are You Sure Delete `,
      showCancelButton: true,
    }).then((user) => {
      if (user.isConfirmed) {
        const taskDoc = doc(db, "todos", id);
        deleteDoc(taskDoc);
        getTasks();
      }
    });
  };
  //PUT TASK
  const toggles = (title: string, id: string) => {
    setId(id);
    setValue(title);
    setBtn(true);
    ref.current?.focus();
  };
  const updateTasks = async (id: string, title: string) => {
    const newTitle = { title: value };
    const taskDoc = doc(db, "todos", id);
    await updateDoc(taskDoc, newTitle);
    setBtn(false);
    setValue("");
    getTasks();
  };
  // POST TASK
  const postData = async () => {
    if (value !== "") {
      await addDoc(tasksCollectionsRef, { title: value });
      setValue("");
      getTasks();
    } else {
      ref.current.style.border = "3px solid orange";
      ref.current.placeholder = "Is Empty !!";
      setInterval(() => {
        ref.current.placeholder = "Enter Some Task";
        ref.current.style.border = "none";
      }, 2000);
    }
  };
  // GET TASKS
  const getTasks = async () => {
    const data: DocumentData = await getDocs(tasksCollectionsRef);
    setTasks(
      data.docs.map((doc: DocumentData) => ({ ...doc.data(), id: doc.id }))
    );
  };
  useEffect(() => {
    ref.current?.focus();
    setLoading(true);
    setInterval(() => {
      setLoading(false);
    }, 300);
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-[93%] sm:w-[80%]  m-[auto] flex flex-col items-center mt-[60px] ">
      <h1 className="text-white text-[40px] font-bold mb-10">ToDo</h1>
      <div className="h-[50px] flex justify-center rounded  items-center w-[100%] sm:w-[80%]  bg-neutral-600 px-5 py-12">
        <input
          className="h-[48px] w-[90%] outline-none border-none pl-2 opacity-[0.9] font-bold rounded-tl-[10px] rounded-bl-[10px]"
          type="text"
          placeholder="Enter Some Task"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={value}
          ref={ref}
        />
        {btn ? (
          <button
            className="bg-green-500 hover:bg-green-600 transition-all duration-200  
            text-white font-bold p-3 rounded-br-[10px] px-[0px]  rounded-tr-[10px] w-[80px]"
            onClick={() => {
              updateTasks(id, value);
            }}
          >
            Done
          </button>
        ) : (
          <button
            onClick={() => {
              postData();
            }}
            className="bg-orange-600 hover:bg-orange-700 transition-all duration-200 
                    text-white font-bold p-3 px-[0px] rounded-tr-[10px] rounded-br-[10px] w-[80px]"
          >
            Add
          </button>
        )}
      </div>
      <div className="w-[100%] sm:w-[80%] rounded bg-neutral-600 mt-5 p-5 text-white font-bold flex flex-col justify-center items-center">
        {!loading ? (
          <div className="w-[100%] flex flex-col ">
            {tasks.length !== 0 ? (
              <ul>
                {tasks.map((task: propsTask) => {
                  return (
                    <li
                      key={task.id}
                      className="bg-neutral-400 p-2  rounded my-[20px] flex justify-between items-center "
                    >
                      {task.title}
                      <div className="links text-white">
                        <button
                          className="bg-red-500 rounded p-1 w-[30px]"
                          onClick={() => {
                            deleteTask(task.id);
                          }}
                        >
                          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAm0lEQVR4nO2TQQrCMBBFexwXcRV3tnu9tgW9RwVLvMSTwAilKqXtDJEyDwLDT8iDT1JVzr8C3PjkqnV5ix5tKfFFpY3tghIunsSrFo5ABNI7kDlnNV/QqjrKXhBhXkGyg6U4DURhNCdLceYJ7AfndkDPD6zFD2txKlV1LPW4ahGMv1POGkvxbFw8CXBnPd0S8XmlvANOs8XOZngBROB3cnadELQAAAAASUVORK5CYII=" />
                        </button>

                        <button
                          className="bg-yellow-500 rounded p-1 ml-1  w-[30px]"
                          onClick={() => {
                            toggles(task.title, task.id);
                          }}
                        >
                          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABaUlEQVR4nO2ZTU7DMBBGTRdd9BCFs5TCRbgKZY1YtCDRq/G7L6VF6ibSQyMcyYoCbT12HKR5yyiZ+b7x2E4c5wzDMIwWgAFwB3wB104DcAY8AO9AhZ4dMNsjfhnc/6kRfwlsSM/2QPHCrabyOcS3jgDt4h/leqwBaZuaJ2ACDKOC7c81SCreB5Wer5kkVZxbvNCYsP+n8jVhRJcB4ARYNMQvk4jPbSC7+JwGOhGfy0Bn4nMYOGbCAjey2f21Y3dq4NjVhp/NTtgVNxDTNqTInSJIbM/TBwOaCUtpA9rVhpIGUiyVFDYw077bUMoAMAJWsZXvg4Er/8iHfMvG7rAUNLDwJkbRiV0PViEtmAFnI6ACayFnLdSLFqpyH6u0IbmCvJWLBXjr4mCrCTAN8r64WID7INCzDzzMXPkLn6tmrgl4KkfblGMNjLVVmRYysQbOVeIDE2MZSuA10Q+O36h8jrm68oZhGIY7gG9pI/ZvKbjq+QAAAABJRU5ErkJggg==" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <h1 className="m-[auto] text-[25px]">Not Found Tasks !</h1>
            )}
          </div>
        ) : (
          <span className="loader "></span>
        )}
      </div>
    </div>
  );
}
