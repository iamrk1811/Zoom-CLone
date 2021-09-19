import { useHistory } from 'react-router';
import { useEffect } from 'react';

const HomePage = () => {

    const history = useHistory();
    useEffect(() => {
        fetch('/getRoomId', {
            method:"POST",
            headers:{
                'Content-Type':'applications/json',
            }
        }).then(( async result =>{
            const data = await result.json();
            if(result.status === 200) {
                history.push(data.roomId);
            }
        }))
    }, [])
    return (
        <>
        <h3>Please wait...</h3>
        </>
    )
}

export default HomePage;