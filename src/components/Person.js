import React from "react";
import Country from "../persons/Country";


export function Person(props){
    const person = props.item;
    const country = Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";

    return (
        <>
            <div>
                <h2>{props.label}</h2>
                <hr />
                <h4>{person.name} ({person.identificationNumber})</h4>
                <hr />
                <p> 
                    <strong>DIČ:&nbsp;</strong>
                    {person.taxNumber}
                </p>
                <p>
                    <strong>Bankovní účet:&nbsp;</strong>
                    {person.accountNumber}/{person.bankCode} ({person.iban})
                </p>
                <p>
                    <strong>Tel.:&nbsp;</strong>
                    {person.telephone}
                </p>
                <p>
                    <strong>Mail:&nbsp;</strong>
                    {person.mail}
                </p>
                <p>
                    <strong>Sídlo:&nbsp;</strong>
                    {person.street}, {person.city},
                    {person.zip}, {country}
                </p>
                <p>
                    <strong>Poznámka:&nbsp;</strong>
                    {person.note}
                </p>
            </div>
        </>
    );
}