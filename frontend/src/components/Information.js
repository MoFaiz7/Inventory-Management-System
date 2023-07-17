import React, { useState } from 'react';

const Information = () => {

    return (
        <div className='container'>

            <div className="d-flex justify-content-around mx-3 ">
                <div className="left">

                    <p>
                        <strong className='head' >Inventory Management System. </strong>
                        <br />
                        <br />
                        This application helps to manage the inventory that is it keeps track of the stocked items. It uses MongoDB as database to store the information.<br />
                        Following could be performed:-

                        <br /><br /><span className='bdg' >Current Stock:</span> Shows the name of items in inventory and their current quantity.
                        <br /><span className='bdg' >Modify:</span> Change quantity of items in inventory by entering the amount and pressing the restock/use buttons.
                        <br /><span className='bdg' >Feed Items:</span> Fill in the respective item information and press the feed button to add new items to the inventory list.
                        <br /><span className='bdg' >Remove Items:</span> Remove items in the inventory list by selecting the delete button next to the item in the table.
                        <br /><span className='bdg' >Shortage:</span> Shows the list of items that are running out of stock or lower than the threshold.

                    </p>
                </div>
                <div className="right">
                    <figure>
                        <img className='loginImg' src="/images/ims.svg" alt="all" />
                    </figure>
                </div>
            </div>
            <footer style={{ marginTop: "70px" }}>
            </footer>
        </div>
    );
};

export default Information;