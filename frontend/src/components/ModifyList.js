import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useAuthContext} from '../hooks/useAuthContext'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'

const ModifyList = () => {
    const [inventory, setInventory] = useState([]);
    const [amount, setAmount] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationCount, setPaginationCount] = useState(5);
    const [errors, setErrors] = useState({});
    const {user} = useAuthContext();

    useEffect(() => {
        const fetchData = async()=>{
            const response = await fetch('/inv/', {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${user.token}`
                }
            })
            const data = await response.json();
            
            setInventory(data);
        }

        fetchData();

    }, [user]);

    const modifyQuantity = (id, amount, quantity, index) => {
        var newQuantity = Number(quantity) + Number(amount);
        if (newQuantity<0){
            setErrors({amount: 'Quantity cannot be less than 0'});
            alert('Quantity cannot be less than 0');
        }
        else{
            const obj = {
                quantity: newQuantity
            }
            axios.patch('/inv/'+id, obj)
            .then(res =>{
                setInventory(inventory.map((item, i) => {
                    if (item._id === id) {
                        item.quantity = newQuantity;
                    }
                    return item;
                }));
                setErrors({});
            })
        }
    };

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

    const inventoryList = () => {
        return inventory.slice((paginationCount * (currentPage - 1)), (paginationCount * currentPage)).map((inventory, index) => {
            return (
                <tr key={inventory._id}>
                    <td><span className='bdg' fontSize='100px' >{inventory.description}</span></td>
                    <td>{inventory.threshold}</td>
                    <td>{inventory.quantity}</td>
                    <td>{inventory.floor}</td>
                    <td>{inventory.cell}</td>
                    <td>
                        <input type='number' className="form-control"
                        onChange={(e) => setAmount(e.target.value)}/>
                    </td>
                    <td>
                        <div className="btn-toolbar d-flex justify-content-between">
                            <button type="button" style={{outline: "none", border:"none", background: "transparent"}} onClick={() => modifyQuantity(inventory._id, amount, inventory.quantity, index)}><AiOutlinePlusCircle  fontSize='25px' color='green' /></button>
                            <button type="button" style={{outline: "none", border:"none", background: "transparent"}} onClick={() => modifyQuantity(inventory._id, -amount, inventory.quantity, index)} ><AiOutlineMinusCircle  fontSize='25px' color='red' /></button>
                        </div>
                    </td>
                </tr>
            );
        });
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


    return (
        <div className="container">
            <h3 className='head' >Modify</h3>
            <table className="table table-striped table-bordered table-hover" style={{marginTop:20}}>
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Threshold</th>
                        <th>Current Quantity</th>
                        <th>Floor No.</th>
                        <th>Cell No.</th>
                        <th>Change Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inventoryList()}
                    </tbody>
                </table>
                {previousEligible && <button className="btn btn-info" onClick={previousPage} style={{ "width": "40%", "height": "30px", "borderRadius": "2rem", "margin": "7px 10px 7px 10px", "padding": "0px", "fontSize": "15px" }} >Previous Page</button>}
                {nextEligible && <button className="btn btn-info" onClick={nextPage} style={{ float: 'right', "width": "40%", "height": "30px", "borderRadius": "2rem", "margin": "7px 10px 7px 10px", "padding": "0px", "fontSize": "15px" }}>Next Page</button>}
            </div>
    );
};

export default ModifyList;