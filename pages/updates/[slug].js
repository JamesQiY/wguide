import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { UpdateDetailed, SideWidgets} from '../../components';
import { getUpdateDetails } from '../../services';

const UpdateDetails = () => {
  const router = useRouter();
  const [update, setupdate] = useState({})

  const { slug } = router.query;
  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      const data = await getUpdateDetails(slug)
      setupdate(data)
    }
    fetchData();
  }, [slug]);

  return (
    <>
      <div className="container mx-auto px-10 mb-8">
        <title>Wguides</title>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <UpdateDetailed update={update} />
          </div>
          <SideWidgets/>
        </div>
      </div>
    </>
  );
};
export default UpdateDetails;