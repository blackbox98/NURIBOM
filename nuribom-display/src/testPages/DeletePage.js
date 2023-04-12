import React from 'react';
import { getStorage, ref, deleteObject } from "firebase/storage";

const DeletePage = () => {


const storage = getStorage();

    // Create a reference to the file to delete
    const desertRef = ref(storage, 'test_crop.mp4');

    // Delete the file
    deleteObject(desertRef).then(() => {
    // File deleted successfully
    }).catch((error) => {
    // Uh-oh, an error occurred!
    });
    return (
        <div>
            지워졌을거야
        </div>
    );
};

export default DeletePage;