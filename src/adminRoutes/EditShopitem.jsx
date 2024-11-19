import { useParams } from "react-router-dom";
import { useGetShopItemQuery } from "../redux/baseapi/baseApi";

const EditShopitem = () => {

    const { id } = useParams();
    const {data} = useGetShopItemQuery(id)
    const {title, category, image, price, description, stock, discount} = data
    console.log(title, category, image, price, description, stock, discount);

    return (
        <div className="pt-24">
            Edit
        </div>
    );
};

export default EditShopitem;