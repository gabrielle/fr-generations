import React, { useState, useEffect } from 'react';
import "../App.css";
import { collection, doc, getDoc, getDocs, setDoc, query, where, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from 'react-router-dom';

const EditDragon = () => {
    const { dragonId } = useParams();
    const [dragon, setDragon] = useState([]);
    const [mates, setMates] = useState([]);
    const [mate, setMate] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setDragon(values => ({ ...values, [name]: value }));
        console.log(dragon);
    }

    const UpdateDragon = async (e) => {
        e.preventDefault();
        try {
            await setDoc(doc(db, "dragons", dragon.dragonId), {
                dragonId: dragon.dragonId,
                imgUrl: dragon.imgUrl,
                sex: dragon.sex,
                mate: dragon.mate
            });
            //update mate
           const selectedMate =  doc(db, "dragons", dragon.mate);
           await updateDoc(selectedMate, {
            mate: dragon.dragonId
           });
            
            console.log("Document written with ID: ", dragon.dragonId);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const fetchPost = async () => {

        const docRef = await getDoc(doc(db, "dragons", dragonId));
        if (docRef.exists()) {
            const dragonData = docRef.data();
            await setDragon(docRef.data());
            const q = query(collection(db, "dragons"), where("sex", "!=", dragonData.sex));
            const qs = await getDocs(q);
            const nmates = [];
            qs.forEach((query)=>{
                nmates.push(query.id);
            })
            setMates(nmates);

            if(dragonData.mate){
                console.log(dragonData.mate);
                let dragonMate = await getDoc(doc(db, "dragons", dragonData.mate));
                console.log(dragonMate.data());
                if(dragonMate.exists){
                setMate(dragonMate.data());
                }
                }

        } else {
            console.log(dragonId, "Dragon does not exist.");
        }

    }

    useEffect(() => {
        fetchPost();
    }, [])

    return (
        <section className="NewDragon-container">
            <div className="NewDragon">
                <h1 className="header">
                    Edit Dragon
                </h1>

                <div>
                    <div>
                        <img src={dragon.imgUrl} />
                    </div>
                    <div>
                        <h2>Mate</h2>
                    <img src={mate?.imgUrl} />
                    </div>
                    <div>
                        <form onSubmit={UpdateDragon}>
                            <input
                                type="text"
                                value={dragon.dragonId || ""}
                                onChange={handleChange}
                                name="dragonId"
                            />
                            <input
                                type="text"
                                value={dragon.imgUrl || ""}
                                onChange={handleChange}
                                name="imgUrl"
                            />
                            <select id="sex" name="sex" onChange={handleChange} value={dragon.sex}>
                                <option value="male">male</option>
                                <option value="female">female</option>
                            </select>
                            <select id="mate" name="mate" onChange={handleChange} value={dragon.mate} option>
                                <option value="">select</option>
                                {mates.map((mate) => <option value={mate}>{mate}</option>)}
                            </select>
                            <input type="submit"></input>
                        </form>


                    </div>

                    {/* <div className="btn-container">
                        <button
                            type="submit"
                            className="btn"
                            onClick={UpdateDragon}
                        >
                            Submit
                        </button>
                    </div> */}

                </div>
            </div>
        </section>
    )
}

export default EditDragon