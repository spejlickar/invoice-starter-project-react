/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *                                _
 *              ___ ___ ___ _____|_|_ _ _____
 *             | . |  _| -_|     | | | |     |  LICENCE
 *             |  _|_| |___|_|_|_|_|___|_|_|_|
 *             |_|
 *
 *   PROGRAMOVÁNÍ  <>  DESIGN  <>  PRÁCE/PODNIKÁNÍ  <>  HW A SW
 *
 * Tento zdrojový kód je součástí výukových seriálů na
 * IT sociální síti WWW.ITNETWORK.CZ
 *
 * Kód spadá pod licenci prémiového obsahu a vznikl díky podpoře
 * našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
 * Více informací na http://www.itnetwork.cz/licence
 */

import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";

import { apiGet } from "../utils/api";
import InvoiceList from "./InvoiceList";
import Country from "./Country";

const PersonDetail = () => {
    const { id } = useParams();
    const [person, setPerson] = useState({});
    const [invoicesSeller, setInvoicesSeller] = useState([]);
    const [invoicesBuyer, setInvoicesBuyer] = useState([]);
    const country = Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";

    useEffect(() => {
        apiGet("/api/persons/" + id)
            .then((data) => {
                setPerson(data)
                console.log("nacitam osobu")
                console.log(data)
            });
    }, [id]);

    useEffect(() => {
        if ("identificationNumber" in person) {
            apiGet("/api/identification/" + person.identificationNumber + "/sales")
                .then((data) => {
                    setInvoicesSeller(data)
                    console.log("Nacitam faktury seller")
                    console.log(data)
                });
            apiGet("/api/identification/" + person.identificationNumber + "/purchases")
                .then((data) => {
                    setInvoicesBuyer(data)
                    console.log("Nacitam faktury purchases")
                    console.log(data)
                });
        }
    }, [person]);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <h1>Detajl Osoby <Link to={"/persons/edit/"+id} className="btn btn-success">
                Uprav
            </Link></h1>
                        <hr />
                        <h3>{person.name} ({person.identificationNumber})</h3>
                        <p>
                            <strong>DIČ:</strong>
                            <br />
                            {person.taxNumber}
                        </p>
                        <p>
                            <strong>Bankovní účet:</strong>
                            <br />
                            {person.accountNumber}/{person.bankCode} ({person.iban})
                        </p>
                        <p>
                            <strong>Tel.:</strong>
                            <br />
                            {person.telephone}
                        </p>
                        <p>
                            <strong>Mail:</strong>
                            <br />
                            {person.mail}
                        </p>
                        <p>
                            <strong>Sídlo:</strong>
                            <br />
                            {person.street}, {person.city},
                            {person.zip}, {country}
                        </p>
                        <p>
                            <strong>Poznámka:</strong>
                            <br />
                            {person.note}
                        </p>
                    </div>
                    <div className="col-sm-8">
                        <InvoiceList items={invoicesSeller} label="Vydane faktury" />
                        <InvoiceList items={invoicesBuyer} label="Přijaté faktury" />
                    </div>
                </div>
            </div>
        </>
    );

};

export default PersonDetail;
