import React, { useEffect, useState } from "react";

import { apiDelete, apiGet } from "../utils/api";

import InvoiceTable from "./InvoiceTable";
import InputField from "../components/InputField";
import FlashMessage from "../components/FlashMessage";
import InputSelect from "../components/InputSelect";

const InvoiceIndex = () => {
    /* {buyerID:"",sellerID:"",product:"",minPrice:"",maxPrice:"",limit:""} */
    const [invoices, setInvoices] = useState([]);
    const [persons, setPersons] = useState([]);
    const [params, SetParams] = useState({});
    const SetParamsByName = (name,value) =>{
        if ((value == "true")||(value == "")) {
            console.log("smaz");
            delete params[name];
        }  else {
            console.log("Nastav");
            params[name] = value;
            
        }
        SetParams(params);
        console.log(params);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Posilam");
        if (params) {
            
            apiGet("/api/invoices", params)
                .then((data) => {
                    setInvoices(data);
                });
        }
    };

    const deleteInvoice = async (id) => {
        try {
            await apiDelete("/api/invoices/" + id);
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
        setInvoices(invoices.filter((item) => item._id !== id));
    };

    useEffect(() => {
        apiGet("/api/invoices",params).then((data) => setInvoices(data));
        apiGet("/api/persons").then((data) => setPersons(data));
    }, [params]);

    return (
        <div>
            <h1>Seznam faktur</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <InputSelect
                                required={false}
                                mutiple={false}
                                name="sellerID"
                                size="1"
                                label="Dodavatel"
                                prompt="Zadejte dodavatele"
                                items={persons}
                                handleChange={(e) => {SetParamsByName("sellerID",e.target.value)}}
                            />
                            <InputSelect
                                required={false}
                                mutiple={false}
                                name="buyerID"
                                size="1"
                                label="Odběratel"
                                prompt="Zadejte odběratel"
                                items={persons}
                                handleChange={(e) => {SetParamsByName("buyerID",e.target.value)}}
                            />
                            <InputField
                                required={false}
                                type="text"
                                name="product"
                                label="Zadejte nazev productu"
                                prompt="produkt"
                                handleChange={(e) => {SetParamsByName("product",e.target.value)}}
                            />
                        </div>
                        <div className="col-sm">
                            <InputField
                                required={false}
                                type="number"
                                min="0"
                                name="minPrice"
                                label="Zadejte minimalní cenu"
                                prompt="Minimalní cenu"
                                handleChange={(e) => {SetParamsByName("minPrice",e.target.value)}}
                            />
                            <InputField
                                required={false}
                                type="number"
                                min="0"
                                name="maxPrice"
                                label="Zadejte maximální cenu"
                                prompt="Maximální cenu"
                                handleChange={(e) => {SetParamsByName("maxPrice",e.target.value)}}
                            />
                            <InputField
                                required={false}
                                type="number"
                                name="limit"
                                min="1"
                                label="Zadejte limit výpisu"
                                prompt="Limit výpisu"
                                handleChange={(e) => {SetParamsByName("limit",e.target.value)}}
                            />
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <br />
                    <input type="submit" className="btn btn-primary" value="Vyfiltruj" />
                    <hr />
                </div>

            </form>
            <InvoiceTable
                deleteInvoice={deleteInvoice}
                items={invoices}
                label="Počet faktur:"
            />
        </div>
    );
};
export default InvoiceIndex;