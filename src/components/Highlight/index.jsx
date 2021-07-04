import React from 'react';
import {Grid} from '@material-ui/core'
import HighlightCard from './HighlightCard'

export default function Highlight ({report}){

    const data = report && report.length ? report[report.length-1]: [];
    const summary = [
        {
            title: 'Số ca mắc',
            count: data.Confirmed,
            type: 'confirmed'
        },
        {
            title: 'Số ca khỏi',
            count: data.Recovered,
            type: 'recovered'
        },
        {
            title: 'Tử vong',
            count: data.Deaths,
            type: 'death'
        },
    ]
    
    return (
        <Grid container spacing={3}>
            {summary.map(item=>{return (<Grid item sm={4} xs={12} key={item.type}>
                <HighlightCard title={item.title} count={item.count} type={item.type}/>
            </Grid>)})
        }
        </Grid>
    )
    
}