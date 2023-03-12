import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import NavBar from "@components/HomeNavBar";
import { api } from "@utils/api";
import Image from "next/image";
import { signOut } from "next-auth/react";

const MyWorksheets: NextPage = () => {
  return (
    <>
      <Head>
        <title>My Worksheets - Worksheesh</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main>
        <div className="mx-8 mt-8 flex items-center justify-between">
          <h1 className=" text-4xl">My Worksheets</h1>
          <Link href="/answer-sheets">
            <button className="btn-ghost btn">Go to my answer sheets</button>
          </Link>
        </div>

        <WorksheetList />
      </main>
    </>
  );
};

export default MyWorksheets;

const createWorksheet = () => {
  return;
};

const WorksheetList: React.FC = () => {
  const { data: profiles, refetch: refetchProfiles } =
    api.teacherProfile.getWorksheets.useQuery(
      undefined // no input
    );

  console.log(profiles);

  const deleteUser = api.user.delete.useMutation({
    onSuccess: () => {
      void signOut({
        callbackUrl: `${window.location.origin}`,
      });
    },
  });

  const copyLink = () => {
    // void signOut({
    //   callbackUrl: `${window.location.origin}`,
    // });

    deleteUser.mutate();

    return;
  };

  // const worksheets = profiles?.at(0)?.worksheets;

  const worksheets = [
    {
      id: "Hihih",
      title: "42 FM 2016",
      lastEdited: "",
    },
    {
      id: "Hihih",
      title: "42 FM 2016",
      lastEdited: "",
    },
  ];

  if (worksheets?.length == 0) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center gap-16">
        <Image
          src="/images/illustrations/empty_worksheet.svg"
          alt="Empty Worksheet Image"
          width="350"
          height="350"
        />
        <div className="flex items-center justify-center">
          <button className="btn-primary btn " onClick={createWorksheet}>
            Create Worksheet
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mx-8 mt-8">
        {worksheets.map((worksheet) => (
          <div
            key={worksheet.id}
            className="mb-4 flex items-stretch justify-between"
          >
            <Link
              href={`/worksheets/${worksheet.id}`}
              className="flex w-full items-center justify-start rounded-lg py-2 px-4 transition-all hover:bg-gray-200 active:bg-gray-100"
            >
              <div className="flex flex-col items-start">
                <h2 className="mb-2 text-xl font-semibold">
                  {worksheet.title}
                </h2>
                <h3> Last Edited:</h3>
              </div>
            </Link>

            <div className="mx-4 flex items-center justify-center">
              <button
                className="btn-outline btn-primary btn-circle btn text-xl"
                onClick={copyLink}
              >
                🔗
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

// const NavActions: React.FC = () => {
//   const { data: profiles, refetch: refetchProfiles } =
//     api.teacherProfile.getAll.useQuery(
//       undefined // no input
//     );

//   if (profiles?.length == 0) {
//     const createProfile = api.teacherProfile.create.useMutation({
//       onSuccess: () => {
//         void refetchProfiles();
//       },
//     });

//     createProfile.mutate();
//   }

//   return <DraftList profileId={profiles?.at(0)?.id as string}></DraftList>;
// };
