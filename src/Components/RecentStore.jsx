import React, { use } from 'react';
import StoreCard from '../Pages/StoreCard';

const RecentStore = ({recentStoresPromise}) => {
    const stores = use(recentStoresPromise);
    console.log(stores)
    return (
        <div>
            {
                stores.map(store => <StoreCard key={store._id} store={store}></StoreCard>)
            }
        </div>
    );
};

export default RecentStore;