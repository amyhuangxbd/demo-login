import { Link } from "react-router-dom";
import { PhoneOutlined } from "@ant-design/icons";

export default function SomeInfo() {
  return (
    <div className=" bg-[url('https://i.ibb.co/hsPc3dr/programer.jpg')] h-full w-full bg-cover bg-center bg-fixed text-white overflow-hidden">
      <div className=" p-7 w-full h-full bg-purple-400/50 overflow-hidden box-border">
        <h1 className=" text-9xl font-black m-10 mb-5">Hello World.</h1>
        <p className=" text-3xl m-9 font-black">
          I am a skilled front-end developer with a strong passion for creating
          responsive, user-friendly, and visually appealing web applications.
        </p>
        <span>
          <p className=" text-3xl m-9 font-black">Contact me with Telphone</p>
          <a href="#">
            <i className="fa fa-facebook" aria-hidden="true"></i>
          </a>
          <div>
            <Link to="tel:+15721169252" className="font-semibold text-white">
              <PhoneOutlined />
              15721169252
            </Link>
          </div>
          <div>
            <Link to="/login" className="font-semibold text-white">
              to login
            </Link>
          </div>
        </span>
      </div>
    </div>
  );
}
