import { getLoginInfo } from "@/http/axios";
import { useRequest } from "ahooks";
import Login from "@/login";
import SomeInfo from "@/components/someInfo";

export default function Home() {
  const { data } = useRequest(getLoginInfo);
  if (!data?.data?.length) {
    return <Login />;
  }

  return (
    <div className=" h-screen w-screen">
      <SomeInfo />
    </div>
  );
}
