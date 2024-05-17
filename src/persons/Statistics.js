import { useState, useEffect } from "react";
import {apiGet} from "../utils/api";

const Statistics = ()=>{
    const [statistics,SetStatistics]= useState([]);

    useEffect(() => {
        apiGet("/api/persons/statistics")
            .then((data) => {
                SetStatistics(data);
            });
    }, []);

    return (
        <div>
            <h3>Statistiky</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Jmeno</th>
                        <th>Vyfakturováno</th>
                    </tr>
                </thead>
                <tbody>
                    {statistics.map((item, index) => (
                        <tr key={index + 1}>
                            <td>{index + 1}</td>
                            <td>{item.personName}</td>
                            <td><strong>{item.revenue} Kč</strong></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Statistics;