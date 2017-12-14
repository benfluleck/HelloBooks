class AddBookModal extends React.Component {
  /**
   *
   * Creates an instance of AdminBookModal.
   * @param {any} props
   *
   * @memberOf AdminBookModal
   */
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title || '',
      author: this.props.author || '',
      description: this.props.description || '',
      quantity: this.props.quantity || '',
      bookImage: this.props.bookImage || '',
      imageName: this.props.imageName || '',
      categoryId: this.props.categoryId || '',
      errors: {}

    };
    this.onChange = this.onChange.bind(this);
    this.uploadWidget = this.uploadWidget.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  /**
   * @description Handle onChange events on form inputs
   * @method onChange
   * @memberof AdminBookModal
   * @param {object} event
   * @returns {function} a function that handles change event on inputs
   */
  onChange(event) {
    event.preventDefault();
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }
  /**
   * @description Handle submit events on form inputs
   * @method handleSubmit
   * @memberof AdminBookModal
   * @param {object} event
   * @returns {function} a function that handles change event on inputs
   */
  handleSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.addBook(this.state)
        .then((response) => {
          if (response) {
            this.setState({
              title: '',
              author: '',
              description: '',
              quantity: '',
              bookImage: ''
            });
            $('#add-admin-book-modal').modal({ dismissible: true });
          }
        });
    }
  }

  /**
   * Handle onChange events on form inputs
   * @method isValid
   * @memberof SignIn
   * @returns {function} a validation function and returns errors in string format
   */
  isValid() {
    const { errors, isValid } = bookDetailValidator(this.state);
    if (!isValid) {
      this.setState({ errors });
    } else {
      return isValid;
    }
  }
  /**
     * @returns {Image} This uploads the image to cloudinary
     *
     * @memberof AddBook
     */
  uploadWidget() {
/* eslint-disable */
    cloudinary.openUploadWidget(
      {
        cloud_name: 'digpnxufx',
        upload_preset: 'yn0wpv0n',
        tags: ['books'],
        sources: ['local', 'url'],
        max_file_size: 1500000,
        max_image_width: 325,
        max_image_height: 499,
        multiple: false

      },
      (error, result) => {
        this.setState({
          bookImage: result[0].url,
          imageName: result[0].original_filename,
        });
      }
    );
  }
  /* eslint-enable */

  /**
   *
   *
   * @returns {Component} Component
   *
   * @memberOf BookModal
   */
  render() {
    const {
      header
    } = this.props;
    return (
      <Modal
        id="add-admin-book-modal"
        fixedFooter
        header={header}
        actions={<Button onClick={this.handleSubmit}>Submit</Button>}
      >
        <Row>
          <div className="bookform">
            <Input
              s={6}
              label="Book Title"
              required
              value={this.state.title}
              name="title"
              onChange={this.onChange}
              error={this.state.errors.title}
            >
              <Icon>book</Icon>
            </Input>
            <Input
              s={6}
              label="Book Author"
              required
              value={this.state.author}
              name="author"
              onChange={this.onChange}
              error={this.state.errors.author}
            >
              <Icon>face</Icon>
            </Input>

            <Input
              s={6}
              label="Book Quantity"
              required
              value={this.state.quantity}
              name="quantity"
              onChange={this.onChange}
              error={this.state.errors.quantity}
            >
              <Icon>collections</Icon>
            </Input>
            <Row>
              <CategoriesOptionList onChange={this.onChange} />
            </Row>
            <Input
              s={12}
              label="Book Description"
              required
              type="textarea"
              value={this.state.description}
              name="description"
              onChange={this.onChange}
              error={this.state.errors.description}
            >
              <Icon>view_headline</Icon>
            </Input>
            <h6>Image (Book Cover)</h6>
            <p> If this is blank, no worries a default cover will be selected</p>
            <Row>
              {this.state.imageName}
              <img
                src={this.state.bookImage}
                value={this.state.bookImage}
                name="image"
                alt={this.state.title}
              />
            </Row>
            <Row>
              <div className="upload" id="filename">
                <button
                  onClick={this.uploadWidget}
                  className="btn btn-primary btn-sm upload-button"
                >
                  {this.state.imageName === '' && <span>Add BookCover</span>}

                  {this.state.imageName !== '' && <span>Change Book Cover</span>}
                </button>
              </div>
              {this.state.errors.bookImage &&
              <span className="help-text">{this.state.errors.bookImage}</span> }
            </Row>
          </div>
        </Row>
      </Modal>
    );
  }
}

AddBookModal.defaultProps = {
  header: 'Add Book'
};


AddBookModal.propTypes = {
  header: PropTypes.string,
  addBook: PropTypes.func.isRequired
};


export default connect(null, { addBook })(AddBookModal);
