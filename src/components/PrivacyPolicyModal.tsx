import { IoClose } from "react-icons/io5";

interface Props {
  onClose: () => void;
}

const PrivacyPolicyModal = ({ onClose }: Props) => {
  return (<div
    className="fixed inset-0 z-50 flex items-center justify-center px-4"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }} // 0.1 = 10% 투명도
  >
  
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative overflow-y-auto max-h-[80vh] shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          <IoClose />
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-900">Privacy Policy</h2>
        <div className="text-sm text-gray-800 space-y-4 leading-relaxed font-Pretendard">
          <div>
            <h3 className="font-semibold mb-1">1. Information We Collect</h3>
            <ul className="list-disc ml-5">
              <li>Email address</li>
              <li>Password</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-1">2. How We Use Your Information</h3>
            <ul className="list-disc ml-5">
              <li>To register and manage your account</li>
              <li>To provide, improve, and personalize our services</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-1">3. Data Retention</h3>
            <p>
              We retain your personal data only as long as necessary to fulfill
              the purposes outlined above, or as required by law. You can request
              account deletion at any time.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">4. Sharing and Disclosure</h3>
            <p>
              We do not sell or share your personal information with third parties,
              except where required by law or with your explicit consent.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">5. Your Rights</h3>
            <ul className="list-disc ml-5">
              <li>Access and review your personal information</li>
              <li>Request correction or deletion of your data</li>
              <li>Withdraw your consent at any time</li>
            </ul>
          </div>

          <div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
