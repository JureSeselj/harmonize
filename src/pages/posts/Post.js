import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Badge, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { DropdownMenu } from "../../components/DropdownMenu";


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
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_number: post.likes_number + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_number: post.likes_number - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Post}>
      <Card.Body className={styles.Container}>
          <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} height={50} className={styles.AvatarGrid} />
          </Link>
          <Link to={`/profiles/${profile_id}`} className={styles.Username}>{owner}</Link>

          <div className={styles.UpdatedOn}>{updated_on}</div>
          <div className={styles.EditIcon}>
            {is_owner && postPage && <DropdownMenu handleEdit={handleEdit} handleDelete={handleDelete} />}
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
            <span onClick={handleUnlike}>
              <i className="fas fa-heart" />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className="far fa-heart" />
            </span>
          ) : (
            <OverlayTrigger>
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}

          {likes_number}
          <Link to={`/posts/${id}`}>
            <i class="fa-regular fa-comment ml-2" />
          </Link>
          {comments_number}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;