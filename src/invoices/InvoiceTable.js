import React from "react";
import {Link} from "react-router-dom";

const InvoiceTable = ({label, items, deleteInvoice, statistics}) => {
    return (
        <div>
            <p>
                {label} <strong>{items.length}</strong>    (Součet všech faktur: <strong>{"invoicesCount" in statistics?statistics.invoicesCount:"" }</strong>, 
                                        součet cen: <strong>{"allTimeSum" in statistics?statistics.allTimeSum:"" }Kč</strong>,
                                        součet cen za letošní rok: <strong>{"currentYearSum" in statistics?statistics.currentYearSum:"" }Kč</strong>)
            </p>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Číslo faktury</th>
                    <th>Dodavatel</th>
                    <th>Odběratel</th>
                    <th>Produkt</th>
                    <th>Cena</th>
                    <th colSpan={3}>Akce</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{item.invoiceNumber}</td>
                        <td>{item.seller.name}</td>
                        <td>{item.buyer.name}</td>
                        <td>{item.product}</td>
                        <td><strong>{item.price} Kč</strong></td>
                        <td>
                            <div className="btn-group">
                                <Link
                                    to={"/invoices/show/" + item._id}
                                    className="btn btn-sm btn-info"
                                >
                                    Zobrazit
                                </Link>
                                <Link
                                    to={"/invoices/edit/" + item._id}
                                    className="btn btn-sm btn-warning"
                                >
                                    Upravit
                                </Link>
                                <button
                                    onClick={() => deleteInvoice(item._id)}
                                    className="btn btn-sm btn-danger"
                                >
                                    Odstranit
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceTable;