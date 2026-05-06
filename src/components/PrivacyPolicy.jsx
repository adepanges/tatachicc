import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { Link } from "react-router-dom";
import classnames from "classnames";

const prefersLight = () =>
  typeof window === "undefined" ||
  !window.matchMedia("(prefers-color-scheme: dark)").matches;

const PrivacyPolicy = () => {
  const [isLightTheme, setIsLightTheme] = useState(prefersLight);

  const toggleTheme = () => {
    setIsLightTheme((prevTheme) => !prevTheme);
  };

  return (
    <div
      className={classnames("min-h-screen flex flex-col justify-between", {
        "text-gray-900 bg-gray-100": isLightTheme,
        "text-white bg-gray-900": !isLightTheme,
      })}
    >
      <div className="max-w-4xl mx-auto w-full px-6 py-8 relative">
        <Link
          to="/"
          className={classnames(
            "inline-flex items-center mb-6 px-4 py-2 rounded-md text-sm font-medium transition-all",
            {
              "bg-gray-200 hover:bg-gray-300 text-gray-900": isLightTheme,
              "bg-gray-800 hover:bg-gray-700 text-white": !isLightTheme,
            }
          )}
        >
          <FaArrowLeft className="mr-2" />
          Back
        </Link>
        <button
          className="absolute top-8 right-6 p-2 rounded-full bg-gray-800 text-white"
          onClick={toggleTheme}
        >
          {isLightTheme ? <FaMoon /> : <IoIosSunny />}
        </button>

        <motion.h1
          className="text-4xl font-bold mb-2 font-ubuntu"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Privacy Policy
        </motion.h1>
        <motion.p
          className="text-sm mb-8 font-palanquin opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Last updated: May 6, 2026
        </motion.p>

        <motion.div
          className="space-y-6 font-montserrat leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <section>
            <h2 className="text-2xl font-semibold mb-3 font-ubuntu">
              1. Introduction
            </h2>
            <p>
              This Privacy Policy describes how @tata.chicc handles information
              when you visit this site. We are committed to respecting your
              privacy and protecting any data you may share with us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 font-ubuntu">
              2. Information We Collect
            </h2>
            <p>
              This site does not directly collect personal information. We may
              use anonymous analytics (via Vercel Analytics) to understand
              aggregate site traffic and improve user experience. No personally
              identifiable information is stored by us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 font-ubuntu">
              3. Cookies
            </h2>
            <p>
              This site may use minimal cookies for analytics purposes. You can
              disable cookies through your browser settings at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 font-ubuntu">
              4. Third-Party Links
            </h2>
            <p>
              When you click external links (e.g. Shopee, TikTok, Instagram,
              YouTube, Facebook), you will leave this site and be subject to
              the privacy policies of those platforms. We are not responsible
              for their data practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 font-ubuntu">
              5. Data Security
            </h2>
            <p>
              We take reasonable steps to ensure that any information related
              to this site is handled securely. However, no method of
              transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 font-ubuntu">
              6. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Updates will
              be posted on this page with a revised &quot;Last updated&quot;
              date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 font-ubuntu">
              7. Contact
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us through the links available on the homepage.
            </p>
          </section>
        </motion.div>
      </div>

      <motion.p
        className="text-sm mt-8 pb-4 text-center font-palanquin"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        © 2025 @tata.chicc. All rights reserved.
      </motion.p>
    </div>
  );
};

export default PrivacyPolicy;
