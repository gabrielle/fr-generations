import React, { useState, useEffect } from 'react';
import "../App.css";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, Link } from 'react-router-dom';

const DragonList = () => {
    const [dragons, setDragons] = useState([]);
    const history = useNavigate();
    const fetchPost = async () => {

        await getDocs(collection(db, "dragons"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setDragons(newData);
                console.log(dragons, newData);
            })

    }

    useEffect(() => {
        fetchPost();
    }, [])

    const handleDragonClick = (dragonId) => {
        history.push(`/edit/${dragonId}`);
    }

    return (
        <section className="NewDragon-container">
            <div className="NewDragon">
                <h1 className="header">
                    My Dragons
                </h1>

                <div className="NewDragon-content">
                    <div class="dragonContainer">
                    {
                        dragons?.map((dragon) => (
                            <Link to={`/edit/${dragon.dragonId}`}>
                                {/* <div key={dragon.dragonId} onClick={() => handleDragonClick(dragon.id)}> */}
                                <div key={dragon.dragonId}>
                                        {dragon.dragonId}<br/>
                                        {dragon.sex}
                                        <br/>
                                    <img src={dragon.imgUrl} width="100" />
                                </div>
                            </Link>

                        ))
                    }
                    </div>
                    
                </div>
            </div>
        </section>
    )
}

export default DragonList