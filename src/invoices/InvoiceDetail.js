import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import {Person} from "../components/Person";

import {apiGet} from "../utils/api";

const InvoiceDetail = () => {
    const initV = "nacitam";
    const iniPerson = {"name": initV,"identificationNumber": initV,"taxNumber": initV,"accountNumber": initV,"bankCode": initV,
        "iban": initV,"telephone": initV,"mail": initV,"street": initV,"zip": initV,"city": initV,"country": initV,"note": initV,"_id": initV}
    const iniInvoice = {"invoiceNumber": initV,"seller": iniPerson,"buyer": iniPerson,"issued": initV,"dueDate": initV,"product": initV,"price": initV,
        "vat": initV,"note": initV,"_id": initV }
    const {id} = useParams();
    const [invoice, setInvoice] = useState(iniInvoice);
    
    useEffect(() => {
        apiGet("/api/invoices/" + id).then((data) => {
            setInvoice(data);
        });
        
    }, [id]);
    
     
    return (
        <div className="container">
            <div className="row">
                <h1>Faktura (č. {invoice.invoiceNumber}) <Link to={"/invoices/edit/"+id} className="btn btn-success">
                Uprav
            </Link></h1>
                <hr />
            </div>
            <div className="row">
                <div className="col-sm">
                    <Person label="Dodavatel" item={invoice.seller} />
                </div>
                <div className="col-sm">
                    <Person label="Odběratel" item={invoice.buyer} />
                </div>
            </div>
            <div className="row">
                <hr />
                <p>
                    <strong>Datum vydaní:&nbsp;</strong>
                    {invoice.issued}
                </p>
                <p>
                    <strong>Datum splatnosti:&nbsp;</strong>
                    {invoice.dueDate}
                </p>
                <p>
                    <strong>Product:&nbsp;</strong>
                    {invoice.product}
                </p>
                <p>
                    <strong>Cena:&nbsp;</strong>
                    {invoice.price}Kč ({invoice.vat}% DPH)
                </p>
                <p>
                    <strong>Poznamka:&nbsp;</strong>
                    {invoice.note}
                </p>
            </div>
            
        </div>
    );
};

export default InvoiceDetail;
