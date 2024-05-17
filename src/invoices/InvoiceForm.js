import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {apiGet, apiPost, apiPut} from "../utils/api";

import InputField from "../components/InputField";
import InputCheck from "../components/InputCheck";
import FlashMessage from "../components/FlashMessage";
import InputSelect from "../components/InputSelect";


const InvoiceForm = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        seller: {_id:""},
        buyer: {_id:""},
        issued: "",
        dueDate: "",
        product: "",
        price: "",
        vat: "",
        note: ""
    });
    const [persons,setPersons] = useState([]);
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);

    useEffect(() => {
        apiGet("/api/persons").then((data) => setPersons(data));
        if (id) {
            apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        /* console.log("invoice pred poslanim:");
        console.log(invoice); */
        (id ? apiPut("/api/invoices/" + id, invoice) : apiPost("/api/invoices", {...invoice,seller:{_id:invoice.seller._id},buyer:{_id:invoice.buyer._id}}))
            .then((data) => {
                setSent(true);
                setSuccess(true);
                navigate("/invoices");
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
                setSent(true);
                setSuccess(false);
            });
    };

    const sent = sentState;
    const success = successState;

    return (
        <div>
            <h1>{id ? "Upravit" : "Vytvořit"} faturu</h1>
            <hr/>
            {errorState ? (
                <div className="alert alert-danger">{errorState}</div>
            ) : null}
            {sent && (
                <FlashMessage
                    theme={success ? "success" : ""}
                    text={success ? "Uložení faktury proběhlo úspěšně." : ""}
                />
            )}
            <form onSubmit={handleSubmit}>
                <InputField
                    required={true}
                    type="number"
                    name="invoiceNumberName"
                    min="1000"
                    label="Číslo faktury"
                    prompt="Zadejte číslo faktury"
                    value={invoice.invoiceNumber}
                    handleChange={(e) => {
                        setInvoice({...invoice, invoiceNumber: e.target.value});
                    }}
                />
                <InputSelect
                    required={true}
                    mutiple={false}
                    name="seller"
                    size="1"
                    label="Dodavatel"
                    prompt="Zadejte dodavatele"
                    value={invoice.seller._id}
                    items={persons}
                    handleChange={(e) => {
                        setInvoice({...invoice, seller:{...invoice.seller,_id:e.target.value}});
                    }}
                />
                <InputSelect
                    required={true}
                    mutiple={false}
                    name="buyer"
                    size="1"
                    label="Odběratel"
                    prompt="Zadejte odběratele"
                    value={invoice.buyer._id}
                    items={persons}
                    handleChange={(e) => {
                        setInvoice({...invoice, buyer:{...invoice.buyer,_id:e.target.value}});
                    }}
                />
                <InputField
                    required={true}
                    type="date"
                    name="issued"
                    label="Datum vydání"
                    prompt="Zadejte datum vydání"
                    value={invoice.issued}
                    handleChange={(e) => {
                        setInvoice({...invoice, issued: e.target.value});
                    }}
                />
                <InputField
                    required={true}
                    type="date"
                    name="dueDate"
                    label="Datum splatnosti"
                    prompt="Zadejte datum splatnosti"
                    value={invoice.dueDate}
                    handleChange={(e) => {
                        setInvoice({...invoice, dueDate: e.target.value});
                    }}
                />
                <InputField
                    required={true}
                    type="text"
                    name="product"
                    min="3"
                    label="Název productu"
                    prompt="Zadejte název produktu"
                    value={invoice.product}
                    handleChange={(e) => {
                        setInvoice({...invoice, product: e.target.value});
                    }}
                />
                <InputField
                    required={true}
                    type="number"
                    name="price"
                    label="Fakturovana částka"
                    prompt="Zadejte částku"
                    value={invoice.price}
                    handleChange={(e) => {
                        setInvoice({...invoice, price: e.target.value});
                    }}
                />
                <InputField
                    required={true}
                    type="number"
                    name="vat"
                    label="Daň"
                    prompt="Zadejte daň"
                    value={invoice.vat}
                    handleChange={(e) => {
                        setInvoice({...invoice, vat: e.target.value});
                    }}
                />
                <InputField
                    required={true}
                    type="text"
                    name="note"
                    min="3"
                    label="Poznamka"
                    prompt="Zadejte poznámku"
                    value={invoice.note}
                    handleChange={(e) => {
                        setInvoice({...invoice, note: e.target.value});
                    }}
                />
                <input type="submit" className="btn btn-primary" value="Uložit"/>
            </form>
        </div>
    );
};

export default InvoiceForm;