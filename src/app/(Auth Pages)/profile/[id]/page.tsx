"use client";

import { useSearchParams } from "next/navigation";

function ProfilePage() {
  const params = useSearchParams();

  console.log(params.get('id'));

  return <div>Profile</div>;
}

// export async function getServerSideProps(props: { params: { id: number } }) {
//   console.log(++props.params.id);
//   return;
// }

export default ProfilePage;
