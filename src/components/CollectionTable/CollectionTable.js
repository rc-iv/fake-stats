import React from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from "primereact/column";


const CollectionTable = (props) => {
    const imageBodyTemplate = (rowData) => {
        return <img src={rowData.image_url} height='50px' width='50px'/>
    }

    const nameLinkTemplate = (rowData) => {
        return <a href={`${rowData.os_url}`} target="_blank">{rowData.name}</a>
    }
    return (
        <DataTable value={props.collectionData}
                   sortField="season_0_cards"
                   sortOrder={-1}
                   stripedRows='true'
                   scrollable
                   scrollHeight="500px"
                   theme='md-dark-indigo'
                   style={{fontSize: '14px', fontWeight: 'bold'}}
        >
            <Column field="imageUrl"
                    header="Logo"
                    body={imageBodyTemplate}/>
            <Column field="name"
                    sortable header="Name"
                    body={nameLinkTemplate}/>
            <Column field="season_0_cards"
                    sortable header="S0 Cards Held"
                    headerTooltip="Total Season0 memes of holders."/>
            <Column field="full_set_owners"
                    sortable header="Full Set Owners"
                    headerTooltip="Number of owners who own a full S0 set"/>
            <Column field="floor_price"
                    sortable header="Floor"/>
            <Column field="owners"
                    sortable header="Owners"
                    headerTooltip="Number of unique owners of this collection"/>
        </DataTable>
    );
}

export default CollectionTable;