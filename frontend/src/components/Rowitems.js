import React from 'react'
import { AiFillDelete } from 'react-icons/ai'

const Rowitems = ({inventory, removeItem, index}) => {
    return (
        <>
            <tr key={inventory._id}>
                <td><span className='bdg' fontSize='100px' >{inventory.description}</span></td>
                <td>{inventory.threshold}</td>
                <td>{inventory.quantity}</td>
                <td>{inventory.floor}</td>
                <td>{inventory.cell}</td>
                <td style={{"padding": "5px", "textAlign":'center'}} >
                    <button type="button" id='btnDelete' className="btn btn-danger btn-sm" style={{ "fontSize": "15px", "fontWeight": "bold", "padding": "5px 5px" }}
                        onClick={e =>
                            window.confirm("Are you sure you want to delete this item?") &&
                            removeItem(inventory._id, index)}><AiFillDelete fontSize='20px' /></button>
                </td>
            </tr>
        </>
    )
}

export default Rowitems