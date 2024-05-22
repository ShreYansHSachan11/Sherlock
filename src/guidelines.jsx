import React from "react";
import "./guidelines.css";

const contact = () => {
  return (
    <div className="guidelinesPage">
      <h2>GUIDELINES</h2>

      <div className="guidelinesSection1">
        <h4>DATA PROTECTION LAWS IN INDIA</h4>
        <ul>
          <li>
            Personal Data Protection Bill: Initially proposed in 2019, this bill
            aimed to establish a framework for processing personal data and to
            set up a Data Protection Authority of India.
          </li>

          <li>
            Information Technology Act, 2000 (IT Act): Along with
            the Information Technology (Reasonable Security Practices and
            Procedures and Sensitive Personal Data or Information) Rules, 2011
            (SPDI Rules), this has been the cornerstone for data protection in
            India1.
          </li>

          <li>
            Digital Personal Data Protection Act, 2023: This act is a
            significant milestone in India’s data protection landscape. It
            emphasizes privacy, empowers individuals with rights over their
            data, and introduces requirements for organizations on how they
            handle personal data2.
          </li>
        </ul>
      </div>

      <div className="guidelinesSection1">
        <h4>HOW ‘HIDE’ COMPLY WITH LAWS ?</h4>
        <ul>
          <li>
            Entity Analysis for PII: Utilizing SpacyNER, AzureAI, and
            CustomRecognizers to identify personal identifiers aligns with the
            Digital Personal Data Protection Act, 2023, which mandates the
            identification and protection of personal data. This is in
            accordance with the Act’s provisions that require data fiduciaries
            to implement security safeguards1.
          </li>

          <li>
            User Selected Anonymization: Allowing users to select which personal
            data to anonymize supports the principle of data principal consent
            and choice under the Act. This feature respects the right of
            individuals to have control over their personal data, as stipulated
            by the Act1.
          </li>

          <li>
            Drop-Down Format for Anonymization Choices: Providing a clear and
            user-friendly interface for anonymization choices enhances
            transparency and user control, which are emphasized in the Act. This
            approach is consistent with the Act’s guidelines that stress the
            importance of clear communication with the data principal1.
          </li>

          <li>
            Reliability of Data: The tool’s emphasis on maintaining the logic
            and reliability of data post-anonymization is crucial for ensuring
            the integrity of the data, which is likely a requirement for lawful
            processing under the Act. This aligns with the Act’s requirement for
            data fiduciaries to maintain the accuracy and quality of personal
            data1.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default contact;
