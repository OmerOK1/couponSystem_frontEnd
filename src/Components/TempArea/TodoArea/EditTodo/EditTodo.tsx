import "./EditTodo.css";
/* import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TodoModel, TodoPayloadModel } from "../../../Models/Todo";
import { useEffect, useState } from "react";
import globals from "../../../../Services/globals";
import axios from "axios";
import notify, { SccMsg } from "../../../../Services/Notification";
import { useNavigate, useParams } from "react-router-dom";
import web from "../../../Services/WebApi";
import store from "../../../../Redux/Store";
import { taskUpdatedAction } from "../../../../Redux/TasksAppState";

interface EditTodoProps { }
function EditTodo(): JSX.Element {

    const navigate = useNavigate();
    const params = useParams();
    const taskId = +(params.id || 0);


    const [id, setId] = useState<number>(taskId);
    // Read from App State (Global State)
    const [task, setTask] = useState<TodoModel>(store.getState().tasksReducer.tasks.filter(t => t.id === id)[0]);
    // const [origin, setOrigin] = useState<TodoPayloadModel>({ 'caption': '', 'info': '', 'classification': '', 'dueDate': new Date() })
    const [origin, setOrigin] = useState<TodoPayloadModel>({ 'caption': task.caption, 'info': task.info, 'classification': task.classification, 'dueDate': task.dueDate })





    // Step 6 - Manage Your schema
    const schema = yup.object().shape({
        caption:
            yup.string()
                .required("Caption is required"),
        info:
            yup.string()
                .required("Info is required"),
        classification:
            yup.string()
                .required("Classification is required"),
        dueDate:
            yup.date()
                .min(new Date(), 'Umm... past due date? come on!')
                .default(new Date())
                .typeError("You must specify a due date")
                .required("due date is required")
                .nullable().default(() => new Date()),

    });

    // Step 7 - Prepare the Hook
    let defaultValuesObj = { ...origin };

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } }
        = useForm<TodoPayloadModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) });

    const { dirtyFields } = useFormState({ control });


    //  Step 8 - Send to Remote as put request
    const yalla = async (todo: TodoPayloadModel) => {



        web.updateTask(id, todo)
            .then(res => {
                notify.success(SccMsg.UPDATE_TASK);
                navigate('/tasks');
                // Update App State (Global State)
                store.dispatch(taskUpdatedAction(res.data));
            })
            .catch(err => { notify.error('Oppsy : ' + err.message) });
    }


    return (
        <div className="EditTodo flex-center-col">
            <h1>Edit Task</h1>
            //{ Step 9 - handleSubmit your form  }
            <form onSubmit={handleSubmit(yalla)} className="flex-center-col">
                <label htmlFor="caption">Caption</label>
                <input {...register("caption")} type="text" placeholder="caption" id="caption" />
                <span>{errors.caption?.message}</span>
                <label htmlFor="info">Info</label>
                <input  {...register("info")} type="text" placeholder="info" id="info" />
                <span>{errors.info?.message}</span>
                <label htmlFor="classification">Subject</label>
                <input  {...register("classification")} type="text" placeholder="classification" id="classification" />
                <span>{errors.classification?.message}</span>
                <label htmlFor="dueDate">Due date</label>
                <input  {...register("dueDate")} type="datetime-local" placeholder="dueDate" id="dueDate" />
                <span>{errors.dueDate?.message}</span>
                <button className="button-success" disabled={!isDirty}>Update</button>
            </form>
        </div>
    );
}

export default EditTodo; */
