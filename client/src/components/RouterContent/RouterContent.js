import React from 'react';

import { Route} from "react-router-dom";


import HomePage from "../HomePage/HomePage"
import ExportPage from "../ExportPage/ExportPage";
import RegistryPage from "../RegistryPage/RegistryPage";
import SearchPage from "../SearchPage/SearchPage";
import AddItemPage from "../AddItemPage/AddItemPage";


const routerContent = (props) => {
    return (
        <>
            <Route path="/" exact component={() => <HomePage
             data={props.items}
             months={props.months} />} />
           <Route path="/add" component={AddItemPage} />
           <Route path="/items" component={() => <RegistryPage
               removeHandler={props.removeHandler}
               data={props.items}
               months={props.months}
           />} />
           <Route path="/export" c omponent={() => <ExportPage />} />
           <Route path="/search" component={() => <SearchPage
               data={props.items}
               search={props.searchResult}
               removeHandler={props.removeHandler} />} />
           </>
    );
};

export default routerContent;