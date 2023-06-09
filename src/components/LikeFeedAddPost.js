import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from "react-bootstrap";
import appStyles from "../App.module.css";
import styles from "../styles/SmallMenuContainer.module.css";

/*
  Small menu with links to create a post, 
  see liked post and posts by other users the user is following
*/
const LikeFeedAddPost = () => {
  return (
    <Container
      className={`${appStyles.Content} ${styles.CollapsedColumn} mb-2 ${styles.LikeFeedAddDisplay}`}
          >
      <Link to="/posts/create"><i className="fa-regular fa-plus fa-fw"></i><p className={styles.Link}>Add post</p></Link>
      <Link to="/liked"><i className="fa-regular fa-heart fa-fw"></i><p className={styles.Link}>Liked posts</p></Link>
      <Link to="/feed"><i className="fa-solid fa-rss fa-fw"></i><p className={styles.Link}>Feed</p></Link>
    </Container>
  )
}

export default LikeFeedAddPost;