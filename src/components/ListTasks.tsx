import { propsList } from "@/type/listTasks";
import { propsTask } from "@/type/task";

function ListTasks({ loading, tasks, deleteTask, toggles }: propsList) {
  return (
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
  );
}

export default ListTasks;
