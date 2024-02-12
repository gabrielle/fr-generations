import React, { useState, useEffect } from 'react';
import "../App.css";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import {db} from "../firebase";

const AddDragon = () => {
    const [newDragonId, setNewDragonId] = useState("")
    const [newDragonUrl, setNewDragonUrl] = useState("")
    const [newDragonSex, setNewDragonSex] = useState("")

    const addNewDragon = async (e) => {
        e.preventDefault();
        try {
            await setDoc(doc(db, "dragons", newDragonId), {
                dragonId: newDragonId,
                imgUrl: newDragonUrl,
                sex: newDragonSex
            });
            console.log("Document written with ID: ", newDragonId);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <section className="NewDragon-container">
            <div className="NewDragon">
                <h1 className="header">
                    New Dragon
                </h1>

                <div>

                    <div>
                        <input
                            type="text"
                            placeholder="Enter Dragon ID"
                            onChange={(e) => setNewDragonId(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Enter Dragon Image URL"
                            onChange={(e) => setNewDragonUrl(e.target.value)}
                        />
                        <select id="sex" name="sex" onChange={(e) => setNewDragonSex(e.target.value)}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>

                    </div>

                    <div className="btn-container">
                        <button
                            type="submit"
                            className="btn"
                            onClick={addNewDragon}
                        >
                            Submit
                        </button>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default AddDragon