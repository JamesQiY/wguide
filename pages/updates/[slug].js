import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { UpdateDetailed, SideWidgets } from "../../components";
import { getUpdateDetails } from "../../services";
import Container from "../../components/Container";

const UpdateDetails = () => {
  const router = useRouter();
  const [update, setupdate] = useState({});

  const { slug } = router.query;
  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      const data = await getUpdateDetails(slug);
      setupdate(data);
    };
    fetchData();
  }, [slug]);

  return (
    <Container>
      <div className="col-span-1 lg:col-span-8">
        <UpdateDetailed update={update} />
      </div>
      <SideWidgets />
    </Container>
  );
};
export default UpdateDetails;
