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
import AddTask from "@/components/AddTask";
import ListTasks from "@/components/ListTasks";
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
  const updateTask = async (id: string, title: string) => {
    const newTitle = { title: value };
    const taskDoc = doc(db, "todos", id);
    await updateDoc(taskDoc, newTitle);
    setBtn(false);
    setValue("");
    getTasks();
  };
  // POST TASK
  const postTask = async () => {
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
      <h1 className="text-neutral-600 text-[40px] font-bold mb-10">ToDo</h1>
      <AddTask
        value={value}
        setValue={setValue}
        postTask={postTask}
        updateTask={updateTask}
        btn={btn}
        id={id}
        ref={ref}
      />
      <ListTasks
        loading={loading}
        tasks={tasks}
        toggles={toggles}
        deleteTask={deleteTask}
      />
    </div>
  );
}
