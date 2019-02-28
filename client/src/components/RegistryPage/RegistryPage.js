import React, {useState} from 'react';

import ResultsTable from "../ResultsTable/ResultsTable";
import DetailedData from "./DetailedData/DetailedData";

import classes from "./RegistryPage.module.css";

const registryPage = (props) => {
    const [filter, setFilter] = useState(null);
    // if its null display all data, ignore the filter then
    let currentData;
    if(!filter){
        currentData =  props.data;
    } else {
        currentData = props.data.filter(e => e.post.mes === filter);
    }

   
    return (
        <div className={classes.Wrapper}>
            <div className={classes.Controls}>
                <button onClick={() => setFilter(null)} 
                        className={classes.firstElem}>ALL</button>

                {Object.keys(props.months).map(m => {
                    return <button 
                                onClick={() => setFilter(props.months[m])}>
                                {props.months[m].toUpperCase()}
                            </button>
                })}
            </div>
            <div className={classes.Grid}>
                <div className={classes.Table}>
                    <ResultsTable  
                        removeHandler={ props.removeHandler}
                        data={currentData}/> 
                </div>
                <DetailedData data={currentData} />
            </div>
        </div>
    );
};

export default registryPage;