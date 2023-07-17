import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext'

const InventoryList = () => {
    const [inventory, setInventory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationCount, setPaginationCount] = useState(5);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/inv/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${user.token}`
                }
            })
            const data = await response.json();

            setInventory(data);
        }

        fetchData();

    }, [user]);

    const previousPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage + 1 <= Math.ceil(inventory.length / paginationCount)) {
            setCurrentPage(currentPage + 1);
        }
    };

    let previousEligible = false
        if (currentPage<=1){
            previousEligible = false
        }
        else{
            previousEligible = true
        }

        let nextEligible = true
        if(currentPage + 1 > Math.ceil(inventory.length/paginationCount)){
            nextEligible = false
        }
        else{
            nextEligible = true
        }

    const inventoryList = () => {
        return inventory.slice((paginationCount * (currentPage - 1)), (paginationCount * currentPage)).map((inventory) => {
            return (
                <tr key={inventory._id}>
                    <td><span className='bdg' fontSize='100px' >{inventory.description}</span></td>
                    <td>{inventory.threshold}</td>
                    <td>{inventory.quantity}</td>
                    <td>{inventory.floor}</td>
                    <td>{inventory.cell}</td>
                </tr>
            );
        });
    };

    return (
        <div className="container">
            <h3 className='head' >Inventory List</h3>
            <table className="table table-striped table-bordered table-hover" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Threshold</th>
                        <th>Current Quantity</th>
                        <th>Floor No.</th>
                        <th>Cell No.</th>
                    </tr>
                </thead>
                <tbody>
                    {inventoryList()}
                </tbody>
            </table>
            {previousEligible && <button className="btn btn-info" style={{ "width": "40%", "height": "30px", "borderRadius": "2rem", "margin": "7px 10px 7px 10px", "padding": "0px", "fontSize": "15px" }} onClick={previousPage}>Previous Page</button>}
            {nextEligible && <button className="btn btn-info" onClick={nextPage} style={{ float: 'right', "width": "40%", "height": "30px", "borderRadius": "2rem", "margin": "7px 10px 7px 10px", "padding": "0px", "fontSize": "15px" }}>Next Page</button>}
        </div>
    );
};

export default InventoryList;
