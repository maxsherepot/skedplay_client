import { useRouter } from "next/router";
import { GalleryWithThumbnail } from "UI";
import EmployeeBox from "components/employee/EmployeeBox";

const Information = ({ loggedInUser }) => {
  const router = useRouter();
  const { id } = router.query;

  const renderGallery = photos => {
    return <GalleryWithThumbnail photos={photos} />;
  };

  const rightColumn = (
    <>
      <div className="text-2xl font-extrabold my-5">Beschreibung</div>

      <p>info</p>
    </>
  );

  return (
    <EmployeeBox
      id={id}
      user={loggedInUser}
      gallery={renderGallery}
      right={rightColumn}
    />
  );
};

export default Information;
