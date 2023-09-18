import { propsAdd } from "@/type/task";

function AddTask({
  value,
  setValue,
  postTask,
  updateTask,
  ref,
  id,
  btn,
}: propsAdd) {
  return (
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
            updateTask(id, value);
          }}
        >
          Done
        </button>
      ) : (
        <button
          onClick={() => {
            postTask();
          }}
          className="bg-neutral-400 hover:bg-neutral-500 transition-all duration-200 
              text-white font-bold p-3 px-[0px] rounded-tr-[10px] rounded-br-[10px] w-[80px]"
        >
          Add
        </button>
      )}
    </div>
  );
}

export default AddTask;
