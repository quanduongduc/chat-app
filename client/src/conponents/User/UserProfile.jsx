import { useParams } from "react-router-dom";

function UserProfile() {
    const userId = useParams().userId;
    return (
        <h1>Profile of {userId}</h1>
    )
}

export default UserProfile;