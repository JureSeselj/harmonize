import React, { useEffect, useState } from "react";
import { Badge, Col, Container, Form, Row } from "react-bootstrap";
import styles from "../../styles/MainPostsPage.module.css";
import columnStyles from "../../styles/SmallMenuContainer.module.css";
import appStyles from "../../App.module.css";
import Post from "./Post";
import Asset from "../../components/Asset";
import NoResultsImage from "../../assets/no-results-found.png";
import LikeFeedAddPost from "../../components/LikeFeedAddPost";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function MainPostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [category, setCategory] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  // detect the url change between home, feed & liked pages
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();
  const [query, setQuery] = useState("");

  /*
    Handles API request using the filters for each of pages
    to fetch relevant posts to the filter
    Displays all the posts, just posts by the profiles followed, 
    just the liked posts or posts in a specific category
    Shows a loading spinner when required
  */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(
            `/posts/?${filter}search=${query}${
                category !== null ? `&category=${category}` : ""
            }`
        );
        setPosts(data);
        setHasLoaded(true);
    } catch (err) {
    }
  };

    setHasLoaded(false);
    /*
      Delays making an API request and fetching posts of 1 second
      instead of on each key stroke
    */
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser, category]);

  return (
    <Container>
      <Row>
        <Col className={`${columnStyles.SplitColumns} pt-2 p-0 p-lg-2`} lg={4}>
          <LikeFeedAddPost />

          <Container
            className={`${appStyles.Content} ${columnStyles.CollapsedColumn} mb-2`}
          >
            <PopularProfiles />
          </Container>

          <Container
            className={`${appStyles.Content} ${columnStyles.CollapsedColumn} ${columnStyles.CategoriesColumn}`}
          >
            <p className=" font-weight-bold ml-2">Post categories</p>
            <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory(null)}>All</Badge>
            <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Quotes")}>Quotes</Badge>
            <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Animals")}>Animals</Badge>
            <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Lifestyle")}>Lifestyle</Badge>
            <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Fun Fact")}>Fun fact</Badge>
            <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Creative")}>Creative</Badge>
            <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Nature")}>Nature</Badge>
            <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Arts & Entertainment")}>Arts & Entertainment</Badge>
            <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Books")}>Books</Badge>
            <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Design & Fashion")}>Design & Fashion</Badge>
            <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Education")}>Education</Badge>
            <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Food & Beverage")}>Food & Beverage</Badge>
            <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Health/Beauty")}>Health/Beauty</Badge>
            <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Sport")}>Sport</Badge>
            <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Clothing (Brand)")}>Clothing (Brand)</Badge>
            <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Automotive")}>Automotive</Badge>
            <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Games/Toys")}>Games/Toys</Badge>
            <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Musician/Band")}>Musician/Band</Badge>
            <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Movie")}>Movie</Badge>
            <Badge variant="secondary" pill className={`${styles.Badge}`} onClick={() => setCategory("Other")}>Other</Badge>
          </Container>
        </Col>

        <Col className="py-2 p-0 p-lg-2" lg={8}>

        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(e) => e.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search posts"
          />
          <i className={`fa-solid fa-eraser ${styles.Clear}`} onClick={() => setQuery("")} />
        </Form>

        {hasLoaded ? (
          <>
            {posts.results.length ? (
              <InfiniteScroll
              children={posts.results.map((post) => (
                <Post 
                    key={post.id} 
                    {...post} 
                    setPosts={setPosts} 
                    // truncate post description on the main page to 500 characters
                    description={post.description.length > 500 ? (post.description.slice(0, 500) + ' .....') : post.description} />
              ))}
              dataLength={posts.results.length}
              loader={<Asset spinner />}
              hasMore={!!posts.next}
              next={() => fetchMoreData(posts, setPosts)}
            />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResultsImage} width={20} height={20} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}

        </Col>
      </Row>
    </Container>
  );
}

export default MainPostsPage;
