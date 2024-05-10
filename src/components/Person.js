/* import React from "react"; */
import Country from "../persons/Country";


export function Person(props){
    const person = props.item;
    const country = Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";

    return (
        <>
            <div>
                <h1>{props.value}</h1>
                <hr/>
                <h3>{person.name} ({person.identificationNumber})</h3>
                <p>
                    <strong>DIČ:</strong>
                    {person.taxNumber}
                </p>
                <p>
                    <strong>Bankovní účet:</strong>
                    {person.accountNumber}/{person.bankCode} ({person.iban})
                </p>
                <p>
                    <strong>Tel.:</strong>
                    {person.telephone}
                </p>
                <p>
                    <strong>Mail:</strong>
                    {person.mail}
                </p>
                <p>
                    <strong>Sídlo:</strong>
                    {person.street}, {person.city},
                    {person.zip}, {country}
                </p>
                <p>
                    <strong>Poznámka:</strong>
                    {person.note}
                </p>
            </div>
        </>
    );
};

export default Person;