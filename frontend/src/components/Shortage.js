import React, {useState, useEffect} from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
const Shortage = () => {

    const [inventory, setInventory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationCount, setPaginationCount] = useState(5);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/inv/shortage', {
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

        return inventory.slice((paginationCount * (currentPage - 1)), (paginationCount * currentPage)).map((inventory, index) => {
            return (
                <tr key={inventory._id}>
                    <td><span className='bdg' fontSize='100px' >{inventory.description}</span></td>
                    <td>{inventory.quantity}</td>
                    <td>{inventory.floor}</td>
                    <td>{inventory.cell}</td>
                    <td>{inventory.threshold}</td>
                </tr> 
            );
        })
    };

    return (
        <div className="container">
            <h3 className='head' >Shortage List</h3>
            {/* <div className='table-responsive'> */}
            <table className="table table-striped table-bordered table-hover" style={{marginTop:20}}>
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Floor No.</th>
                        <th>Cell No.</th>
                        <th>Threshold</th>
                    </tr>
                </thead>
                <tbody>
                    {inventoryList()}
                </tbody>
            </table>
            {/* </div> */}
            {previousEligible && <button className="btn btn-danger" style={{ "width": "40%", "height": "30px", "borderRadius": "2rem", "margin": "7px 10px 7px 10px", "padding": "0px", "fontSize": "15px" }} onClick={previousPage}>Previous Page</button>}
            {nextEligible && <button className="btn btn-success" onClick={nextPage} style={{ float: 'right', "width": "40%", "height": "30px", "borderRadius": "2rem", "margin": "7px 10px 7px 10px", "padding": "0px", "fontSize": "15px" }}>Next Page</button>}
        </div>
    )
}

export default Shortage