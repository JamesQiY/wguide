import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { PostDetailed, SideWidgets } from "../../components";
import { getPostDetails, getAdjacentPosts } from "../../services";
import AdjacentPost from "../../components/cards/AdjacentPost";
import Container from "../../components/Container";

const PostDetails = () => {
  const router = useRouter();
  const [post, setpost] = useState({});
  const [related, setrelated] = useState({});

  const { slug } = router.query;
  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      const data = await getPostDetails(slug);
      setpost(data);

      const adjacent = await getAdjacentPosts(data.createdAt, slug);
      setrelated(adjacent);
    };
    fetchData();
  }, [slug]);

  return (
    <Container>
      <div className="col-span-1 lg:col-span-8">
        <PostDetailed post={post} />
        <AdjacentPost data={related} />
      </div>
      <SideWidgets />
    </Container>
  );
};
export default PostDetails;
