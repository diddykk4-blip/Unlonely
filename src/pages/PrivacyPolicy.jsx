import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, FileText, CheckCircle, Mail, Phone, ExternalLink } from 'lucide-react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-page animate-fade-in">
      <div className="container">
        <header className="privacy-header">
          <span className="privacy-tag">Data Protection &amp; Privacy</span>
          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-meta">
            <strong>Last updated:</strong> November 2026 &bull; Effective Date: November 2026
          </p>
        </header>

        <div className="privacy-container">
          <div className="privacy-intro-callout">
            <p>
              At <strong>Unlonely</strong>, we are committed to being transparent about how we collect, use, and protect your personal information. This Privacy Policy explains how we process your personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
            </p>
          </div>

          {/* TABLE OF CONTENTS */}
          <nav className="privacy-toc" aria-label="Privacy policy sections">
            <h3>Contents</h3>
            <ol>
              <li><a href="#who-we-are">Who We Are</a></li>
              <li><a href="#information-we-collect">Information We Collect</a></li>
              <li><a href="#how-we-use-information">How We Use Your Information</a></li>
              <li><a href="#lawful-bases">Lawful Bases for Processing</a></li>
              <li><a href="#special-category">Special Category &amp; Criminal Conviction Data</a></li>
              <li><a href="#additional-information">Optional Additional Information</a></li>
              <li><a href="#virtual-assistant">Virtual Assistant (Chatbot)</a></li>
              <li><a href="#data-sharing">How We Share Your Information</a></li>
              <li><a href="#international-transfers">International Transfers</a></li>
              <li><a href="#data-retention">How Long We Keep Your Information</a></li>
              <li><a href="#your-rights">Your Rights</a></li>
              <li><a href="#cookies">Cookies &amp; Website Technology</a></li>
              <li><a href="#marketing">Marketing &amp; Communications</a></li>
              <li><a href="#changes">Changes to This Policy</a></li>
              <li><a href="#contact-us">Contact Us &amp; Privacy Requests</a></li>
            </ol>
          </nav>

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
                For the purposes of UK data protection law, the data controller responsible for your personal information is:
              </p>
              <ul>
                <li><strong>Trading Name:</strong> Unlonely</li>
                <li><strong>Legal Entity:</strong> <span className="privacy-placeholder-badge">[Unlonely Legal Entity Name]</span></li>
                <li><strong>Company Registration Number:</strong> <span className="privacy-placeholder-badge">[Registered in England &amp; Wales No. XXXXXXXX]</span></li>
                <li><strong>Registered Office:</strong> <span className="privacy-placeholder-badge">[Registered Office Address, United Kingdom]</span></li>
                <li><strong>Data Protection Contact:</strong> <a href="mailto:privacy@unlonely.uk">privacy@unlonely.uk</a></li>
                <li><strong>General Enquiries:</strong> <a href="mailto:support@unlonely.uk">support@unlonely.uk</a></li>
              </ul>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 0 }}>
                <em>This document sets out our honest and transparent data handling practices under UK data protection law. We do not make claims of certified compliance status.</em>
              </p>
            </div>
          </section>

          {/* 2. Information We Collect */}
          <section className="privacy-section" id="information-we-collect">
            <h2>2. Information We Collect</h2>
            <p>
              We only collect personal information that you choose to provide directly to us through our website forms, virtual assistant, email correspondence, or telephone. We strictly limit collection to information necessary to arrange or provide our companionship service.
            </p>

            <h3>A. Companionship Enquiries — Find a Companion Form</h3>
            <p>When you submit a companionship request, we collect:</p>
            <ul>
              <li><strong>Contact &amp; Identity:</strong> First name, last name, email address, telephone number, residential postcode, and whether the enquiry is for yourself or on behalf of someone else.</li>
              <li><strong>Date of Birth:</strong> To confirm you are an adult (18+), or that the person you are enquiring for meets our service requirements.</li>
              <li><strong>Pronouns (optional):</strong> To help our team communicate respectfully with you or the person receiving companionship.</li>
              <li><strong>Emergency Contact:</strong> Name and telephone number of a designated emergency contact person.</li>
              <li><strong>Communication Preferences:</strong> Preferred contact method (phone call, WhatsApp, or email) and best time of day to contact you.</li>
              <li><strong>Companionship Preferences:</strong> Hobbies and interests, preferred visit frequency, duration, and meeting location (e.g. at home, local caf&eacute;/park, phone or video call).</li>
              <li><strong>Ideal Visit (optional):</strong> A short description of your ideal visit in three words.</li>
              <li><strong>Accessibility Needs (optional):</strong> Any information voluntarily shared to help us ensure comfortable visits, such as mobility considerations.</li>
              <li><strong>Allergies (optional):</strong> Any relevant allergies you choose to share to assist safe visit planning.</li>
              <li><strong>Optional Additional Information:</strong> Any other context you choose to provide in our free-text field (maximum 500 characters). See <a href="#additional-information">Section 6</a>.</li>
              <li><strong>Service Confirmation:</strong> Your acknowledgement that Unlonely is a companionship service and not a care agency.</li>
            </ul>

            <h3>B. Companion Applicants — Become a Companion Form</h3>
            <p>When you apply to become a companion, we collect:</p>
            <ul>
              <li><strong>Personal Details:</strong> Full legal name, date of birth (must be 18+), National Insurance number, current full residential address, phone number, and email address.</li>
              <li><strong>Transport:</strong> Whether you hold a valid UK driving licence and have access to a vehicle, or rely on public transport.</li>
              <li><strong>Motivation &amp; Experience:</strong> Your reasons for applying, any relevant previous paid or voluntary experience, and an example of making someone feel less alone.</li>
              <li><strong>Practical Skills:</strong> Languages spoken, personal hobbies and interests, and your general availability (e.g. weekday mornings, weekends).</li>
              <li><strong>Vetting &amp; Background Declarations:</strong> Your consent to an Enhanced Disclosure and Barring Service (DBS) check, your consent for us to contact two referees, your DBS Update Service registration status, and your declaration regarding criminal convictions (see <a href="#special-category">Section 5</a>).</li>
              <li><strong>Declarations:</strong> Confirmation that all information provided is accurate and that you understand the self-employed nature of companion arrangements.</li>
            </ul>

            <h3>C. General Enquiries &amp; Contact Form</h3>
            <ul>
              <li><strong>Contact Form:</strong> Full name, email address, topic of interest, and your message.</li>
              <li><strong>Telephone &amp; Email:</strong> Records of your direct communications with our team.</li>
            </ul>

            <h3>D. Additional Information On Data Collection &amp; Systems</h3>
            <ul>
              <li>We do not collect payment card or bank details through this website directly; payments are handled via dedicated PCI-compliant processors (Stripe &amp; GoCardless).</li>
              <li>We use AI virtual assistants (chatbots and voice receptionists) to handle initial enquiries and bookings. These systems process your data strictly to answer your questions and route you to a human team member when requested.</li>
              <li>We do not operate a customer account or login system on this website.</li>
            </ul>
          </section>

          {/* 3. How We Use Your Information */}
          <section className="privacy-section" id="how-we-use-information">
            <h2>3. How We Use Your Information</h2>
            <p>We use your personal information only for the following purposes:</p>
            <ul>
              <li><strong>Reviewing and responding to your companionship enquiry</strong> — assessing your request, identifying a suitable companion, and contacting you to discuss next steps.</li>
              <li><strong>Matching you with a suitable companion</strong> — using your preferences, interests, and availability to identify the best possible match.</li>
              <li><strong>Processing and assessing companion applications</strong> — reviewing suitability, conducting Enhanced DBS checks, contacting referees, and managing the vetting process.</li>
              <li><strong>Responding to general enquiries</strong> — replying to messages, questions, or requests submitted via our contact form or by phone.</li>
              <li><strong>Ensuring safeguarding and visit safety</strong> — using accessibility notes, allergies, and emergency contact details to plan safe and appropriate visits.</li>
              <li><strong>Improving and maintaining our service</strong> — using aggregate, non-identifiable information to understand how we can improve the experience we offer (legitimate interests).</li>
              <li><strong>Complying with legal obligations</strong> — meeting our responsibilities under UK employment law, safeguarding legislation, and applicable regulations.</li>
            </ul>
            <p>
              We will not use your information for any purpose incompatible with the purpose for which it was originally collected without informing you first.
            </p>
          </section>

          {/* 4. Lawful Bases */}
          <section className="privacy-section" id="lawful-bases">
            <h2>4. Lawful Bases for Processing</h2>
            <p>
              Under Article 6 of the UK GDPR, we rely on the following lawful bases for processing your personal data:
            </p>
            <div className="privacy-table-wrapper">
              <table className="privacy-table">
                <thead>
                  <tr>
                    <th>Purpose</th>
                    <th>Lawful Basis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Reviewing and fulfilling companionship enquiries</td>
                    <td><strong>Contract / Pre-contractual steps</strong> — Article 6(1)(b)</td>
                  </tr>
                  <tr>
                    <td>Matching clients with companions</td>
                    <td><strong>Contract / Pre-contractual steps</strong> — Article 6(1)(b)</td>
                  </tr>
                  <tr>
                    <td>Reviewing and processing companion applications</td>
                    <td><strong>Contract / Pre-contractual steps</strong> — Article 6(1)(b)</td>
                  </tr>
                  <tr>
                    <td>Conducting Enhanced DBS checks and referee checks</td>
                    <td><strong>Legal obligation</strong> — Article 6(1)(c) and <strong>Legitimate interests</strong> — Article 6(1)(f) (safeguarding)</td>
                  </tr>
                  <tr>
                    <td>Responding to general enquiries</td>
                    <td><strong>Legitimate interests</strong> — Article 6(1)(f)</td>
                  </tr>
                  <tr>
                    <td>Safeguarding and visit safety planning</td>
                    <td><strong>Legitimate interests</strong> — Article 6(1)(f)</td>
                  </tr>
                  <tr>
                    <td>Retaining records for legal or regulatory purposes</td>
                    <td><strong>Legal obligation</strong> — Article 6(1)(c)</td>
                  </tr>
                  <tr>
                    <td>Optional pronouns, accessibility notes, allergies</td>
                    <td><strong>Consent</strong> — Article 6(1)(a) (you choose to provide this; it is not required)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 5. Special Category and Criminal Conviction Data */}
          <section className="privacy-section" id="special-category">
            <h2>5. Special Category &amp; Criminal Conviction Data</h2>

            <h3>A. Accessibility, Recovery and Health-Related Disclosures (Client Enquiries)</h3>
            <p>
              Our Find a Companion form and Recovery Support enquiry form include fields for accessibility needs, recovery context (such as post-operative or mobility support), and allergies. We collect health and allergy data only when explicitly provided by you for safety, recovery support, and companion matching purposes.
            </p>
            <p>
              We ask for accessibility needs and allergies strictly to ensure the safety and comfort of your visits. This sensitive data is processed only with your explicit consent and is kept strictly confidential, accessible solely to authorised Unlonely staff and your matched companion.
            </p>
            <p>
              Where health-related information is disclosed, we rely on <strong>Article 9(2)(a) UK GDPR (explicit consent)</strong> for the specific purpose stated, combined with <strong>Schedule 1, Part 1, Paragraph 1 of the Data Protection Act 2018</strong>.
            </p>

            <h3>B. Criminal Conviction Data (Companion Applications)</h3>
            <div className="privacy-highlight-box">
              <p>
                Our Become a Companion application includes a question asking applicants to disclose any criminal convictions not covered by the Rehabilitation of Offenders Act 1974.
              </p>
              <p>
                Criminal conviction and offence data is subject to additional protections under <strong>Article 10 of the UK GDPR</strong>, which restricts its processing to situations authorised by UK law. We collect this data solely to fulfil our duty of care and safeguarding responsibilities to the people who use our service.
              </p>
              <p>
                Processing criminal conviction data under Article 10 requires both a lawful basis under Article 6 of the UK GDPR and a specific condition from Schedule 1 of the Data Protection Act 2018. We are in the process of confirming the precise Schedule 1 condition applicable to our operations with qualified legal advisers.
              </p>
              <p>
                <strong>Schedule 1, Part 2, Paragraph 18</strong> (safeguarding of children and of individuals at risk) may be relevant to our context, as Unlonely provides companionship to individuals who may include vulnerable adults. However, Paragraph 18 carries specific requirements that must be met for it to apply:
              </p>
              <ul>
                <li>Processing must be <em>necessary</em> for protecting an individual from neglect or physical, mental, or emotional harm.</li>
                <li>Where the person being protected is an adult (aged 18 or over), there must be reasonable cause to suspect they have needs for care and support, are experiencing or at risk of harm, and are unable to protect themselves as a result of those needs.</li>
                <li>Processing must generally occur without the data subject's consent, or where obtaining consent would prejudice the safeguarding purpose — meaning it does not automatically apply to data an applicant provides voluntarily during an application process.</li>
                <li>An <strong>Appropriate Policy Document (APD)</strong> must be in place, as required by Schedule 1, Part 4 of the DPA 2018.</li>
              </ul>
              <p>
                <em>We are seeking qualified UK privacy and legal advice to confirm the applicable Schedule 1 condition(s) and to prepare any required Appropriate Policy Document before this section is finalised.</em>
              </p>
              <p>
                Regardless of the specific legal basis confirmed, criminal conviction information disclosed during the application process:
              </p>
              <ul>
                <li>Is accessible only to authorised Unlonely staff responsible for vetting decisions.</li>
                <li>Is never shared with clients or third parties except where required by law or regulatory obligation.</li>
                <li>Is retained only for the duration of the application and vetting process, plus any legally required period thereafter.</li>
                <li>Is assessed individually in the context of the role and does not automatically disqualify an applicant.</li>
              </ul>
              <p>
                An Enhanced DBS check is also conducted through the Disclosure and Barring Service (a UK government body) for all approved companions. This check is a separate process governed by DBS's own privacy framework.
              </p>
            </div>
          </section>

          {/* 6. Optional Additional Information */}
          <section className="privacy-section" id="additional-information">
            <h2>6. Optional Additional Information Field</h2>
            <p>
              Our Find a Companion form includes an optional free-text field: <em>&ldquo;Anything else you&rsquo;d like us to know?&rdquo;</em> (maximum 500 characters).
            </p>
            <p>
              This field is entirely optional and exists solely to allow you to provide context that helps us find you the right companion — for example, your preferred topics of conversation, your personality, or specific preferences about how you like to socialise.
            </p>
            <div className="privacy-highlight-box">
              <strong>Please share information relevant to your companionship and visit support.</strong>
              <p style={{ marginBottom: 0, marginTop: '0.5rem' }}>
                We ask for accessibility needs and allergies strictly to ensure the safety and comfort of your visits. This sensitive data is processed only with your explicit consent and is kept strictly confidential.
              </p>
            </div>
          </section>

          {/* 7. Virtual Assistant */}
          <section className="privacy-section" id="virtual-assistant">
            <h2>7. AI Virtual Assistants (Chat &amp; Phone Receptionist)</h2>
            <p>
              We use AI-powered virtual assistants for our website chat and phone system to help answer your questions and route enquiries. These tools process your messages to provide a response. We do not use your personal data to train public AI models.
            </p>
            <p>
              When you interact with our website chat or speak with our AI voice receptionist ("Poppy"), conversation details and contact information you provide are processed strictly to answer queries, arrange consultations, and route you to a human team member when requested.
            </p>
          </section>

          {/* 8. Data Sharing */}
          <section className="privacy-section" id="data-sharing">
            <h2>8. How We Share Your Information</h2>
            <p>
              We do not sell, rent, or trade your personal information. We share your information only in the limited circumstances described below.
            </p>

            <h3>Data Processors</h3>
            <p>
              We use a small number of trusted third-party services to operate our website and store your submissions securely. These organisations act as <strong>data processors</strong> on our behalf and are contractually obligated to handle your data only as instructed by us and in compliance with applicable data protection law.
            </p>
            <div className="privacy-table-wrapper">
              <table className="privacy-table">
                <thead>
                  <tr>
                    <th>Provider</th>
                    <th>Role</th>
                    <th>What They Process</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Supabase</strong></td>
                    <td>Cloud database provider</td>
                    <td>Secure storage of form submissions (companionship enquiries, recovery requests, companion applications, contact messages). Data is hosted in the United Kingdom (AWS London - eu-west-2). See <a href="#international-transfers">Section 9</a>.</td>
                  </tr>
                  <tr>
                    <td><strong>Stripe &amp; GoCardless</strong></td>
                    <td>Payment &amp; subscription processors</td>
                    <td>Processing payments, direct debits, and subscription memberships securely under PCI-DSS compliance. Unlonely does not store full payment card numbers.</td>
                  </tr>
                  <tr>
                    <td><strong>Cal.com</strong></td>
                    <td>Booking &amp; calendar scheduling</td>
                    <td>Client consultation bookings, discovery call scheduling, and interview time management.</td>
                  </tr>
                  <tr>
                    <td><strong>LineHQ</strong></td>
                    <td>AI phone call handling ("Poppy")</td>
                    <td>Inbound telephone answering, enquiry routing, and voicemail/call transcription for phone enquiries.</td>
                  </tr>
                  <tr>
                    <td><strong>Google Gemini</strong></td>
                    <td>AI chatbot intelligence</td>
                    <td>Processing website chat messages to provide instant conversational answers and route enquiries. Data is not used to train public models.</td>
                  </tr>
                  <tr>
                    <td><strong>Hostinger</strong></td>
                    <td>Domain registrar &amp; email delivery</td>
                    <td>Registration of the unlonely.uk domain name, transactional email sending, and waitlist management.</td>
                  </tr>
                  <tr>
                    <td><strong>Netlify</strong></td>
                    <td>Website hosting platform</td>
                    <td>Serves the static website files and processes standard server-level access logs (IP addresses and request timestamps).</td>
                  </tr>
                  <tr>
                    <td><strong>GitHub</strong></td>
                    <td>Source code repository</td>
                    <td>Hosts the website source code. GitHub does not receive or process visitor personal data submitted through the website.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Disclosure and Barring Service (DBS)</h3>
            <p>
              For approved companion applicants, we initiate an Enhanced DBS check through the UK Disclosure and Barring Service, a UK government body. This involves sharing the applicant&rsquo;s personal details with the DBS for the purpose of the background check. The DBS operates under its own statutory privacy framework.
            </p>

            <h3>Referees</h3>
            <p>
              With the applicant&rsquo;s explicit consent (provided during the application process), we contact two referees — one of whom should be a recent employer or organisation where the applicant has volunteered. We share only the applicant&rsquo;s name and the nature of the reference request.
            </p>

            <h3>Legal Disclosure</h3>
            <p>
              We may disclose personal information to law enforcement, regulatory bodies, or courts where we are legally required to do so, or where we believe disclosure is necessary to protect the safety of a person.
            </p>

            <h3>No Other Sharing</h3>
            <p>
              We do not share personal information with marketing companies, data brokers, advertisers, or other third parties.
            </p>
          </section>

          {/* 9. International Transfers */}
          <section className="privacy-section" id="international-transfers">
            <h2>9. International Data Transfers</h2>
            <p>
              Your form submissions are stored in Supabase, a cloud database platform whose underlying infrastructure is provided by Amazon Web Services (AWS).
            </p>
            <p>
              <strong>Data location:</strong> Our Supabase database instance is provisioned in the <strong>AWS London region (eu-west-2)</strong> within the United Kingdom. As a result, your form submissions are stored domestically within the UK, and no international transfer of database records takes place outside the UK.
            </p>
            <p>
              Our website is hosted on Netlify, which operates a global content delivery network (CDN) to ensure fast and reliable loading of static web assets. Netlify complies with UK data protection laws and provides appropriate transfer mechanisms (including standard contractual clauses and UK data bridge safeguards) for server-level access logs.
            </p>
            <p>
              All website typography and font assets are hosted directly on our own web server, ensuring no external font requests or IP disclosures are made to third-party providers.
            </p>
            <p>
              Hostinger, which provides domain name registration for unlonely.uk and business mail infrastructure, is headquartered in Lithuania and operates within the European Economic Area (EEA). The UK has an adequacy decision in respect of the EEA, meaning transfers to EEA-based organisations are considered to provide an adequate level of data protection.
            </p>
            <p>
              If you have questions about international transfers or would like details of the safeguards in place, please contact us at <a href="mailto:privacy@unlonely.uk">privacy@unlonely.uk</a>.
            </p>
          </section>

          {/* 10. Data Retention */}
          <section className="privacy-section" id="data-retention">
            <h2>10. How Long We Keep Your Information</h2>
            <p>
              We retain personal information only for as long as is necessary for the purposes for which it was collected, or as required by law. Our defined retention schedule is as follows:
            </p>
            <div className="privacy-table-wrapper">
              <table className="privacy-table">
                <thead>
                  <tr>
                    <th>Data Category</th>
                    <th>Retention Period</th>
                    <th>Reason &amp; Justification</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Unsuccessful client enquiries</strong></td>
                    <td>12 months after last contact</td>
                    <td>To respond to follow-up questions, reference matching history if you contact us again, and resolve any disputes.</td>
                  </tr>
                  <tr>
                    <td><strong>Active clients</strong></td>
                    <td>Retained while the companionship relationship continues</td>
                    <td>Necessary to deliver our companionship service and maintain up-to-date preferences and safety contacts, subject to applicable legal requirements.</td>
                  </tr>
                  <tr>
                    <td><strong>Inactive/Former Clients</strong></td>
                    <td>7 years after the end of the service, in line with UK safeguarding and tax record recommendations</td>
                    <td>To satisfy statutory obligations, safeguarding accountability, HMRC and tax records, insurance conditions, and dispute resolution.</td>
                  </tr>
                  <tr>
                    <td><strong>Unsuccessful companion applications</strong></td>
                    <td>12 months after the application decision</td>
                    <td>To allow time to respond to candidate queries or appeals and maintain an audit record of vetting decisions.</td>
                  </tr>
                  <tr>
                    <td><strong>Active &amp; former companions</strong></td>
                    <td>Duration of engagement, plus 6 years following termination</td>
                    <td>To comply with UK statutory accounting, HMRC, contractual record-keeping, and safeguarding accountability.</td>
                  </tr>
                  <tr>
                    <td><strong>General contact messages</strong></td>
                    <td>Up to 12 months from receipt</td>
                    <td>To maintain communication history and handle relevant follow-up correspondence.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              At the end of the applicable retention period, records are securely deleted. If you request deletion of your information before these periods elapse, we will assess your request under UK GDPR rights and confirm whether any statutory retention obligations require us to maintain specific records.
            </p>
          </section>

          {/* 11. Your Rights */}
          <section className="privacy-section" id="your-rights">
            <h2>11. Your Rights</h2>
            <p>
              Under UK GDPR and the Data Protection Act 2018, you have the following rights in relation to your personal information:
            </p>
            <ul>
              <li><strong>Right of access:</strong> You may request a copy of the personal information we hold about you (also known as a Subject Access Request or SAR). We will respond within one calendar month of receiving your verified request.</li>
              <li><strong>Right to rectification:</strong> You may request that we correct any inaccurate or incomplete personal information we hold about you.</li>
              <li><strong>Right to erasure:</strong> You may request that we delete your personal information where it is no longer necessary for the purpose it was collected, or where you withdraw consent (and no other lawful basis applies).</li>
              <li><strong>Right to restriction:</strong> You may request that we suspend processing of your data in certain circumstances, for example while an accuracy dispute is investigated.</li>
              <li><strong>Right to data portability:</strong> Where processing is based on consent or contract and carried out by automated means, you may request a copy of your data in a structured, commonly used, machine-readable format.</li>
              <li><strong>Right to object:</strong> You may object to processing based on our legitimate interests. We will cease processing unless we can demonstrate compelling legitimate grounds that override your interests.</li>
              <li><strong>Right to withdraw consent:</strong> Where we rely on your consent to process information (e.g. optional fields such as pronouns, accessibility needs), you may withdraw that consent at any time. Withdrawal does not affect the lawfulness of processing carried out before withdrawal.</li>
            </ul>

            <div className="privacy-highlight-box">
              <h4>How to Submit a Privacy Request</h4>
              <p>
                To exercise any of the rights above, please contact us by one of the following methods:
              </p>
              <ul>
                <li><strong>Email:</strong> <a href="mailto:privacy@unlonely.uk">privacy@unlonely.uk</a> (preferred — please include &ldquo;Privacy Request&rdquo; in the subject line)</li>
                <li><strong>Post:</strong> <span className="privacy-placeholder-badge">[Registered Office Address, United Kingdom]</span> marked &ldquo;Data Protection Request&rdquo;</li>
              </ul>
              <p>
                We may ask you to verify your identity before processing your request. All verified requests are handled free of charge. We will respond within <strong>one calendar month</strong> of receiving your request. Where a request is complex or numerous, we may extend this by up to two additional months — we will notify you if this applies.
              </p>
              <p style={{ marginBottom: 0 }}>
                <strong>Right to complain to the regulator:</strong> If you believe we have not handled your personal information lawfully, you have the right to lodge a complaint with the UK supervisory authority:
                <br /><br />
                <strong>Information Commissioner&rsquo;s Office (ICO)</strong><br />
                Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF<br />
                Helpline: 0303 123 1113<br />
                Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk <ExternalLink size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /></a>
              </p>
            </div>
          </section>

          {/* 12. Cookies */}
          <section className="privacy-section" id="cookies">
            <h2>12. Cookies &amp; Tracking Technologies</h2>
            <p>
              Our website uses cookies and similar technologies to ensure core functionality, provide security, and maintain seamless navigation across our forms and services.
            </p>
            <p>
              <strong>Analytics &amp; Advertising Cookies:</strong> Subject to your consent via our Cookie Consent banner, we use analytics and advertising cookies (such as Google Analytics and Meta Pixel) to understand how visitors engage with our website, monitor campaign performance, and deliver relevant advertisements.
            </p>
            <p>
              <strong>Your Cookie Choices:</strong> You have full control over your cookie preferences. You may accept or decline optional cookies at any time via our Cookie Consent banner, or adjust your browser settings to block or delete cookies. Disabling strictly necessary cookies may impact the proper functioning of certain website features.
            </p>
          </section>

          {/* 13. Marketing */}
          <section className="privacy-section" id="marketing">
            <h2>13. Marketing &amp; Communications</h2>
            <p>
              We will only send you marketing communications (such as our email newsletter or service updates) if you have explicitly opted in to receive them, or if you are an existing client and the communication is relevant to your service.
            </p>
            <p>
              You can opt out of marketing emails at any time by clicking the &lsquo;unsubscribe&rsquo; link at the bottom of our emails or by contacting us directly. We do not share your contact details with third parties for their own marketing purposes.
            </p>
          </section>

          {/* 14. Changes */}
          <section className="privacy-section" id="changes">
            <h2>14. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other operational developments. When material updates are made, the &ldquo;Last updated&rdquo; date at the top of this page will be revised accordingly.
            </p>
            <p>
              We encourage you to review this page periodically. Where changes are significant, we will take reasonable steps to draw them to your attention.
            </p>
          </section>

          {/* 15. Contact Us */}
          <section className="privacy-section" id="contact-us">
            <h2>15. Contact Us &amp; Privacy Requests</h2>
            <p>
              If you have any questions about this Privacy Policy, your personal information, or wish to submit a data protection request, please contact us:
            </p>

            <div className="privacy-contact-card">
              <p><strong>Unlonely — Data Protection Contact</strong></p>
              <p><strong>Legal Entity:</strong> <span className="privacy-placeholder-badge">[Unlonely Legal Entity Name]</span></p>
              <p><strong>Privacy &amp; Data Requests:</strong> <a href="mailto:privacy@unlonely.uk">privacy@unlonely.uk</a></p>
              <p><strong>General Support:</strong> <a href="mailto:support@unlonely.uk">support@unlonely.uk</a></p>
              <p><strong>Safeguarding:</strong> <a href="mailto:safeguarding@unlonely.uk">safeguarding@unlonely.uk</a></p>
              <p><strong>Postal Address:</strong> <span className="privacy-placeholder-badge">[Registered Office Address, United Kingdom]</span> (marked &ldquo;Data Protection Request&rdquo;)</p>
              <p style={{ marginBottom: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                We respond to all verified data protection requests within one calendar month, free of charge.
              </p>
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
