"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function DMCAPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-invert max-w-none"
        >
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold gradient-text">DMCA Policy</h1>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Digital Millennium Copyright Act</h2>
              <p className="text-gray-300 leading-relaxed">
                Ad-Vision AI respects the intellectual property rights of others and expects our users to do the same. We will respond to notices of alleged copyright infringement that comply with the Digital Millennium Copyright Act (DMCA).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Filing a DMCA Takedown Notice</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you believe that content on Ad-Vision AI infringes your copyright, please provide the following information:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>A physical or electronic signature of the copyright owner</li>
                <li>Identification of the copyrighted work claimed to have been infringed</li>
                <li>Identification of the material that is claimed to be infringing</li>
                <li>Contact information including name, address, phone, and email</li>
                <li>A statement of good faith belief that the use is not authorized</li>
                <li>A statement that the information is accurate and you are authorized to act</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Counter-Notification</h2>
              <p className="text-gray-300 leading-relaxed">
                If you believe your content was removed in error, you may file a counter-notification. The counter-notification must include your contact information and a statement under penalty of perjury that you have a good faith belief the material was removed by mistake.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
              <div className="bg-dark-bg p-4 rounded-lg">
                <p className="text-gray-300">
                  <strong className="text-white">Email:</strong> dmca@advision.ai<br />
                  <strong className="text-white">Address:</strong> [Your Company Address]<br />
                  <strong className="text-white">Phone:</strong> [Your Phone Number]
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Repeat Infringers</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to terminate accounts of users who are repeat infringers of intellectual property rights.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
