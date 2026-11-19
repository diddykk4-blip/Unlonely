import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, FileText, CheckCircle, Mail, Phone, ExternalLink } from 'lucide-react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-page animate-fade-in">
      <div className="container">
        <header className="privacy-header">
          <span className="privacy-tag">Data Protection & Privacy</span>
          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-meta">
            <strong>Last updated:</strong> November 2026 • Effective Date: November 2026
          </p>
        </header>

        <div className="privacy-container">
          <div className="privacy-intro-callout">
            <p>
              At <strong>Unlonely</strong>, we are committed to being transparent about how we collect, use, and protect your personal information. This Privacy Policy explains how we process your personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
            </p>
          </div>

          {/* 1. Who We Are */}
          <section className="privacy-section" id="who-we-are">
            <h2>1. Who We Are</h2>
            <p>
              Unlonely is a social companionship service operating in the United Kingdom, designed to help individuals feel more connected through friendly conversations, social accompaniment, and meaningful interpersonal connection.
            </p>
            <p>
              <strong>Important service distinction:</strong> Unlonely provides non-clinical social companionship. We are <strong>not</strong> a medical, nursing, domiciliary personal care, therapy, or emergency care service.
            </p>
            <div className="privacy-highlight-box">
              <h4>Data Controller Details</h4>
              <p>
                For the purposes of applicable data protection law, the data controller of your personal data is:
              </p>
              <ul>
                <li><strong>Business Name:</strong> Unlonely</li>
                <li><strong>Legal Entity:</strong> <span className="privacy-placeholder-badge">[Unlonely Legal Entity Name]</span></li>
                <li><strong>Company Registration Number:</strong> <span className="privacy-placeholder-badge">[Registered in England &amp; Wales No. XXXXXXXX]</span></li>
                <li><strong>Registered Office:</strong> <span className="privacy-placeholder-badge">[Registered Office Address, London, United Kingdom]</span></li>
                <li><strong>Designated Data Protection Contact:</strong> <a href="mailto:privacy@unlonely.co.uk">privacy@unlonely.co.uk</a></li>
                <li><strong>General Inquiries:</strong> <a href="mailto:hello@unlonely.co.uk">hello@unlonely.co.uk</a> | 0800 123 4567</li>
              </ul>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 0 }}>
                <em>Note: We do not claim certified GDPR compliance status; this document represents our honest and transparent policies, commitments, and procedures under UK data protection law.</em>
              </p>
            </div>
          </section>

          {/* 2. Information We Collect */}
          <section className="privacy-section" id="information-we-collect">
            <h2>2. Information We Collect</h2>
            <p>
              We only collect personal information that you choose to provide directly to us through our website forms, virtual assistant chat, email correspondence, or telephone conversations. We strictly limit collection to information necessary to arrange or provide social companionship.
            </p>
            
            <h3>A. Information from Companionship Enquiries (Find a Companion Form)</h3>
            <ul>
              <li><strong>Contact &amp; Identity Details:</strong> First name, last name, email address, telephone number, residential postcode, and whether the enquiry is for yourself or on behalf of someone else.</li>
              <li><strong>Demographic Information:</strong> Date of birth (to confirm adult age requirements) and pronouns (optional).</li>
              <li><strong>Emergency Contact Details:</strong> Name and telephone number of a designated emergency contact person.</li>
              <li><strong>Communication Preferences:</strong> Preferred contact method (e.g. phone call, text/WhatsApp, email) and best time of day to reach you.</li>
              <li><strong>Companionship Preferences:</strong> Hobbies and interests (e.g. walking, reading, arts, coffee chats), preferred visit frequency (e.g. weekly, monthly), preferred visit duration, preferred meeting locations (e.g. at home, local café/park, phone, video), and ideal visit description.</li>
              <li><strong>Voluntary Additional Information:</strong> Any non-sensitive personal context you voluntarily share in our optional 500-character additional information field.</li>
              <li><strong>Voluntarily Disclosed Considerations:</strong> Any accessibility notes or allergies you voluntarily provide to help us plan safe and comfortable visits.</li>
              <li><strong>Service Understanding:</strong> Confirmation that you understand Unlonely is a companionship service, not a care agency.</li>
            </ul>

            <h3>B. Information from Companion Applicants (Become a Companion Form)</h3>
            <ul>
              <li><strong>Personal Details:</strong> Full legal name, date of birth (must be 18+), National Insurance number, current residential address, phone number, and email address.</li>
              <li><strong>Transport &amp; Driving Status:</strong> Driving licence and car access details.</li>
              <li><strong>Suitability &amp; Experience:</strong> Motivation for becoming a companion, previous voluntary or paid experience supporting others, and examples of making someone feel less alone.</li>
              <li><strong>Skills &amp; Availability:</strong> Languages spoken, personal hobbies/interests, and days/times available.</li>
              <li><strong>Vetting &amp; Background Declarations:</strong> Consent to an Enhanced Disclosure and Barring Service (DBS) check, contact details and consent for two referees, declaration regarding criminal convictions, and DBS update service participation status.</li>
              <li><strong>Self-Employment &amp; Accuracy Confirmation:</strong> Declarations of accuracy and understanding of self-employed companion arrangements.</li>
            </ul>

            <h3>C. Information from General Inquiries &amp; Website Communications</h3>
            <ul>
              <li><strong>Contact Form:</strong> Full name, email address, topic of interest, and your message.</li>
              <li><strong>Virtual Assistant Chatbot:</strong> Messages, questions, and preferences voluntarily shared during chat sessions.</li>
              <li><strong>Telephone &amp; Email Communications:</strong> Records of your communications with our team when you contact us for support or information.</li>
            </ul>
          </section>

          {/* 3. How We Use Your Information */}
          <section className="privacy-section" id="how-we-use-information">
            <h2>3. How We Use Your Information</h2>
            <p>
              We process your personal data for legitimate business purposes under the lawful bases defined in Article 6 of the UK GDPR:
            </p>
            <ul>
              <li>
                <strong>Arranging and Delivering Companionship (Contract / Pre-contractual steps — Article 6(1)(b)):</strong> To review your companionship request, understand your conversational interests, and manually identify and introduce a vetted companion suited to your preferences.
              </li>
              <li>
                <strong>Vetting and Safer Recruitment (Legitimate Interests — Article 6(1)(f) / Legal Obligation — Article 6(1)(c)):</strong> To evaluate companion applications, verify identity, check references, and process Enhanced DBS criminal record checks to ensure the safety and trust of our clients and community.
              </li>
              <li>
                <strong>Customer Support and Communications (Contract / Legitimate Interests):</strong> To contact you by email or telephone regarding your enquiry, proposed matches, visit confirmations, administrative updates, or customer service inquiries.
              </li>
              <li>
                <strong>Safeguarding &amp; Vital Interests (Vital Interests — Article 6(1)(d) / Substantial Public Interest):</strong> To respond appropriately in the rare event of an acute safeguarding concern, medical emergency, or immediate threat to personal safety.
              </li>
              <li>
                <strong>Compliance and Dispute Resolution (Legal Obligation — Article 6(1)(c)):</strong> To maintain required financial, accounting, insurance, and tax records, and to respond to lawful regulatory or law enforcement requests.
              </li>
            </ul>
            <p>
              <em>Marketing Policy:</em> We do not sell your personal data. Marketing consent is <strong>never</strong> a condition of submitting an enquiry or using our service. We only send marketing updates if you have separately and explicitly opted in to receive them.
            </p>
          </section>

          {/* 4. Optional Additional Information */}
          <section className="privacy-section" id="optional-additional-information">
            <h2>4. Optional Additional Information</h2>
            <p>
              On our <em>Find a Companion</em> request form, we provide an optional field labelled:
            </p>
            <div className="privacy-highlight-box">
              <p style={{ margin: 0 }}>
                <strong>Label:</strong> Anything else you'd like us to know? (Optional)<br />
                <strong>Purpose:</strong> To allow you to communicate specific conversational topics, social preferences, or personality considerations that help our team arrange a compatible match.
              </p>
            </div>
            <p>
              <strong>Data Minimisation &amp; Character Limit:</strong>
            </p>
            <ul>
              <li>This field is strictly optional; you may leave it blank without affecting your ability to find a companion.</li>
              <li>We enforce a maximum character limit of <strong>500 characters</strong>, accompanied by a live counter, to encourage concise, relevant details.</li>
              <li>Submissions exceeding 500 characters are prevented on the website and rejected during data validation.</li>
              <li>Unnecessary leading and trailing whitespace is automatically trimmed before storage.</li>
              <li><strong>Guidance:</strong> Please only share information relevant to your companionship preferences. <strong>Please avoid sharing sensitive medical, psychological, or private personal data unless strictly necessary to accommodate a practical visit need.</strong></li>
            </ul>
          </section>

          {/* 5. Sensitive Personal Information */}
          <section className="privacy-section" id="sensitive-personal-information">
            <h2>5. Sensitive Personal Information (Special Category Data)</h2>
            <p>
              Under UK GDPR (Article 9), certain types of data are classified as "special category" data, including information concerning health, medical conditions, racial or ethnic origin, religious beliefs, or sexual orientation.
            </p>
            <p>
              <strong>Our Policy:</strong>
            </p>
            <ul>
              <li>Unlonely does <strong>not</strong> specifically request medical records, psychological assessments, or clinical data through its general enquiry fields. We provide social companionship, not healthcare or clinical care.</li>
              <li>Where a client or carer voluntarily discloses an accessibility requirement (e.g. step-free access) or an allergy (e.g. pet hair or food allergies), we use this information exclusively to ensure practical visit safety and companion compatibility.</li>
              <li>Where special category personal data needs to be processed to deliver companionship safely, Unlonely will establish the appropriate UK GDPR Article 6 lawful basis and Article 9 condition (such as explicit consent under Article 9(2)(a), or safeguarding/substantial public interest under Article 9(2)(g) and Schedule 1 of the Data Protection Act 2018) before processing it.</li>
              <li><strong>No Assumed Consent:</strong> We do <strong>not</strong> claim or presume that users have provided explicit consent to the processing of special category personal data simply by submitting a general website enquiry form. Any formal processing of sensitive data will be handled through direct consultation with appropriate safeguards.</li>
            </ul>
          </section>

          {/* 6. How We Share Your Information */}
          <section className="privacy-section" id="how-we-share-information">
            <h2>6. How We Share Your Information</h2>
            <p>
              We do not sell, rent, or trade your personal information to third parties for advertising or commercial purposes. We share personal data only in the following limited circumstances:
            </p>
            <ul>
              <li>
                <strong>With Matched Companions:</strong> Once a proposed companion match has been mutually discussed and agreed with you, we share relevant contact information and companionship preferences with the companion so visits can take place.
              </li>
              <li>
                <strong>With Essential Service Providers (Data Processors):</strong> We use trusted third-party providers who assist our technical and operational infrastructure, including secure cloud database hosting (Supabase, operating under strict security protocols), encrypted business email infrastructure, and accredited umbrella bodies for processing DBS vetting checks. All providers are bound by confidentiality and data processing obligations.
              </li>
              <li>
                <strong>With Safeguarding Authorities or Emergency Services:</strong> Where there is an urgent risk of harm, medical emergency, or safeguarding concern, we may share essential information with healthcare professionals, emergency services, or local authority safeguarding teams in the vital interests of the individual.
              </li>
              <li>
                <strong>Legal &amp; Regulatory Obligations:</strong> When required by UK law, court order, or competent regulatory authority.
              </li>
            </ul>
          </section>

          {/* 7. Email Communications and Data Access */}
          <section className="privacy-section" id="email-communications">
            <h2>7. Email Communications and Data Access</h2>
            <p>
              Unlonely currently operates as a hands-on, human-matched service without an automated customer dashboard or public client portal.
            </p>
            <ul>
              <li>
                <strong>How Inquiries are Handled:</strong> Website enquiries, companionship requests, companion applications, and contact messages are received and managed through authorized, password-protected business email accounts (e.g. <code>hello@unlonely.co.uk</code>, <code>privacy@unlonely.co.uk</code>) operated by designated Unlonely team members.
              </li>
              <li>
                <strong>Restricted Access:</strong> Access to applicant and client information is strictly restricted to authorized staff members who require the information to perform matching, vetting, or client care functions.
              </li>
              <li>
                <strong>Email Transmission Security:</strong> While our business email systems employ standard Transport Layer Security (TLS) encryption, transmission over public networks is not guaranteed to be completely secure. We strongly advise you not to send bank details, passwords, or detailed medical records via unencrypted standard email.
              </li>
            </ul>
          </section>

          {/* 8. Data Storage and Security */}
          <section className="privacy-section" id="data-storage-and-security">
            <h2>8. Data Storage and Security</h2>
            <p>
              We implement proportionate technical and organizational safeguards designed to protect personal information against accidental or unlawful destruction, loss, alteration, or unauthorized disclosure:
            </p>
            <ul>
              <li><strong>Encryption in Transit:</strong> All website traffic and form submissions are protected using Transport Layer Security (HTTPS / TLS 1.3).</li>
              <li><strong>Database Protection:</strong> Backend database tables utilize Row Level Security (RLS) policies. Public website visitors possess insert-only permissions for their own submissions and cannot view, read, or edit submissions made by other individuals.</li>
              <li><strong>Access Control:</strong> Administrative access to backend databases and business email accounts requires strong authentication, multi-factor verification where supported, and is limited on a need-to-know basis.</li>
              <li><strong>Realistic Assessment:</strong> While we implement rigorous procedures, no electronic storage or internet transmission can be guaranteed 100% secure. We continually evaluate our data protection and security practices.</li>
            </ul>
          </section>

          {/* 9. How Long We Keep Your Information */}
          <section className="privacy-section" id="data-retention">
            <h2>9. How Long We Keep Your Information (Data Retention Framework)</h2>
            <p>
              We adhere to the UK GDPR principle of storage limitation. We retain personal information only for as long as necessary to fulfill the purposes for which it was gathered, in line with our operational retention schedule:
            </p>

            <div className="privacy-table-wrapper">
              <table className="privacy-table">
                <thead>
                  <tr>
                    <th>Data Category</th>
                    <th>Retention Period</th>
                    <th>Reasoning / Basis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>General Enquiries (no service commenced)</strong></td>
                    <td>Reviewed and deleted after 12 months of inactivity</td>
                    <td>Allows sufficient time for follow-up questions while ensuring timely deletion of non-active data.</td>
                  </tr>
                  <tr>
                    <td><strong>Incomplete Form Submissions</strong></td>
                    <td>Reviewed and deleted after 12 months of inactivity</td>
                    <td>Disposed of once it is evident the user is not proceeding with an arrangement.</td>
                  </tr>
                  <tr>
                    <td><strong>Active Client &amp; Companion Records</strong></td>
                    <td>Duration of active service relationship</td>
                    <td>Required to administer ongoing companionship, scheduling, and safety.</td>
                  </tr>
                  <tr>
                    <td><strong>Former Client &amp; Companion Records</strong></td>
                    <td>Up to 6 years following service termination</td>
                    <td>Contractual, legal claim defense, insurance, and HMRC accounting compliance (Limitation Act 1980).</td>
                  </tr>
                  <tr>
                    <td><strong>Unsuccessful Companion Applications</strong></td>
                    <td>Up to 12 months from application date</td>
                    <td>Handling potential queries, vetting disputes, or candidate reapplications.</td>
                  </tr>
                  <tr>
                    <td><strong>Deletion &amp; Erasure Requests</strong></td>
                    <td>Assessed and actioned within 1 calendar month</td>
                    <td>Actioned in compliance with statutory UK GDPR erasure obligations.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              <strong>Exceptions:</strong> Information may be retained beyond standard periods where an active legal claim, statutory reporting obligation, insurance investigation, or ongoing safeguarding inquiry requires it. We do not retain personal information indefinitely.
            </p>
          </section>

          {/* 10. Your Data Protection Rights */}
          <section className="privacy-section" id="your-rights">
            <h2>10. Your Data Protection Rights</h2>
            <p>
              Under UK data protection law (UK GDPR and the Data Protection Act 2018), you have specific legal rights regarding the personal information we hold about you:
            </p>
            <ul>
              <li><strong>Right to be informed:</strong> You have the right to be provided with clear, transparent, and easily understandable information about how we use your data (as set out in this policy).</li>
              <li><strong>Right of access (Subject Access Request):</strong> You have the right to request a copy of the personal data we hold about you, together with information on how it is processed.</li>
              <li><strong>Right to rectification:</strong> You have the right to ask us to correct inaccurate personal data or complete incomplete information.</li>
              <li><strong>Right to erasure ('Right to be forgotten'):</strong> You have the right to request that we delete your personal data where there is no compelling legal reason for its continued processing.</li>
              <li><strong>Right to restriction of processing:</strong> You have the right to request that we temporarily suspend the processing of your data under specific conditions (e.g. while an accuracy dispute is investigated).</li>
              <li><strong>Right to data portability:</strong> Where applicable, you may request the transfer of your personal data in a structured, commonly used format.</li>
              <li><strong>Right to object:</strong> You have the right to object to processing that is based on our legitimate interests or direct marketing.</li>
              <li><strong>Right to withdraw consent:</strong> Where we rely on your consent to process your information, you have the right to withdraw that consent at any time.</li>
            </ul>

            <div className="privacy-highlight-box">
              <h4>How to Exercise Your Rights</h4>
              <p>
                To exercise any of these rights, please email our team at <a href="mailto:privacy@unlonely.co.uk">privacy@unlonely.co.uk</a> or call <strong>0800 123 4567</strong>. We respond to all verified requests free of charge within one calendar month.
              </p>
              <p style={{ marginBottom: 0 }}>
                <strong>Right to Complain to the Regulator:</strong> If you believe we have not handled your personal information in accordance with data protection law, you have the right to lodge a complaint with the UK supervisory authority:
                <br /><br />
                <strong>Information Commissioner's Office (ICO)</strong><br />
                Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF<br />
                Helpline: 0303 123 1113 | Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk <ExternalLink size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /></a>
              </p>
            </div>
          </section>

          {/* 11. Cookies and Website Analytics */}
          <section className="privacy-section" id="cookies">
            <h2>11. Cookies and Website Analytics</h2>
            <p>
              Our website uses strictly necessary functional cookies and local browser storage to provide core site functionality, such as:
            </p>
            <ul>
              <li>Preserving your multi-step form progress while completing the Find a Companion or Become a Companion wizard.</li>
              <li>Maintaining chat window state in our Virtual Assistant widget.</li>
              <li>Basic security and session management.</li>
            </ul>
            <p>
              We do <strong>not</strong> deploy third-party advertising cookies, behavioural cross-site tracking pixels, or invasive profiling tools. Any website performance metrics collected are anonymized and used solely to ensure site reliability and responsiveness.
            </p>
          </section>

          {/* 12. Changes to This Privacy Policy */}
          <section className="privacy-section" id="changes">
            <h2>12. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect operational, legal, or regulatory developments. When updates are published, the "Last updated" date at the top of this page will be revised accordingly.
            </p>
            <p>
              We encourage you to review this page periodically to stay informed about how we are protecting your data.
            </p>
          </section>

          {/* 13. Contact Us */}
          <section className="privacy-section" id="contact-us">
            <h2>13. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, your personal information, or wish to make a data protection request, please contact us:
            </p>
            
            <div className="privacy-contact-card">
              <p><strong>Unlonely Data Protection Contact</strong></p>
              <p><strong>Legal Entity:</strong> <span className="privacy-placeholder-badge">[Unlonely Legal Entity Name]</span></p>
              <p><strong>Email:</strong> <a href="mailto:privacy@unlonely.co.uk">privacy@unlonely.co.uk</a></p>
              <p><strong>General Support Email:</strong> <a href="mailto:hello@unlonely.co.uk">hello@unlonely.co.uk</a></p>
              <p><strong>Safeguarding Inquiries:</strong> <a href="mailto:safeguarding@unlonely.co.uk">safeguarding@unlonely.co.uk</a></p>
              <p><strong>Telephone:</strong> 0800 123 4567 (Mon–Fri 9am–5pm)</p>
              <p><strong>Postal Address:</strong> <span className="privacy-placeholder-badge">[Registered Office Address, London, United Kingdom]</span></p>
            </div>
          </section>

          <div className="text-center mt-4">
            <Link to="/" className="btn btn-outline">Return to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;