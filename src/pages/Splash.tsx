import splashlogo from "../assets/images/splashLogo.png";
function Splash() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-main to-[#964B00]">
      <img src={splashlogo} alt="로고" className="w-25 h-auto" />
      <div className="font-PMedium text-lg text-white">
        grow a tree for your mind
      </div>
    </div>
  );
}
export default Splash;
