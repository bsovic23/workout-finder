import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { EDIT_WORKOUT } from '../utils/mutations';


const SingleWorkout = (props)=>{

    const {
        currentWorkout,
        setShowModal
    } = props;

    const {_id} = currentWorkout;

    const [editWorkout, {error}] = useMutation(EDIT_WORKOUT);
    console.log(_id);
    const [formState, setFormState] = useState({
        workoutName: "",
        workoutType: "",
        calsBurned: "",
        time: "",
        notes: "",
      });
      
      const handleChange = (e) => {
        const { name, value } = e.target;
      
        setFormState({
          ...formState,
          [name]: value,
        });
      };
      
      const submitHandler =async(event)=>{
        event.preventDefault();
        try{
            const {data} = await editWorkout({
                variables:{ 
                    workoutId: _id,
                    workoutName: formState.workoutName,
                    workoutType: formState.workoutType,
                    calsBurned: formState.calsBurned,
                    time: formState.time,
                    notes: formState.notes,}
            });
            console.log({data});
            
        }catch{

        }
      }
      
    return(
        <form onSubmit={submitHandler}>
      <div className="form-inner">
        <h2>Workout</h2>

        <div className="form-group">
          <label htmlFor="workoutName">Name your workout:</label>
          <input
            type="string"
            name="workoutName"
            id="workoutName"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="workoutType">Type of workout:</label>
          <input
            type="string"
            name="workoutType"
            id="workoutType"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="calsBurned">Calories Burned:</label>
          <input
            type="Number"
            name="calsBurned"
            id="calsBurned"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Length of Workout:</label>
          <input type="string" name="time" id="time" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes:</label>
          <input
            type="string"
            name="notes"
            id="notes"
            onChange={handleChange}
          />
        </div>
        <input  type="submit" onClick={()=>{setShowModal(false);}} value="Save Workout" />
      </div>
    </form>
    );
};

export default SingleWorkout;