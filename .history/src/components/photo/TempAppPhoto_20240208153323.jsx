import React from "react";
import "./index.scss";
import { Collection } from "./Collection";
import { useState, useEffect } from "react";

const ctgry = [
    { name: "Все" },
    { name: "Море" },
    { name: "Горы" },
    { name: "Архитектура" },
    { name: "Города" },
];

function TempAppPhoto() {
    const [categoryId, setCategoryId] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [collection, setCollection] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        setIsLoading(true);

        const category = categoryId ? `category=${categoryId}` : "";

        fetch(
            `https://65c398c639055e7482c13885.mockapi.io/photo_collections?page=${page}&limit=3&${category}`
        )
            .then((res) => res.json())
            .then((json) => {
                setCollection(json);
            })
            .catch((err) => {
                console.warn(err);
            })
            .finally(() => setIsLoading(false));
    }, [categoryId, page]);

    return (
        <div className="App">
            <h1>Моя коллекция фотографий</h1>
            <div className="top">
                <ul className="tags">
                    {ctgry.map((obj, index) => (
                        <li
                            onClick={() => setCategoryId(index)}
                            className={categoryId === index ? "active" : ""}
                            key={obj.name}
                        >
                            {obj.name}
                        </li>
                    ))}
                </ul>
                <input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="search-input"
                    placeholder="Поиск по названию"
                />
            </div>
            <div className="content">
                {isLoading ? (
                    <h2>Идёт загрузка...</h2>
                ) : (
                    collection
                        .filter((obj) =>
                            obj.name
                                .toLowerCase()
                                .includes(searchValue.toLowerCase())
                        )
                        .map((obj, index) => (
                            <Collection
                                key={index}
                                name={obj.name}
                                images={obj.photos}
                            />
                        ))
                )}
            </div>
            <ul className="pagination">
                {[...Array(5)].map((_, i) => (
                    <li
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={page === i + 1 ? "active" : ""}
                    >
                        {i + 1}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
