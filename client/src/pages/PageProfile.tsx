import { useParams } from "react-router-dom";
import HeaderPageProfile from "@/components/headers/HeaderPageProfile";
import PageFollowers from "@/components/profile/PageFollowers";
import PagePosts from "@/components/profile/PagePosts";
import CreatePost from "@/components/feed/post/CreatePost";
import { useMeQuery } from "@/utils/user";
import { useQuery } from "@apollo/client/react";
import { GET_PAGE } from "@/graphql/queries/page";
import type { Page } from "@/interface/page";
import HeaderFeed from "@/components/headers/HeaderFeed";

export default function PageProfile() {
  const { pageId } = useParams();
  const { user } = useMeQuery();
  const { data } = useQuery<{ getPage: Page }>(GET_PAGE, {
    variables: { id: pageId || "" },
  });

  const isOwner = user?.id === data?.getPage.userId;

  return (
    <>
      <HeaderFeed />
      <HeaderPageProfile pageId={pageId || ""} />
      <div className="profile-container">
        <div className="container grid gap-4 md:grid-cols-[1fr_2fr] grid-cols-1">
          <div className="left-side">
            <PageFollowers pageId={pageId || ""} />
          </div>
          <div className="right-side space-y-4">
            {isOwner && <CreatePost pageId={pageId || ""} />}
            <PagePosts pageId={pageId || ""} />
          </div>
        </div>
      </div>
    </>
  );
}
