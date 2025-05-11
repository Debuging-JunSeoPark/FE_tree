import { IoClose } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

interface Props {
  onClose: () => void;
}

const PrivacyPolicyModal = ({ onClose }: Props) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }}
    >
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative overflow-y-auto max-h-[80vh] shadow-xl font-Pretendard">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl transition-colors"
          aria-label="Close"
        >
          <IoClose />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
          Privacy Policy
        </h2>

        <div className="space-y-6 text-gray-800 text-sm leading-relaxed">
          {/* 1. Info */}
          <section>
            <h3 className="text-base font-semibold mb-2 text-main">
              1. Information We Collect
            </h3>
            <ul className="space-y-1 ml-2">
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-main mt-0.5 text-xs" />
                Email address
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-main mt-0.5 text-xs" />
                Password
              </li>
            </ul>
          </section>

          {/* 2. Use */}
          <section>
            <h3 className="text-base font-semibold mb-2 text-main">
              2. How We Use Your Information
            </h3>
            <ul className="space-y-1 ml-2">
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-main mt-0.5 text-xs" />
                To register and manage your account
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-main mt-0.5 text-xs" />
                To provide, improve, and personalize our services
              </li>
            </ul>
          </section>

          {/* 3. Retention */}
          <section>
            <h3 className="text-base font-semibold mb-2 text-main">
              3. Data Retention
            </h3>
            <p>
              We retain your personal data only as long as necessary to fulfill
              the purposes outlined above, or as required by law. You can request
              account deletion at any time.
            </p>
          </section>

          {/* 4. Sharing */}
          <section>
            <h3 className="text-base font-semibold mb-2 text-main">
              4. Sharing and Disclosure
            </h3>
            <p>
              We do not sell or share your personal information with third parties,
              except where required by law or with your explicit consent.
            </p>
          </section>

          {/* 5. Your Rights */}
          <section>
            <h3 className="text-base font-semibold mb-2 text-main">
              5. Your Rights
            </h3>
            <ul className="space-y-1 ml-2">
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-main mt-0.5 text-xs" />
                Access and review your personal information
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-main mt-0.5 text-xs" />
                Request correction or deletion of your data
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-main mt-0.5 text-xs" />
                Withdraw your consent at any time
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
