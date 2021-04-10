 
import React from 'react';
 
import './ListImages.css';
  
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
 
import ShowImage from '../show_image/ShowImage';

 
 

const ListImages = ({ posts }) => {


 

 
    const rows = [...Array(Math.ceil(posts.length / 2))];
    // chunk the products into the array of rows
    const productRows = rows.map((row, idx) => posts.slice(idx * 2, idx * 2 + 2));
    // map the rows as div.row
    const content = productRows.map((row, idx) => (



        <div>
              <GridList cellHeight={350} cols={3}>
            { row.map(image => 
            
            <GridListTile onClick={() => this.imageClickHandler(image)} className="image-grid-item" key={"grid" + image.id}>
                        <ShowImage  key={image.id} post={image} />
                    </GridListTile>
            
            
           )}
            </GridList>
        </div>)
    );





    return (
        <div className="post-grid">
             
            {content}
        </div>
    );
 
}



export default ListImages;