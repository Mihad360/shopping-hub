import { useSelector } from "react-redux";

const Userhome = () => {

    const {name, email} = useSelector(state => state.userSlice.user)

    return (
        <div>
            
        </div>
    );
};

export default Userhome;