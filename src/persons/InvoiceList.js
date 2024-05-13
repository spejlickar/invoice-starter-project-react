import React from "react";


const InvoiceList = (props) => {
        return (<div>
            <h3>{props.label}</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Číslo faktury</th>
                        <th>Dodavatel</th>
                        <th>Odběratel</th>
                        <th>Produkt</th>
                        <th>Cena</th>
                    </tr>
                </thead>
                <tbody>
                    {props.items.map((item, index) => (
                        <tr key={index + 1}>
                            <td>{index + 1}</td>
                            <td>{item.invoiceNumber}</td>
                            <td>{item.seller.name}</td>
                            <td>{item.buyer.name}</td>
                            <td>{item.product}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>)
}

export default InvoiceList;