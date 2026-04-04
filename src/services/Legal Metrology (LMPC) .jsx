import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import lmpcimage from "../assets/lmpc.webp";
import CommentSection from "../components/CommentSection";

const LegalMetrologyLMPC = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: "", text: "" });
const faqData = [
  {
    question: "Question No. 1: Is it sufficient to include the required declarations under the Legal Metrology (Packaged Commodities) Rules, 2011 only on the footwear box, or need to be declared on the footwear itself?",
    answer: "Answer: If all the declarations required under the rules are clearly provided on the footwear box or on the label affixed/appearing on it, it is not necessary to declare the same on the footwear separately, as it is sold in the box only."
  },
  {
    question: "Question No. 2: Are declarations required for footwear items sold without a box?",
    answer: "Answer: In the absence of a box, the declarations may be made on the footwear using a tag or sticker or by other means in the interest of consumers."
  },
  {
    question: "Question No. 3: For declaring the retail sale price under the Legal Metrology (Packaged Commodities) Rules, 2011, whether the symbol \"₹\" is mandatory or the words \"Rs.\" are also allowed?",
    answer: "Answer: The declaration of retail sale price under the Legal Metrology (Packaged Commodities) Rules, 2011 may be made either with the symbol \"₹\" or with the words \"Rs.\"."
  },
  {
    question: "Question No. 4: Whether Section 22 of the Legal Metrology Act, 2009 applies to Feeler Gauges?",
    answer: "Answer: Section 22 of the Legal Metrology Act, 2009 provides for approval of models of weights & measures and weighing & measuring instruments manufactured or imported in India. Section 22 is applicable to the weights and measures which are listed in the Legal Metrology (General) Rules, 2011. The \"Feeler Gauges\" are presently not covered under the Legal Metrology (General) Rules, 2011."
  },
  {
    question: "Question No. 5: Whether Section 22 of the Legal Metrology Act, 2009 applies to electronic callipers, mini vernier gauge, dial depth gauge, digital callipers, bore gauge, and digital indicators?",
    answer: "Reply: Section 22 of the Legal Metrology Act, 2009 provides for approval of models of weights & measures and weighing & measuring instruments manufactured or imported in India. Section 22 is applicable to the weights and measures which are listed in the Legal Metrology (General) Rules, 2011. The \"electronic callipers, mini vernier gauge, dial depth gauge, digital callipers, bore gauge, digital indicators\" are presently not covered under the Legal Metrology (General) Rules, 2011. Therefore, approval of the model under Section 22 of the LM Act, 2009, of these equipment is not required at present."
  },
  {
    question: "Question No. 6: Whether verification, stamping, and sealing of weighing machines of very high accuracy classes is required before custom clearance or after installation at the place of use?",
    answer: "Reply: As per Sections 24/33 of the Legal Metrology Act, 2009 and Rule 27 of the Legal Metrology (General) Rules, 2011, the verification and stamping of weighing machines of very high accuracy classes is required to be done at the place of installation before putting them into use."
  },
  {
    question: "Question No. 7: Whether Section 22 of the Legal Metrology Act, 2009 applies to Load Cells?",
    answer: "Reply: Section 22 of the Legal Metrology Act, 2009 provides for approval of models of weights & measures and weighing & measuring instruments manufactured or imported in India. Section 22 is applicable to the weights and measures which are listed in the Legal Metrology (General) Rules, 2011. The \"Load Cells\" are presently not covered under the Legal Metrology (General) Rules, 2011, which may be added under these rules shortly. Therefore, approval of the model under Section 22 of the LM Act, 2009, of these load cells is not required at present."
  },
  {
    question: "Question No. 8: The details of Model Approval Number, manufacturer, Max, Min capacity, \"e\" value, etc., are required to be declared on the weighing/measuring machines at the time of manufacture or at the time of sale on the stamping plate?",
    answer: "Reply: It is advisable to declare the details of Model Approval Number, manufacturer, Max, Min capacity, \"e\" value, etc., on the weighing/measuring machines at the time of manufacture, but they need to be ensured mandatorily before sale/putting into use."
  },
  {
    question: "Question No. 9: How to import the weighing machine for which approval is not required in the country of manufacture, as per their special use for R&D or other purposes?",
    answer: "Reply: The import of very few weighing/measuring instruments (not more than 5) for R&D purposes may be done. However, these machines cannot be sold/put into use without complying with all the requirements of the Legal Metrology Act, 2009 or Rules made thereto. The information of such import needs to be given in writing to the concerned Controller of Legal Metrology for the needful."
  },
  {
    question: "Question No. 10: Whether the Packaged Commodities Rules (known as LMPC Rules) are applicable for the products imported for institutional & industrial consumers (not for retail sale), including declaration of MRP, consumer care details, etc.?",
    answer: "Reply: As per Rule 3 of the Legal Metrology (Packaged Commodities) Rules, 2011, the requirement of mandatory declarations on pre-packaged commodities meant for institutional & industrial consumers is not required, but it should bear a declaration \"not for retail sale\" on the package before sale."
  },
  {
    question: "Question No. 11: Whether verification and stamping of weighing machines used for R&D is required?",
    answer: "Reply: As per Section 55 of the Legal Metrology Act, 2009, verification and stamping of weighing machines used for R&D purposes is not required."
  },
  {
  question: "Question No. 12: What is the Law under the Legal Metrology Registration Act?",
  answer: "Answer: The Legal Metrology Act governs standards of weights, measures, and labelling of pre-packaged commodities in India."
},
{
  question: "Question No. 13: Who is the competent authority to grant a legal metrology license?",
  answer: "Answer: The State Legal Metrology Department is the competent authority to grant Legal Metrology (LMPC) and related licenses."
},
{
  question: "Question No. 14: What are commodities covered under the Rules?",
  answer: "Answer: All pre-packaged goods sold by weight, measure, or number are covered under Legal Metrology (LMPC) rules."
},
{
  question: "Question No. 15: Can a person use an unstamped Weights and Measures Certificate?",
  answer: "Answer: No, using unstamped or unverified weights and measures is illegal and punishable."
},
{
  question: "Question No. 16: How can consumers ensure the Weights and Measures Certificate standards?",
  answer: "Answer: Consumers should check product labels and report discrepancies to legal metrology authorities."
},
];
  // Load comments from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("companyRegComments");
    if (saved) setComments(JSON.parse(saved));
  }, []);

  // Save comments to localStorage
  useEffect(() => {
    localStorage.setItem("companyRegComments", JSON.stringify(comments));
  }, [comments]);

  // ✅ CANONICAL TAG
  useEffect(() => {
    let link = document.querySelector("link[rel='canonical']");

    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }

    link.setAttribute(
      "href",
      "https://www.theeximroof.com/legal-metrology-certificate-in-india"
    );
  }, []);

  // Scroll animation: text moves behind navbar
  useEffect(() => {
    const handleScroll = () => {
      const heroText = document.querySelector(".hero-text");
      if (!heroText) return;
      const scrollY = window.scrollY;
      heroText.style.transform = `translateY(${scrollY * 0.4}px)`;
      heroText.style.opacity = `${Math.max(0, 1 - scrollY / 300)}`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleComment = (e) => {
    e.preventDefault();
    if (!newComment.name || !newComment.text) return;

    const comment = {
      id: Date.now(),
      name: newComment.name,
      text: newComment.text,
      time: new Date().toLocaleString(),
    };

    setComments((prev) => [...prev, comment]);
    setNewComment({ name: "", text: "" });
  };
  useEffect(() => {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.innerHTML = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  });

  document.head.appendChild(script);

  return () => {
    document.head.removeChild(script);
  };
}, []);

  return (
    <>
      <Navbar />

      {/* Page Wrapper */}
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white py-8 sm:py-12 px-4 sm:px-6 overflow-hidden">

        {/* Hero Section - Card Layout */}
        <section className="max-w-6xl mx-auto mt-24 mb-10 sm:mb-12">
          <div className="bg-white/10 backdrop-blur-lg border border-cyan-400 shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

            {/* LEFT: CONTENT */}
            <div className="p-6 sm:p-10 flex flex-col justify-center">
              <div className="hero-text transition-transform duration-200">
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
                  Legal Metrology Certificate in India
                </h1>
                <p className="text-fuchsia-100 mt-3 sm:mt-4 text-sm sm:text-lg md:text-xl">
               The Legal Metrology (LMPC) Certificate in India is a Compulsory registration for businesses with pre-packaged commodities. It ensures that Commodity mrp labels carry correct and transparent information in accordance with legal metrology rules. This Registration and Certification applies to packers, manufacturers, importers, also brand owners. Having a Legal Metrology (LMPC) certificate helps the industry to sell its products smoothly in India without any legal matters.
                </p>hurdles
              </div>
            </div>

            {/* RIGHT: IMAGE (NOT BEHIND CONTENT) */}
            <div className="relative h-[260px] sm:h-[320px] md:h-auto">
              <img
                src={lmpcimage}
                alt="Legal Metrology Certificate"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30"></div>
            </div>

          </div>
        </section>

        {/* Service Content */}
        <section className="bg-white/5 backdrop-blur-lg border border-cyan-400 shadow-lg rounded-2xl p-5 sm:p-8 mb-10 sm:mb-12 max-w-5xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-cyan-200">
            What is the Legal Metrology (LMPC) Certificate in India
          </h2>

          <div className="text-fuchsia-100 leading-relaxed space-y-6 text-sm sm:text-base">
            <p>
             The Legal Metrology (LMPC) Certificate is issued under the Legal Metrology Structure for pre-packaged commodities. It confirms that packaging, labelling and Mrp details comply with prescribed standards like quantity, MRP, and manufacturer details. This certificate is required before selling or importing packaged products in India. The Department of Legal Metrology (Ministry of Consumer Affairs)  regulates it.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-cyan-200">
              Why Legal Metrology (LMPC) Certificate Required in India
            </h2>

            <p>
             The Legal Metrology (LMPC) Certificate is required to protect consumers from misleading packaging Commodities and wrong business practices. It ensures transparency in quantity, pricing and product information. For importers, it is a mandatory registration requirement at customs. Trade without Legal Metrology (LMPC) registration causes penalties and seizure of the commodity.
            </p>

            <h3 className="text-lg sm:text-xl font-semibold text-cyan-300">
              Purpose of Legal Metrology (LMPC) registration
            </h3>
            <p>
              The main purpose of Legal Metrology (LMPC) registration is to standardise the labeling and correct information and transparency of pre-packaged goods and Commodities. It confirms that the customer and Consumer get Correct information about the Pre Packed Commodity and product. This builds trust between the Consumer and Business.
            </p>

            <h3 className="text-lg sm:text-xl font-semibold text-cyan-300">
              Consumer protection and compliance
            </h3>
            <p>
              Legal Metrology (LMPC) rules safeguard consumer rights by preventing wrongly under-weight or labelled commodity products. Legal Metrology helps businesses ensure legal compliance and maintains a level playing field.
            </p>

            <h3 className="text-lg sm:text-xl font-semibold text-cyan-300">
              Role in customs clearance
            </h3>
            <p>
             It is the most important role in the customs-imported goods, Legal Metrology (LMPC) certification is a Mandatory Registration in the customs clearance. Without it, customs clearance may lead to penalties or result in the holding of your shipments
            </p>

            <h3 className="text-lg sm:text-xl font-semibold text-cyan-300">
              Penalties for non-compliance
            </h3>
            <p>
             In the Legal Metrology, non-compliance leads to heavy Penalties and legal notices. Government Officers or departments may also seize or stop the sale of non-compliant commodities. 
            </p>

            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-cyan-200">
              Who Needs a Legal Metrology (LMPC) Certificate in India
            </h2>

            <p>
              Any business or Trade dealing with  Goods or pre-packaged commodities for sale in India requires a Legal Metrology (LMPC) certificate. Also Required importers, brand owners, manufacturers, and packers. Also required for online sales or E-commerce Websites 

            </p>

            <ul className="list-disc pl-5 space-y-3">
              <li>
                <strong>Importers of Pre-Packaged Goods:</strong>
               Importers also obtain Legal Metrology (LMPC) registration before customs clearance. It makes sure that the imported  Commodity Goods products meet the  Indian Mrp Sticker Rules and Regulations. Without it, imports may stop your shipment or can be hold on the Customs
              </li>

              <li>
                <strong>Manufacturers of Packaged Commodities:</strong>
                Manufacturers producing packaged goods for sale must comply with Legal Metrology (LMPC) rules. It confirms that the packaging details are as per the norms of Metrology. And Products have transparency of the details 
              </li>

              <li>
                <strong>Packers and Re-Packers:</strong>
               Any Businesses in India that indulge in packing or re-packing Commodity goods or products must also requir to the register under Legal Metrology (LMPC). They are responsible for the correct mrp stickers and compliance. These rules also apply even if the business or trade is not a manufacturer.

              </li>

              <li>
                <strong>Traders and Brand Owners:</strong>
                Traders and brand owners also selling packaged commodity goods or any products under their name need Legal Metrology (LMPC) certification. It shows Responsibiltyof the product information. It is important for building trust for the Brand Owner

              </li>
            </ul>

            <h2 className="text-xl sm:text-2xl font-bold text-cyan-200">
              Products Covered Under Legal Metrology (LMPC) Certificate
            </h2>

            <p>
             Legal Metrology (LMPC) certification covers all Packed and Prepacked commodities sold by weight, measure, or number. It is required for domestic and imported Packed and Prepacked Goods. 

            </p>

            <ul className="list-disc pl-5 space-y-3">
              <li>
                <strong>Food Products:</strong>
                Packaged or Pre-Packed food items like Pulses, Nuts, Seeds, and any Kind of Commodity related to food require Legal Metrology (LMPC) compliance. Mrp Label need to mention the net quantity and MRP. This makes sure food transparency and Protect Consumer rights.

              </li>

              <li>
                <strong>Cosmetics and Personal Care:</strong>
               Cosmetics and personal care items are covered under Legal Metrology (LMPC) rules. Accurate quantity and manufacturer details are mandatory. This helps avoid misleading claims.

              </li>

              <li>
                <strong>Electronics and Electrical Items:</strong>
               Packaged or Non-Packed Commodity or Goods items, electronics items sold in wholesale or retail, are necessary to register in the Legal Metrology (LMPC) mrp sticker. Quantity, model, and importer details are okay; otherwise custom can hold your shipment.


              </li>

              <li>
                <strong>FMCG and Consumer Goods:</strong>
               Daily-use( FMCG) products like pulses, rice, and food items are a crucial category fall under the Legal Metrology (LMPC). Right or fully complied, mrp sticker can create customer trust. It also saves you from the Non Compliance

              </li>

              <li>
                <strong>Industrial Packaged Products:</strong>
                If the industrial products are sold in packaged form need Legal Metrology (LMPC) registration. Legal metrology applies when they are pre-packed for sale or distributed. Full compliance avoids Non-Compliance or Legal Notices.
                issues.
              </li>
            </ul>

            <h2 className="text-xl sm:text-2xl font-bold text-cyan-200">
              Legal Metrology (LMPC) Certificate Registration Process in India
            </h2>

            <p>
              The Legal Metrology (LMPC) registration process is simple but needs detailed information and correct legal documents. We need to file applications with the legal metrology department. Correct and legal documents and information can lead to a fast process, and approval Timelines depends by state and commodity category.


            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-white/30 text-sm sm:text-base">
                <thead>
                  <tr>
                    <th className="border p-2">Step</th>
                    <th className="border p-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2"><strong>Application Filing</strong></td>
                    <td className="border p-2">
                     The Application Filing process starts with the Digital Signature ( DSC)  Legal Metrology (LMPC) application.  Need to correct the entity details, and product information is required for fast Approval

                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2"><strong>Document Submission</strong></td>
                    <td className="border p-2">
                      Supporting documents like the GST MSME Pan Card are submitted along with the application and Mrp Stickers. These verify entity identity and commodity product details. An incomplete document can Cause to delay or rejection of the Certification

                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2"><strong>Fee Payment</strong></td>
                    <td className="border p-2">
                     The Government fees depend on the state-wise and the central department.
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2"><strong>Department Review</strong></td>
                    <td className="border p-2">
                      Once the application is submitted department reviews it and checks all Necessary documents, and if required, they will inspect, or officers can visit the business place 
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2"><strong>Issuance of LMPC Certificate</strong></td>
                    <td className="border p-2">
                      After the review, the application checks all necessary documents to ensure that all detailed information is correct and legally verified, and then the department issues the legal metrology (LMPC)  Certificate.

                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-cyan-200">
              Documents Required for Legal Metrology (LMPC) Certificate in India
            </h2>

            <p>
              In legal metrology, the required documents include GST, MSME, IEC, and PAN Card. Company Pan Card, Authorised Person Pan Card, Aadhar Card, Certificate of Incorporation, Mrp Label 

            </p>

            <ul className="list-disc pl-5 space-y-3">
              <li>
                <strong>Import Export Code (IEC):</strong>
                Import Export Code IEC is Compulsory for importers while applying for Legal Metrology (LMPC). Department and Custom also verified the IEC Code 
              </li>

              <li>
                <strong>GST Registration Certificate:</strong>
                GST registration is required for the address proof in the Legal Metrology, and it's also government-verified documents. And also support the tax system and the Department give some relief, and also do less verification on the legal metrology.

              </li>

              <li>
                <strong>Product Details and Packaging Images:</strong>
               In the Products image details, Mrp Sticker, we have upload a mrp sample and should mention clear MRP details as per the legal Metrology department rules and Guidlines

              </li>

              <li>
                <strong>Address Proof of Business:</strong>
                In the legal metrology department ned to upload a addres proof, any government-verified proof like MSME GST, we have to upload the address proof in the legal metrology application.
              </li>

              <li>
                <strong>Authorization Letter:</strong>
                An authorization letter allows a representative or consultant to apply on behalf of
                the business. It must be properly signed to be considered valid.
              </li>
            </ul>

            <h2 className="text-xl sm:text-2xl font-bold text-cyan-200">
              Legal Metrology (LMPC) Certificate for Import in India
            </h2>

            <p>
              Legal Metrology (LMPC) certification is the most important document for importers to import any Commodity in India. The customs department checks lmpc certificate at the port before goods are released. Early compliance or registration in the legal metrology certificate can save you extra time, money, and Efforts

            </p>

            <h3 className="text-lg sm:text-xl font-semibold text-cyan-300">
              Mandatory requirement at customs
            </h3>
            <p>
              The Customs Department and Customs Authority verify Legal Metrology (LMPC) Registration at the ports before releasing packaged goods. Non-compliant 
            </p>

            <h3 className="text-lg sm:text-xl font-semibold text-cyan-300">
              Port-based Legal Metrology (LMPC) registration
            </h3>
            <p>
              Legal Metrology (LMPC) registration is directly linked to the customs and ports. All details should be. Correct as per the customs and legal metrology, it helps to smooth functioning and hassle-free impor
            </p>

            <h3 className="text-lg sm:text-xl font-semibold text-cyan-300">
              Timeline before import clearance
            </h3>
            <p>
              Legal Metrology (LMPC) registration should be completed before the Shipments or goods arrive. Delayed registration applications Cause delay or rejection of the shipment or goods at customs. Early action ensures smooth imports.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-cyan-200">
              Benefits of Obtaining Legal Metrology (LMPC) Certificate
            </h2>

            <p>
               
           Registration for a Legal Metrology (LMPC) Certificate offers multiple business advantages. Obtaining a Legal Metrology (LMPC) Certificate is mandatory for manufacturers and packers. It ensures smooth operations and legal safety. It also improves market acceptance. Overall, it supports long-term growth.


            </p>

            <ul className="list-disc pl-5 space-y-3">
              <li>
                <strong>Smooth Customs Clearance:</strong>
                Legal Metrology (LMPC) certification helps avoid customs delays. Goods are cleared faster. This saves demurrage costs. Smooth Import Clearance. The LMPC certificate for importers enables faster, hassle-free customs clearance, preventing unnecessary delays in importing goods. It is an important document for the Importers
              </li>

              <li>
                <strong>Legal Compliance:</strong>
                With Legal Metrology (LMPC) registration, businesses, Importers Manfucatrer and Brand Owners meet the legal requirements of Legal Metrology and Buisness man can regulate 


              </li>

              <li>
                <strong>Business Credibility:</strong>
                Certified businesses appear more trustworthy to customers and partners. Compliance
                improves brand image and builds long-term confidence.
              </li>

              <li>
                <strong>Avoid Penalties:</strong>
                Legal Metrology (LMPC) compliance helps avoid show cause Notice fines and seizures. It protects against legal action. Prevention is always better than a cure.
              </li>
            </ul>
          </div>
        </section>
       <section className="bg-white/5 backdrop-blur-lg border border-yellow-400 shadow-lg rounded-2xl p-6 sm:p-8 mb-12 max-w-5xl mx-auto">
  <h2 className="text-2xl font-bold text-yellow-300 mb-6">
    ❓ Frequently Asked Questions (FAQs)
  </h2>

  <div className="space-y-4">
    {faqData.map((faq, index) => (
      <FAQItem key={index} faq={faq} />
    ))}
  </div>
</section>
       <CommentSection serviceId="legal-metrology-lmpc"/>
      </div>

      <Footer />
    </>
  );
};
const FAQItem = ({ faq }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-yellow-500/30 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-3 bg-white/10 hover:bg-white/20 transition flex justify-between items-center"
      >
        <span className="font-semibold text-yellow-200">
          {faq.question}
        </span>
        <span className="text-yellow-300 text-xl">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="px-4 py-3 text-fuchsia-100 bg-black/30">
          {faq.answer}
        </div>
      )}
    </div>
  );
};
export default LegalMetrologyLMPC;
