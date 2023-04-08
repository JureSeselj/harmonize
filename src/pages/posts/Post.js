import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Badge, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    title,
    description,
    category,
    comments_number,
    likes_number,
    like_id,
    image,
    updated_on,
    postPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <Card className={styles.Post}>
      <Card.Body className={styles.Container}>
          <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} height={50} className={styles.AvatarGrid} />
          </Link>
          <Link to={`/profiles/${profile_id}`} className={styles.Username}>{owner}</Link>

          <div className={styles.UpdatedOn}>{updated_on}</div>
          <div className={styles.EditIcon}>
            {is_owner && postPage && "Dropdown"}
          </div>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {description && <Card.Text>{description}</Card.Text>}
        {category && <Card.Text>Type: 
            <Badge variant="secondary" className={styles.BadgePost}> {category}</Badge>
        </Card.Text>}
        <hr className={styles.Line} />
        <div>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>This is your post, you can't like it ;-) </Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={() => {}}>
              <i className="fas fa-heart" />
            </span>
          ) : currentUser ? (
            <span onClick={() => {}}>
              <i className="far fa-heart" />
            </span>
          ) : (
            <OverlayTrigger>
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}

          {likes_number}
          <Link to={`/posts/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_number}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;