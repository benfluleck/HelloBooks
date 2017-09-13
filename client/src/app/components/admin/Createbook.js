import React from 'react'
import {Input, CollectionItem, Collection, Collapsible, Button, CollapsibleItem, Col, Tabs ,  Tab} from 'react-materialize'

export class CreateBook extends React.Component{
    constructor () {
        super();
        this.state ={
              booktitle:'',
              author:'',
              category:'',
             description:'',
            loading:false,
           booktitleError: '',
            authorError: '',
            descriptionError: '',
            categoryError:'',
            pictureError:''
          };
        
          this.onChange = this.onChange.bind(this);
          
        
    }

    onChange = e => 
    this.setState({
        [e.target.name]: e.target.value
    });

    onSubmit=(e) => {
        e.preventDefault();
        if(this.setState.length === 0){
          console.log(errors)
          this.props.submit(this.state.data);
      }
    
    };

    



    render(){
        const {data} = this.state;
        return( 
                <div >
                    <h3> Create Book </h3>
                <div  className="createbook">
                    <form onSubmit={this.onSubmit}>
                    <Input label="Enter Book Title" 
                        name='booktitle' 
                        required 
                        onChange={this.onChange}
                        
                    l={12} />
                    <Input label="Author's Name"  
                        name = 'author' 
                        required 
                        onChange={this.onChange} 
                    l={12} />
                    <Input label="Desription"  
                    name = 'description' 
                    required 
                    onChange={this.onChange} 
                    l={12} />
                    <Input type='select' 
                        onChange={this.onChange} 
                        required 
                        name='category'  
                        l={12} >
                    <option value='1'>--Select--</option>
                    <option value='2'>Fiction</option>
                    <option value='3'>Romance</option>
                    <option value='4'>Horror</option>
                    </Input>
                    
                    
                    <div class="file-field input-field">
                        <div className="btn center ">
                            <span >Picture</span>
                            <input type="file"></input>
                        </div>
                        
                        
                        <Input className="file-path validate" name='picture' type="text"></Input>
                        
                    </div>
                    
                    <div className='createbookbtn'>
                        
                            <Button waves='light'>Submit</Button>
                        
                    </div>
                    </form>
                </div>
                </div>

        );
    }
}