import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Person from "../components/Person";

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
        <div class="container">
            <div class="row">
                <div class="col-sm">
                    <Person label="Dodavatel" item={invoice.seller} ></Person>
                </div>
                <div class="col-sm">
                    <Person label="Odběratel" item={invoice.buyer} />
                </div>
            </div>
        </div>
    );
};

export default InvoiceDetail;
