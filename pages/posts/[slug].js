import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { PostDetailed, CategoriesWidget, PostWidget, } from '../../components';
import { getPostDetails } from '../../services';

const PostDetails = () => {
  const router = useRouter();
  const [post, setpost] = useState({})

  const { slug } = router.query;
  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      const data = await getPostDetails(slug)
      setpost(data)
    }
    fetchData();
  }, [slug]);

  return (
    <>
      <div className="container mx-auto px-4 mb-8">
        <title>Wguides</title>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-9">
            <PostDetailed post={post} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidget />
              <CategoriesWidget />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PostDetails;