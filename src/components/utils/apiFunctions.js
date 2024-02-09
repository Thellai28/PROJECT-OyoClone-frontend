import axios from "axios";

export const api = axios.create({
    baseURL : "http://localhost:9192/"
});

// This functions adds a new room to the data base : 
export const addRoom = async( photo, roomType, roomPrice ) => {
    const formData = new FormData(); // Responsible for building multiPart request :

    formData.append("photo", photo );
    formData.append("roomType", roomType );
    formData.append("roomPrice", roomPrice );

    const response = await api.post("/rooms/add/new-room", formData );

    if( response.status === 201 ) return true;
    else return false;
}

// This function is to fetch all the room type from the data base : 
export const getRoomTypes = async ()=> {
    try{
        const response = await api.get( "/rooms/room-type" );
        return response.data;
    }catch( error ){
        throw new Error( "Error fetching the room types" );
    }
}   