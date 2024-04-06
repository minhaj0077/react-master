import Shimmer from './Shimmer';
import { useParams } from 'react-router-dom';
import useRestaurentMenu from '../utils/useRestaurentMenu';
import RestaurantCategory from './RestaurantCategory';
import { useState } from 'react';

const RestaurantMenu = () => {

    const { id } = useParams();

    const resInfo = useRestaurentMenu(id);

    const [showIndex, setShowIndex] = useState(null);

    if (resInfo == null) {
        return <Shimmer />;
    };

    console.log(resInfo?.cards[0]?.card?.card?.info);

    // const { name, avgRating, costForTwoMessage, cuisines, } = resInfo?.cards[0]?.card?.card?.info;

    const { name, avgRating, costForTwoMessage, cuisines, } = resInfo?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

    // const { itemCards } = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

    const categories = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c => c.card?.card?.["@type"] == "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");






    return (
        <div className="text-center">
            <h1 className='font-bold my-6 text-3xl'>{name}</h1>
            <p className='font-bold text-2xl'>{cuisines.join(", ")} - {costForTwoMessage} - ★{avgRating}</p>

            {categories.map((category, index) => (<RestaurantCategory key={category?.card?.card?.title} data={category?.card?.card}
                showItems={index == showIndex ? true : false}
                setShowIndex={() => setShowIndex(index)}
            />))}
        </div>
    );
};

export default RestaurantMenu