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
           <Route path="/" exact render={() => <HomePage
             data={props.items}
             months={props.months}
             categories={props.categories} />} />
           <Route path="/add/:transaction" component={AddItemPage} />
           <Route path="/items" render={() => <RegistryPage
               removeHandler={props.removeHandler}
               data={props.items}
               months={props.months}
           />} />
           <Route path="/export" render={() => <ExportPage />} />
           <Route path="/search" render={() => <SearchPage
               data={props.items}
               search={props.searchResult}
               removeHandler={props.removeHandler} />} />
           </>
    );
};

export default routerContent;