import { useEffect, useState } from 'react';

const usePerson = () => {
    const [persons, setPersons] = useState([]);
    useEffect(() => {
        fetch('/person.json')
            .then(res => res.json())
            .then(data => setPersons(data));
    }, [])
    return [persons, setPersons]
};

export default usePerson;