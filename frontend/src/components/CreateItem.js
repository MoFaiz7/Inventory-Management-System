import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext'

const CreateItem = () => {
    const [newItemDescription, setNewItemDescription] = useState('');
    const [newItemQuantity, setNewItemQuantity] = useState('');
    const [floor, setFloor] = useState('');
    const [cell, setCell] = useState('');
    const [threshold, setThreshold] = useState('');



    const onSubmit = async (e) => {
        e.preventDefault();

        const newItem = {
            description: newItemDescription,
            quantity: newItemQuantity,
            floor: floor,
            cell: cell,
            threshold: threshold,
        };

        await axios.post('/inv/', newItem)
            .then(res => {
                console.log(res.data.message);
                alert('Item added successfully')
            })

        setNewItemDescription('');
        setNewItemQuantity('');
        setFloor('');
        setCell('');
        setThreshold('');
    };



    return (
        <>
            <div className='container'>

                <div>
                    <div style={{ "width": "75%" }}>

                        <h3 className='head' >Feed Items</h3>
                        <form onSubmit={onSubmit} style={{ "border": "1px solid rgb(180, 180, 180)", "padding":"5px 15px", "borderRadius": "5px" }}>
                            <div className="form-group">
                                <label>Item Name: </label>
                                <input type="text"
                                    className="inpts_area colwhite"
                                    value={newItemDescription}
                                    onChange={(e) => { setNewItemDescription(e.target.value) }} />
                            </div>
                            <div className="form-group">
                                <label>Quantity: </label>
                                <input type="number"
                                    className="inpts_area colwhite"
                                    value={newItemQuantity}
                                    onChange={(e) => { setNewItemQuantity(e.target.value) }} />
                            </div>

                            <div className="form-group">
                                <label>Floor No: </label>
                                <input type="number"
                                    className="inpts_area colwhite"
                                    value={floor}
                                    onChange={(e) => { setFloor(e.target.value) }} />
                            </div>

                            <div className="form-group">
                                <label>Cell No: </label>
                                <input type="number"
                                    className="inpts_area colwhite"
                                    value={cell}
                                    onChange={(e) => { setCell(e.target.value) }} />
                            </div>

                            <div className="form-group">
                                <label>Threshold: </label>
                                <input type="number"
                                    className="inpts_area colwhite"
                                    value={threshold}
                                    onChange={(e) => { setThreshold(e.target.value) }} />
                            </div>

                            <div className="form-group">
                                <input type="submit" value="Feed Item" className="btn btn-success" />
                            </div>
                        </form>
                    </div>

                </div>


            </div>
            <footer style={{ marginTop: "70px" }}>
            </footer>
        </>
    )
}

export default CreateItem;