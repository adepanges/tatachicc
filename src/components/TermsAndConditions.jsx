import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { Link } from "react-router-dom";
import classnames from "classnames";

const TermsAndConditions = () => {
  const [isLightTheme, setIsLightTheme] = useState(true);

  useEffect(() => {
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsLightTheme(!systemPrefersDark);
  }, []);

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
          Terms and Conditions
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
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using this site (@tata.chicc), you accept and
              agree to be bound by the terms and provisions of this agreement.
              If you do not agree, please do not use this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 font-ubuntu">
              2. Use of the Site
            </h2>
            <p>
              This site provides links to social media profiles, shops, and
              contact information of @tata.chicc. You may use these links for
              personal, non-commercial purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 font-ubuntu">
              3. External Links
            </h2>
            <p>
              This site contains links to third-party websites (e.g. Shopee,
              TikTok, Instagram, YouTube, Facebook). We are not responsible for
              the content, policies, or practices of these external sites.
              Visiting them is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 font-ubuntu">
              4. Intellectual Property
            </h2>
            <p>
              All content on this site, including text, images, and branding,
              is the property of @tata.chicc unless otherwise noted. You may
              not reproduce or redistribute it without permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 font-ubuntu">
              5. Changes to Terms
            </h2>
            <p>
              We reserve the right to update or modify these terms at any time
              without prior notice. Continued use of the site after changes
              indicates your acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 font-ubuntu">
              6. Contact
            </h2>
            <p>
              For any questions regarding these terms, please reach out via the
              contact links available on the homepage.
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

export default TermsAndConditions;
