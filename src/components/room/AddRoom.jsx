import React, { useState } from 'react';
import { addRoom as axiosAddRoomFunc } from '../utils/apiFunctions';
import RoomTypeSelector from '../common/RoomTypeSelector';
const AddRoom = () => {
    const [newRoom, setNewRoom ] = useState({
        photo: null,
        roomType : "", 
        roomPrice : ""
    });

    const [ imagePreview, setImagePreview ] = useState("");
    const [ successMessage, setSuccessMessage ] = useState("");
    const [ errorMessage, setErrorMessage ] = useState("");

    const  handleRoomInputChange = ( event )=> {
        const name = event.target.name;
        let value = event.target.value;

        if( name === 'roomPrice' ){
            if( !isNaN(value) ){
                value = parseInt(value);
            }else value = "";
        }
        setNewRoom( {...newRoom, [name] : value} );
    }

    const handelImageChange = (event)=>{
        const selectedImage = event.target.files[0];
        setNewRoom( {...newRoom, photo : selectedImage } );
        setImagePreview( URL.createObjectURL(selectedImage) );
    }

    const handleSubmit = async(event) =>{
        event.preventDefault(); // To prevent prevent auto refresh : 

        try{
            const success = await axiosAddRoomFunc( newRoom.photo, newRoom.roomType, newRoom.roomPrice );
            if( success ){ // The server will return the same room object as response, if it's successfully added into the data base : 
                setSuccessMessage( " A new room is added into the database! ");
                setNewRoom( {photo: null, roomType : "", roomPrice : ""} ); 
                setImagePreview("");
                setErrorMessage("");
                /*
                    The new room is only to add new rooms, once we added a room successfully into the data base, 
                    we have to reset the new room value, to default, or else we'll add the same room into the database agagin and again, 
                    This behaviour is like very common in react, to avoid duplication of data. 

                    The main role of newRoom stat is to hold the values that is received from the fron end interface
                    from user, and send it to the back end API, to do respective actions, once that is done, the job of the
                    newRoom is done, we have to reset it to default to hold the upcoming values, this is the reason why we
                    reset the value of the newRoom state. This is very common in react.
                */
            }else{
                setErrorMessage( "Error in adding room into database !" );
            }
        }catch ( err ){
            setErrorMessage( err.message );
        }
    }
  return (
    <>
        <section className='container mt-5 mb-5' >
            <div className='row justify-content-center' >
                <div className='col-md-8  col-lg-6'>
                    <h2 className='mt-5 mb-2'>Add a new room</h2>

                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='roomType' className='form-label'>Room Type</label>

                            <div> 
                                <RoomTypeSelector
                                    handleRoomInputChange = {handleRoomInputChange}
                                    newRoom = {newRoom}
                                />   
                            </div>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='roomPrice' className='form-label'>Room Price</label>
                            
                            <input
                                className='form-control'
                                required
                                id='roomPrice'
                                type='number'
                                name='roomPrice'
                                value={ newRoom.roomPrice }
                                onChange={ handleRoomInputChange }
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='photo' className='form-label'>Room Photo</label>
                            
                            <input
                                className='form-control'
                                id='photo'
                                name='photo'
                                type='file'
                                onChange={ handelImageChange }
                            />

                            { imagePreview && ( // Displaying the preview image : 
                                <img 
                                    className='mb-3'
                                    src={imagePreview} 
                                    alt='Preview Room Photo'
                                    style={ { maxWidth : "400px", maxHeight :"400px" } }
                                />
                            )}
                        </div>

                        <div className='d-grid d-md-flex mt-2'>
                            <button className='btn btn-outline-primary ml-5'> Save Room </button>
                        </div>

                    </form>
                </div>
            </div>
        </section>
    </>
  )
}

export default AddRoom;