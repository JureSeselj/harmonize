import React from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import Upload from "../../assets/upload-image.png";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";

function PostCreateForm() {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
  });

  const { title, category, description, image } = postData;

  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle changes to the file input field
  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      URL.revokeObjectURL(image); // for changing image after adding one
      setPostData({
        ...postData,
        image: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  
  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control 
          type="text"
          name="title"
          className={appStyles.Input}
          value={title}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="category"
          className={appStyles.Input}
          value={category}
          onChange={handleChange}
        >
          <option>Select type of category</option>
          <option value="quotes">Quotes</option>
          <option value="animals">Animals</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="fun fact">Fun fact</option>
          <option value="creative">Creative</option>
          <option value="nature">Nature</option>
          <option value="arts & entertainment">Arts & Entertainment</option>
          <option value="books">Books</option>
          <option value="design & fashion">Design & Fashion</option>
          <option value="education">Education</option>
          <option value="food & beverage">Food & Beverage</option> 
          <option value="health/beauty">Health/Beauty</option>
          <option value="sport">Sport</option> 
          <option value="clothing (brand)">Clothing (Brand)</option>
          <option value="automotive">Automotive</option>
          <option value="games/toys">Games/Toys</option>
          <option value="musician/band">Musician/Band</option>
          <option value="movie">Movie</option>
          <option value="other">Other</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="description"
          className={appStyles.Input}
          value={description}
          onChange={handleChange}
        />
      </Form.Group>

      <Button className={`my-3 ${appStyles.button}`} type="submit">
        Create
      </Button>

      <Button className={`${appStyles.button} mx-3`} onClick={() => {}}>
        Cancel
      </Button>
    </div>
  );

  return (
    <Form>
      <Row>
        <Col md={7} lg={8} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
        <Col className="py-2 p-0 p-md-2" md={5} lg={4}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
            {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${appStyles.button} ${styles.ButtonChangeImage} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload a picture"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                className="d-none"
                onChange={handleChangeImage}
              />
            </Form.Group>

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostCreateForm;