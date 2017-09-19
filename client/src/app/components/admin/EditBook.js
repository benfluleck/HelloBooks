import React from 'react'
import {
    Input,
    Button,
    CollectionItem,
    Collection,
    Collapsible,
    CollapsibleItem,
    Col,
    Tabs,
    Tab
} from 'react-materialize'

/*
eslint-disable
 */
export class EditBook extends React.Component {
    constructor() {
        super();
        this.state = {
            booktitle: '',
            author: '',
            category: '',
            description: '',
            loading: false,
            booktitleError: '',
            authorError: '',
            descriptionError: '',
            categoryError: '',
            pictureError: ''
        };

        this.onChange = this
            .onChange
            .bind(this);

    }

    onChange = e => this.setState({
        [e.target.name]: e.target.value
    });
    onSubmit = (e) => {
        e.preventDefault();
        if (this.setState.length === 0) {
            console.log(errors)
            this
                .props
                .submit(this.state.data);
        }

    };

    render() {
        return (
            <div className='createbook'>
                <h5>
                    Edit Book
                </h5>
                <div>
                    <form>
                        <Input
                            label="Change Book Title"
                            required
                            name='booktitle'
                            l={12}
                            onChange={this.onChange}/>
                        <Input
                            label="Change Author's Name"
                            required
                            name='author'
                            l={12}
                            onChange={this.onChange}/>
                        <div class="input-field">
                            <label for="textarea1">Change Description</label>
                            <textarea
                                id="textarea1"
                                class="materialize-textarea"
                                required
                                name='description'
                                onChange={this.onChange}></textarea>

                        </div>
                        <Input type='select' name='category' required label="Change Category" l={12}>
                            <option value='1'>--Select--</option>
                            <option value='2'>Fiction</option>
                            <option value='3'>Romance</option>
                            <option value='4'>Horror</option>
                        </Input>
                        <br/>
                        <br/>
                        <br/>
                        <div className="file-field input-field">
                            <div className="btn">
                                <span>Change Picture</span>
                                <input type="file"></input>
                            </div>
                            <br/>
                            <br/>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text"></input>
                            </div>
                        </div>
                        <Input s={12} l={8} type='select' label="Select Action (Edit / Delete)">
                            <option value='1'>--Select--</option>

                            <option value='2'>Edit</option>
                            <option value='3'>Delete</option>

                        </Input>
                        <div className='createbookbtn'>

                            <Button waves='light'>Submit</Button>

                        </div>
                    </form>
                </div>
            </div>

        );
    }
}
