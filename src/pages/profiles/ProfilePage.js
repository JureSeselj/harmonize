import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import Asset from "../../components/Asset";
import styles from "../../styles/ProfilePage.module.css";
import buttonsStyles from "../../styles/FollowButtons.module.css";
import appStyles from "../../App.module.css";
import columnStyles from "../../styles/SmallMenuContainer.module.css";
import PopularProfiles from "./PopularProfiles";
import LikeFeedAddPost from "../../components/LikeFeedAddPost";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../posts/Post";
import { fetchMoreData } from "../../utils/utils";
import NoResultsImage from "../../assets/no-results-found.png";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false); 
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const setProfileData = useSetProfileData(); // update the page profile data
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner; // check if the logged-in user is the profile's owner
  const [profilePosts, setProfilePosts] = useState({ results: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePosts }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/posts/?owner__profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));

        setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-3">{profile?.owner}</h3>
            <Row className="justify-content-around">
            <Col xs={3} className="my-3">
              <div>Followers</div>
              <div>{profile?.followers_number}</div>
            </Col>
            <Col xs={3} className="my-3">
              <div>Following</div>
              <div>{profile?.following_number}</div>
            </Col>
            <Col xs={3} className="my-3">
              <div>Posts</div>
              <div>{profile?.posts_number}</div>
            </Col>
            </Row>
        </Col>
        
        <Col lg={3} className="text-lg-right mt-md-3 mt-sm-1">
        {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${buttonsStyles.Button} ${buttonsStyles.ButtonUnfollow}`}
                onClick={() => {}}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={`${buttonsStyles.Button} ${buttonsStyles.ButtonFollow}`}
                onClick={() => {}}
              >
                follow
              </Button>
            ))}
        </Col>
        {profile?.content && <Col className="p-3">{profile?.description}</Col>}
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr className={appStyles.Line} />
        <p className="text-center">{profile?.owner}'s posts</p>
      <hr className={appStyles.Line} />

      {profilePosts.results.length ? (
        <InfiniteScroll
          children={profilePosts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setProfilePosts} />
          ))}
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        />
      ) : (
        <Asset
          src={NoResultsImage}
          message={`${profile?.owner} does not have any posts`}
        />
      )}
    </>
  );

  return (
    <Container>
      <Row>
        <Col className="pt-2 p-0 g-0" lg={4}>
            <LikeFeedAddPost />

          <Container
            className={`${appStyles.Content} ${columnStyles.CollapsedColumn} mb-2`}
          >
            <PopularProfiles />
          </Container>
        </Col>

        <Col className="py-2 p-0 p-lg-2" lg={8}>

        <Container className={appStyles.Content}>
            {hasLoaded ? (
              <>
                {mainProfile}
                {mainProfilePosts}
              </>
            ) : (
              <Asset spinner />
            )}
        </Container>

        </Col>
      </Row>
    </Container>

  );
}

export default ProfilePage;