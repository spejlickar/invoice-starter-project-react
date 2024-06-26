import React, { useEffect, useState } from "react";

import { apiDelete, apiGet } from "../utils/api";
import { Link } from "react-router-dom";

import InvoiceTable from "./InvoiceTable";
import InputField from "../components/InputField";
import InputSelect from "../components/InputSelect";

const InvoiceIndex = () => {
    /* {buyerID:"",sellerID:"",product:"",minPrice:"",maxPrice:"",limit:""} */
    const [invoices, setInvoices] = useState([]);
    const [persons, setPersons] = useState([]);
    const [params, SetParams] = useState({});
    const [statistics, SetStatistics] = useState({});

    const SetParamsByName = (name, value) => {
        console.log("pred:" + params);
        const preParams = JSON.stringify(params);
        if (value == "") {
            console.log("smaz: " + name);
            if (name in params) delete params[name];
        } else {
            console.log("Nastav: " + name);
            params[name] = value;
        }
        if (JSON.stringify(params) != preParams) {
            console.log("posilam get")
            SetParams(params);
            apiGet("/api/invoices", params)
                .then((data) => {
                    setInvoices(data);
                });
        }
        console.log(params);
    }

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
        apiGet("/api/invoices").then((data) => setInvoices(data));
        apiGet("/api/persons/all").then((data) => setPersons(data));
        apiGet("/api/invoices/statistics").then((data) => SetStatistics(data));
    }, []);

    return (
        <div>

            <h1>Faktury <Link to={"/invoices/create"} className="btn btn-success">
                Nová fatura
            </Link></h1>
            <hr />
            <div>
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
                                handleChange={(e) => { SetParamsByName("sellerID", e.target.value) }}
                            />
                            <InputSelect
                                required={false}
                                mutiple={false}
                                name="buyerID"
                                size="1"
                                label="Odběratel"
                                prompt="Zadejte odběratel"
                                items={persons}
                                handleChange={(e) => { SetParamsByName("buyerID", e.target.value ) }}
                            />
                            <InputField
                                required={false}
                                type="text"
                                name="product"
                                label="Zadejte nazev productu"
                                prompt="produkt"
                                handleChange={(e) => { SetParamsByName("product", e.target.value.trim()) }}
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
                                handleChange={(e) => { SetParamsByName("minPrice", isNaN(e.target.value) ? "" : parseInt("0" + e.target.value)) }}
                            />
                            <InputField
                                required={false}
                                type="number"
                                min="0"
                                name="maxPrice"
                                label="Zadejte maximální cenu"
                                prompt="Maximální cenu"
                                handleChange={(e) => { SetParamsByName("maxPrice", isNaN(e.target.value) ? "" : parseInt("0" + e.target.value)) }}
                            />
                            <InputField
                                required={false}
                                type="number"
                                name="limit"
                                min="1"
                                label="Zadejte limit výpisu"
                                prompt="Limit výpisu"
                                handleChange={(e) => { SetParamsByName("limit", isNaN(e.target.value) ? "" : parseInt("0" + e.target.value) < 1 ? "" : parseInt("0" + e.target.value)) }}
                            />
                        </div>
                    </div>
                </div>
                {/* <div className="text-center">
                    <br />
                    <input type="submit" className="btn btn-primary" value="Vyfiltruj" />
                    <hr />
                </div> */}
                <hr />
            </div>
            <InvoiceTable
                deleteInvoice={deleteInvoice}
                items={invoices}
                statistics = {statistics}
                label="Počet zobrazených faktur:"
            />
        </div>
    );
};
export default InvoiceIndex;