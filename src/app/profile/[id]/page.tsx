const ProfilePageByID = ({ params }: any) => {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <h1 className="text-4xl text-center mb-10 ">profile Page by ID</h1>
      <h3 className="text-2xl text-center">{params.id}</h3>
    </div>
  );
};

export default ProfilePageByID;
